---
tags: Makefile
---

# Makefile
## 示例
```Makefile
CXX = g++
TARGET = hello
SRC = $(wildcard *.cpp)
OBJ = $(patsubst %.cpp, %.o, $(SRC))
CXXFLAGS = -c -Wall

$TARGET: $(OBJ)
	$(CXX) -o $@ $^

%.o: %.cpp
	$(CXX) $(CXXFLAGS) $< -o $@
```

##  `:=` 与 `=`
###  `=`
make会将整个makefile展开后，再决定变量的值。也就是说，变量的值将会是整个makefile中最后被指定的值。看例子：
```Makefile
    x = foo
    y = $(x) bar
    x = xyz
```
在上例中，y的值将会是 xyz bar ，而不是 foo bar
###  `:=`
```makefile
    x := foo
    y := $(x) bar
    x := xyz
```
- y 的值将会是 foo bar ，而不是 xyz bar
---
`=` 是最基本的赋值  
`:=` 是覆盖之前的值  
`?=` 是如果没有被赋值过就赋予等号后面的值  
`+=` 是添加等号后面的值
#### 示例
```makefile
ifdef DEFINE_VRE
    VRE = “Hello World!”
else
endif

ifeq ($(OPT),define)
    VRE ?= “Hello World! First!”
endif

ifeq ($(OPT),add)
    VRE += “Kelly!”
endif

ifeq ($(OPT),recover)
    VRE := “Hello World! Again!”
endif

all:
    @echo $(VRE)
```

执行以下`make`命令：
```bash
make DEFINE_VRE=true OPT=define 输出：Hello World!
make DEFINE_VRE=true OPT=add 输出：Hello World! Kelly!
make DEFINE_VRE=true OPT=recover  输出：Hello World! Again!
make DEFINE_VRE= OPT=define 输出：Hello World! First!
make DEFINE_VRE= OPT=add 输出：Kelly!
make DEFINE_VRE= OPT=recover 输出：Hello World! Again!
```
### Link
- [Flavors (GNU make)](https://www.gnu.org/software/make/manual/html_node/Flavors.html#Flavors)
