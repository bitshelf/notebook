---
tags: Android
---

# 产品配置结构
```shell
device                                                                                                        
└── company_name                                                                                              
    ├── board_name                                                                                            
    │   ├── AndroidBorard.mk                                                                                  
    │   └── BoardConfig.mk                                                                                    
    └── products                                                                                              
        ├── AndroidProducts.mk                                                                                
        ├── First_product_name.mk                                                                             
        └── Second_product_name.mk                                                                            
```

* 产品配置主要集中在源码中的 device/, build/target/, vendor 目录