---
title: git 推送
date: 2022-01-08
tags:
 - git
categories: 
 - git
---

git 同步到 github



git init
git add .
git commit -m '注释'
git remote add origin git@github.com:xing-tianlun/testvue.git
git push -u origin master // 第一次上传
git push origin master // 之后上传

如果新建远程仓库不是空的，例如你勾选了 Initialize this repository with a README。那么你通过命令 $ git push -u origin master是会报错的，
这是由于你新创建的那个仓库里面的README文件不在本地仓库目录中，这时我们可以通过以下命令先将内容合并以下：
$ git pull --rebase origin master
再输入$ git push origin master。
等远程仓库里面有了内容之后，下次再从本地库上传内容的时候只需下面这样就可以了：
$ git push origin master。
至此就完成了将本地项目上传到Github的整个过程。





清除本地缓存 git rm -r --cached .
查看所有分支 git branch
生成ssh密钥 ssh-keygen -t rsa -C "gudujianjsk@gmail.com"








