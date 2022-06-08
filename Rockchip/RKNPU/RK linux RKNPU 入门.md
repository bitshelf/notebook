---
tags:
  - Rockchip/NPU
---
## RK3568 NPU
> [!tip] 目前 LLM 不在 RK3568 的官方支持列表
> 

## 查看 NPU 负载
```shell
cat /sys/kernel/debug/rknpu/load
```
## 查看 NPU 频率
```shell
cat /sys/class/devfreq/****.npu/cur_freq
```
或者
```shell
cat /sys/kernel/debug/clk/clk_summary | grep npu
```

# 环境搭建
## RKNN-Toolkit2 环境搭建（host）
### 安装 conda
```shell
wget -c https://mirrors.bfsu.edu.cn/anaconda/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

```
### 安装 RKNN-Toolkit2 依赖库
```shell
conda create -n toolkit2 python=3.8 # 创建Python3.8 环境

# 下载 rknn-toolkit2
git clone https://github.com/airockchip/rknn-toolkit2.git # 在 doc 有 RK 的文档

cd rknn-toolkit2/rknn-toolkit2
pip install -r  packages/requirements_cp38-2.1.0.txt -i  https://pypi.tuna.tsinghua.edu.cn/simple # python 版本为3.8,使用清华 pip 源

pip install packages/rknn_toolkit2-2.1.0+708089d1-cp38-cp38-linux_x86_64.whl
```

### 验证是否成功
```shell
# 进入 Python 交互模式
python
# 导入 RKNN 类
from rknn.api import RKNN
```

##  RK356x 环境搭建（target）
### 查看 RKNPU2 驱动版本
```shell
dmesg | grep -i rknpu
# 可以看到如下输出
# [drm] Initialized rknpu 0.9.3 20231121 for fde40000.npu on minor 1
```

## RKNN Model Zoo

RKNN Model Zoo 是 RK 提供的一些示例代码
```shell
# 下载源码
git clone https://github.com/airockchip/rknn_model_zoo.git
```

### 在 RK3568 运行 yolov5
```shell
cd rknn_model_zoo/examples/yolov5/model
bash download_model.sh # 下载模型

# 将原始的 ONNX 模型转成 RKNN 模型
cd rknn_model_zoo/examples/yolov5/python 
python convert.py --help # 查看支持的选项
python convert.py ../model/yolov5s_relu.onnx rk3568 i8 ../model/yolov5s_relu.rknn

cd rknn_model_zoo
# 配置交叉编译工具
export GCC_COMPILER=/home/loh/rockchip/rk3568_debian/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu
# 编译成可执行程序
./build-linux.sh -t rk356x -a aarch64 -d yolov5

# 将 install/rk356x_linux_aarch64 目录下的 rknn_yolov5_demo 整个目录拷贝到开发板,后运行
./rknn_yolov5_demo  model/yolov5s_relu.rknn model/bus.jpg 

# 输出结果为 out.png
```
## 参考
- 《01_Rockchip_RKNPU_Quick_Start_RKNN_SDK_V 1.6.0_CN. pdf》
