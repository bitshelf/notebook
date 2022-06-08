---
tags: PowerShell
---

# powershell 环境变量

### 查看"用户变量"和"系统变量"中的 "PATH"
```powershell
# 查看环境变量
ls env:
# 用户变量
[environment]::GetEnvironmentvariable("Path", "User")
# 系统变量
 [environment]::GetEnvironmentvariable("Path", "Machine")
```
### 写入环境变量
```powershell
# 用户变量
[environment]::SetEnvironmentvariable("变量名称", "变量值", "User")

# 系统变量
[environment]::SetEnvironmentvariable("变量名称", "变量值", "Machine")
```