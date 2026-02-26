---
tags:
  - buildroot
---
## buildroot 本地跑 CI
```shell
cd buildroot

# 1. 基础代码检查
./utils/check-package
make check-package
utils/check-symbols
utils/get-developers -v

# 2. Python tests
python3 -m pytest -v utils/checkpackagelib/
python3 -m pytest -v utils/checksymbolslib/

# 3. 生成当前 Buildroot CI
./support/scripts/generate-gitlab-ci-yml \
    support/misc/gitlab-ci.yml.in \
    > generated-gitlab-ci.yml

# 4. 查看生成结果
less generated-gitlab-ci.yml

# 5. 测试一个 defconfig
make qemu_x86_64_defconfig
./support/scripts/check-dotconfig.py \
    .config configs/qemu_x86_64_defconfig

# 6. 编译
make O=output world legal-info

# 7. QEMU 启动测试
./support/scripts/boot-qemu-image.py qemu_x86_64_defconfig

# 8. 查看 runtime tests
./support/testing/run-tests -l
```