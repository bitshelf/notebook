---
tags: Camera  V4l2 
---

## 摄像头架构名词释义
- **sink pad**：用于接收数据流的输入端口。在 GStreamer 中，数据流通常通过 pad 进行传输和处理，sink pad 是接收数据流的端口。因此，在摄像头组件中，sink pad 用于接收图像数据和其他相关数据。
- **source pad**：用于传输数据流的输出端口。在GStreamer中，数据流通过pad进行传输和处理，source pad是提供数据流的端口。因此，在摄像头组件中，source pad用于传输图像数据和其他相关数据。例如，当使用GStreamer在Linux上编写视频捕获应用程序时，可以使用摄像头source pad进行捕获，将摄像头捕获到的视频数据流传输到其他GStreamer管道中的应用程序，例如视频编码器、视频处理器等