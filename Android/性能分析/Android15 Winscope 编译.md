---
tags:
  - Winscope
---
## Android15 Winscope 编译
```shell
cd development/tools/winscope

# 使用国内镜像
npm config set registry https://registry.npmmirror.com

npm install
npm run build:prod
npm run start
```

## FAQ
注释掉家目录的 `~/.npmrc`
```shell
#lockfile=false
```
## Link
- [Title Unavailable \| Site Unreachable](https://source.android.com/docs/core/graphics/winscope/run?hl=zh-cn)