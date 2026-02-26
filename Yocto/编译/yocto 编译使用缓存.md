---
tags:
  - yocto
---
## yocto 共享缓存
- 共享 `SSTATE_DIR` 时不推荐使用 `do_cleansstate`，共享 `DL_DIR` 时应避免使用 `do_cleanall`
```shell
#!/usr/bin/env bash

# Yocto shared cache configuration
# source: initialize if necessary, then export environment
# execute: initialize only

YOCTO_CACHE_DIR="/var/cache/yocto"
YOCTO_GROUP="yocto"

# 判断是否被 source
if [[ "${BASH_SOURCE[0]}" != "$0" ]]; then
    _yocto_sourced=1
else
    _yocto_sourced=0
fi

# 快速路径：目录已经可用
if (( _yocto_sourced )) &&
   [[ -d "$YOCTO_CACHE_DIR/downloads" &&
      -d "$YOCTO_CACHE_DIR/sstate-cache" &&
      -r "$YOCTO_CACHE_DIR/downloads" &&
      -w "$YOCTO_CACHE_DIR/downloads" &&
      -r "$YOCTO_CACHE_DIR/sstate-cache" &&
      -w "$YOCTO_CACHE_DIR/sstate-cache" ]]; then

    export DL_DIR="$YOCTO_CACHE_DIR/downloads"
    export SSTATE_DIR="$YOCTO_CACHE_DIR/sstate-cache"

    case " ${BB_ENV_PASSTHROUGH_ADDITIONS:-} " in
        *" DL_DIR "*) ;;
        *)
            BB_ENV_PASSTHROUGH_ADDITIONS="${BB_ENV_PASSTHROUGH_ADDITIONS:+$BB_ENV_PASSTHROUGH_ADDITIONS }DL_DIR"
            ;;
    esac

    case " ${BB_ENV_PASSTHROUGH_ADDITIONS:-} " in
        *" SSTATE_DIR "*) ;;
        *)
            BB_ENV_PASSTHROUGH_ADDITIONS="${BB_ENV_PASSTHROUGH_ADDITIONS:+$BB_ENV_PASSTHROUGH_ADDITIONS }SSTATE_DIR"
            ;;
    esac

    export BB_ENV_PASSTHROUGH_ADDITIONS

    unset _yocto_sourced
    return 0
fi

# 初始化路径：在子 Shell 中执行，避免 source 污染当前 Shell
_yocto_initialize() (
    set -euo pipefail

    local user="${SUDO_USER:-$(id -un)}"
    local dir="$YOCTO_CACHE_DIR"
    local group="$YOCTO_GROUP"

    if [[ "$user" == "root" ]]; then
        echo "错误：请以普通用户身份运行" >&2
        return 1
    fi

    # 用户组和权限初始化
    if ! getent group "$group" >/dev/null; then
        sudo groupadd "$group"
    fi

    if ! id -nG "$user" | grep -qw "$group"; then
        sudo usermod -aG "$group" "$user"
    fi

    # 检查 ACL 依赖
    if ! command -v setfacl >/dev/null 2>&1; then
        echo "Installing acl..."
        sudo apt-get update
        sudo apt-get install -y acl
    fi

    # 创建共享目录
    sudo install -d -o root -g "$group" -m 2770 \
        "$dir" \
        "$dir/downloads" \
        "$dir/sstate-cache"

    # 配置默认 ACL
    sudo setfacl -m d:g::rwx,d:m::rwx \
        "$dir" \
        "$dir/downloads" \
        "$dir/sstate-cache"

    echo "Yocto 共享缓存初始化完成"

    # ACL 验证仅在初始化时执行
    sudo getfacl -p "$dir/downloads" "$dir/sstate-cache"

    if [[ " $(id -nG) " != *" $group "* ]]; then
        echo "提示：请重新登录或执行 newgrp $group 使组权限生效"
    fi
)

if ! _yocto_initialize; then
    unset -f _yocto_initialize
    unset _yocto_sourced
    if [[ "${BASH_SOURCE[0]}" != "$0" ]]; then
        return 1
    else
        exit 1
    fi
fi

unset -f _yocto_initialize

# 初始化完成后，source 模式重新加载
if (( _yocto_sourced )); then
    unset _yocto_sourced
    source "${BASH_SOURCE[0]}"
else
    unset _yocto_sourced
fi
```