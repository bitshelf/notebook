---
tags: Windowns 
---

1. 新建 `hyper-v.cmd` 文件
2. 右键-显示更多选项-编辑
3. 输入以下代码
```powershell
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```
4. 右键-以管理员权限运行
