---
tags: Android 
---

## odm. img 挂载出来之后，空间不足
```shell
sudo mount odm.img odm  
mkdir new_odm  
cp -rf odm/* new_odm  
sudo cp -raf xunfei/ odm/bundled_uninstall_back-app/  
sudo ./mk-image.sh # 制作镜像  
sudo chmod industio:industio new_odm.img  # 修改属主  
mv new_odm.img odm.img
```

![](assets/mk-image.sh)

## Link 
- [Android super.img的解包和重新组包\_img文件解包\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/131071766)