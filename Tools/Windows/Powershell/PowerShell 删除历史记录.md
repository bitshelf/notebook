---
tags: PowerShell
---

# PowerShell 删除历史记录
#### 获取历史记录文件
```powershell
(Get-PSReadlineOption).HistorySavePath
```

#### 修改历史记录补全文件
```powershell
code $env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
```

