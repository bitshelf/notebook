---
tags: Ubuntu
---

# Ubuntu keyring
- keyring 用于存储密码和加密密码，就像密码保险箱
- ![](assets/Keyring.jpg)
- 个人密码用登录密码进行加密，在开机输出登录密码后，每次登录应用时，keyring 会自动输入应用密码
- 当设置自动登录时，keyring 不会为应用自动输入密码，而是会要求解锁密码

## 禁用 Keyring
```shell
sudo apt install seahorse
```

在应用 seahorse 中改变登录密码，允许为空