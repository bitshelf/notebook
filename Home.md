---
tags:
  - ObsdianNavigation
aliases:
  - Navigation
---
## 🕐 最近更新

```base
filters:
  and:
    - file.ext == "md"
    - not:
        - file.basename.endsWith(".excalidraw")
        - file.inFolder("Tools/Obsidian/Excalidraw")
        - note.virtual == true
properties:
  file.name:
    displayName: 名称
  file.folder:
    displayName: 目录
  file.mtime:
    displayName: 更新时间
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
    limit: 20
    columnSize:
      file.name: 214
      file.folder: 258

```

## ✏️ Excalidraw 手绘图

```base
filters:
  and:
    - or:
        - file.ext == "excalidraw"
        - file.path.endsWith(".excalidraw.md")
        - file.path.endsWith(".excalidraw")
        - file.path.contains(".excalidraw")
formulas:
  display_name: link(file, file.basename.replace(".excalidraw", ""))
properties:
  formula.display_name:
    displayName: 名称
  file.folder:
    displayName: 目录
  file.mtime:
    displayName: 更新时间
views:
  - type: table
    name: Excalidraw 手绘图
    order:
      - formula.display_name
      - file.folder
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC
    limit: 10

```

## 🎨 Canvas 白板

```base
filters:
  and:
    - file.ext == "canvas"
formulas:
  display_name: 'link(file, file.basename.replace(".canvas", ""))'
properties:
  formula.display_name:
    displayName: 名称
  file.folder:
    displayName: 目录
  file.mtime:
    displayName: 更新时间
views:
  - type: table
    name: Canvas 白板
    order:
      - formula.display_name
      - file.folder
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC

```
