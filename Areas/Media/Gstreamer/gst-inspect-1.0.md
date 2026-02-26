---
tags: GStreamer 
---

## gst-inpect-1.0 查看 Element 
- **不带任何参数**：列出当前系统中支持的所有 Element，这些 Element 可用于构造 Pipeline
- **跟文件名**：这样会将指定文件作为一个 GStreamer 插件，尝试列出其中所包含的 Element。例如下面的命令列出了 libgstjpeg. so 所包含的2个 Elements。
- **跟 Element 名**：会列出 Element 的详细信息