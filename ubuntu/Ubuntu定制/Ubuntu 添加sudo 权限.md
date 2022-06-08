---
tags: Ubuntu
---

## 解决 `sudo: unable to resolve host`
> [! warning] sudo su root
> `sudo: unable to resolve host rpdzkj: Name or service not known`

修改 `/etc/hosts`，可以从其他 ubuntu 拷贝
```shell
  127.0.0.1   localhost
  127.0.1.1   rpdzkj

  # The following lines are desirable for IPv6 capable hosts
  ::1     ip6-localhost ip6-loopback
  fe00::0 ip6-localnet
  ff00::0 ip6-mcastprefix
  ff02::1 ip6-allnodes
  ff02::2 ip6-allrouters
```

## 无法切换 root 
> [!error] sudo su root
> `user is not in the sudoers file.  This incident will be reported`

```shell
usermod -aG sudo rpdzkj
# 切换到 root
sudo su root
```

> [!important] 说明
> 需要在 root 权限下操作，ubuntu 20 的调试串口默认为  root

## su root 失败
```shell
sudo passwd # 设置密码
```


## Link
- [Linux: 'Username' is not in the sudoers file. This incident will be reported - Stack Overflow](https://stackoverflow.com/questions/47806576/linux-username-is-not-in-the-sudoers-file-this-incident-will-be-reported)