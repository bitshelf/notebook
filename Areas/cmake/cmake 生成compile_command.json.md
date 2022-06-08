---
tags:
  - cmake
---
## 命令行生成
```shell
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1
```

## CMakeLists.txt
```CMakeLists
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```