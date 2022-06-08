---
tags: Vim
---

# Vim fzf
| Command | List |
| --- | --- |
| `Files [PATH]` | 普通文件查找 (similar to `:FZF`) |
| `GFiles [OPTS]` | git 文件查找 (`git ls-files`) |
| `GFiles?` | git 文件查找 (`git status`) |
| `Buffers` | buffer 文件切换 |
| `Colors` | Color schemes |
| `Ag [PATTERN]` | ag search result (`ALT-A` to select all, `ALT-D` to deselect all) |
| `Lines [QUERY]` | 加载的所有 buffer 里查找 |
| `BLines [QUERY]` | 在当前 buffer 里查找包含某关键词的行 |
| `Tags [QUERY]` | 以 Tag 查找 (`ctags -R`) |
| `BTags [QUERY]` | Tags in the current buffer |
| `Marks` | Marks |
| `Windows` | Windows |
| `Locate PATTERN` | `locate` command output |
| `History` | `v:oldfiles` and open buffers |
| `History:` | 命令历史查找 |
| `History/` | Search history |
| `Snippets` | Snippets (UltiSnips) |
| `Commits` | Git commits (requires fugitive. vim) |
| `BCommits` | Git commits for the current buffer |
| `Commands` | Commands |
| `Maps` | Normal mode mappings |
| `Helptags` | Help tags <sup id="a1"><a href="https://segmentfault. com/a/1190000016186540 #helptags " target="_blank">1</a></sup> |
| `Filetypes` | File types |