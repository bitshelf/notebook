---
tags:
  - rsync
---
## rsync 删除文件
```shell
mkdir /tmp/empty_dir/
rsync -r --delete-before --stats --progress /tmp/empty_dir/ xxx_target/
```
- **`/tmp/empty_dir/` (源目录)**：必须是一个**完全空**的目录
- `--delete-before` 先删除目标目录中所有源目录没有的文件

## find 删除文件
```shell
find ./ -xdev -mindepth 1 -delete -print
```