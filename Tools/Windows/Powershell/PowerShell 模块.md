---
tags: PowerShell
---

# PowerShell 安装模块
## 查看模块全名
```powershell
find-psresource  Microsoft.PowerShell.Crescendo | install-psresource
# or
find-module Microsoft.PowerShell.Crescendo | Install-Module
```

## Get installed modules and available modules
```powershell
Get-Module -ListAvailable
```

## 查看模块提供的命令
```powershell
 Get-Command -Module Microsoft.PowerShell.Crescendo
```
