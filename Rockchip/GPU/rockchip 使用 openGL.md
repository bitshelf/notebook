---
tags:
  - openGL
---
> [!info] 
> ARM  GPU  不支持 openGL，需要使用开源的 panfrost 或者有是 GLES 转换插件
## ARM GPU 使用 openGL 内核补丁
```diff
diff --git a/arch/arm64/boot/dts/rockchip/rk3576j.dtsi b/arch/arm64/boot/dts/rockchip/rk3576j.dtsi
index 132aa3a7a80d..30e89e642f1f 100644
--- a/arch/arm64/boot/dts/rockchip/rk3576j.dtsi
+++ b/arch/arm64/boot/dts/rockchip/rk3576j.dtsi
@@ -2294,7 +2294,7 @@ rknpu_mmu: iommu@27702000 {
 		status = "disabled";
 	};
 
-	gpu: gpu@27800000 {
+	/*gpu: gpu@27800000 {
 		compatible = "arm,mali-bifrost";
 		reg = <0x0 0x27800000 0x0 0x20000>;
 
@@ -2315,7 +2315,29 @@ gpu: gpu@27800000 {
 		#cooling-cells = <2>;
 		dynamic-power-coefficient = <1625>;
 		status = "disabled";
-	};
+	};*/
+
+	gpu: gpu@27800000 {
+            compatible = "arm,mali-bifrost";
+            reg = <0x0 0x27800000 0x0 0x20000>;
+            interrupts = <GIC_SPI 347 IRQ_TYPE_LEVEL_HIGH>,
+                         <GIC_SPI 348 IRQ_TYPE_LEVEL_HIGH>,
+                         <GIC_SPI 349 IRQ_TYPE_LEVEL_HIGH>;
+            interrupt-names = "job", "mmu", "gpu";
+
+	    upthreshold = <40>;
+            downdifferential = <10>;
+
+            clocks = <&scmi_clk CLK_GPU>, <&cru CLK_GPU>;
+            clock-names = "gpu", "bus";
+            assigned-clocks = <&cru CLK_GPU>;
+            //assigned-clock-rates = <800000000>;
+	    assigned-clock-rates = <198000000>;
+            power-domains = <&power RK3576_PD_GPU>;
+	    #cooling-cells = <2>;
+            dynamic-power-coefficient = <1625>;
+            status = "disabled";
+    	};
 
 	gpu_opp_table: gpu-opp-table {
 		compatible = "operating-points-v2";
diff --git a/arch/arm64/configs/rockchip_linux_defconfig b/arch/arm64/configs/rockchip_linux_defconfig
index 938b40f07958..0695e652b9a5 100644
--- a/arch/arm64/configs/rockchip_linux_defconfig
+++ b/arch/arm64/configs/rockchip_linux_defconfig
@@ -3,7 +3,6 @@ CONFIG_DEFAULT_HOSTNAME="localhost"
 CONFIG_SYSVIPC=y
 CONFIG_NO_HZ=y
 CONFIG_HIGH_RES_TIMERS=y
-CONFIG_PREEMPT_VOLUNTARY=y
 CONFIG_RCU_EXPERT=y
 CONFIG_RCU_NOCB_CPU=y
 CONFIG_IKCONFIG=y
@@ -695,3 +694,21 @@ CONFIG_RCU_CPU_STALL_TIMEOUT=60
 CONFIG_FUNCTION_TRACER=y
 CONFIG_BLK_DEV_IO_TRACE=y
 CONFIG_LKDTM=y
+CONFIG_HZ_PERIODIC=y
+CONFIG_PREEMPT_LAZY=y
+CONFIG_PREEMPT_RT=y
+CONFIG_PREEMPT_COUNT=y
+CONFIG_PREEMPTION=y
+CONFIG_PREEMPT_RCU=y
+CONFIG_TASKS_RCU=y
+CONFIG_RCU_BOOST=y
+CONFIG_RCU_BOOST_DELAY=500
+CONFIG_RCU_NOCB_CPU_CB_BOOST=y
+CONFIG_HZ_1000=y
+CONFIG_HZ=1000
+CONFIG_CPU_FREQ_DEFAULT_GOV_PERFORMANCE=y
+#CONFIG_DRM_GEM_SHMEM_HELPER=y
+#CONFIG_DRM_SCHED=y
+CONFIG_DRM_PANFROST=y
+
+
diff --git a/drivers/gpu/drm/drm_ioctl.c b/drivers/gpu/drm/drm_ioctl.c
index 6172f786012b..a039fbc76f1d 100644
--- a/drivers/gpu/drm/drm_ioctl.c
+++ b/drivers/gpu/drm/drm_ioctl.c
@@ -121,6 +121,13 @@ int drm_getunique(struct drm_device *dev, void *data,
 
 	mutex_lock(&dev->master_mutex);
 	master = file_priv->master;
+
+	if (master == NULL) {
+               u->unique_len = 0;
+               mutex_unlock(&dev->master_mutex);
+               return 0;
+       }
+
 	if (u->unique_len >= master->unique_len) {
 		if (copy_to_user(u->unique, master->unique, master->unique_len)) {
 			mutex_unlock(&dev->master_mutex);

```

