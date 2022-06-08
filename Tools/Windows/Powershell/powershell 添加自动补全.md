---
tags: PowerShell
---

# powershell adb 自动补全
```
Register-ArgumentCompleter -Native -CommandName adb  -ScriptBlock {
	param($wordToComplete, $commandAst, $cursorPosition)
 	[Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = [System.Text.Utf8Encoding]::new()
	$list={devices pull}
	$tip={"devices","pull","shell","root","remount"}
	$list | ForEach-Object {
           [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
        }
}
```
# powershell 自动补全
```powershell
# Function that will be registered with the command
function Cmd {
    Param(
        [string] $Param
    )

    Write-Host "Param: $param"
} 

# The code that will perform the auto-completion
$scriptBlock = {
    # The parameters passed into the script block by the
    #  Register-ArgumentCompleter command
    param(
        $commandName, $parameterName, $wordToComplete,
        $commandAst, $fakeBoundParameters
    )

    # The list of values that the typed text is compared to
    $values = 'abc','adf','ghi'

    foreach ($val in $values) {
        # What has been typed matches the value from the list
        if ($val -like "$wordToComplete*") {
            # Print the value
            $val
        }
    }
}

# Register our function and auto-completion code with the command
Register-ArgumentCompleter -CommandName Cmd `
 -ParameterName Param -ScriptBlock $scriptBlock

```

# Link
- [Register-ArgumentCompleter (Microsoft.PowerShell.Core) - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/register-argumentcompleter?view=powershell-7.2)
- [Custom PowerShell tab-completion for a specific command? - Stack Overflow](https://stackoverflow.com/questions/33497205/custom-powershell-tab-completion-for-a-specific-command)