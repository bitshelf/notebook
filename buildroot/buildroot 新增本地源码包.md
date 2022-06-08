---
tags: buildroot
---

# Buildroot 新增本地源码包
Buildroot 支持多种模块编译方式，包括 generic-package、cmake-package、 autotools-package 等，以 generic-package 举例说明：
> [!example] 例子：package/rockchip/alsa_capture
> 
1. 创建目录 package/rockchip/alsa_capture
2. 创建 Config. in，添加 package/Config. in 入口
```
config BR2_PACKAGE_ALSA_CAPTURE
	bool "Simple ALSA Capture Demo"
```
3. 创建 alsa_capture. mk，其中源码目录指向 external/alsa_capture/src
```
##################################################
###########
#
# alsa_capture
#
##################################################
###########
ifeq ($(BR2_PACKAGE_ALSA_CAPTURE), y)
ALSA_CAPTURE_VERSION:=1.0.0
ALSA_CAPTURE_SITE=$(TOPDIR)/../external/alsa_capture/src
ALSA_CAPTURE_SITE_METHOD=local
define ALSA_CAPTURE_BUILD_CMDS
$(TARGET_MAKE_ENV) $(MAKE) CC=$(TARGET_CC) CXX=$(TARGET_CXX) -C
$(@D)
endef
define ALSA_CAPTURE_CLEAN_CMDS
$(TARGET_MAKE_ENV) $(MAKE) -C $(@D) clean
endef
define ALSA_CAPTURE_INSTALL_TARGET_CMDS
$(TARGET_MAKE_ENV) $(MAKE) -C $(@D) install
endef
define ALSA_CAPTURE_UNINSTALL_TARGET_CMDS
$(TARGET_MAKE_ENV) $(MAKE) -C $(@D) uninstall
endef
$(eval $(generic-package))
endif
```

4. 创建目录 external/alsa_capture/src，编写 alsa_capture.c
```c
#include <stdio.h>  
#include <stdlib.h>  
int main(int argc, char *argv[])  
{  
printf(“hello world\n”);  
return 0;
}
```

5. 编写 Makefile 文件
```Makefile
DEPS =  
OBJ = alsa_capture.o
CFLAGS = -std=c++11 -lasound  
%.o: %.cpp $(DEPS)  
$(CC) -c -o $@ $< $(CFLAGS)  
alsa_capture: $(OBJ)  
$(CXX) -o $@ $^ $(CFLAGS)  
.PHONY: clean  
clean:  
rm -f *.o *~ alsa_capture  
.PHONY: install  
install:  
cp -f alsa_capture $(TARGET_DIR)/usr/bin/  
.PHONY: uninstall  
uninstall:  
rm -f $(TARGET_DIR)/usr/bin/alsa_capture
```
6. 在将新建包加入到 Buildroot 编译系统内
7. 修改 package/rockchip/Config. in 加入下面这行
```
source "package/rockchip/alsa_capture/Config.in"
```
8. 配置选择包
```shell
make menuconfig #然后选上 alsa_capture 包；
```

9. 编译：`make alsa_capture`
10. 打包进文件系统：`make`
11. 修改源码后重新编译包
```shell
make alsa_capture-rebuild
```