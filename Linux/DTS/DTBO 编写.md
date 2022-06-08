---
tags:
  - DTBO
---
## 使用标签 label
- 为了允许对编译时不存在的节点进行未定义的引用，叠加 DT .dts 文件的头文件中必须带有 /plugin/ 标签
```dts
/dts-v1/;
/plugin/;
```

- `/dts-v1/；` 将这个 dts 文件版本标识为 *V 1*
- 没有此标记的 dts 文件将被 dtc 视为过时的版本 0，
- 除了其他小但不兼容的更改之外，它还使用不同的整数格式

## link 
- [Google Android DTO 语法](https://source.android.com/docs/core/architecture/dto/syntax?hl=zh-cn)