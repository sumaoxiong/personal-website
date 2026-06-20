---
title: Git 基本指令
sidebar_label: "Git 基本指令"
keywords:
  - git
tags:
  - git
---

> 不管是在開發哪種程式語言的專案時，版本控制是必備技能。  
> **Git** 是最常用的版本控制工具，而 **GitHub** 則是儲存與協作的平台。

## 常用 Git 基本指令

### 1. 初始化專案

```sh
git init
```

在資料夾建立 Git 版本庫。

### 2. 檢查狀態

```sh
git status
```

- 查看哪些檔案被修改或新增。
- 確認目前所在的分支

### 3. 新增檔案到暫存區

```sh
git add 檔案名稱
git add .   # 全部檔案
```

> 請選擇其中一個使用，較常使用到的是`git add .`這個指令，除非是希望將 commit 紀錄做仔細的紀錄才會去使用`git add 檔案名稱`

### 4. 提交紀錄

```sh
git commit -m "描述這次修改的訊息"
```

### 5. 將記錄提交到 GitHub 中

```sh
git push origin main
```

> 指令中的 main 是指分支，如果分支名稱為`feature/abc`，那麼指令就會變成`git push origin feature/abc`

### 6. 查看提交紀錄

```sh
git log
```

> 這邊會更建議直接在 Vscode 左邊 sidebar 中由上到下第三個選項中(vscode 預設頁面)，點擊後會有一個"變更"的區塊

使用`git log`後如果要讓終端機恢復可以繼續輸入整令的狀態請按下鍵盤上的`Q`就可以了
