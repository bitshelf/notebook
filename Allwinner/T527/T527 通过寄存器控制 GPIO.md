---
tags:
  - T527
---

## 以 PJ24 为例
### 找到 GPIO 的基地址
![](assets/1740624064651-a7066745-3c58-4b3e-9b54-9ae1a2b1a38b.png)

### 找到 PJ 这组 GPIO 的偏移地址
![](assets/1740625476378-ac4a342f-729a-487d-97a3-af3cd0e8fa11.png)

#### 查看 PJ 这组GPIO 的模式
```shell
echo 0x020001BC > /sys/class/sunxi_dump/dump
cat /sys/class/sunxi_dump/dump
```

![](assets/1740626818600-1e39bf31-596b-4641-b2ce-7c1d82f82f5a.png)

### PJ24 设置输出模式： 
```shell
echo 0x020001BC 0x0000fff1 > /sys/class/sunxi_dump/write
```

![](assets/1740625627775-dce8566a-f1df-4dc8-ac82-f0bbea64a327.png)

#### 查看当前 PJ24 输出模式下的 GPIO 电平
```shell
echo 0x020001C0 > /sys/class/sunxi_dump/dump
cat /sys/class/sunxi_dump/dump
```

![](assets/1740626233003-a12eda18-afbe-4bd0-b36a-1ee09e7dae1a.png)

#### 设置 PJ24 的 value 值为 1：
```shell
echo 0x020001C0 0x01070000 > /sys/class/sunxi_dump/write
cat /sys/class/sunxi_dump/dump # 查看值
```

![](assets/1740626050468-e8b3de83-aa25-4478-9825-8444f46bb44a.png)

![](assets/1740627948423-8fd53ae1-9b62-4801-9306-ebe2b81f7a46.png)

