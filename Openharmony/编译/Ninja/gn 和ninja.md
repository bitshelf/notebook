---
tags: GN ninja
---

# GN 和 ninja
GN 的全称为 Generate Ninja（生成 Ninja）
* 不同于 `make`，`gn` 仅完成了工作的一半
* `gn gen` 接受所有配置选项，并作出所有决定。它是即所做的工作是在构建目录下生成 `.ninja` 文件
* `ninja` 运行命令进行编译和链接等操作。它处理增量构建和并行性。这一步是您每当改变源文件时都要做的
* Ninja 总是在构建目录中运行。Ninja 的所有命令都从构建目录的根目录运行。通常的情况是 `ninja -C build-dir`
* GN 代码有_规定的缩进和格式化风格_（one true indentation and formatting style）。`gn format` 命令将有效 GN 代码语法上重新格式化为规范风格

## 源路径和
GN 使用 POSIX 风格路径（path）（总以字符串表示），它们既用于文件，也用于提及 GN 定义的实体。路径可以是相对的，即路径的表示是相对于包含 `BUILD.gn` 文件目录的。他们也可以是“绝对于源的（source-absolute）”，即相对于源工作区。绝对于**源**的路径在 GN 中以 `//` 开头

预定义的变量用于在源路径上下文中定位构建目录的部分
* `$root_build_dir` 是构建目录本身
* `$root_out_dir` 是针对当前工具链的子文件夹，是所有“顶层”目标的去向。在许多 GN 构建中，所有可执行文件和库都在这里
* `$target_out_dir` 是 `$root_out_dir` 的子文件夹，针对由当前 `BUILD.gn` 内标签构建的文件。这是目标文件的去向
* `$target_gen_dir` 是推荐的用于存放生成代码的相应位置
* `$root_gen_dir` 是存放该子文件夹外所需生成代码的位置
## GN 标签
* GN 标签是我们引用在 `BUILD.gn` 文件中定义的内容的方式。它们基于源路径，并且总是出现在 GN 字符串之内 GN 标签的完整语法是 `"dir:name"`，其中 `dir` 部分是命名了特定 `BUILD.gn` 文件的源路径
* `name` 指在该文件中使用 `target_type("name") { ... }` 定义的目标。简而言之，您可以定义一个名称与其所在目录名称相同的目标。无 `:` 部分的标签 `"//path/to/dir"` 是 `"//path/to/dir:dir"` 的略写

## 依赖图和 `BUILD.gn` 文件
* 每个目标必须被命名为其他某个目标的依赖才能被构建
* 可以在 `ninja` 命令行中指定单个目标以显式地构建它们。否则它们在图中一定来自于 `//:default` 目标（位于根目录文件 `BUILD.gn` 中，命名为 `default` ）

## GN 表达式语言和 GN 作用域
GN 是简单的动态类型的命令式语言，其最终目的只是产生声明性的 Ninja 规则
* GN 值可以使用下列几种类型的任何一种：
	-   布尔型（boolean），或 `true` 或 `false`
	-   整型（integer），带符号，使用普通十进制语法；不常用
	-   字符串（string），总是使用"双引号"引住（注意下面关于 `$` 的扩展）
	-   域（scope），使用花括号括住 `{ ... }`；见下。
	-   值列表（list of values），使用方括号括住：`[ 1, true, "foo", { x=1 y=2 } ]`是一个四元素列表
- 值是动态类型的，因而没有隐式类型的强迫，但也就没有这样的类型检查。不同类型的值比较结果永不相等，但是比较它们并不是错误
- GN 语言所做的实际上就是使用 `=` 进行命令式赋值，并通过 `+=` 进行修改
- 每个文件在内部都表示为一个域，并且没有全局域。共享“全局域”可以定义在 `.gni` 文件中，并在它们被使用的地方导入（`import("//path/to/something.gni")`）。每个 `.gni` 文件在每个工具链（toolchain）中处理一次，然后结果域被复制到导入文件的域中

# Link
* [GN 介绍 - Fuchsia OS 中文社区](https://fuchsia-china.com/docs/zh-hans/concepts/build_system/intro/)