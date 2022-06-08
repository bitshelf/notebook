---
tags: Ubuntu
---

# Ubuntu 启动后呼吸灯闪烁
## systemd 配置文件
```config
# /lib/systemd/system/led.service
[Service]
ExecStart=/usr/bin/led
KillMode=process
Restart=on-failure
RestartPreventExitStatus=255

[Install]
WantedBy=multi-user.target
```

## rust 程序
```rust
use std::fs::File;
use std::io::Write;

#[allow(unused_must_use)]
fn main() -> std::io::Result<()> {
    let ledflash = b"3";
    let mut f = File::options().write(true).open("/proc/rp_power/led")?;
    f.write(ledflash);
    Ok(())

}
```
