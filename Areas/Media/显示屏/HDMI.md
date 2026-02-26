---
tags: Display
---

# HDMI
#### 查看 HDMI 状态
```shell
cat /sys/kernel/debug/dw-hdmi/status
```
|     属性     | 释义                 |
|:------------:|:-------------------- |
|     Mode     | 当前的输出模式       |
|  Pixel Clk   | 当前输出的像素时钟   |
|   TMDS Clk   | 当前输出的HDMI符号率 |
| Color Format | 当前输出的颜色格式   |
| Color Depth  | 当前输出的颜色深度   |
|  Colorimery  | 当前输出的颜色标准   |
|EOTF|HDR信息|


## 热插拔
### 更新物理层状态
当内核检测到 HDMI 热插拔事件后，首先会通过 dw_hdmi_phy_update_hpd 函数更改 hdmi 的 phy 状态
```c
void dw_hdmi_phy_update_hpd(struct dw_hdmi *hdmi, void *data,
          bool force, bool disabled, bool rxsense)
{
  u8 old_mask = hdmi->phy_mask;

  if (force || disabled || !rxsense)
    hdmi->phy_mask |= HDMI_PHY_RX_SENSE;
  else
    hdmi->phy_mask &= ~HDMI_PHY_RX_SENSE;

  if (old_mask != hdmi->phy_mask)
    hdmi_writeb(hdmi, hdmi->phy_mask, HDMI_PHY_MASK0);
}
EXPORT_SYMBOL_GPL(dw_hdmi_phy_update_hpd);
```

### 检测连接器状态
drm驱动通过drm_helper_hpd_irq_event函数检测每一个connector的状态