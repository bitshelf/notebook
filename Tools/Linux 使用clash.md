---
tags:
  - Linux
---
## 使用
```shell
cd clash
./clash -d ./&
```

## 使用 UI
- 修改 `config.yaml`
```yaml
external-controller: :9090
sercet: 'xxxxx' 
external-ui: /home/pi/clash/yacd-gh-pages/
```
- `sercet` 登录验证密码
- 访问：`ip:9090/ui`

![](assets/clash.tgz)