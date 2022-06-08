---
tags:
  - winget
---
## winget 换国内源
```powershell
# 删除 Microsoft 官方源
winget source remove winget
winget source add winget https://mirrors.ustc.edu.cn/winget-source
```

- 恢复官方源
```powershell
winget source reset winget
winget source reset --force
```