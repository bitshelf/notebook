---
tags:
  - buildroot/OTA
---

# 搭建OTA 升级服务器
1. 安装 apache2

```shell
sudo apt install -y apache2
```

2. 设置 OTA 升级包存放位置

```shell:/etc/apache2/sites-enabled/000-default.conf
 #DocumentRoot /var/www/html ## 默认浏览器访问目录，注释掉
 DocumentRoot /home/linaro/swupdate ##修改为此目录，用户名请根据修改做修改
```

```shell:/etc/apache2/apache2.conf
#<Directory /var/www/html> ##配置文件默认目录，注释掉
<Directory "/home/linaro/swupdate"
```

3. 重启 Apache2 服务

```shell
systemctl restart apache2.service
```


## 设置开发板的 OTA 升级 URL
```shell
# 查看现有设置
fw_printenv swu_param

# 更新设置
fw_setenv swu_param "\-d \-uhttp://192.168.40.22/buildroot_t527_myd-lt527-core-ab.swu"

# 验证 OTA 升级包
wget http://192.168.40.22/buildroot_t527_myd-lt527-core-ab.swu

# 重启开发板，且服务器的 OTA 系统版本更新,则会自动升级
```





