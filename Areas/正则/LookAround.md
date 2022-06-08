---
tags: 正则 
---

# Lookahead
## (?=pattern)
* 肯定形式，使用 **括号 + 问号 + 等号**

> [!example] `a(?=b)`
> 当输入为 acab 时，匹配返回第 2 个 a

## (?!pattern)
* 否定形式，使用 **括号 + 问号 + 叹号**

> [!example] `a(?!b)`
> 当输入 acab 时，匹配返回第 1 个 a（只返回 a，而不是 ac）

# Lookbehind
## (?<=pattern)
* 肯定形式，使用 **括号 + 问号 + 小于号 + 等号**
> [!example] `(?<=a)b`
> 当输入字符串是 cbab 时，匹配返回第 2 个 b（只返回 b，而不是 ab）

## (?<!pattern)
* 否定形式，使用 **括号 + 问号 + 小于号 + 叹号**
> [!example] `(?<!a)b`
> 当输入字符串是 cbab 时，匹配返回第 1 个 b（只返回 b，而不是 cb）
# Link & References
* https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html