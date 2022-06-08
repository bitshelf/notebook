---
tags: Rust Linux
---
# cargo
## cargo install 
```shell
cargo install [options] crate... 
cargo install [options] --path path 
cargo install [options] --git url [crate...] 
cargo install [options] --list

# 卸载
 cargo uninstall [options][spec...]
```
-   git url：用于安装指定 crate 的 Git URL。
-   branch branch：从 git 安装时使用的分支。
-   tag tag：从 git 安装时使用的tag。
-   rev sha：从 git 安装时使用的修订版本号。
-   path path：要安装的本地 crate 的文件系统路径。
-   list：列出所有已安装的软件包及其版本。
-   f，--force：强制覆盖现有的 crate 或二进制文件。
-   no-track：默认情况下，Cargo 使用存储在安装根目录中的元数据文件跟踪已安装的包。该标志告诉 Cargo 不要使用或创建该文件。
-   bin name...：仅安装指定的二进制文件。
-   bins：仅安装二进制文件。
-   example name...：仅安装指定的示例文件。
-   examples：仅安装示例文件。
-   root dir：指定包安装到的目录。
-   registry registry：要使用的注册表的名称。
-   index index：要使用的注册表索引的 URL。
-   features features：要激活的特性列表，以空格或逗号分隔。
-   all-features：激活所选包的所有特性。
-   no-default-features：不要激活所选包的默认特性。
-   target triple：为给定的架构安装。 默认为主机架构。 三元组的一般格式是arch-sub-vendor-sys-abi。
-   target-dir directory：生成的编译文件和中间文件的目录。
-   debug：使用开发配置文件而不是发布配置文件进行构建。

## cargo 更新二进制文件
```shell
cargo install cargo-update
cargo install-update --all
# or
cargo install-update -a
```

