---
tags: I2C
---

# I2C 设备
#### 查看系统上$I^2C$ 设备
```shell
ls /dev/i2c*
#或者
ls /sys/bus/i2c/devices
```

## 内核集成 $I^2C$驱动
```shell
Device drivers --->
        I2C support  --->
            <*> I2C support
                [*]   Enable compatibility bits for old user-space
                <*>   I2C device interface
                <*>   I2C bus multiplexing support
                        Multiplexer I2C Chip support  --->
                [*]   Autoselect pertinent helper modules
                        I2C Hardware Bus support  --->
                            <*> Atmel AT91 I2C Two-Wire interface (TWI)
                            <*> GPIO-based bitbanging I2C
```

