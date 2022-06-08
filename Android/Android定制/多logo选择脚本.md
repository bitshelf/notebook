---
tags: Android
---

# Android 多 logo 选择脚本
```shell
# choose logo
LOGO_DIR=vendor/logo_animation/
function build_logo {
        echo "======= comment when debug ======="
        echo "======= please choose logo ======="

        LOGO_ARRAY=( $(cd $LOGO_DIR && ls | sort))
        echo "${LOGO_ARRAY[@]}" | xargs -n 1 | sed "=" | sed "N;s/\n/. /"

        read -p "Please input num: " INDEX
        INDEX=$((${INDEX:-0} -1))
        LOGO_PATH=$LOGO_DIR${LOGO_ARRAY[$INDEX]}
        ln -f $LOGO_PATH/logo.bmp kernel/
        ln -f $LOGO_PATH/logo_kernel.bmp kernel/
        ln -f $LOGO_PATH/bootanimation.zip device/rockchip/common/bootshutdown/
}
```