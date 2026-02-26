---
tags:
  - kdump
---
## 如何触发一个 dump
kdump 通常用于系统假死机（unresposive）和 panic, 也就是没有响应的情况，硬件问题导致的直接死机，kdump 无能为力

## kdump 触发条件有哪些
### 手动触发
```shell
# Sysrq
echo c > /proc/sysrq-trigger
```
- **NMI via IPMI**: ipmitool power diag
- NMI via virsh: virsh inject-nmi MyGuestName
- Beware of `kernel. unknow_nmi_panic=1`

### 自动触发
- Watchdog： Boot cmdline `nmi_watchdog=1`
- Softlockup: `sysctl kernel.softlockup_panic=1`
- Out Of memory: `sysctl vm.panic_on_oom=1`