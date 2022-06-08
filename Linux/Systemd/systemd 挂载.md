---
tags: Systemd
---

# systemd mount
一个示例
~~~shell
# This mount unit is for the TestFS filesystem  
# By David Both  
# Licensed under GPL V2  
# This file should be located in the /etc/systemd/system directory  
  
[Unit]  
Description=TestFS Mount  
  
[Mount]  
What=/dev/mapper/VG01-TestFS  
Where=/TestFS  
Type=ext4  
Options=defaults  
  
[Install]  
WantedBy=multi-user.target
~~~
