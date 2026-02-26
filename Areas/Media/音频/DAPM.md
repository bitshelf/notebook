---
tags:
  - Audio
---
## DAPM
- DAPM是Dynamic Audio Power Management的缩写，直译过来就是动态音频电源管理的意
- 思DAPM是为了使基于linux的移动设备上的音频子系统，在任何时候都工作在最小功耗状态下
- DAPM对用户空间的应用程序来说是透明的，所有与电源相关的开关都在ASoc core中完成。用户空间的应用程序无需对代码做出修改，也无需重新编译，DAPM根据当前激活的音频流（playback/capture）和声卡中的mixer等的配置来决定那些音频控件的电源开关被打开或关闭