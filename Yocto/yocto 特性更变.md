---
tags:
  - yocto
---
## debug-tweaks
- The `debug-tweaks image feature` has been removed
- Can be easily replaced by stating each debug feature explicitely:
```bitbake
IMAGE_FEATRURES +="
	allow-empty-password \
	allow-root-login \
	empty-root-password \
	post-install-logging \
"
```
## USERADD_DEPENDS
- `recipe-1.bb`
```bitbake:recipe-1.bb
inherit useradd

# group is created here
GROUPADD_PARAM:${PN} = "-r mygroup"
```
- `recipe-2.bb`
```bitbake:recipe-2.bb
inherit useradd

USERADD_DEPENDS += "recipe-1"

# used there
USERADD_PARAMS:${PN} = "--gid mygroup user2"
```
## Link
- [embedded-recipes.org/2025/images/slides/yocto-project-news.pdf](https://embedded-recipes.org/2025/images/slides/yocto-project-news.pdf)