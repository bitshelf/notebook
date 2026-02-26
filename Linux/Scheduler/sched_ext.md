---
tags:
  - sched_ext
---
## 内核配置
```shell
CONFIG_BPF=y
CONFIG_SCHED_CLASS_EXT=y
CONFIG_BPF_SYSCALL=y
CONFIG_BPF_JIT=y
CONFIG_DEBUG_INFO_BTF=y
CONFIG_BPF_JIT_ALWAYS_ON=y
CONFIG_BPF_JIT_DEFAULT_ON=y
CONFIG_PAHOLE_HAS_BTF_TAG=y
```

## Link
- [Linux 内核设计: Scheduler(7): sched_ext](https://hackmd.io/@sysprog/Hka7Kzeap/%2Fr1uSVAWwp)