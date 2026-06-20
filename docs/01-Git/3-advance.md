---
title: Git 進階指令
sidebar_label: "Git 進階指令"
keywords:
  - git
tags:
  - git
---

## 常用進階指令（團隊合作一定會用到）

### 1. 建立新分支

```sh
git checkout -b feature/xxxxx
```

### 2. 切換分支

```sh
git checkout main
```

### 3. 合併分支

```sh
git merge feature/xxxxx
```

> 在實務操作中會在 github 中去設定特定分支不得使用 git 的合併分支指令，只能透過在 github 中發送 pr 的方式

### 4. 分支內容變更

```sh
git fetch
```

作用是**從遠端倉庫下載最新的提交、分支、標籤資訊，但不會自動合併到你目前的分支**。

#### 📌 與 `git pull` 的差別

- `git fetch`：只下載，不合併，本地分支保持不變。
- `git pull`：等於 `git fetch` + `git merge`，會自動把遠端的更新合併進當前分支。

👉 安全習慣：

1.  先 `git fetch`
2.  用 `git diff main origin/main` 檢查差異
3.  再決定要 `merge` 還是 `rebase`
