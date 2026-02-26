---
tags:
  - SPDX
---
## SPDX
**软件包资料交换规范**（Software Package Data Exchange）简称SPDX，是软件材料表（SBOM）的开源标准。SPDX可以说明软件组件、软件许可、著作权、安全参考资料以及其他有关软件的元数据，其原始的设计目的是要提升许可证的兼容性，之后也增加了额外的使用例，像是供应链的透明度以及安全性。SPDX是由Linux基金会主持，由社群驱动的SPDX计划所撰写

## yocto 使能 spdx
```conf
# build/conf/local.conf
INHERIT += "create-spdx"
SPDX_PRETTY = "1"
SPDX_INCLUDE_SOURCES = "1"
SPDX_ARCHIVE_SOURCES = "1"
SPDX_ARCHIVE_PACKAGED = "1"
```

- 编译生成的目录：`build/tmp/deploy/spdx/`

## Link
- [What is SPDX (Software Package Data Exchange)?](https://sbom.observer/academy/learn/topics/spdx)