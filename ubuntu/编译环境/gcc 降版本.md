---
tags: Ubuntu
---

# Ubuntu 降版本
#### 安装对应 gcc 版本
```shell
sudo apt-get install gcc-7 g++-7
```

#### 更改 gcc 版本
```shell
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 100
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 50
```

#### 查看是否更改成功
```shell
sudo update-alternatives --config gcc

  Selection    Path            Priority   Status
------------------------------------------------------------
* 0            /usr/bin/gcc-7   100       auto mode
  1            /usr/bin/gcc-7   100       manual mode
  2            /usr/bin/gcc-9   50        manual mode
```

```shell
$ man update-alternatives
 update-alternatives - maintain symbolic links determining default commands
```

---
## Link
- [The update-alternatives Command in Linux | Baeldung on Linux](https://www.baeldung.com/linux/update-alternatives-command)