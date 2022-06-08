---
tags: OpenCV Debian
---

# Debian 11 OpenCV 编译 
1. 开发板计算资源有限，编译配置文件修
```shell
grep ipcp-unit-growth -lrni 3rdparty/ |xargs sed -i 's/ipcp-unit-growth/ipa-cp-unit-growth/g'
```

2. `cmake-gui`编译不通过，暂找不到解决办法

### Run CMake
```shell
	cmake -D CMAKE_BUILD_TYPE=RELEASE \
	      -D CMAKE_INSTALL_PREFIX=/usr/local \
	      -D INSTALL_C_EXAMPLES=ON \
	      -D INSTALL_PYTHON_EXAMPLES=ON \
	      -D WITH_TBB=ON \
	      -D WITH_V4L=ON \
	      -D WITH_QT=ON \
	      -D WITH_OPENGL=ON \
	      -D OPENCV_EXTRA_MODULES_PATH=../opencv_contrib/modules \
	      -DBUILD_opencv_cudacodec=Off \
	      -DBUILD_opencv_xfeatures2d=OFF \
	      -D BUILD_EXAMPLES=ON \
	      -B build
```

---

# Link
1. [How to install OpenCV on Ubuntu 20.04 - VITUX](https://vitux.com/opencv_ubuntu/)
2. [Install OpenCV3 on Ubuntu | LearnOpenCV #](https://learnopencv.com/install-opencv3-on-ubuntu/)