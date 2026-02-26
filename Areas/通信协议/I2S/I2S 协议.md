---
tags:
  - I2S
---
## 一般的 $I^2S$
1. 比特时脉线 (BCLK: bit clock line)
        标准名称为"连续串列时脉 (Continuous Serial Clock, SCK)"[1],一般称为"比特时脉(bit clock, BCLK)"[2]
2. 字符选择线 (word select line)
        标准名称为"字符选择(word select, WS)"[1],一般称为"左右时脉(left-right clock,LRCLK)"[2]
        0表示左频道,1表示右频道[1]
        也称为"帧同步(Frame Sync, FS)线"[3]
3. 一条以上的复合数据线（SDATA: multiplexed data）
        标准名称为"串列资料线(Serial Data, SD)"[1],但也可称为SDATA, SDIN, SDOUT,DACDAT, ADCDAT..等