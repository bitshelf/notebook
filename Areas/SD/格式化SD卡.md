---
tags:
  - SD
---

# 系统识别到 SD 卡，但 `df -h` 没有 SD 卡信息
尝试解决办法： `mkdosfs -F 32 /dev/mmcblkX`
