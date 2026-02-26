---
tags:
  - mipi
---
## 获取 mipi 指令的个数
```shell
#!/bin/bash
# 用法: ./count_fields_dec_hex.sh input.txt

while IFS= read -r line; do
	 # 去掉前后空白
    line_trim=$(echo "$line" | xargs)
    # 跳过空行和 # 开头的行
    [[ -z "$line_trim" || "$line_trim" == \#* ]] && continue

    # 统计字段数（十进制）
	count=$(echo "$line_trim" | wc -w)
    # count=$(echo "$line" | wc -w)
    # 转换为十六进制 (大写)
    hex=$(printf "%02X" "$count")

    # 输出: 十进制(十六进制) 原始内容
    # echo -e "\033[1;31m${count}(0x${hex})\033[0m $line"


    echo -e "29 00 ${hex} $line"
done < "$1"
```