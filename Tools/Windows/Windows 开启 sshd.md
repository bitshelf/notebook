---
tags:
  - Windowns/sshd
---
## 在 Windows 安装 sshd
1. 打开管理员终端
```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'

Name  : OpenSSH.Server~~~~0.0.1.0
State : NotPresent
```
输出如上则需要安装

```powershell
 Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
 
 # 安装确认
 Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'
 
 # 允许 SSH 端口
 New-NetFirewallRule -Name "SSH" -DisplayName "OpenSSH Server (sshd)" -Enabled True -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow
 
 # 启动 sshd
 Start-Service sshd
 # 开机自启
 Set-Service -Name sshd -StartupType 'Automatic'
```

- ssh 登录密码为微软邮箱账号密码

## 修改 ssh 登录使用 powershell
```powershell
(Get-Command pwsh).Source

New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name "DefaultShell" -Value "C:\Program Files\PowerShell\7\pwsh.exe" -PropertyType String -Force
```