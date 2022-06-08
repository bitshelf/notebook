---
tags: buildroot
---

# Buildroot 配置变量
1. `BR2_LINUX_KERNEL_CUSTOM_LOCAL=y`：使用已有的内核配置文件
2. `BR2_LINUX_KERNEL_CUSTOM_LOCAL_LOCATION`： 内核`.config`配置位置
3. 板型配置文件：`configs/rockchip_rk3588_defconfig`

 ---
 1. 查看所有板型的配置文件：`make list-defconfigs`  
 2. 完全重建：`make clean all`
3. Buildroot 可以生成一个 JSON 简介，描述当前配置中启用的包集，以及它们的依赖项、许可和其他元数据
~~~shell
make show-info
~~~

4. Buildroot 能够生成包依赖关系图
~~~shell
make graph-depends
~~~

5. 为给定的包生成依赖关系图
~~~shell
make <pkg>-graph-depends
~~~


---
# 重新构建整个系统
-   当目标体系结构配置发生更改时，需要进行完整的重新构建。改变架构变体(例如二进制格式或浮点策略)会对整个系统产生影响。
-   当工具链配置发生更改时，通常需要进行一次完整的重新构建。更改工具链配置通常涉及更改编译器版本、C库的类型或其配置，或其他一些基本配置项，这些更改会对整个系统产生影响。
-   当向配置中添加额外的包时，并不一定需要完全重新构建。Buildroot 将检测到这个包从未被构建过，并将其构建。但是，如果这个包是一个可以被已经构建的包使用的库，那么 Buildroot 将不会自动重新构建这些库。您可以知道应该重新构建哪些包，并且可以手动重新构建它们，也可以进行完整的重新构建。例如，假设您已经构建了一个使用 crbt 包但不使用 openssl 的系统。您的系统可以工作，但是您意识到您希望在 crbt 中有 SSL 支持，所以您在 Buildroot 配置中启用 openssl 包并重新启动构建。Buildroot 将检测是否应该构建 openssl 并将其构建，但它不会检测是否应该重新构建 crbt 以从 openssl 中获益以添加对 openssl 的支持。您将不得不做一个完全重建，或重建 ctorrent 本身。
-   当从配置中删除一个包时，Buildroot不会做任何特殊的事情。它不会从目标根文件系统或工具链sysroot中删除该包安装的文件。要摆脱这个包，需要一个完整的重建。但是，通常您不需要立即删除这个包:您可以等到下一次午休时间重新开始构建。
-   当包的子选项发生更改时，不会自动重新生成包。在做了这些更改之后，通常只重新构建这个包就足够了，除非启用包子选项将一些对已经构建的另一个包有用的特性添加到包中。同样，Buildroot不会跟踪什么时候应该重新构建包:一旦构建了一个包，它就永远不会重新构建，除非明确地告诉它这样做。
-   当对根文件系统框架进行更改时，需要进行一次完整的重新构建。但是，当对根文件系统覆盖层、构建后脚本或图像后脚本进行更改时，就不需要进行完全的重新构建:一个简单的make调用将考虑这些更改。
-   当在 FOO_DEPENDENCIES 中列出的包被重新构建或删除时，包 foo 不会自动重新构建。例如，如果在带有 FOO_DEPENDENCIES = bar 的 FOO_DEPENDENCIES 中列出了一个包 bar，并且 bar 包的配置发生了改变，那么配置的改变不会自动导致 foo 包的重新构建。在这个场景中，您可能需要重新构建构建中引用 bar 中的 DEPENDENCIES 中的任何包，或者执行完整的重新构建以确保任何 bar 依赖的包都是最新的

# 重新构建软件包
1. 从头重新构建单个包的最简单方法是删除`output/build`中的构建目录。然后，Buildroot 将重新提取、重新配置、重新编译和重新安装这个包。你可以通过`make <package>-dirclean`命令要求 buildroot 这样做
2. 如果只希望从编译步骤重新启动包的构建过程，可以运行`make <package>-rebuild`。它将重新启动包的编译和安装，但不是从头开始: 它基本上会在包内重新执行`make`和`make install`，因此它只会重新构建更改过的文件
3. 如果您想从配置步骤重新启动包的构建过程，可以运行`make <package>-reconfigure`。它将重新启动包的配置、编译和安装

