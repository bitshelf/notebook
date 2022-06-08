---
tags: NPU
---

# RKNN 版本查询
* 查询 NPU 驱动版本: `dmesg | grep -i galcore`
* 查询 rknn_server 版本: `strings /usr/bin/rknn_server | grep build`
* 查询 librknn_runtime 版本: 
	* `trings /usr/lib/librknn_runtime.so | grep build` 
	*  `strings /usr/lib/librknn_runtime.so | grep build |grep version`
* 通过 RKNN API 获取 SDK 版本信息
```` ad-info
~~~c
	rknn_sdk_version version
	
    ret = rknn_query(ctx, RKNN_QUERY_SDK_VERSION, &version,
                    sizeof(rknn_sdk_version));
    printf("api version   : %s\n", version.api_version);
    printf("driver version: %s\n", version.drv_version);
~~~
* api_version：api 自身版本号
* drv_version：rknn_server 的版本号(注意这里不是驱动 ko 文件的版本号)
````



