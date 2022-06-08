---
tags: SELinux Android
---

## SELinux Policy 语言介绍
- SELinux 中，每种东西都会被赋予一个安全属性，官方说法叫 Security Context

### 进程 SContext
```shell
ps -Z
```
- **u** 为 user 的意思。SEAndroid 中定义了一个 SELinux 用户，值为 u。
- **r** 为 role 的意思。role 是角色之意，它是 SELinux 中一种比较高层次，更方便的权限管理思路，即 Role Based Access Control（基于角色的访问控制，简称为 RBAC）。简单点说，一个 u 可以属于多个 role，不同的 role 具有不同的权限。RBAC 我们到最后再讨论。
- **init**，代表该进程所属的 Domain 为 init。MAC 的基础管理思路其实不是针对上面的 RBAC，而是所谓的 Type Enforcement Accesc Control（简称 TEAC，一般用 TE 表示）。对进程来说，Type 就是 Domain。比如 init 这个 Domain 有什么权限，都需要通过 allow 语句来说明。
- **S0** 和 SELinux 为了满足军用和教育行业而设计的 Multi-Level Security（MLS）机制有关。简单点说，MLS 将系统的进程和文件进行了分级，不同级别的资源需要对应级别的进程才能访问。后文还将详细介绍 MLS

### 文件 SContext
```shell
ls -Z
```

- **u**：同样是 user 之意，它代表创建这个文件的 SELinux user。
- **object_r**：文件是死的东西，它没法扮演角色，所以在 SELinux 中，死的东西都用 object_r 来表示它的 role。
- **rootfs**：死的东西的 Type，和进程的 Domain 其实是一个意思。它表示 root 目录对应的 Type 是 rootfs。
- **s0**：MLS 的级别

## TE 说明
- SContext 的核心其实是前三个部分：user:role:type
