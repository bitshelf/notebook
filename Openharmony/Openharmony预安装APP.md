---
tags: OpenHarmony
---

# 以添加浏览器为例
1. 在源码编译目录下复制 HAP 文件：`entry\build\default\outputs\default`
1. 将 Browser_Demo.hap文件放置到 SDK `applications/standard/hap/` 目录下
2. 在 `applications/standard/hap/BUILD.gn` 添加以下内容
~~~gn:applications/standard/hap/BUILD.gn
ohos_prebuilt_etc ("browser_demo_hap") {
  source = "Browser_Demo.hap"
  module_install_dir = "app"
  part_name = "prebuilt_hap"
  subsystem_name = "applications"
}
~~~

3. 在 `applications/standard/hap/BUILD.gn` 的 `group("hap")` 添加依赖
~~~gn:applications/standard/hap/BUILD.gn
"//applications/standard/hap: browser_demo_hap",
~~~