> [!info] 编译到根文件系统
> `<package>-rebuild`意味着`<package>-reinstall`，`<package>-reconfigure`意味着`<package>-rebuild`，但是这些目标以及只对上述`<package>`起作用，并且不会触发重新创建根文件系统映像。如果需要重新创建根文件系统，还应该运行`make`或`make all`

Buildroot 创建所谓的戳文件(`stamp files`)，以跟踪每个包的哪些构建步骤已经完成。它们存储在包构建目录`output/build/<package>-<versiotarget 执行顺序

---
tags: buildroot
---

# Buildroot 配置变量
1. `BR2_LINUX_KERNEL_CUSTOM_LOCAL=y`：使用已有的内核配置文件
2. `BR2_LINUX_KERNEL_CUSTOM_LOCAL_LOCATION`： 内核`.config`配置位置
3. 板型配置文件：`configs/rockchip_rk3588_defconfig`

 ---
 1. 查看所有板型的配置文件：`make list-defconfigs`  
 2. 完全重建：`make clean all`
3. Buildroot 可以生成一个 JSON 简介，描述当前配置中启用的包集，以及它们的依赖项、许可和其他元数据
~~~shell
make show-info
~~~

4. Buildroot 能够生成包依赖关系图
~~~shell
make graph-depends
~~~

5. 为给定的包生成依赖关系图
~~~shell
make <pkg>-graph-depends
~~~


---
# 重新构建整个系统
-   当目标体系结构配置发生更改时，需要进行完整的重新构建。改变架构变体(例如二进制格式或浮点策略)会对整个系统产生影响。
-   当工具链配置发生更改时，通常需要进行一次完整的重新构建。更改工具链配置通常涉及更改编译器版本、C库的类型或其配置，或其他一些基本配置项，这些更改会对整个系统产生影响。
-   当向配置中添加额外的包时，并不一定需要完全重新构建。Buildroot 将检测到这个包从未被构建过，并将其构建。但是，如果这个包是一个可以被已经构建的包使用的库，那么 Buildroot 将不会自动重新构建这些库。您可以知道应该重新构建哪些包，并且可以手动重新构建它们，也可以进行完整的重新构建。例如，假设您已经构建了一个使用 crbt 包但不使用 openssl 的系统。您的系统可以工作，但是您意识到您希望在 crbt 中有 SSL 支持，所以您在 Buildroot 配置中启用 openssl 包并重新启动构建。Buildroot 将检测是否应该构建 openssl 并将其构建，但它不会检测是否应该重新构建 crbt 以从 openssl 中获益以添加对 openssl 的支持。您将不得不做一个完全重建，或重建 ctorrent 本身。
-   当从配置中删除一个包时，Buildroot不会做任何特殊的事情。它不会从目标根文件系统或工具链sysroot中删除该包安装的文件。要摆脱这个包，需要一个完整的重建。但是，通常您不需要立即删除这个包:您可以等到下一次午休时间重新开始构建。
-   当包的子选项发生更改时，不会自动重新生成包。在做了这些更改之后，通常只重新构建这个包就足够了，除非启用包子选项将一些对已经构建的另一个包有用的特性添加到包中。同样，Buildroot不会跟踪什么时候应该重新构建包:一旦构建了一个包，它就永远不会重新构建，除非明确地告诉它这样做。
-   当对根文件系统框架进行更改时，需要进行一次完整的重新构建。但是，当对根文件系统覆盖层、构建后脚本或图像后脚本进行更改时，就不需要进行完全的重新构建:一个简单的make调用将考虑这些更改。
-   当在 FOO_DEPENDENCIES 中列出的包被重新构建或删除时，包 foo 不会自动重新构建。例如，如果在带有 FOO_DEPENDENCIES = bar 的 FOO_DEPENDENCIES 中列出了一个包 bar，并且 bar 包的配置发生了改变，那么配置的改变不会自动导致 foo 包的重新构建。在这个场景中，您可能需要重新构建构建中引用 bar 中的 DEPENDENCIES 中的任何包，或者执行完整的重新构建以确保任何 bar 依赖的包都是最新的

# 重新构建软件包
1. 从头重新构建单个包的最简单方法是删除`output/build`中的构建目录。然后，Buildroot 将重新提取、重新配置、重新编译和重新安装这个包。你可以通过`make <package>-dirclean`命令要求 buildroot 这样做
2. 如果只希望从编译步骤重新启动包的构建过程，可以运行`make <package>-rebuild`。它将重新启动包的编译和安装，但不是从头开始: 它基本上会在包内重新执行`make`和`make install`，因此它只会重新构建更改过的文件
3. 如果您想从配置步骤重新启动包的构建过程，可以运行`make <package>-reconfigure`。它将重新启动包的配置、编译和安装

> [!info] 编译到根文件系统
> `<package>-rebuild`意味着`<package>-reinstall`，`<package>-reconfigure`意味着`<package>-rebuild`，但是这些目标以及只对上述`<package>`起作用，并且不会触发重新创建根文件系统映像。如果需要重新创建根文件系统，还应该运行`make`或`make all`

Buildroot 创建所谓的戳文件(`stamp files`)，以跟踪每个包的哪些构建步骤已经完成。它们存储在包构建目录`output/build/<package>-<version>/`中，命名为`.stamp_<step-name>`。上面详细介绍的命令只是操作这些戳文件，以强制 Buildroot 重新启动包构建过程的一组特定步骤

## 包构建命令
`make <package>`
对于依赖于 Buildroot 框架的包，有许多特殊的 make 目标可以像这样独立调用
```shell
make <package>-<target>
```

target 执行顺序

|      command/target       | Description                                                                                                                                                   |
|:-------------------------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         `source`          | Fetch the source (download the tarball, clone the source repository, etc)                                                                                     |
|         `depends`         | Build and install all dependencies required to build the package                                                                                              |
|         `extract`         | Put the source in the package build directory (extract the tarball, copy the source, etc)                                                                     |
|          `patch`          | Apply the patches, if any                                                                                                                                     |
|        `configure`        | Run the configure commands, if any                                                                                                                            |
|          `build`          | Run the compilation commands                                                                                                                                  |
|     `install-staging`     | target package: Run the installation of the package in the staging directory, if necessary                                                                    |
|     `install-target`      | target package: Run the installation of the package in the target directory, if necessary                                                                     |
|         `install`         | target package: Run the 2 previous installation commands </br>  host package: Run the installation of the package in the host directory                       |
|      `show-depends`       | Displays the first-order dependencies required to build the package                                                                                           |
| `show-recursive-depends`  | Recursively displays the dependencies required to build the package                                                                                           |
|      `show-rdepends`      | Displays the first-order reverse dependencies of the package (i.e packages that directly depend on it)                                                        |
| `show-recursive-rdepends` | Recursively displays the reverse dependencies of the package (i.e the packages that depend on it, directly or indirectly)                                     |
|      `graph-depends`      | Generate a dependency graph of the package, in the context of the current Buildroot configuration. See this section for more details about dependency graphs. |
|     `graph-rdepends`      | Generate a graph of this package reverse dependencies (i.e the packages that depend on it, directly or indirectly)                                            |
|        `dirclean`         |   Remove the whole package build directory                                                                                                                                                            |
|        `reinstall`        |     Re-run the install commands                                                                                                                                                          |
|         `rebuild`         |  Re-run the compilation commands - this only makes sense when using the OVERRIDE_SRCDIR feature or when you modified a file directly in the build directory                                                                                                                                                             |
| `reconfigure`                          |   Re-run the configure commands, then rebuild - this only makes sense when using the OVERRIDE_SRCDIR feature or when you modified a file directly in the build directory                                                                                                                                                            |




---
# Link
- [Buildroot 用户手册 (中文) - pwl999 - 博客园](https://www.cnblogs.com/pwl999/p/15534966.html)