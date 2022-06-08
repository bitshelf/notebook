---
tags: Rust Windowns Linux
---

# cargo 配置
## cargo 配置文件目录
-  `/.cargo/config.toml`
-  `$CARGO_HOME/config.toml` 默认是 :
	- Windows: `%USERPROFILE%\.cargo\config.toml`
	- Unix: `$HOME/.cargo/config.toml`

## cargo install 
- 更改安装程序路径
```toml
# ~/.cargo/config

[install]
root = "seventh/loh90/.config/cargo/"
```

