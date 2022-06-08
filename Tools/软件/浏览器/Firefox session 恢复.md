---
tags:
  - Firefox
---
## 打开窗口恢复
1. 打开 Profiles 中的 sessionstore-backups 文件夹
2. [Session History Scrounger for Firefox (with lz4 support) — Fx File Utilities](https://www.jeffersonscher.com/ffu/scrounger.html)
## 文件夹说明
- previous. jsonlz 4：上一次 session 的窗口标签信息
- recovery. jsonlz 4：本次 session 的窗口标签信息
- recovery. baklz 4：recovery. jsonlz 4 的备份文件
- upgrade. jsonlz 4-$build_id：上一次 Firefox 版本更新时的 session 的窗口标签信息
          
        