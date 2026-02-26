---
tags:
  - bitbake
---
## bitbake 连不上服务端
> [!error]
> NOTE: Reconnecting to bitbake server...

```shell
bitbake -m

pkill -f "bitbake"

rm  bitbake.lock
rm  bitbake.sock
```
- `bitbake.lock` 在 lock 目录下面