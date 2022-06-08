---
tags: Git
---

## 从版本库删除文件
```shell
git prune # 清除暂存区操作时引入的临时对象
```

```shell
git gc --prune=now
```

### 清理 reflog 提交记录
```shell
git reflog expire --expire=now --all
```

## git fsck
git fsck 可以看到有提交成为了未被关联的提交
```shell
git fsck
```