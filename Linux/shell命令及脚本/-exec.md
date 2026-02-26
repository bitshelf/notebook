---
tags:
  - Linux/command
---

# -exec
## -exec 包括三个参数
~~~shell
find Music/ -name *.mp3 -exec file {} \;
~~~
1. 命令（command: `file`）
2. 占位符（placeholder `{}`）
3. 命令分隔符(command delimiter: ` \;`)
> [!important] exec
> 不是 shell 执行，而是 Linux 的 `exec` 直接执行
* 输入 `find` 和 `\;`，为了告诉 `-exec` 到哪里结束（We need to provide the find command with a delimiter so it’ll know where our -exec arguments stop）
* Two types of delimiters can be provided to the -exec argument: the semi-colon(`;`) or the plus sign (`+`).
🔔 As we don’t want our shell to interpret the semi-colon, we need to escape it (`\;`).

---
# 示例
1. 加号分隔符
	~~~shell
	$ find . -name "*.mp3" -exec echo {} +
	./Gustav Mahler/01 - Das Trinklied vom Jammer der Erde.mp3 ./Gustav Mahler/02 -
	  Der Einsame im Herbst.mp3 ./Gustav Mahler/03 - Von der Jugend.mp3 ./Gustav Mahler/04 -
	  Von der Schönheit.mp3 ./Gustav Mahler/05 - Der Trunkene im Frühling.mp3
	  ./Gustav Mahler/06 - Der Abschied.mp3
	~~~
2. 分号分隔符
	~~~shell
	$ find . -name "*.mp3" -exec echo {} \;
	./Gustav Mahler/01 - Das Trinklied vom Jammer der Erde.mp3
	./Gustav Mahler/02 - Der Einsame im Herbst.mp3
	./Gustav Mahler/03 - Von der Jugend.mp3
	./Gustav Mahler/04 - Von der Schönheit.mp3
	./Gustav Mahler/05 - Der Trunkene im Frühling.mp3
	./Gustav Mahler/06 - Der Abschied.mp3
	~~~
3. 占位符 `{}`
	~~~shell
	find . -name "*.mp3" -exec bash -c "basename \"{}\" && file \"{}\" | awk -F: '{\$1=\"\"; print \$0 }'" \;
	01 - Das Trinklied vom Jammer der Erde.mp3
	  Audio file with ID3 version 2.4.0, contains MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Stereo
	02 - Der Einsame im Herbst.mp3
	  Audio file with ID3 version 2.4.0, contains MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Stereo
	03 - Von der Jugend.mp3
	  Audio file with ID3 version 2.4.0, contains MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Stereo
	04 - Von der Schönheit.mp3
	  Audio file with ID3 version 2.4.0, contains MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Stereo
	05 - Der Trunkene im Frühling.mp3
	  Audio file with ID3 version 2.4.0, contains MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Stereo
	06 - Der Abschied.mp3
	  Audio file with ID3 version 2.4.0, contains MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Stereo
	~~~
* `basename` 去除目录前缀，和尾随空格
  
  
  


