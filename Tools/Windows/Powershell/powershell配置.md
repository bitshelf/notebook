---
tags: PowerShell
---

# powershell $PROFILE
```powershell
## region base
#Set-StrictMode -Version 3.0
#function prompt {
#    "$pwd`n>>>"
#}
##endregion
#set window title to current folder
#$host.ui.RawUI.WindowTitle = Get-Location | Split-Path -leaf

# set alias
#Remove-Item alias:ls
#Remove-Item alias:cat
Set-Alias ls lsd
New-Alias vim nvim
New-Alias vi nvim
New-Alias notepad notepad++
#Set-Alias cat bat


#prevent altering the title
#$location = Get-Location | Split-Path -leaf

# 配置 ctrl+→ 单个单词补全, → 整个补全
#Set-PSReadLineKeyHandler -Chord "Ctrl+RightArrow" -Function ForwardWord
# bash 风格 Tab 补全
#Set-PSReadlineKeyHandler -Key Tab -Function Complete

# Get-PSReadLineOption
Set-PSReadLineOption -PredictionViewStyle ListView -BellStyle None -EditMode Emacs
Set-PSReadLineKeyHandler -Key 'Ctrl+z' -Function Undo
# Import-Module CompletionPredictor

# 设置PSReadLine
#Set-PSReadLineOption -PredictionSource History
#Set-PSReadLineOption -PredictionViewStyle ListView
# Set-PSReadLineOption -EditMode Windows
#Set-PSReadLineOption -EditMode Emacs
#Set-PSReadLineKeyHandler -Key Tab -Function Complete

## 按下 Ctrl+e 移动到最后面(End)
#Set-PSReadlineKeyHandler -Chord ctrl+e -Function EndOfLine

## 按下 Ctrl+a 移动到最前面(Begin)
#Set-PSReadlineKeyHandler -Chord ctrl+a -Function BeginningOfLine
#Set-PSReadlineKeyHandler -Chord ctrl+f -Function NextWord
#Set-PSReadlineKeyHandler -Chord ctrl+p -Function PreviousHistory
#Set-PSReadlineKeyHandler -Chord ctrl+n -Function NextHistory
#Set-PSReadlineKeyHandler -Chord ctrl+b -Function BackwardWord

Import-Module PSCompletions
# tab menu 方式补全, 与上命令二选一
# Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete

# argc-completions
#Set-Alias ch chezmoi # 设置 chezmoi 别名
$argc_scripts = @("gh", "chezmoi", "adb")
$PSCompletions.argc_completions($argc_scripts)

#carapace _carapace | Out-String | Invoke-Expression
#uv generate-shell-comletion powershell | Out-String | Invoke-Expression

#设置主题
#& ([ScriptBlock]::Create((oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\amro.omp.json" --print) -join "`n"))
Invoke-Expression (&starship init powershell)
# $ENV:STARSHIP_CONFIG = "$HOME\starship.toml"
# Import-Module -Name Terminal-Icons
```