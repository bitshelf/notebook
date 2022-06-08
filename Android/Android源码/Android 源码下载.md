---
tags: Android 
---

## AOSP 下载
```shell
repo init -u git://mirrors.ustc.edu.cn/aosp/platform/manifest -b master --partial-clone --clone-filter=blob:limit=10M
#-b android-13.0.0_r41
repo sync -n
```

## Android kernel 下载
```shell
repo init -u git://mirrors.ustc.edu.cn/aosp/kernel/manifest -b common-android-mainline
# common-android12-5.10
repo sync -n
```

## 使用国内镜像
### 导出代理变量
```shell
echo "REPO_URL='https://gerrit-googlesource.proxy.ustclug.org/git-repo'" >> ~/.bashrc
source ~/.bashrc
```

### 修改 `repo`
- 将 `https://gerrit.googlesource.com/git-repo` 替换为 `https://gerrit.googlesource.com/git-repo`

## 禁用 ssl 
```shell
git config --global http.sslverify false
git config --global https.sslverify false
```

---
## Link 
- [AOSP 镜像使用帮助 — USTC Mirror Help 文档](https://mirrors.ustc.edu.cn/help/aosp.html)