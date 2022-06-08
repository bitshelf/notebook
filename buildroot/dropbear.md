---
tags: [command,buildroot]
---
# 开发板配置文件
* 目录：`/etc/dropbear`
* 手动生成配置文件
	~~~shell
	dropbearkey -t TYPE -f dropbear_TYPE_host_key -s SIZE
	dropbearkey -t rsa -s 4096 -f key
	~~~
* `-t TYPE` : 秘钥配置文件的类型，一般有 rsa,dss,ecdsa 等
*  `-f dropbear_TYPE_host_key` : 指定该 TYPE 加密类型的配置文件的存放路径
* `-s SIZE` ：指定加密的位数，默认情况下 rsa 为 1024，最多 4096 只要是 8 的倍数即可，ecdsa 默认为 256，长度限制为 112-571
# 使用方法
1. 使用 ssh 登录该主机
~~~shell
ssh username@host
~~~
2. 使用**dbclient**登录其他主机
~~~shell
dbclient username@host
~~~
# buildroot 配置
1. `buildroot/configs/rockchip/network.config` 配置项所在文件
2. `make dropbear-dirclean && make dorpbear=rebuild` 重新编译
3. 生成文件所在目录：`buildroot/output/rockchip_rk3568/target/usr/bin`
---
# Link & Refrences
1. <https://linux.die.net/man/8/dropbear>