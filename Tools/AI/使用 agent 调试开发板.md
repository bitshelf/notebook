---
tags:
  - agent/embedded
---
## 调试环境搭建
![](assets/%E4%BD%BF%E7%94%A8%20agent%20%E8%B0%83%E8%AF%95%E5%BC%80%E5%8F%91%E6%9D%BF.excalidraw)

## agent 设备填写目标设备信息
```bash title:.target.conf
# CRITICAL: 192.168.1.189 is a PRODUCTION device.
# NEVER flash, reboot, or modify this device.
# It only provides ser2net bridge to the debug board.
#
# Dev Host (ser2net bridge + USB flashing host):
RK_DEV_HOST_IP=192.168.1.189
RK_DEV_HOST_USER=linaro
RK_DEV_HOST_PASS=
RK_SERIAL_PORT=2000

# Target debug board (DO NOT set static IP here):
# Connect via serial console: nc $RK_DEV_HOST_IP $RK_SERIAL_PORT
# Get target IP from serial: ip addr show lan1 | grep inet
# Flash via USB: ssh $RK_DEV_HOST_USER@$RK_DEV_HOST_IP upgrade_tool ...

# --- Serial Relay (hardware reset/MASKROM control) ---
# Device path for the USB serial relay (e.g., /dev/ttyUSB1)
RK_RELAY_DEVICE=/dev/ttyUSB1
# serial_relay binary path or name
RK_RELAY_BIN=serial_relay
# Relay channel for MASKROM (SARADC_IN1 / RECOVERY) pin control
RK_MASKROM_PORT=0
# Relay channel for RESET (SRST / POR) pin control
RK_RESET_PORT=1
```

## 烧录命令
```shell
# 如果为 MASKROM 模式，需要先烧录 MiniLoader
upgrade_tool db rk3576_loader.bin

# 烧录内核
upgrade_tool di -b boot.img
```