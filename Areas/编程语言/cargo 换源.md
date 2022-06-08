---
tags: Rust
---

# cargo 换源
### 使用 rproxy 镜像加速下载
```shell
export RUSTUP_DIST_SERVER=https://rsproxy.cn
export RUSTUP_UPDATE_ROOT=https://rsproxy.cn/rustup
```

## 动态换源
```shell
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
export PATH=~/.cargo/bin:$PATH
export CARGO_HTTP_MULTIPLEXING=false
```

```shell
# 清华大学
RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup

# 中国科学技术大学
RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup

# 上海交通大学
RUSTUP_DIST_SERVER=https://mirrors.sjtug.sjtu.edu.cn/rust-static/
```
### 删除缓存
```shell
rm -rf  ~/.cargo/.package-cache # 不执行可能导致改源不生效
```


在 `~/.cargo/` 下新建一个文件 config 加入以下内容
```shell
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
[http]
check-revoke = false
```
#### 清华源
```shell
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
#replace-with = 'ustc'
replace-with = 'tuna'
 
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

```shell
# ~/.cargo/config

[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"

# 替换成你偏好的镜像源
replace-with = 'sjtu'

[net]

git-fetch-with-cli = true
# 以下任选之一
# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# 中国科学技术大学
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"

[registries.sjtu]
index = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"

# rustcc社区
[source.rustcc]
registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
```

## Link
- 字节 rust 源： [RsProxy](http://rsproxy.cn/)
- [Rust国内镜像](https://github.com/lencx/dev/discussions/51)