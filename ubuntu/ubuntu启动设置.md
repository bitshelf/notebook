---
tags: Ubuntu
---

# ubuntu 启动
1. 查看系统运行级别：`runlevel`
2. 查看 ubuntu 系统是否完全启动：`systemctl is-system-running`



| 结果           | 描述                                                                                                                                    | 退出状态码 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| *initializing* | Early bootup, before `basic.target` is reached or the `maintenance` state entered                                                       | $>0$       |
| *starting*     | Late bootup, before the job queue becomes idle for the first time, or one of the rescue targets are reached                             | $> 0$      |
| *running*      | The system is fully operational                                                                                                         | $0$        |
| *degraded*     | The system is operational but one or more units failed                                                                                  | $> 0$      |
| *maintenance*  | The rescue or emergency target is active                                                                                                | $> 0$      |
| *stopping*     | The manager is shutting down                                                                                                            | $> 0$      |
| *offline*      | The manager is not running. Specifically, this is the operational state if an incompatible program is running as system manager (PID 1) | $> 0$      |
|     *unknown*           | The operational state could not be determined, due to lack of resources or another error cause                                                                                                                                        |    $> 0$        |

# Link
* <https://www.freedesktop.org/software/systemd/man/systemctl.html>
