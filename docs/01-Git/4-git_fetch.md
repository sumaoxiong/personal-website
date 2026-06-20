---
title: Git fetch 常見範例
sidebar_label: "Git fetch 常見範例"
keywords:
  - git
tags:
  - git
---

## `git fetch` 常見範例

### 1\. 抓取所有遠端更新

```
git fetch origin
```

👉 只抓取 `origin` 遠端的最新內容。

### 2\. 抓取指定分支

```
git fetch origin main
```

👉 只抓取遠端 `main` 分支的最新更新。

### 3\. 同步所有遠端分支

```
git fetch --all
```

👉 如果有多個遠端（例如 `origin`、`upstream`），會一次抓取所有遠端更新。

### 4\. 顯示 fetch 的詳細過程

```
git fetch -v
```

👉 `-v` (verbose) 會顯示哪些分支有更新。

### 5\. 清理已刪除的遠端分支

```
git fetch --prune
```

👉 如果遠端刪除了某些分支，這會讓你的本地同步刪除相對應的「遠端追蹤分支」。
