---
tags:
  - linux/drivers
---
## cat
使用 cat xxx 时，上面的函数传入的 size 为0，那么上面的 while 循环会一直进行 read，直到出错或者 read 返回0，read 返回0也就是读到文件结尾。最后如果出错，那么返回-1，否则的话，返回读到的累计的字节数
```c
static ssize_t demo_read(struct file *fp, char __user *user_buf, size_t count, loff_t *ppos)
{
    char kbuf[10];
    int ret, wrinten;

    if (*ppos)
        return 0;

    printk(KERN_INFO "user_buf: %p, count: %d, ppos: %lld\n",
        user_buf, count, *ppos);

    wrinten = snprintf(kbuf, 10, "%s", "Hello");

    if (clear_user(user_buf, count)) {
        printk(KERN_ERR "clear error\n");
        return -EIO;
    }


    ret = copy_to_user(user_buf, kbuf, wrinten);
    if (ret != 0) {
        printk(KERN_ERR "copy error\n");
        return -EIO;
    }

    *ppos += wrinten;

    return wrinten;
}
```

## link 
- [使用cat读取和echo写内核文件节点的一些问题 - 摩斯电码 - 博客园](https://www.cnblogs.com/pengdonglin137/p/8012793.html)