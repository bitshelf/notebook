---
tags:
  - lockup
---
## softlockup 软死锁
> softlockups are bugs that cause the kernel to loop in kernel mode for more than 20 seconds, without giving other tasks a chance to run. The current stack trace is displayed upon detection and the system will stay locked up.

- 例如持有 spinlock 之后在临界区花了太长时间
## hardlockup 硬死锁
> hardlockups are bugs that cause the CPU to loop in kernel mode for more than 10 seconds, without letting other interrupts have a chance to run. The current stack trace is displayed upon detection and the system will stay locked up.

- 例如关闭本地中断太长时间

## 死锁检测原理
## hrtimer
- 每个 CPU 上有一个 hrtimer (`watchdog_timer_fn`)
- 默认每 4s 触发一次
- 唤醒 stop 调度类进程
- 对 hardlockup 需要检查的 hrtimer_interrupts 计数器进行加 $1$

### softlockup 检查机制
- 内核配置：`CONFIG_SOFTLOCKUP_DETECTOR`
- hrtimer 执行路径检查到 20s 内 `watchdog_touch_ts`  时间戳没有更新，说明 `migration/N` 在 20s 之内都没有被唤醒执行
- hrtimer 执行路径打印 softlockup 的 CPU 堆栈或者同时 panic
```shell
grep . /proc/sys/kernel/soft*
/proc/sys/kernel/soft_watchdog:1
/proc/sys/kernel/softlockup_all_cpu_backtrace:0
/proc/sys/kernel/softlockup_panic:0
```
### hardlockup 检查机制
- 内核配置：`CONFIG_HARDLOCKUP_DETECTOR`
- 默认每 10s (`watchdog_thresh`) 检查系统是否存在 hardlockup
- 如何检查到 hrtimer 没有执行 (有 2.5 次机会，执行时会对计数器加 $1$)
- `_this_cpu_inc(hrtimer_interrupts)` 会打印 hardlockup 的 CPU 堆栈信息或者同时 panic
```shell
 cat /proc/sys/kernel/watchdog_thresh:10
 grep . /proc/sys/kernel/hardlockup_*
 /proc/sys/kernel/hardlockup_all_cpu_backtrace:0
 /proc/sys/kernel/hardlockup_panic:1
```
