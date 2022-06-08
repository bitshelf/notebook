---
tags: OpenHarmony
---

# OpenHarmony 术语
-   **Ability**
    
    应用的重要组成部分，是应用所具备能力的抽象。Ability分为两种类型，Feature Ability和Particle Ability。
    

-   **AbilitySlice**
    
    切片，是单个可视化界面及其交互逻辑的总和，是Feature Ability的组成单元。一个Feature Ability可以包含一组业务关系密切的可视化界面，每一个可视化界面对应一个AbilitySlice。
    

-   **ANS**
    
    Advanced Notification Service，通知增强服务，是HarmonyOS中负责处理通知的订阅、发布和更新等操作的系统服务。
    
-   **Atomic Service，原子化服务**
    
    是HarmonyOS提供的一种面向未来的服务提供方式，是有独立入口的（用户可通过点击方式直接触发）、免安装的（无需显式安装，由系统程序框架后台安装后即可使用）、可为用户提供一个或多个便捷服务的用户应用程序形态。
    
    原子化服务基于HarmonyOS API开发，支持运行在1+8+N设备上，供用户在合适的场景、合适的设备上便捷使用。
    
-   **ArkUI**
    
    方舟开发框架，是为HarmonyOS平台开发极简、高性能、跨设备应用设计研发的UI开发框架，支撑开发者高效地构建跨设备应用UI界面。详情请参考[方舟开发框架开发指导](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ui-js-overview-0000000000500376)。
    
-   **ArkCompiler**
    
    方舟编译器，是华为自研的统一编程平台，包含编译器、工具链、运行时等关键部件，支持高级语言在多种芯片平台的编译与运行，可支撑传统方式的显式安装的应用和原子化服务运行在手机、个人电脑、平板、电视、汽车和智能穿戴等多种设备上的需求。详情请参考[方舟编译器简介](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/build_overview-0000001055075201#section15931619195210)。
    

## C

-   **CES**
    
    Common Event Service，是HarmonyOS中负责处理公共事件的订阅、发布和退订的系统服务。
    
-   **Cross-device migration，跨端迁移**
    
    是一种实现用户应用程序流转的技术方案。指在A端运行的用户应用程序，迁移到B端上并从迁移时刻A端状态继续运行，然后A端用户应用程序退出。
    

## D

-   **DV**
    
    Device Virtualization，设备虚拟化，通过虚拟化技术可以实现不同设备的能力和资源融合。
    

## F

-   **FA**
    
    Feature Ability，元服务，代表有界面的Ability，用于与用户进行交互。
    

## H

-   **HAP**
    
    HarmonyOS Ability Package，一个HAP文件包含应用的所有内容，由代码、资源、三方库及应用配置文件组成，其文件后缀名为.hap。
    

-   **HDF**
    
    Hardware Driver Foundation，硬件驱动框架，用于提供统一外设访问能力和驱动开发、管理框架。
    
-   **HML**
    
    HarmonyOS Markup Language，是一套类HTML的标记语言。通过组件、事件构建出页面的内容。页面具备数据绑定、事件绑定、列表渲染、条件渲染等高级能力。
    
-   **Hop，流转**
    
    在HarmonyOS中泛指涉及多端的分布式操作。流转能力打破设备界限，多设备联动，使用户应用程序可分可合、可流转，实现如邮件跨设备编辑、多设备协同健身、多屏游戏等分布式业务。
    
    流转为开发者提供更广的使用场景和更新的产品视角，强化产品优势，实现体验升级。
    

## I

-   **IDN**
    
    Intelligent Distributed Networking，是HarmonyOS特有的分布式组网能力单元。开发者可以通过IDN获取分布式网络内的设备列表和设备状态信息，以及注册分布式网络内设备的在网状态变化信息。
    

## M

-   **Manual hop，用户手动流转**
    
    是指开发者在用户应用程序中内嵌规范的流转图标，使用户可以手动选择合适的可选设备进行流转。用户点击图标后，会调起系统提供的流转面板。面板中会展示出用户应用程序的信息及可流转的设备，引导用户进行后续的流转操作。
    

-   **MSDP**
    
    Mobile Sensing Development Platform，移动感知平台。MSDP子系统提供分布式融合感知能力，借助HarmonyOS分布式能力，汇总融合来自多个设备的多种感知源，从而精确感知用户的空间状态、移动状态、手势、运动健康等多种状态，构建全场景泛在基础感知能力，支撑智慧生活新体验。
    

-   **Multi-device collaboration，多端协同**
    
    是一种实现用户应用程序流转的技术方案。指多端上的不同FA/PA同时运行、或者接替运行实现完整的业务；或者，多端上的相同FA/PA同时运行实现完整的业务。
    

## P

-   **PA**
    
    Particle Ability，元能力，代表无界面的Ability，主要为Feature Ability提供支持，例如作为后台服务提供计算能力，或作为数据仓库提供数据访问能力。
    

## S
* **SA**
	* （Service Ability）：服务 Ability
	* System Ability，即系统能力，是由 OS 提供的基础软件服务和硬件服务
 * **SIG**
	 Special Interest Group）: 特别兴趣小组
	 * <https://gitee.com/openharmony-sig>
	 * <https://gitee.com/openharmony/community/tree/master/sig>

-   **Service widget，服务卡片**
    
    将用户应用程序的重要信息以服务卡片的形式展示在桌面，用户可通过快捷手势使用卡片，以达到服务直达、减少层级跳转的目的。
    
    卡片作为服务的轻量承载，需要做到易用可见、智能可选和多端可变。每个原子化服务需要配置至少一个服务卡片，每个传统方式的需要安装的应用可选配置服务卡片。
    
-   **Super virtual device，超级虚拟终端**
    
    亦称超级终端，通过分布式技术将多个终端的能力进行整合，存放在一个虚拟的硬件资源池里，根据业务需要统一管理和调度终端能力，来对外提供服务。
    
-   **System suggested hop，系统推荐流转**
    
    是指当用户使用用户应用程序时，所处环境中存在使用体验更优的可选设备，则系统自动为用户推荐该设备，用户可确认是否启动流转。
