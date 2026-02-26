---
tags:
  - Android
  - APK
---
## AOSP 编译准备
### 编译 framework
```shell
source 
lunch TARGET

# Android11 及以后
make framework-minus-apex

# Android10 及以前
# make framework
```
- 生成：在 `out/target/common/obj/JAVA_LIBRARIES/framework_intermediates` 目录下找到 `classes.jar` 文件

## Android studio 应用开发
1. 将 `classes.jar` 拷贝到  `app/libs` 目录下，可以将其命名为 `framework.jar`
2. 修改项目根目录下的 `build.gradle`
```gradle
allprojects{
    gradle.projectsEvaluated {
        tasks.withType(JavaCompile) {
            Set<File> fileSet
            if (options.bootstrapClasspath != null ) {
                fileSet = options.bootstrapClasspath.getFiles()
            }else {
                fileSet = new HashSet<>()
            }

            List<File> newFileList = new ArrayList<>();
            newFileList.add(new File("./app/libs/framework.jar"))
            newFileList.addAll(fileSet)
            options.bootstrapClasspath = files(
                    newFileList.toArray()
            )
        }
    }
}
```
3. 接着修改 `app/build.gradle`
```gradle
dependencies {
    compileOnly files('libs/framework.jar')
    //.......
}
```

4. 在项目的 AndroidManifest. xml 中添加
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:sharedUserId="android.uid.system"
    android:sharedUserMaxSdkVersion="32">
```

 5. 制作签名工具
- [GitHub - getfatday/keytool-importkeypair: A shell script to import key/certificate pairs into an existing Java keystore](https://github.com/getfatday/keytool-importkeypair)
- 进入系统源码下的 `build/target/product/security`
```shell
keytool-importkeypair -k ./platform.keystore -p android -pk8 platform.pk8 -cert platform.x509.pem -alias platform
```
- `-k` 表示要生成的 keystore 文件的名字，这里命名为 `platform.keystore `
- `-p` 表示要生成的 keystore 的密码，这里是 android
- `-pk8` 表示要导入的 `platform.pk8` 文件 
- `-cert` 表示要导入的` platform.x509.pem`
- `-alias` 表示给生成的 platform. keystore 取一个别名，这是命名为 platform

6. 把生成的签名文件 `platform.keystore` 拷贝到 Android Studio 项目的 app 目录下；在 app/build. gradle 中添加签名的配置信息
```gradle
android {
    signingConfigs {
        sign {
            storeFile file('platform.keystore')
            storePassword 'android'
            keyAlias = 'platform'
            keyPassword 'android'
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.sign
        }

        debug {
            minifyEnabled false
            signingConfig signingConfigs.sign
        }
    }
}
```


## 进程保活
在 AndroidManifest. xml 中添加：
```xml
 <application
        android:persistent="true"
```

## 制作签名工具脚本：keytool-importkeypair
```shell:keytool-importkeypair
#! /bin/bash
#
# This file is part of keytool-importkeypair.
#
# keytool-importkeypair is free software: you can redistribute it
# and/or modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation, either version 3 of
# the License, or (at your option) any later version.
#
# keytool-importkeypair is distributed in the hope that it will be
# useful, but WITHOUT ANY WARRANTY; without even the implied warranty
# of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with keytool-importkeypair.  If not, see
# <http://www.gnu.org/licenses/>.
#

DEFAULT_KEYSTORE=$HOME/.keystore
keystore=$DEFAULT_KEYSTORE
pk8=""
cert=""
alias=""
passphrase=""
tmpdir=""

scriptname=`basename $0`

usage() {
cat << EOF
usage: ${scriptname} [-k keystore] [-p storepass]
-pk8 pk8 -cert cert -alias key_alias

This script is used to import a key/certificate pair
into a Java keystore.

If a keystore is not specified then the key pair is imported into
~/.keystore in the user's home directory.

The passphrase can also be read from stdin.
EOF
}

cleanup() {
if [ ! -z "${tmpdir}" -a -d ${tmpdir} ]; then
   rm -fr ${tmpdir}
fi
}

while [ $# -gt 0 ]; do
        case $1
        in
                -p | --passphrase | -passphrase)
                        passphrase=$2
                        shift 2
        ;;
                -h | --help)
                        usage
                        exit 0
        ;;
                -k | -keystore | --keystore)
                        keystore=$2
                        shift 2
        ;;
                -pk8 | --pk8 | -key | --key)
                        pk8=$2
                        shift 2
        ;;
                -cert | --cert | -pem | --pem)
                        cert=$2
                        shift 2
        ;;
                -a | -alias | --alias)
                        alias=$2
                        shift 2
        ;;
                *)
                        echo "${scriptname}: Unknown option $1, exiting" 1>&2
                        usage
                        exit 1
        ;;
        esac
done

if [ -z "${pk8}" -o -z "${cert}" -o -z "${alias}" ]; then
   echo "${scriptname}: Missing option, exiting..." 1>&2
   usage
   exit 1
fi


for f in "${pk8}" "${cert}"; do
    if [ ! -f "$f" ]; then
       echo "${scriptname}: Can't find file $f, exiting..." 1>&2
       exit 1
    fi
done

if [ ! -f "${keystore}" ]; then
   storedir=`dirname "${keystore}"`
   if [ ! -d "${storedir}" -o ! -w "${storedir}" ]; then
      echo "${scriptname}: Can't access ${storedir}, exiting..." 1>&2
      exit 1
   fi
fi

# Create temp directory ofr key and pkcs12 bundle
tmpdir=`mktemp -q -d "/tmp/${scriptname}.XXXX"`

if [ $? -ne 0 ]; then
   echo "${scriptname}: Can't create temp directory, exiting..." 1>&2
   exit 1
fi

key="${tmpdir}/key"
p12="${tmpdir}/p12"

if [ -z "${passphrase}" ]; then
   # Request a passphrase
  read -p "Enter a passphrase: " -s passphrase
  echo ""
fi

# Convert PK8 to PEM KEY
openssl pkcs8 -inform DER -nocrypt -in "${pk8}" -out "${key}"

# Bundle CERT and KEY
openssl pkcs12 -export -in "${cert}" -inkey "${key}" -out "${p12}" -password pass:"${passphrase}" -name "${alias}"

# Print cert
echo -n "Importing \"${alias}\" with "
openssl x509 -noout -fingerprint -in "${cert}"

# Import P12 in Keystore
keytool -importkeystore -deststorepass "${passphrase}" -destkeystore "${keystore}" -srckeystore "${p12}" -srcstoretype PKCS12 -srcstorepass "${passphrase}" 

# Cleanup
cleanup
```

## Link 
- [写给应用开发的 Android Framework 教程——玩转 AOSP篇 之使用 Android Studio 开发系统 App - 掘金](https://juejin.cn/post/7207358268804579386)
- [教你签自己的系统！LineageOS Release Key 签名刷机教程 // CYRUS STUDIO](https://cyrus-studio.github.io/blog/posts/%E6%95%99%E4%BD%A0%E7%AD%BE%E8%87%AA%E5%B7%B1%E7%9A%84%E7%B3%BB%E7%BB%9Flineageos-release-key-%E7%AD%BE%E5%90%8D%E5%88%B7%E6%9C%BA%E6%95%99%E7%A8%8B/)