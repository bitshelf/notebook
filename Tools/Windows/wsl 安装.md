---
tags: Windowns
---

# wsl 安装
1. `wsl --install`
#### 启用适用于 Linux 的 Windows 子系统
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

#### 启用虚拟机功能, 后重启 Windows 系统
```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

#### 将 WSL 2 设置为默认版本
```powershell
wsl --set-default-version 2
```

