---
tags: Linux command
---

# xargs
```shell
# 使用 echo 验证
ls | xargs -I GG echo "mv GG prefix_GG"

ls | xargs -I GG mv GG prefix_GG
```
- `-I`参数是查找替换符，这里我们用`GG`替代`ls`找到的结果