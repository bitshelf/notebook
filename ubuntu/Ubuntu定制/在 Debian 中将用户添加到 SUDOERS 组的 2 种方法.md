---
tags:
  - Ubuntu
---
## SUDOERS 组
如果你将 root 帐户的密码保留为空，那么系统中的创建的第一个用户将拥有管理权限。但是，如果你设置了 root 密码，那么用户名将不具有 sudo 权限。因此，在使用用户帐户执行管理任务时，你可能会遇到以下类似的错误
```
<username> is not in the sudoers file. This incident will be reported.
```

### 把用户添加 sudoers 组
1. 使用以下命令切换到 root 用户
```shell
su -
```
2. 以 root 用户身份登录后，将普通用户添加到 sudoer 组
```shell
/sbin/addgroup arindam sudo

# or
usermod -aG sudo arindam
```

### 另一种方法 
1. 使用 root 账号登录, 修改 `/etc/sudoers` 文件，添加以下行和用户名
```shell
arindam    ALL=(ALL)    ALL
```

验证用户是否已成功添加到 SUDOERS 组
```shell
sudo -l -U arindam
```

## Link
- [在 Debian 中将用户添加到 SUDOERS 组的 2 种方法 \| LCTT x X-CMD](https://lctt.x-cmd.com/202307/20230623.0%20%E2%AD%90%EF%B8%8F%202%20Ways%20to%20Add%20Users%20to%20SUDOERS%20Group%20in%20Debian)