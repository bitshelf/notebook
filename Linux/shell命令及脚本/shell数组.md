---
tags: shell
---

## 判断值是否在数组中
#### 方式一
```shell
if echo "${ARR[@]}" | grep -w "item_1" &>/dev/null; then
    echo "Found"
fi
```

#### 方式二
```shell
if [[ "${arr[*]}" =~ ${var} ]]; then
# do something
fi
```

#### 方式三
```shell
[[ ${array[@]/${var}/} != ${array[@]} ]] && echo "Yes" || echo "No"
```

## 获取文件变量
### 获取文件扩展名
```shell
echo "${filename#*.}"
```