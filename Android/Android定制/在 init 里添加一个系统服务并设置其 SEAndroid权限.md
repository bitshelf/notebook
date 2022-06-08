---
tags: Android SELinux
---


## GPS 启动程序


```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main(){
	for(;;) {
		if(access("/dev/ttyUSB2", F_OK) == 0){
		system("echo -e \"AT+QGPS=1\r\n\" > /dev/ttyUSB2");
		sleep(2);
		sleep(20);
		return 0;        
		}
	printf("wait for sleep \n");
	sleep(2);    
	}
return 1;
}
```

        对应的 Android.mk 如下：

```Makefile
LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)
common_src_files := main.c
LOCAL_MODULE := gpsopen
LOCAL_SRC_FILES := $(common_src_files)

include $(BUILD_EXECUTABLE)
```

        以上程序通过发送 AT 指令 启动GPS模块。

## 二、添加 init service

        service（服务）是一个程序，以 service 开头，由 init 进程启动，一般运行于另外一个 init 的子程序，所以启动 service 前需要判断对应的可执行文件是否存在。init 生成的子进程定义在 rc 文件，其中每一个 service，在启动时会通过 fork 方式生成子进程。

        在此次需求中，我们把该 service 添加到 /device/rockchip/common/init.rk30board.rc 文件中：

```
service gpsopen /system/bin/gpsopenclass 
	mian    
	oneshot
```

        另外，我们把 service gpsopen 添加到位于 /device/rockchip/common/device.mk 中的 PRODUCT\_PACKAGES 属性中：

```
PRODUCT_PACKAGES += gpsopen
```

        PRODUCT\_PACKAGES 指定 make 时需要编译进 system 中的包，这部分虽然也生成 apk，但用户是删不掉的。

## 三、添加系统服务的权限声明

        1、定义文件的安全上下文：

        添加以下内容到 /device/rockchip/common/sepolicy/file\_contexts 文件中

```
/system/bin/gpsopen        u:object_r:gpsopen_exec:s0
```

        2、创建一个 gpsopen.te 文件，在 /device/rockchip/common/sepolicy/ 目录，内容如下：

```
type gpsopen, domain;            // gpsopen service 的域(domain) 类型定义
type gpsopen_exec, exec_type, file_type;    //gpsopen 的可执行文件(客体) 的类型定义init_daemon_domain(gpsopen)    // init 启动service 时类型转换声明，直接用一个宏，主要是用于把 gpsopen_exec(客体) 转换成 demo(进程域)
allow gpsopen self:capability dac_override;
typeattribute gpsopen coredomain;
```

> [!note] 查看SELinux
>  `ps  -Z` 查看应用权限上下文，如 Setting 是 u:r:system\_app:s0
>  `ls -Z` 查看文件的安全上下文
