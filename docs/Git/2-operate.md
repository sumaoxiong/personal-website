---
title: Git & GitHub 操作
sidebar_label: "Git & GitHub 操作"
keywords:
  - git
tags:
  - git
---

## GitHub 操作

### 1. 建立遠端倉庫

- 到 [GitHub ](https://github.com) 建立一個新 Repository（專案庫）。

### 2. 與本地專案連結

```sh
git remote add origin https://github.com/你的帳號/專案名稱.git
```

### 3. 推送到 GitHub

```sh
git branch -M main     # 確保分支名稱為 main
git push origin main
```

### 4\. 後續更新

```sh
git add .
git commit -m "更新說明"
git push
```
