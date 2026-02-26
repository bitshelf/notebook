---
tags:
  - Git/repo
---
## repo xml 文件更新
1. 导出 xml 文件：
```shell
.repo/repo/repo manifest -r -o local.xml
```
2. 把生成的 `local.xml` 文件放到 `.repo/manifests/`
3. 使用 `local.xml` 替换 `.repo/manifest.xml`
