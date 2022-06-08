---
tags:
  - CAN
---
## CAN 编程
```c
if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
	perror("Socket");
	return 1;
}
```
### Link
- [GitHub - craigpeacock/CAN-Examples: Example C code for CAN Sockets on Linux](https://github.com/craigpeacock/CAN-Examples)
- [CAN Bus - eLinux.org](https://elinux.org/CAN_Bus)