## 安装软件包
```shell
sudo apt install python3-mako python3-yaml byacc flex libxcb-randr0-dev libxcb-glx0-dev libxcb-dri3-dev libxcb-present-dev libxshmfence-dev libxxf86vm-dev

sudo apt-get install libssl-dev
```

## 编译必要的软件包
### 编译安装libdrm
```shell
cd drm
meson build --prefix=/usr/local
sudo ninja -C build install
```

### 编译安装mesa
```shell
cd mesa
meson build -Dvulkan-drivers=panfrost -Dgallium-drivers=panfrost -Dplatforms=x11 -Dglx=auto -Dprefix=/usr/local
sudo ninja -C build install
```

### 编译安装libinput
```shell
cd xf86-input-libinput
meson build
sudo ninja -C build install
```

### 编译安装xserver
```shell
cd xserver
meson build -D prefix=/usr/local -D glamor=true
sudo ninja -C build install
sudo mkdir -p /var/local/log
```

### 修改/usr/bin/X
```shell
#!/bin/sh
#
# Execute Xorg.wrap if it exists otherwise execute Xorg directly.
# This allows distros to put the suid wrapper in a separate package.

# Load environments
. /etc/profile
if [ -r ~/.xinitrc ]; then
        . ~/.xinitrc
fi

#basedir=/usr/lib/xorg
basedir=/usr/local/bin
if [ -x "$basedir"/Xorg.wrap ]; then
        exec "$basedir"/Xorg.wrap "$@"
else
        exec "$basedir"/Xorg "$@"
f
```

### 修改/etc/ld. so. conf. d/00-aarch 64-mali. conf 文件
```shell
root@myd-lr3576x-debian:~# cat /etc/ld.so.conf.d/00-aarch64-mali.conf
/usr/local/lib
```

###  更新共享库缓存
```shell
ldconfig
sync
```

### 验证
```shell
root@myd-lr3576x-debian:/# glxinfo -B
name of display: :0
display: :0  screen: 0
direct rendering: Yes
Extended renderer info (GLX_MESA_query_renderer):
    Vendor: Mesa (0xffffffff)
    Device: Mali-G52 r1 (Panfrost) (0xffffffff)
    Version: 24.3.2
    Accelerated: yes
    Video memory: 3893MB
    Unified memory: yes
    Preferred profile: core (0x1)
    Max core profile version: 3.1
    Max compat profile version: 3.1
    Max GLES1 profile version: 1.1
    Max GLES[23] profile version: 3.1
OpenGL vendor string: Mesa
OpenGL renderer string: Mali-G52 r1 (Panfrost)
OpenGL core profile version string: 3.1 Mesa 24.3.2 (git-e3b1a93aaa)
OpenGL core profile shading language version string: 1.40
OpenGL core profile context flags: (none)

OpenGL version string: 3.1 Mesa 24.3.2 (git-e3b1a93aaa)
OpenGL shading language version string: 1.40
OpenGL context flags: (none)

OpenGL ES profile version string: OpenGL ES 3.1 Mesa 24.3.2 (git-e3b1a93aaa)
OpenGL ES profile shading language version string: OpenGL ES GLSL ES 3.10
```



## link
![](assets/opengl.patch)