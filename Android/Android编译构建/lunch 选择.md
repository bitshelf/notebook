---
tags:
  - AOSP
---
## lunch 操作说明
```
TARGET_PRODUCT    TARGET_RELEASE     TARGET_BUILD_VARIANT
产品配置           发布配置            构建变体
```

lunch 格式
```shell
lunch <product_name>-<release_config>-<build_variant>

# 查看 lunch 后面的字符串
cat device/rockchip/rk3576/rk3576_u/AndroidProducts.mk
```

### TARGET_RELEASE
```shell
# TARGET_RELEASE 查看
ls build/release/aconfig/
```
- `trunk_staging` 主要用于开发和试验

## Link
- [构建 Android  \|  Android Open Source Project](https://source.android.com/docs/setup/build/building?hl=zh-cn)