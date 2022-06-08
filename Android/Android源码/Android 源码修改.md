---
tags: Android, 
---
# 显示语言修改
~~~Makefile:common.mk
PRODUCT_PROPERTY_OVERRIDES += \
persist.sys.locale=zh-CN \
persist.sys.timezone=Asia/Shanghai
~~~
> [!important]
> 修改完，编译时需要执行 `make installclean`
# 根据服务名寻找源码
~~~shell
find -name Android.mk -exec grep -l "app_process" {} \;
~~~


