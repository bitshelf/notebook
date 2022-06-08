---
tags: cmake
---

# CmakeLists.txt
## 示例
```txt
cmake_minimum_required(VERSION 3.12)
project(MyProject LANGUAGES CXX)

find_package(TBB COMPONENTS tbb tbbmalloc REQUIRED)

add_exectable(hello main.cpp factorial.cpp printhello.cpp)
target_link_libraries(myapp TBB:tbb TBB:tbbmalloc)
```