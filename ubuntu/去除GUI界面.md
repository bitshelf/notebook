---
tags: Ubuntu 
---

# 去除 ubuntu 界面
## 未卸载 GUI
![](assets/ubuntu%20带gui.png)

## 去除 GUI 界面
1. `sudo apt-get autoremove --purge lxde* -y`
2. `sudo  apt-get autoremove --purge gnome* -y`
3. `sudo systemctl set-default multi-user.target`

# Link & References
* <https://askubuntu.com/questions/86602/completely-remove-lxde-lubuntu-desktop-environment>
