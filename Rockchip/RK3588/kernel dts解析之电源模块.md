---
tags:
  - Rockchip
---
## 外部电源
外部电源是指 pmic 依赖的电源，在 dts 置的时候这些电源的配置需要在 pmic 的配置前面，这样开机是才能正常初始化，否则可能出现 CPU 电源异常的问题，表现为 CPU 变频无法正常使用，`cat /d/opp/opp_summary` 里面没有 cpu 的频率信息
```c
		//下面是pmic rk806需要依赖的外部电源：vcc5v0_sys、vcc_2v0_pldo_s3、vcc_1v1_nldo_s3，注意这三个电源的dts配置需要在最前面，否则可能出现开机的时候由于依赖的电源初始化太慢导致电源初始化异常，表现出来的问题是cpu的变频dvfs没有初始化成功，即cat /d//opp/opp_summary中没有cpu的频率信息。
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