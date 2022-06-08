---
tags:
  - winget
---
## 忽略 BeyondCompare 升级
```powershell
winget pin add --id  ScooterSoftware.BeyondCompare4 --blocking
```
- 阻止 `winget upgrade --all` 或 `winget upgrade <package>` 升级软件包，需要取消固定包才能让 WinGet 执行升级

```powershell
winget pin add powertoys
```
- 不允许 `winget upgrade --all` 软件包，但允许 `winget upgrade <package>`
- 可以使用 `--include-pinned` 升级软件包