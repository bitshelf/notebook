---
tags:
  - MCP
---
## 设计要求
1. **单连接**：仅一个进程（单例）连接 Dev Host `ser2net`,避免互相排挤掉线
2. **多 Agent 隔离**：每个 Claude Code Agent 通过 Unix socket 独立交互串口，互不干扰
3. **按周期日志**：自动检测启动周期（U-Boot SPL）→ 切换日志；断开连接 → 结束周期。一次上电→掉电对应一个日志文件
4. **状态栏不闪烁**：带滞后的防抖状态切换；statusline 仅读取缓存文件（<10 ms）
5. **自动登录**：识别启动完成（login 提示），自动发送配置的登录凭据
6. **挂死检测**：无输出超时 + 滞后判断 → `DUT-off` 状态 → Agent 状态栏反馈
7. **U-Boot 中断**：检测 autoboot 倒计时 → 自动发送 Ctrl-C 停留在 U-Boot 提示符
8. **崩溃识别**：Kernel panic/BUG/Oops 检测 → 通过状态栏告警

## 参考实现
### lava_dispatcher
- `lava_dispatcher/connections/serial.py` — 串口连接管理
- `lava_dispatcher/actions/boot/uboot.py` — U-Boot 交互动作
- `lava_dispatcher/utils/serial.py` — 串口工具函数
- `lava_common/constants.py` — 提示符配置
- [GitHub - Linaro/lava: Read only mirror https://gitlab.com/lava/lava · GitHub](https://github.com/Linaro/lava)

### labgrid
```
SerialDriver(ConsoleExpectMixin, Driver, ConsoleProtocol)
  ├─ 底层: pyserial (serial.Serial / serial.rfc2217)
  ├─ _read(size, timeout, max_size)  → 调用 serial.read()
  ├─ _write(data)                    → 调用 serial.write()
  └─ 由 ConsoleExpectMixin 提供高级接口:
       ├─ read(size, timeout)
       ├─ write(data)           支持 txdelay 逐字节延迟
       ├─ sendline(line)        发送行
       ├─ sendcontrol(char)     发送控制字符 (Ctrl-C, Ctrl-D 等)
       ├─ expect(pattern, timeout)  → PtxExpect (pexpect 兼容的 prompt 匹配)
       └─ settle(quiet_time, timeout) → 等待静默期，超时无新输出=板卡稳定
```
- [GitHub - labgrid-project/labgrid: Embedded systems control library for development, testing and installation · GitHub](https://github.com/labgrid-project/labgrid)

### rust MCP
- [GitHub - Adancurusul/serial-mcp-server: A comprehensive MCP server for serial port communication · GitHub](https://github.com/Adancurusul/serial-mcp-server)