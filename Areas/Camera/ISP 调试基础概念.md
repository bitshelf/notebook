---
tags:
  - ISP
---
## Camera
### AF 
AF模块的功能是指调整相机镜头，使被拍物成像清晰的过程
### AWB
AWB模块的功能是通过改变拍摄设备的⾊彩通道的增益，对⾊温环境所造成的颜⾊偏差和拍摄设备本⾝所固有的⾊彩通道增益的偏差进⾏统⼀补偿，从⽽让获得的图像能正确反映物体的真实⾊彩

- ⾊温：⾊温是按绝对⿊体来定义的，光源的辐射在可⻅区和绝对⿊体的辐射完全相同时，此时⿊体的温度就称此光源的⾊温
- ⽩平衡：在不同⾊温的光源下，⽩⾊在传感器中的响应会偏蓝或偏红。⽩平衡算法通过调整 R, G,  B 三个颜⾊通道的强度，使⽩⾊真实呈现

### AE
AE 模块实现的功能是：根据⾃动测光系统获得当前图像的曝光量，再⾃动配置镜头光圈、 sensor 快⻔及增益来获得最佳的图像质量

- 曝光时间： sensor 积累电荷的时间，是 sensor pixel 从开始曝光到电量被读出的这段时间
- 曝光增益：对 sensor 的输出电荷的总的放⼤系数，⼀般有数字增益和模拟增益，模拟增益引⼊的噪声会稍⼩，所以⼀般优先⽤模拟增益
- 光圈：光圈是镜头中可以改变通光孔径⼤⼩的机械装置
- 抗闪烁：由于电灯的电源⼯频与 sensor 的帧率不匹配⽽导致的画⾯闪烁，⼀般通过限定曝光时间和修改 sensor 的帧率来达到抗闪烁的效果

- BLC (BlackLevel Correction)——黑电平校正
- LSC (Lens Shade Correction)——镜头阴影校正
- DPC (Bad Point Correction)——坏点校正
- GB（Green Balance）——绿平衡
- Denoise—–去除噪声
- Demosaic——颜色插值

## 图像效果

- imgproc 是指影响图像效果的模块
- CPROC (Color Processing) 提供基本的喜好⾊调节功能，通过对⼀定区间内的亮度、对⽐度、饱和度、⾊度的调节，达到对喜好⾊的调节，该模块作⽤于YUV域图像
- CSM (Color Space Matrix) 可设置RGB到YUV转换时的参数
- Sharp 模块⽤于增强图像的清晰度，包括调节图像边缘的锐化属性和增强图像的细节和纹理
- Gamma 模块对图像进⾏亮度空间⾮线性转换以适配输出设备
- CCM (Color Correction Matrix) 模块对图像进⾏颜⾊校正处理
- LDC模块包含两个⼦模块，LDCH和LDCV，分别对x⽅向和y⽅向进⾏图像⼩畸变校正。不适⽤⻥眼镜头畸变矫正
- DeBayer (Demosic) 完成将由 sensor 采集到的，带有 CFA 属性的图像通过插值算法还原成为具有完整像素信息的RGB图像
	- 该模块⽀持Bayer raw数据，包含 RGGB、BGGR、GRBG、GBRG 四种 pattern 模式
- GIC 模块⽤于矫正Gr与Gb两个通道的失衡，提⾼部分场景的图像质量
- CAC 模块⽤于矫正由于光波⻓折射率差异引起的物体边缘紫边（或者其他颜⾊）问题
- 3DLut 模块对图像进⾏HSV空间的颜⾊映射处理
### AIISP
AIISP 是将 ISP 的中间 RAW 数据写⼊DDR，然后通过 CPU 和 NN 的配合，使⽤软件 AINR 算法将 DDR 的数据进⾏AI 运算，具备了 RAW 域图像 2 D 去噪功能，在⾼ISO 场景具备⽐传统 ISP（bayerNR，Ynr，Cnr）更强的去噪能⼒，能够更好的保留细节，去除噪声
#### 约束
- 与HDR功能、predgain 等互斥
- isp 必须⼯作在离线模式

## Link
- 《Rockchip_Development_Guide_ISP 39_CN_alpha. pdf》