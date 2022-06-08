---
tags: Windowns  PowerShell 
---

## wezterm 配置
- 路径：`~/.config/wezterm/wezterm.lua`
```lua
-- Windows settings
local wezterm = require 'wezterm'
enable_scroll_bar=true


return {
  font = wezterm.font 'JetBrains Mono',
  default_cwd = "E:\\Users\\rpdzkj\\Desktop",
  default_prog = {'C:\\Program Files\\PowerShell\\7\\pwsh.exe','-NoLogo' },
  set_environment_variables = {
    prompt = '$E]7;file://localhost/$P$E\\$E[32m$T$E[0m $E[35m$P$E[36m$_$G$E[0m ',
  },

}

```