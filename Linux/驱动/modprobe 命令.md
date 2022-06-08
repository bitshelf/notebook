---
tags: Linux
---

# modprobe 命令使用
- 模块名称中的 `_` 和`-` 没有区别，会自动执行下划线转换
- `modprobe` 在模块目录
```
/lib/modules/`uname -a`
```
中查找所有模块和文件

### 可选配置文件
- `/etc/modprobe.d/` 
- `/etc/modprobe.conf`