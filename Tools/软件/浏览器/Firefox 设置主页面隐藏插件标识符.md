---
tags:
  - Firefox
---
## windows 打开 profiles 路径
1. 输入：`about:config`
2. `toolkit.legacyUserProfileCustomizations.stylesheet` 改为 `true`
3. 输入 `about:support` 打开 Profiles (或者按键  ![Windows Key](https://assets-prod.sumo.prod.webservices.mozgcp.net/media/uploads/gallery/images/2011-09-20-08-33-13-ff63c4.jpg) +R: ` %APPDATA%\Mozilla\Firefox\Profiles\`）
```css
/* 隐藏urlbar上的插件标识符 */
#identity-box.extensionPage #identity-icon-label {
  display: none !important;
}

#identity-icon-box {
  background: none !important;
}
  
#urlbar #identity-box.extensionPage #identity-icon-label {
  display: none !important;
}

#identity-icon,
#identity-permission-box {
    display:none !important;
}
```
![](assets/firefox%20profile%20配置示例.png)
## link
- [用户配置文件——Firefox](https://support.mozilla.org/zh-CN/kb/%E7%94%A8%E6%88%B7%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E2%80%94%E2%80%94Firefox%20%E4%BF%9D%E5%AD%98%E4%B9%A6%E7%AD%BE%E3%80%81%E5%AF%86%E7%A0%81%E5%92%8C%E5%85%B6%E4%BB%96%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE%E7%9A%84%E6%96%87%E4%BB%B6)
- [Firefox 浏览器个性化定制指南 · 云原生实验室](https://icloudnative.io/posts/customize-firefox/)
- [用下面这些方法，为自己高度定制一个 Firefox 浏览器 - 少数派](https://sspai.com/post/58605)