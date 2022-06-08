---
tags:
  - OpenHarmony
---
# OpenHarmony 烧录
## 整包烧录
### 将镜像解压，打开烧录工具 RKDevTool. exe
[Open: Pasted image 20240719102241.png](assets/Pasted%20image%2020240719102241.png)
![](assets/Pasted%20image%2020240719102241.png)
								图 1-1. 烧写工具

### 使用 USB-USB 线将开发板直连电脑
USB 线一端接电脑一端接图片所示红框 USB 接口上层接口，在上电之前，您需要按住
图 3-7 中所示的‘UPDATE’按键，然后上电，烧录工具在此时就会检测到设备，如图 3-
8 所示
[Open: Pasted image 20240719102424.png](assets/Pasted%20image%2020240719102424.png)
![](assets/Pasted%20image%2020240719102424.png)
									图 1-2. 烧录按键示意图
[Open: Pasted image 20240719102726.png](assets/Pasted%20image%2020240719102726.png)
![](assets/Pasted%20image%2020240719102726.png)
									图 1-3. 工具检测开发板图
点击升级固件，然后点击固件去对应文件夹选择镜像，再点击升级，等待 3-4 分钟即可，
如图 1-5 即为烧录成功
[Open: Pasted image 20240719102814.png](assets/Pasted%20image%2020240719102814.png)
![](assets/Pasted%20image%2020240719102814.png)
									图 1-4. 烧录 emmc 图
[Open: Pasted image 20240719102938.png](assets/Pasted%20image%2020240719102938.png)
![](assets/Pasted%20image%2020240719102938.png)
									图 1-5.  烧录 emmc 成功图

## 分包烧录
1. 在 **下载镜像** 界面，右键点击**导入配置** 
[Open: Pasted image 20240719103502.png](assets/Pasted%20image%2020240719103502.png)
![](assets/Pasted%20image%2020240719103502.png)

2. 文件打开类型选择 txt, 然后选择 `parameter.txt`
[Open: Pasted image 20240719103633.png](assets/Pasted%20image%2020240719103633.png)
![](assets/Pasted%20image%2020240719103633.png)

3. 拖动滚动条，拉至底部，misc、bootctrl、eng_system、eng_chipset 分区不选，其他的选择对应分区镜像
[Open: Pasted image 20240719104037.png](assets/Pasted%20image%2020240719104037.png)
![](assets/Pasted%20image%2020240719104037.png)