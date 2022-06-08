---
tags: Ubuntu
---

# Ubuntu 休眠
```shell
$ cat /sys/power/state
freeze mem
```

```shell
echo freeze | sudo tee /sys/power/state
echo mem | sudo tee /sys/power/state
```