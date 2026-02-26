---
tags: DRM 
---

# Planes
![[DRM VS Soc pipeline.excalidraw|100%]]
## planes 的作用
* DRM PLANE 从 drm_framebuffer 接收数据，构造送显图像的雏形，完成图像的剪裁和缩放后发送到&drm_crtc
	1. Image source 
	2. Associated with one (or more) framebuffers
	3. Holds a resized / croped version of that framebuffer
	
* plane 其本质是对显示控制器中 scanout 硬件的抽象。简单来说，给定一个 plane，可以让其与一个 framebuffer 关联表示进行 scanout 的数据，同时控制控制 scanout 时进行的额外操作，比如 colorspace 的改变，旋转、拉伸等操作。
* plane 由 `drm_plane` 表示， `drm_plane` 是与硬件强相关的，显示控制器支持的 plane 是固定的，其支持的功能也是由硬件决定的
	* 所有的`drm_plane`必为三种类型之一：
	-   `Primary` - 主 plane，一般控制整个显示器的输出。CRTC 必须要有一个这样的 plane。
	-   `Curosr` - 表示鼠标光标，可选。
	-   `Overlay` - 叠加 plane，可以在主 plane 上叠加一层输出，可选

-   **增强系统灵活性**  
    对于桌面系统而言，显示器背景图案和鼠标光标通常是基本的显示元素，并且一直存在直到系统关机。因此，对于这种变化不是很频繁的基本图显输出，可以由通用 plane 来实现。而那些频繁变化的图显输出，交由专用的 plane 来实现。  
-   **提高系统性能**  
    由于 plane 具备图像缩放、剪裁、多图层叠加等功能，因此，可以让 GPU 来将更多的精力放在图形渲染上，这种基本的图像处理交由 plane 实现
# Link 
* [Plane内核文档](https://www.kernel.org/doc/html/latest/gpu/drm-kms.html#plane-abstraction)