---
tags: Linux
---

# Linux 的进程与线程
![[assets/Linux的进程与线程.excalidraw|100%]]

* `Task_struct` 结构体一体二用
* 把线程看作是共享一个地址空间的“进程”
* 创建新线程时，创建一个新的 task_struct，大多数字段与其他线程相同，主要由 do_fork 完成
* Linux 的线程又称为轻进程（LWP), 传统 Unix 进程称为重进程