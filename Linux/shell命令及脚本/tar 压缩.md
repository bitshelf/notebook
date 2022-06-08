---
tags: Linux 
---

## 分卷压缩
```shell
tar -czv <big_file.100g>  | split -b 2000m  - my_big_file.tar.gz
```

## 解分卷压缩
```shell
cat bigfile.tar.gz*  |  tar -xzv
cat *.tar.gz.* | tar xvfz -
gzcat sort.tar.gza[a-z] | tar xzvf -
```

---
## Link 
- [[7z分卷压缩与解压]]