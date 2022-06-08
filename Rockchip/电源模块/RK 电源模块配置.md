---
tags:
  - Power
---

## RK PMIC rk806 需要依赖外部电源
```c
		vcc1-supply = <&vcc5v0_sys>;
		vcc2-supply = <&vcc5v0_sys>;
		vcc3-supply = <&vcc5v0_sys>;
		vcc4-supply = <&vcc5v0_sys>;
		vcc5-supply = <&vcc5v0_sys>;
		vcc6-supply = <&vcc5v0_sys>;
		vcc7-supply = <&vcc5v0_sys>;
		vcc8-supply = <&vcc5v0_sys>;
		vcc9-supply = <&vcc5v0_sys>;
		vcc10-supply = <&vcc5v0_sys>;
		vcc11-supply = <&vcc_2v0_pldo_s3>;
		vcc12-supply = <&vcc5v0_sys>;
		vcc13-supply = <&vcc_1v1_nldo_s3>;
		vcc14-supply = <&vcc_1v1_nldo_s3>;
		vcca-supply = <&vcc5v0_sys>;
```

- pmic rk 806 需要依赖的外部电源：vcc 5 v 0_sys、vcc_2 v 0_pldo_s 3、vcc_1 v 1_nldo_s 3，注意这三个电源的 dts 配置需要在最前面，否则可能出现开机的时候由于依赖的电源初始化太慢导致电源初始化异常，表现出来的问题是 cpu 的变频 dvfs 没有初始化成功，即 `cat /d/opp/opp_summary` 中没有 cpu 的频率信息

## Link 
- [Rockchip RK3588 kernel dts解析之电源模块\_rk806 一个\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/123496232)