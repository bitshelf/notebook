---
tags:
  - Android/chromium
---
## Chromium for Android 浏览器的编译和安装

这篇文章介绍 Android 版本 Chromium 浏览器的源码下载、编译、安装的过程。

### 环境要求和配置

要在 Linux上构建 Chromium 项目的 Android 客户端，系统需要满足以下要求：

1.  硬件要求：

-   处理器：x 86-64 架构的机器。
-   内存：至少 8 GB 的 RAM（推荐超过 16 GB 以获得更好的性能）。
-   存储：至少 100 GB 的可用磁盘空间。

2.  软件要求：  
    操作系统：大多数开发工作在 Ubuntu 上进行。其他 Linux 发行版可能也可以使用，但需要参考 Linux 安装说明以确保兼容性。  
    工具：

-   Git：用于版本控制和代码管理。
-   Python：用于构建脚本和其他开发工具。

3.  注意事项：  
    在 Windows 或 Mac 上构建 Android 客户端是不支持的，并且无法正常工作。建议在 Linux 环境中进行开发和构建。

这些要求确保你的开发环境足够强大，可以处理 Chromium 项目的构建过程，特别是在处理 Android 客户端时。确保系统满足这些要求将有助于避免构建过程中的常见问题，并提高开发效率。

### Chromium for Android 源码下载

以下代码下载需要连接外网才能下载

#### 安装 depot\_tools

1.  下载 depot\_tools 仓库：

```bash
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```

2.  将 depot\_tools 添加到 PATH：

假设你将 depot\_tools 克隆到了 /path/to/depot\_tools，可以通过以下命令将其添加到 PATH（建议将这行代码添加到 ~/. bashrc 或 ~/. zshrc 中）：

```javascript
export PATH="$PATH:/path/to/depot_tools"
```

#### 获取代码

1.  创建并进入 Chromium 目录：

```bash
mkdir ~/chromium && cd ~/chromium
```

2.  获取 Android 代码：  
    使用 fetch 命令获取代码：

```bash
fetch --nohooks android
```

如果不需要完整的仓库历史记录，可以使用 --no-history 标志来节省时间。  
注意：即使在快速的网络连接下，该命令也可能需要 30 分钟，在较慢的连接下可能需要数小时。

3.  进入 src 目录：  
    获取完成后，会在工作目录中创建一个隐藏的 .gclient 文件和一个名为 src 的目录。接下来的操作假定你已经切换到 src 目录：

```bash
cd src
```

#### 转换现有的 Linux 检出

如果你已有一个 Linux 的检出，可以通过在 .gclient 文件中添加 target\_os = \[‘linux’, ‘android’\] 来添加 Android 支持：

```bash
echo "target_os = [ 'linux', 'android' ]" >> ../.gclient
```

#### 安装额外的构建依赖

检出代码后，运行以下命令以获取所有构建 Linux 和 Android 所需的依赖项：

```bash
build/install-build-deps.sh
```

#### 运行钩子

在至少运行一次 install-build-deps 之后，可以运行 Chromium 特定的钩子，这将下载额外的二进制文件和其他可能需要的东西：

```bash
gclient runhooks
```

通过以上步骤，你应该能够成功设置 Chromium 项目的开发环境，特别是针对 Android 客户端的构建。确保每一步都正确执行，以避免后续构建过程中的问题。

### Chromium for Android 源码编译

#### 设置编译环境

Chromium 使用 Ninja 作为其主要构建工具，并使用一个名为 GN 的工具来生成 .ninja 文件。你可以创建任意数量的构建目录，并使用不同的配置。要创建一个用于构建 Android 版 Chrome 的构建目录，请运行 `gn args out/Default` 并编辑文件以包含以下参数：

```bash
target_os = "android"
is_debug = false 
target_cpu = "arm64" 
# See "Figuring out target_cpu" below 
#use_remoteexec = true # Enables distributed builds. See "Faster Builds". 
symbol_level = 0 
enable_android_apk_bundles = true 
is_official_build = true 
android_channel = "stable" 
enable_r8 = true 
chrome_pgo_phase = 0 
proprietary_codecs = true 
ffmpeg_branding = "Chrome" 
enable_media_router = true 
enable_cast_receivers = true 
enable_widevine = true
```

对于每个新的构建目录，你只需运行一次这些命令，Ninja 会根据需要更新构建文件。你可以将 Default 替换为其他名称，但它应是 out 的子目录。有关其他构建参数，包括发布设置，请参阅 GN 构建配置。默认情况下将是一个调试组件构建。有关 GN 的更多信息，请在命令行中运行 gn help 或阅读快速入门指南。

### 编译 Chromium

使用 Ninja 构建 Chromium，可以通过以下命令进行：

```bash
autoninja -C out/Default chrome_public_apk
```

你可以通过在命令行中运行 gn ls out/Default 来获取所有其他构建目标的列表。要编译其中一个目标，将 GN 标签传递给 Ninja 时不需要前面的“//”（例如，对于 //chrome/test: unit\_tests，使用 autoninja -C out/Default chrome/test: unit\_tests）。

### Chromium for Android 安装到设备

编译后生成 apk 路径：

```bash
out/Default/apks/ChromePublic.apk
```

可以直接通过 adb install 安装

## link
-  [Chromium for Android 浏览器的编译和安装\_android chromium-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/144408463)