# set alias
#Remove-Item alias:ls
#Remove-Item alias:cat
#Set-Alias ls lsd
#Set-Alias cat bat

#设置主题
#& ([ScriptBlock]::Create((oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\amro.omp.json" --print) -join "`n"))
Invoke-Expression (&starship init powershell)
 $env:ARSHIP_LOG="error"
#$ENV:STARSHIP_CONFIG = "$HOME\starship.toml"
#Import-Module -Name Terminal-Icons
#'Import-Module -Name Terminal-Icons' | Out-File -LiteralPath $PROFILE -Append -Encoding utf8

#set window title to current folder
$host.ui.RawUI.WindowTitle = Get-Location | Split-Path -leaf

#prevent altering the title
$location = Get-Location | Split-Path -leaf

# 配置 ctrl+→ 单个单词补全, → 整个补全
Set-PSReadLineKeyHandler -Chord "Ctrl+RightArrow" -Function ForwardWord
# bash 风格 Tab 补全
Set-PSReadlineKeyHandler -Key Tab -Function Complete
# tab menu 方式补全, 与上命令二选一
# Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete
# winget 补全

# For zoxide v0.8.0+
#Invoke-Expression (& {
#    $hook = if ($PSVersionTable.PSVersion.Major -lt 6) { 'prompt' } else { 'pwd' }
#    (zoxide init --hook $hook powershell | Out-String)
#})


if ($host.Name -eq 'ConsoleHost')
{
    Import-Module PSReadLine
}

# 设置PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
Set-PSReadLineKeyHandler -Key Tab -Function Complete

# 按下 Ctrl+e 移动到最后面(End)
Set-PSReadlineKeyHandler -Chord ctrl+e -Function EndOfLine

# 按下 Ctrl+a 移动到最前面(Begin)
Set-PSReadlineKeyHandler -Chord ctrl+a -Function BeginningOfLine



Register-ArgumentCompleter -Native -CommandName winget -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
        [Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = [System.Text.Utf8Encoding]::new()
        $Local:word = $wordToComplete.Replace('"', '""')
        $Local:ast = $commandAst.ToString().Replace('"', '""')
        winget complete --word="$Local:word" --commandline "$Local:ast" --position $cursorPosition | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
        }
}
$s = {
    param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameters)
    $services = Get-Service | Where-Object {$_.Status -eq "Running" -and $_.Name -like "$wordToComplete*"}
    $services | ForEach-Object {
        New-Object -Type System.Management.Automation.CompletionResult -ArgumentList $_.Name,
            $_.Name,
            "ParameterValue",
            $_.Name
    }
}
Register-ArgumentCompleter -CommandName Stop-Service -ParameterName Name -ScriptBlock $s

$NewConfiguration = @{
    '$schema' = 'https://aka.ms/PowerShell/Crescendo/Schemas/2021-11'
    Commands = @()
}

#$parameters = @{
#    Verb = 'Connect'
#    Noun = 'Android'
#    OriginalName = "D:/Program Files/platform-tools/adb.exe"
#}
##New-CrescendoCommand @parameters | Format-List *
#$NewConfiguration.Commands += New-CrescendoCommand @parameters
#$NewConfiguration | ConvertTo-Json -Depth 3 | Out-File .\adbt.json