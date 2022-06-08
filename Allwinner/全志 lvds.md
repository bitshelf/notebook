---
tags: Allwinner
---

## lvds 数据格式设置
```c
 lvds_attr = <
            1 /*lvds_repack*/    //数据格式映射，1是vesa，0是jeida
            0 /*dual_port*/        //双8配置
            0 /*pn_swap*/
            0 /*port_swap*/
            0>; /*lane_reverse*/
```