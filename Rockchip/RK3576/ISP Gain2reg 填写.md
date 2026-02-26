---
tags:
  - ISP/RK3576
---
模拟增益（Analog Gain，又称 Again）模数转换（A/D Conversion）之前，对电荷信号进行的放大处理
## Gain2reg 填写
以 AR0234 为例，找到模拟增益/数字增益和寄存器值的转换关系
![](assets/Pasted%20image%2020260203193806.png)

1. 由于模拟增益最大为 $16x$ ($2^4=16$), 以及推荐增益表，所以只用计算 $s=0,1,2,3$ 时候的增益
2. 可以得出 $1\sim16 x$ 是分段采用不同转换公式：
$$
\begin{aligned}
1-2x: reg = 32-32/gain \\
2-4x: reg = 48-64/gain  \\
4-8x: reg = 64-128/gain  \\
8-16x: reg = 80-256/gain  \\
\end{aligned}
$$

以 $8\sim 16x$ 计算为例
1. $s=3$, 所以计算公式使用
$$
\mathrm{fine~gain}=\frac{1}{1-\frac{\mathrm{INT}\left(\frac{t}{2}\right)}{16}}
$$
2. 代入公式为（$\mathrm{INT}\left (\frac{t}{2}\right)$表示对 t 除以 2 的结果取**整数部分**)

$$
\begin{aligned}
\mathrm{Total~analog~gain} 
&= \mathrm{coarse\_gain} \times \mathrm{fine\_gain} \\
&= 2^s \times \frac{1}{1-\frac{\mathrm{INT}\left(\frac{t}{2}\right)}{16}} \\
&= 2^3 \times \frac{1}{1-\frac{\mathrm{INT}\left(\frac{t}{2}\right)}{16}} \\

\end{aligned}
$$
经过变化之后
$$
\begin{aligned}
\mathrm{Total~analog~gain}  =  \frac{256}{32-t} \\
\mathrm{t} = 32 - \frac{256}{Total~analog~gain}
\end{aligned}
$$
3. 寄存器的值为, 由于 `coarse_gain` 的寄存器为 `R0x3060[6:4]`,所以需要左移 4 位（乘以 $2^4$）
$$
\begin{aligned}
reg &= 3 \times 2^4 + t \\
	&= 48 + 32 - \frac{256}{Total~analog~gain} \\
	&= 80 - \frac{256}{Total~analog~gain} \\
	&= 80-256/gain
\end{aligned}
$$
4. 计算 $C0$, $C1$, $M0$ 
$$
\begin{aligned}
reg &= (gain^{M0}) \times C1 - C0 + 0.5 = 80-256/gain \\
	&= gain^-1 \times (-256)-(-80) \\
\end{aligned}
$$
5. 所以得出 $M0=-1, C1=-256, C0=-80$, $0.5$ 可以做适应性修改
6. 最后得出全部 Gain2Reg 参数表

| 增益起始值 | 增益结束值 | 系数 C 1 | 系数 C 0 | 系数 M 0 | 起始寄存器值 | 结束寄存器值 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1.0** | **2.0** | -32.0 | -32.0 | -1.0 | 0 | 16 | 模拟增益区间 1 |
| **2.0** | **4.0** | -64.0 | -48.0 | -1.0 | 16 | 32 | 模拟增益区间 2 |
| **4.0** | **8.0** | -128.0 | -64.0 | -1.0 | 32 | 48 | 模拟增益区间 3 |
| **8.0** | **16.0** | -256.0 | -80.0 | -1.0 | 48 | 64 | 模拟增益区间 4 |
| **16.0** | **255.8752** | 128.0 | 0.0 | 1.0 | 2048 | 32752 | 数字增益区间 |

---
## link
![](assets/Pasted%20image%2020260204083842.png)

- AR0234 datasheet：![](assets/AR0234.zip)