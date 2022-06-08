---
tags: LTE  Network 
---

# AT command
* 名词释义
	* AT：ATtention
	* MT：Mobile Termination （可以理解为手机中的芯片）
	* TE：Terminal Equipment （除手机芯片外的其他部分）
	* TA：Terminal Adaptor（TE 与 MT 的适配层）

## AT 结构
![[Areas/网络通信/移动通信/attachments/AT-Command.excalidraw|100%]]

## AT Command 结构
![](assets/AT%20Command%20结构.png)
AT Command 的**扩展语法规则**(syntax rules of extended) 的命令

-   命令行前缀 “AT”：所有的AT Command都需要前置 “AT” 字符串，来标识这是一个 AT Command；

-   基础命令：没有前置 “+”的命令就是 _基础 AT Command_；
    
-   子参数：就是AT Command 的参数，**可以有零个、一个或者多个**，**使用 “=”将子参数传递给 AT Commnad**；
    
-   扩展命令：前置 “+” 的命令就是 _扩展命令_；
    
-   多个扩展指令之间，使用 “;” 分隔；
    
-   AT Command 的子参数可以是缺省值（即使有默认值），多个子参数之间使用 “,” 连接；
    
-   读命令：读命令会在AT Command **末尾添加 “?”**，它会根据一些状态值返回当前命令的**一个或多个子参数值**；
    
-   测试命令：测试命令会在AT Command **末尾添加 “=?”**，它会返回当前命令所有子参数的可能值；  
    （例如，我们忘记了这个参数应该怎样设置，可以先查询此参数可以设置哪些值，然后我们再进行设置）