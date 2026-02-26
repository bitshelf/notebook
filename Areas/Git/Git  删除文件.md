---
tags:
  - Git
---

# 核弹级选项: filter-repo

## 从所有提交中删除一个文件

```shell
sudo apt install git-filter-repo
```

```text
git filter-repo \
    --invert-paths \
    --path old/foo.bin \
    --path foo.bin \
    --path backup/foo.bin
```

## link

- [《Pro Git》](https://manateelazycat.github.io/2022/12/16/reading-pro-git/)
