---
tags:
  - wireshark
---
# Windows wireshark 远程抓包 Linux 
![](assets/Pasted%20image%2020260228111732.png)

1. 启动 Wireshark：在主界面的接口列表中找到 "SSH remote capture"（sshdump），点击其旁边的齿轮图标进行配置。
2. 配置服务器 (Server) 选项卡：
    - 输入远程 Linux 主机的 IP 地址和 SSH 端口（默认为 22）

3. 配置认证 (Authentication) 选项卡：
    - 输入远程主机的用户名。
    - 可以使用密码认证，但更推荐使用 SSH 私钥。
    - 注意：在 Windows 上使用私钥时，必须确保 NTFS 权限正确（仅限当前用户读取），否则 SSH 会因权限过大而拒绝使用。

4. 配置捕获 (Capture) 选项卡：
    - Remote interface：填写 Linux 上的网卡名称（如 `eth0` 或 `ens33`）。
    - Remote capture command：通常保持默认。sshdump 会在远程执行类似 `tcpdump -U -w -` 的命令。
    - 重要标志：确保使用 `-U` 标志，它可以让数据包在捕获瞬间即发送到本地，实现实时显示。
- 开始抓包：点击“Start”，Wireshark 将建立 SSH 隧道并将远程流量实时导入本地窗口

