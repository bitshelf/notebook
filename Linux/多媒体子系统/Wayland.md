---
tags: Linux Wayland
---

# Wayland
- 以前图像绘制和窗口管理是由X.Org 和另一个窗口管理器分别处理的，现在则由 Wayland 将两者合并为一个作业统一负责
- 在以前应用程序是运行在一个单独的窗口管理器上的，由该窗口管理器去和显示服务器进行信息交换，而现在我们只需在 Wayland 实现中运行应用程序，Wayland 既是窗口管理器又是显示服务器
- Wayland 只定义了协议，并没有官方实现
- Wayland 可以与旧的 X.Org 软件并存

---
## Link
- [介绍 - The Wayland Protocol（自译中文版）](https://wayland.axionl.me/)
- [Wayland](https://wayland.freedesktop.org/)
- [Wayland - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/Wayland?rdfrom=https%3A%2F%2Fwiki.archlinux.org%2Findex.php%3Ftitle%3DWayland_%28%25E7%25AE%2580%25E4%25BD%2593%25E4%25B8%25AD%25E6%2596%2587%29%26redirect%3Dno)
