---
tags: PowerShell
---

# powershell 帮助命令

> [!info] Get 
>Get 命令不区分大小写

1. `Get-command` 查看所有命令命令（动词-名词）
2. 查看可以做的动作 `Get-Verb`
3. 查看*Get-Content* 命令帮助：`Get-Help -Name Get-Content`
4. 查看*Get-Content* 的使用例子：`Get-Help Get-Content -Examples`
5. 特定内容查询：`Get-Help Cmdlet_Name -xxx`
	1. `-Full` : 标准版+参数、输入、输出
	2. `-Detailed` : 标准版+参数
	3. `-Examples` : 示例说明
	4. `-Online` : 打开网页帮助文档
	5. `-Parameter` : 指定参数名称
## 命令筛选
1. 列出所有以名词**J**开头的 Cmdlet：`Get-Command -Noun J*`
2. 列出所有动词是 *Get*，名词是*C* 开头的 Cmdlet：`Get-Command -Verb Get -Noun C*` 
3. 检查一个执行程序的属性与方法，并按照类型刷选
~~~powersehll
Get-process ThisProcessName |Get-Member -MemberType TypeName
Get-Process Calculator |Get-Member -MemberType Property
~~~
## 更新帮助文档
1. `Update-Help`
2. 更新更全的英文帮助文档：`Update-Help -UICulture en-US`
# 一些例子
4. 获取命令的位置：`Get-Command command-name`
5. 停止进程：
	~~~powershell
	Stop-Process
    [-Id] <Int32[]>
    [-PassThru]
    [-Force]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]
	~~~

---
# 相关连接
- [PowerShell Community](https://devblogs.microsoft.com/powershell-community/)
* 中文帮助：< https://docs.microsoft.com/zh-CN/powershell/scripting/learn/ps101/02-help-system?view=powershell-7.2>
<iframe 
    height = 400
    width = 100%
    src="https://docs.microsoft.com/zh-CN/powershell/scripting/learn/ps101/02-help-system?view=powershell-7.2">
</iframe>
* < https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process?view=powershell-7.2>
<iframe 
    height = 400
    width = 100%
    src="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process?view=powershell-7.2">
</iframe>