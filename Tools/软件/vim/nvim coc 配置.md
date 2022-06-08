---
tags:
  - vim/coc
---

## nvim coc json 配置
- 配置文件目录： `nvim/coc-settings.json`
- 进入插入模块即触发自动补全
```json
"suggest.triggerAfterInsertEnter": true,
```
- 保留使用当前的 `completeopt`
```json
"suggest.keepCompleteopt": true,
```
- 让 vim 弹出预览窗口
```json
"suggest.enablePreview": true
```
- 设置最少补全触发字符数
```json
"suggest.minTriggerInputLength": 2
```

## link 
- [coc.cnx](https://unpkg.com/coc.nvim@0.0.77/doc/coc.cnx)