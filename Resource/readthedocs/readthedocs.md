---
tags: Docs
---

# sphinx 文档
1. 编译文档
```shell
sphinx-build -b html docs build
make html
```

## demo 
- 嵌入网页和视频：[Sphinx-embed-object-iFrame-video-html-PDF-twitter-examples](https://pandemic-overview.readthedocs.io/en/latest/myGuides/Sphinx-embed-object-iFrame-video-html-PDF-twitter-examples.html)
- [Sphinx-embed-object-iFrame-video-html-PDF-twitter-examples.rst](https://github.com/coding-to-music/coding-to-music.github.io/edit/master/docs/source/myGuides/Sphinx-embed-object-iFrame-video-html-PDF-twitter-examples.rst)

* 文档配置：[Configuration File V2 — Read the Docs user documentation 8.3.4 documentation](https://docs.readthedocs.io/en/stable/config-file/v2.html#search)
* [Configuration — Sphinx documentation](https://www.sphinx-doc.org/en/master/usage/configuration.html)

---
## 去除 “edit on GitHub”
1. 在 docs 目录新建_`templates`文件夹
2. 在`_templates`下新建`breadcrumbs.html`文件，添加以下内容
```html
{%- extends "sphinx_rtd_theme/breadcrumbs.html" %}

{% block breadcrumbs_aside %}
{% endblock %}
```

* [Removing “Edit on …” Buttons from Documentation](https://docs.readthedocs.io/en/stable/guides/remove-edit-buttons.html)