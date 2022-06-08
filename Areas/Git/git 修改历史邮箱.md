---
tags:
  - Git
---
# 修改历史 git 记录邮箱
```shell
git filter-branch -f --env-filter '
OLD_EMAIL="ljzyx86@qq.com"
CORRECT_NAME="JZ Loh"
CORRECT_EMAIL="JZ.luo@myir"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```