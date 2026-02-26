---
tags:
  - ObsdianNavigation
---
# 🗂️ 任务看板
```base
filters:
  and:
    - 'file.hasProperty("status")'
    - 'file.ext == "md"'
views:
  - type: kanban
    name: 任务看板
    groupBy:
      property: note.status
      direction: ASC
    groupOrder:
      - 未开始
      - 进行中
      - 已完成
    order:
      - file.name
      - note.priority
      - note.due
  - type: table
    name: 任务清单
    order:
      - file.name
      - note.status
      - note.priority
      - note.due
      - file.folder
    sort:
      - property: note.status
        direction: ASC
    groupBy:
      property: note.status
      direction: ASC
    groupOrder:
      - 未开始
      - 进行中
      - 已完成
newItemFolder: Tasks
```
