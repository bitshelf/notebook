---
tags: Ubuntu
---

## 禁用 ssh 后打印
### 方式一
```shell
touch ~/.hushlogin
```

### 方式二
```shell
sudo chmod -x /etc/update-motd.d/*
```

- 参考：[server - How to disable welcome message after SSH login? - Ask Ubuntu](https://askubuntu.com/questions/676374/how-to-disable-welcome-message-after-ssh-login)

##  禁用 ubuntu 升级检查
```shell
sudo apt remove update-manager
```
- 参考： [kill - How do I turn off automatic updates COMPLETELY and FOR REAL? - Ask Ubuntu](https://askubuntu.com/questions/1322292/how-do-i-turn-off-automatic-updates-completely-and-for-real)

## 设置主机名和主机解析
```shell
# 主机名
echo "RK3588" > /etc/hostname
# 主机 IP
echo "127.0.0.1 localhost" >> /etc/hosts
echo "127.0.0.1 RK3588" >> /etc/hosts
echo "127.0.0.1 localhost RK3588" >> /etc/hosts
```

## 禁用系统休眠
```shell
# 设置禁止休眠
systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target

# 查看休眠状态
systemctl status sleep.target
```
- Link：[基于 RK3588 构建 Ubuntu 22.04 根文件系统\_rk3588 ubuntu-CSDN博客](https://blog.csdn.net/qq_34117760/article/details/130909986?ops_request_misc=&request_id=&biz_id=102&utm_term=Ubuntu%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E6%9E%84%E5%BB%BA&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduweb~default-6-130909986.nonecase&spm=1018.2226.3001.4450)

## link
- [Adding a user to sudoers :: Fedora Docs](https://docs.fedoraproject.org/zh_Hans/quick-docs/adding_user_to_sudoers_file/)