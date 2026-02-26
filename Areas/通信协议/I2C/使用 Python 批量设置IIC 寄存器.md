---
tags:
  - I2C/Python
---
## 使用 Python
```python
#!/usr/bin/env python3
import subprocess
import sys
import time

if len(sys.argv) < 2:
    print(f"用法: {sys.argv[0]} <寄存器文件>")
    sys.exit(1)

bus = 4
addr = 0x29
file_path = sys.argv[1]


with open(file_path, "r") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#"):
            continue

        parts = line.split()
        if len(parts) != 2:
            print(f"跳过格式错误的行: {line}")
            continue

        reg, value = parts
        cmd = [
            "i2cset",
            "-f",
            "-y", str(bus),
            hex(addr),
            reg,
            value,
            "b"
        ]
        print("执行:", " ".join(cmd))
        subprocess.run(cmd, check=True)
        time.sleep(0.01)
```