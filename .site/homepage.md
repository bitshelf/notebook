---
title: 首页
unlisted: true
---

## 🕐 最近更新

```base
filters:
  and:
    - 'file.ext == "md"'
    - 'file.basename != "index"'
    - not:
        - 'file.basename.endsWith(".excalidraw")'
        - 'file.inFolder("Tools/Obsidian/Excalidraw")'
        - 'note.virtual == true'
views:
  - type: table
    name: 最近更新
    order:
      - file.name
      - file.folder
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC
    limit: 10
properties:
  file.name:
    displayName: 名称
  file.folder:
    displayName: 目录
  file.mtime:
    displayName: 更新时间
```

## ✏️ Excalidraw 手绘图

```base
filters:
  and:
    - or:
        - 'file.ext == "excalidraw"'
        - 'file.path.endsWith(".excalidraw.md")'
        - 'file.path.endsWith(".excalidraw")'
        - 'file.path.contains(".excalidraw")'
properties:
  file.name:
    displayName: 名称
  file.folder:
    displayName: 目录
  file.mtime:
    displayName: 更新时间
views:
  - type: table
    name: Excalidraw 手绘图
    order:
      - file.name
      - file.folder
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC
```

## 🎨 Canvas 白板

```base
filters:
  and:
    - file.ext == "canvas"
properties:
  file.name:
    displayName: 名称
  file.folder:
    displayName: 目录
  file.mtime:
    displayName: 更新时间
views:
  - type: table
    name: Canvas 白板
    order:
      - file.name
      - file.folder
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC
```

