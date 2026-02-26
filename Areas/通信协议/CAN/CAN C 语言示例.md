---
tags:
  - CAN
---

## CAN C 语言示例

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <linux/can.h>
#include <linux/can/raw.h>
#include <sys/socket.h>
#include <net/if.h>
#include <sys/ioctl.h>
#include <fcntl.h>

int main() {
  int sock;
  struct sockaddr_can addr;
  struct can_frame frame;

  // 创建 Socket
  sock = socket(PF_CAN, SOCK_RAW, CAN_RAW);
  if (sock < 0) {
      perror("Socket");
      return 1;
  }

  // 获取 can0 接口
  struct ifreq ifr;
  strcpy(ifr.ifr_name, "can0");
  ioctl(sock, SIOCGIFINDEX, &ifr);

  // 绑定 Socket
  addr.can_family = PF_CAN;
  addr.can_ifindex = ifr.ifr_ifindex;
  bind(sock, (struct sockaddr *)&addr, sizeof(addr));

  // 发送消息
  frame.can_id = 0x123;
  frame.can_dlc = 4;
  memcpy(frame.data, "\xde\xad\xbe\xef", 4);
  write(sock, &frame, sizeof(struct can_frame));

  // 接收消息
  while (1) {
      int nbytes = read(sock, &frame, sizeof(struct can_frame));
      if (nbytes > 0) {
          printf("Received: ID: 0x%X Data: ", frame.can_id);
          for (int i = 0; i < frame.can_dlc; i++) {
              printf("%02X ", frame.data[i]);
          }
          printf("\n");
      }
  }

  close(sock);
  return 0;
}
```

## Link

- [CAN 使用 \| RDK X3/X5 DOC](https://developer.d-robotics.cc/rdk_x_doc/Advanced_development/hardware_development/rdk_x5/can?v=3.5.0&p=RDK+X5)
