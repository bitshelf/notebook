---
tags: Android 
---

# Android 双触摸绑定
## 修改 `gt9xx` 驱动，解决注册相同 `/proc/` 节点 panic 问题
1. 修改 `goodix_tool.c` 文件
```c
static void tool_set_proc_name(char * procname,u16 x)

// 注册不同节点名字，此处使用TP 分辨率判断，也可以在dtsi 添加属性判断
if (400 == x) 
	sprintf(procname, "gmnode400%04d%02d%02d", n_year, n_month, n_day);  
else
	sprintf(procname, "gmnode%04d%02d%02d", n_year, n_month, n_day);

// 修改 init_wr_node 函数，传递用于区分TP的信息
s32 init_wr_node(struct i2c_client *client,u16 x)

// 修改 tool_set_proc_name(procname) 函数
tool_set_proc_name(procname,x);
```

2. 修改 `gt9xx.c`
```c
// 修改 init_wr_node 函数
extern s32 init_wr_node(struct i2c_client*, u16 x);

// 创建不同的 TP proc 节点
if ( 400 == ts->abs_x_max || 1280 == ts->abs_x_max){
       gt91xx_config_proc = proc_create("gt9xx_config_400", 0666, NULL, &config_proc_ops);
        if (gt91xx_config_proc == NULL)
        {
            GTP_ERROR("create_proc_entry %s failed\n", GT91XX_CONFIG_PROC_FILE);
        }
        else
        {
            GTP_INFO("create proc entry %s success", GT91XX_CONFIG_PROC_FILE);
        }
    } else {

        goodix_ts_name = "goodix-tsp";
        goodix_input_phys = "input/tsp";

        gt91xx_config_proc = proc_create("gt9xx_config_1920", 0666, NULL, &config_proc_ops);
        if (gt91xx_config_proc == NULL)
        {
            GTP_ERROR("create_proc_entry %s failed\n", "gt9xx_config_1920");
        }
        else
        {
            GTP_INFO("create proc entry %s success", "gt9xx_config_1920");
        }
        }
```

## 创建不同 input 节点
- 修改 `gt9xx.c` 文件
```diff
-static const char *goodix_ts_name = "goodix-ts";
-static const char *goodix_input_phys = "input/ts";
+static char *goodix_ts_name = "goodix-ts";
+static char *goodix_input_phys = "input/ts";
```

- 在 `goodix_ts_probe()` 函数中，不同 TP 创建不同 proc 节点时，修改 `goodix_ts_name` 的值，创建不同 input 节点，用于触摸绑定
```diff
@@ -2673,6 +2673,10 @@ static int goodix_ts_probe(struct i2c_client *client, c
onst struct i2c_device_id
             GTP_INFO("create proc entry %s success", GT91XX_CONFIG_PROC_FILE)
;
         }
     } else {
+
+        goodix_ts_name = "goodix-tsp";
+        goodix_input_phys = "input/tsp";
+
```

## Android 11 framework 支持多触摸，只需要添加配置文件
- 编写配置文件
```xml
<ports>
       <port display="0" input="input/tsp" />
       <port display="1" input="input/ts" />
</ports>
```
- 使用 `dumpsys display` 找出 `displayId`
```
mBaseDisplayInfo=DisplayInfo{"内置屏幕", displayId 0 ...
```
- 使用 `dumpsys input` 找出触摸 input 节点：`Location: input/ts`
```
    1: goodix-ts
      Classes: 0x00000015
      Path: /dev/input/event1
      Enabled: true
      Descriptor: 9e6143a1bc5dd41251b165ed559e32d49b5aad8f
      Location: input/ts
```

- 在 PRODUCT_COPY_FILES 将配置文件拷贝到 /vendor/etc/ 目录下
```shell
# vendor/rockchip/rpdzkj/rpdzkj.mk
external/input-port-associations.xml:vendor/etc/input-port-associations.xml
```

## Android framework 修改
```diff
--- a/frameworks/native/services/inputflinger/reader/mapper/TouchInputMapper.cpp
+++ b/frameworks/native/services/inputflinger/reader/mapper/TouchInputMapper.cpp
@@ -713,6 +713,7 @@ void TouchInputMapper::configureSurface(nsecs_t when, bool* outResetNeeded) {
 	tpOrientationConfig(&(mViewport.orientation));
 /********/
 
+	mViewport.orientation=DISPLAY_ORIENTATION_270;
         if (mDeviceMode == DEVICE_MODE_DIRECT || mDeviceMode == DEVICE_MODE_POINTER) {
             // Convert rotated viewport to natural surface coordinates.
             int32_t naturalLogicalWidth, naturalLogicalHeight;
```

