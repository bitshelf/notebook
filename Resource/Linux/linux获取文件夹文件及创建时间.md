---
tags: Linux/script
---

# 获取文件夹下文件名及创建时间

~~~shell
for image in `find ./ -name "*.img"`; do  filename=`basename $image`; filetime=`stat --printf='%y' $image | awk '{print $1}'`; echo -e "$filetime\t$filename"; done
~~~
