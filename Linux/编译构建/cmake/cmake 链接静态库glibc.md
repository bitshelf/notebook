---
tags: Linux
---

# cmake 链接静态库
## 链接 glibc
```cmake
target_link_libraries(glibc -static-libgcc -static-libstdc++)
```

```cmake
target_link_libraries(MyLibrary -static)
```

### 全局设置
```cmake
set(BUILD_SHARED_LIBS OFF)
set(CMAKE_EXE_LINKER_FLAGS "-static")
```


---
## Link
- [How to static linking to glibc in cmake - Stack Overflow](https://stackoverflow.com/questions/46809303/how-to-static-linking-to-glibc-in-cmake)