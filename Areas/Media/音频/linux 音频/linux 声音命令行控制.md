---
tags: amixer
---
# amixer
**amixer**是 alsamixer 的文本模式, 即命令行模式，以命令行的形式去配置声卡的各个选项
* `amixer --help`    
* `amixer controls` 查看当前的音频驱动提供了哪些操作接口 
* `amixer contents`    查看当前的配置参数 
* `amixer cget numid=cID`    查看 cID（controls 中的）的信息 
* `amixer cset  numid=cID <value>`    设置 cID 的值为 `<value>`
* `amixer controls` 用于查看音频系统提供的操作接口  
* `amixer contents` 用于查看接口配置参数  
* `amixer cget` + 接口函数  
* `amixer cset` + 接口函数 + 设置值
配置一般步骤，alsamixer 设置或者,amixer 查看信息(cget 类)，设置所需值（cset 类）
# alsamixer
alsamixer 是基于文本图形界面的，可以在终端中显示. 通过键盘的上下键，左右键等实现音量设置，开关操作等
> [!info]
> 用命令行 `amixer` 修改后需要执行 
> 1. 备份 `/var/lib/alsa/asound.state` 文件
> 2. 执行 `alsactl store -f /var/lib/alsa/asound.state`
> 3. 将保存生成的文件，复制到备份的文件末尾
# 录音
## 快捷命令
```bash 
arecord filename.wav 
```
## 复杂版本
~~~bash
arecord #录音命令 
arecord -d 10 -f cd -t wav 1234.wav 
aplay 1234.wav #播放录音文件
~~~
*  `-d` 录音时长
* `-f`生成文件格式
* `-t wav` 录音生成文件类型
# 异常排查
### 1. 录音没有声音
指定采样率：`arecord -Dhw:0,0 -c 2 -r 44100 -f S16_LE -d 10 /tmp/record.wav`
### 2. 查看帮助
~~~shell
arecord -h
~~~
### 3. 查看录音设备
~~~shell
arecord -l
~~~



	
