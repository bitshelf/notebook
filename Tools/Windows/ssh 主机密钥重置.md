---
tags:
  - Winscope
---
## 密码重置
```powershell
ssh-keygen -R "[192.168.1.148]:35520" -f "$env:USERPROFILE\.ssh\known_hosts"

ssh-keygen -R 192.168.1.148
```

### Linux ssh 主机密钥重置
```shell
ssh-keygen -R '[192.168.1.148]:35520' -f ~/.ssh/known_hosts

ssh-keygen -R 192.168.1.148
```