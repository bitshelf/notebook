---
tags: GStreamer 
---

- gst-launch 是接收一个用字符串方式描述的 Pipline，将其实例化并运行
- 检查 Pipeline 中各个元素是否能够正确的连接起来
- 用字符串描述 Pipeline 时，每个 Element 之间需要通过叹号 “`!`" 分隔 Element，这样 gst-launch 才能正确识别

