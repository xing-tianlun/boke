---
title: git 协同开发
date: 2022-01-08
tags:
 - git
categories: 
 - git
---



## 协同开发（git 的使用）

### 使用步骤

```js
# 1. 克隆远程仓库主分支
git clone git@gitee.com:xingtianlun/qqq.git
git clone https://yourname:password@gitee. comxxx/demo.git
# 2. 创建本地分支
git beanch -b [分支名]
# 3. 写项目
# 4. 切换到主分支
git checkout master
# 5. 拉取最新的远程分支
git pull origin master
# 6. 将自己的分支与本地主分支合并
git merge '分支名'
# 7. 将主分支 push 到远程仓库
git push origin master
```



### 常用命令

```js
# 创建本地分支
git branch [分支名]
# 切换本地分支
git checkout [分支名]
# 创建本地分支并切换到该分支
git branch -b [分支名]
# 查看远程分支
git branch -r
# 查看本地和远程所有分支
git branch -a
# 拉取远程分支
git pull orign [分支名]
# 合并分支
git merge [分支名]
# 查看当前修改信息
git status
# 查看版本
git log
# 版本回滚
git reset --hard 版本号
# 查看所有版本提交记录
git reflog
# 设置标签名
git tag [标签名]
```



### Git 的区域划分

```js
# workspace 工作区	 
# index / stage 暂存区       
# Repository 仓库区     
# Remote 远程仓库
```

