---
tags:
  - Git/repo
---
# Manifest
定义多仓库关联的清单文件（manifest 文件）保存于一个仓库中，这个仓库称为 manifest 仓库。仓库中默认的 manifest 清单文件名为 `default.xml`，示例如下。（仓库中可以包含多个 XML 文件，但是除了默认的 `default.xml` 之外，其他 XML 文件需要通过命令行的相关参数显式的指定

当 `git repo init` 命令执行完毕后，会在工作区中创建子目录 `.repo`。其中包含 manifest 清单仓库（`.repo/manifests`），以及清单文件（`.repo/manifest.xml`）文件
```xml
<!DOCTYPE manifest [
  <!ELEMENT manifest (notice?,
                      remote*,
                      default?,
                      manifest-server?,
                      remove-project*,
                      project*,
                      extend-project*,
                      repo-hooks?,
                      include*)>

  <!ELEMENT notice (#PCDATA)>
  ```
  * `remote`：指定下载的路径，`fetch=".."`代表使用`repo init -u`指定的相对路径
  * `default`：指定默认下载的路径，revision 为默认的拉取分支，后续提 PR 也可以 revision 为默认目标
  * `project`：为下载的项目<git@gitee.com:{namespace}/{name}.git>，name 项与 clone 的 URL 相关，path 是在项目中放置的路径
  * `revision`：是修订的版本，通常指向一个具体的 commitID，`repo sync`之后会 checkout 到该 commitID，也可以是一个分支名称，如果是分支名称，则`repo sync`之后，checkout 到当前分支最新 commitID
  * `upstream`：是一个分支名称，和 revision 匹配，如果 revision 是分支名称，则 upstream 不起作用，如果 revision 是 commitID，则 upstream 这是该 commitID 对象所在的分支
  * `dest-branch`: 项目所属的目标分支，当使用`repo upload`命令的时候，代码会上传到该分支
---

```xml
<!DOCTYPE manifest [
  <!ELEMENT manifest (notice?,
                      remote*,
                      default?,
                      manifest-server?,
                      remove-project*,
                      project*,
                      extend-project*,
                      repo-hooks?,
                      include*)>

  <!ELEMENT notice (#PCDATA)>

  <!ELEMENT remote EMPTY>
  <!ATTLIST remote name         ID    #REQUIRED>
  <!ATTLIST remote alias        CDATA #IMPLIED>
  <!ATTLIST remote fetch        CDATA #REQUIRED>
  <!ATTLIST remote pushurl      CDATA #IMPLIED>
  <!ATTLIST remote review       CDATA #IMPLIED>
  <!ATTLIST remote revision     CDATA #IMPLIED>

  <!ELEMENT default EMPTY>
  <!ATTLIST default remote      IDREF #IMPLIED>
  <!ATTLIST default revision    CDATA #IMPLIED>
  <!ATTLIST default dest-branch CDATA #IMPLIED>
  <!ATTLIST default upstream    CDATA #IMPLIED>
  <!ATTLIST default sync-j      CDATA #IMPLIED>
  <!ATTLIST default sync-c      CDATA #IMPLIED>
  <!ATTLIST default sync-s      CDATA #IMPLIED>
  <!ATTLIST default sync-tags   CDATA #IMPLIED>

  <!ELEMENT manifest-server EMPTY>
  <!ATTLIST manifest-server url CDATA #REQUIRED>

  <!ELEMENT project (annotation*,
                     project*,
                     copyfile*,
                     linkfile*)>
  <!ATTLIST project name        CDATA #REQUIRED>
  <!ATTLIST project path        CDATA #IMPLIED>
  <!ATTLIST project remote      IDREF #IMPLIED>
  <!ATTLIST project revision    CDATA #IMPLIED>
  <!ATTLIST project dest-branch CDATA #IMPLIED>
  <!ATTLIST project groups      CDATA #IMPLIED>
  <!ATTLIST project sync-c      CDATA #IMPLIED>
  <!ATTLIST project sync-s      CDATA #IMPLIED>
  <!ATTLIST project sync-tags   CDATA #IMPLIED>
  <!ATTLIST project upstream CDATA #IMPLIED>
  <!ATTLIST project clone-depth CDATA #IMPLIED>
  <!ATTLIST project force-path CDATA #IMPLIED>

  <!ELEMENT annotation EMPTY>
  <!ATTLIST annotation name  CDATA #REQUIRED>
  <!ATTLIST annotation value CDATA #REQUIRED>
  <!ATTLIST annotation keep  CDATA "true">

  <!ELEMENT copyfile EMPTY>
  <!ATTLIST copyfile src  CDATA #REQUIRED>
  <!ATTLIST copyfile dest CDATA #REQUIRED>

  <!ELEMENT linkfile EMPTY>
  <!ATTLIST linkfile src CDATA #REQUIRED>
  <!ATTLIST linkfile dest CDATA #REQUIRED>

  <!ELEMENT extend-project EMPTY>
  <!ATTLIST extend-project name CDATA #REQUIRED>
  <!ATTLIST extend-project path CDATA #IMPLIED>
  <!ATTLIST extend-project groups CDATA #IMPLIED>
  <!ATTLIST extend-project revision CDATA #IMPLIED>
  <!ATTLIST extend-project remote CDATA #IMPLIED>

  <!ELEMENT remove-project EMPTY>
  <!ATTLIST remove-project name  CDATA #REQUIRED>

  <!ELEMENT repo-hooks EMPTY>
  <!ATTLIST repo-hooks in-project CDATA #REQUIRED>
  <!ATTLIST repo-hooks enabled-list CDATA #REQUIRED>

  <!ELEMENT include EMPTY>
  <!ATTLIST include name CDATA #REQUIRED>
]>
```

# Link
* <https://gerrit.googlesource.com/git-repo/+/master/docs/manifest-format.md>
