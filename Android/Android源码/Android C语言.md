---
tags: Android, C
---

# Android 提供的 C 语言打印
* `__android_log_print(ANDROID_LOG_INFO,LOG_TAG,__VA_ARGS__)`
	* `ANDROID_LOG_INFO` : 打印级别
	* `LOG_TAG` : 标签
	* `__VA_ARGS__` ：可变参数，类似 `printf()`
* 