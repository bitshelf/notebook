---
tags:
  - wireshark
---
## 避免以 root 身份运行

Wireshark 通过 `dumpcap` 工具实现数据包捕获，我们需要：
1. 将用户添加到 `wireshark` 组；
2. 为 `dumpcap` 设置网络捕获权限。

### 详细操作
1. 检查 `wireshark` 组是否存在：
    ```shell
    getent group wireshark  # 输出类似 "wireshark:x:123:user" 则存在
    ```
    若不存在，手动创建：
    ```shell
    sudo groupadd wireshark
    ```
    
2. 将当前用户添加到 `wireshark` 组：
    
    ```shell
    sudo usermod -aG wireshark $USER  # $USER 为当前用户名
    ```
    
3. 配置 `dumpcap` 的 capabilities：  
    通过 `setcap` 命令赋予 `dumpcap` 捕获网络数据包的权限（无需 root）：
    ```shell
    # 确认 dumpcap 路径（不同安装方式路径可能不同）
    which dumpcap  # 通常为 /usr/bin/dumpcap（包管理器安装）或 /usr/local/bin/dumpcap（源码安装）
     
    # 设置权限（cap_net_raw 允许原始套接字访问，cap_net_admin 允许管理网络接口）
    sudo setcap cap_net_raw,cap_net_admin=eip /usr/bin/dumpcap
    ```
-   `e`：有效权限，`i`：继承权限，`p`：允许进程设置用户 ID

## Link
- [Wireshark 在 Linux 上的全面使用指南：从入门到高级应用 — geek-blogs.com](https://geek-blogs.com/blog/wireshark-on-linux/)
- [Wireshark 在 Linux 系统中的安装与配置指南 — geek-blogs.com](https://geek-blogs.com/blog/wireshark-linux-install/)
- [Wireshark 在 Kali Linux 中的深度应用：从入门到高级网络分析 — geek-blogs.com](https://geek-blogs.com/blog/wireshark-kali-linux/)