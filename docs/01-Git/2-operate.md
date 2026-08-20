---
title: 遠端倉庫與 GitHub
sidebar_label: "2. 遠端倉庫與 GitHub"
keywords:
  - git
  - github
  - remote
  - push
tags:
  - git
---

## 先選擇遠端連線方式：HTTPS 或 SSH

GitHub 提供 HTTPS 與 SSH 兩種 Git URL。兩者能完成的 Git 操作相同，差別主要在於身分驗證方式。

| 連線方式 | URL 範例 | 驗證方式 | 適合情境 |
| --- | --- | --- | --- |
| HTTPS | `https://github.com/account/project.git` | Credential Manager 或 Personal Access Token | 一般專案、希望設定流程較直覺 |
| SSH | `git@github.com:account/project.git` | 事先加入 GitHub 帳號的 SSH key | 已有 SSH key、經常操作多個倉庫 |

這份筆記的主要範例使用 **HTTPS**。在 GitHub Repository 頁面按 **Code**，切換到 **HTTPS** 後即可複製 URL。

```text
https://github.com/account/project.git
```

如果某個專案已經使用 SSH，不需重新 clone，用 `set-url` 即可轉換：

```sh
# SSH 改為 HTTPS
git remote set-url origin https://github.com/account/project.git

# HTTPS 改為 SSH
git remote set-url origin git@github.com:account/project.git

# 確認轉換結果
git remote -v
```

> 無論使用哪一種，都不要把 Personal Access Token、SSH private key 或密碼寫進倉庫。

## 查看遠端資訊

```sh
git remote -v
```

會列出遠端名稱與用於 `fetch` / `push` 的 URL，例如：

```text
origin  https://github.com/account/project.git (fetch)
origin  https://github.com/account/project.git (push)
```

`origin` 只是遠端倉庫的預設名稱，不是 GitHub 的特殊指令。可以用下列指令進一步查看：

```sh
git remote                 # 查看目前有哪些遠端儲存庫名稱
git remote get-url origin  # 查看 origin 對應的遠端儲存庫網址
git remote show origin     # 查看 origin 的詳細資訊，例如遠端網址、追蹤分支與同步狀態
```

> `git remote show origin` 可看到預設分支、追蹤關係，以及哪些遠端分支已過期。

三個指令的差異可以簡單記成：

- `git remote` 看名稱
- `git remote get-url origin` 看網址
- `git remote show origin` 看詳細資訊

## 情境 A：將現有本機專案推到 GitHub

先在 GitHub 建立一個空的 Repository。若本機已有 README，建立時不要再勾選 README、`.gitignore` 或 License，可避免遠端多出一段不同的歷史。

```sh
cd project-folder
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/account/project.git
git remote -v
git push -u origin main
```

- 將 `account` 與 `project` 分別換成自己的 GitHub 帳號與 Repository 名稱。
- `-u` 是 `--set-upstream` 的縮寫，會建立本機 `main` 與 `origin/main` 的追蹤關係。後續在該分支可直接使用 `git push` 與 `git pull`。

## 情境 B：加入已存在的專案

```sh
git clone https://github.com/organization/project.git
cd project
git remote -v
git status
```

`clone` 已經做好初始化、連結 `origin` 與建立追蹤分支，不要再執行 `git init`。

## 管理遠端

```sh
# 新增遠端
git remote add origin https://github.com/account/project.git

# 更換現有遠端的 URL
git remote set-url origin https://github.com/account/renamed-project.git

# 重新命名遠端
git remote rename origin upstream

# 移除連結；不會刪除 GitHub 上的倉庫
git remote remove origin
```

新增前先執行 `git remote -v`。若已有 `origin`，應判斷要使用 `set-url`、新增另一個名稱，還是保留現狀，而不是重複 `remote add origin`。

## 日常 push

第一次推送新分支：

```sh
git push -u origin feature/login
```

已經設定 upstream 後：

```sh
git push
```

查看目前分支追蹤哪個遠端分支：

```sh
git branch -vv
```

若看到 `has no upstream branch`：

```sh
git push -u origin HEAD
```

`HEAD` 在這裡代表「目前分支」，可減少手動輸錯分支名的機會。

## Fork 專案的兩個遠端

對於沒有原倉庫寫入權限的開源協作，慣例是：

- `origin`：自己 fork 出來的倉庫，可 push。
- `upstream`：原始倉庫，用來取得最新變更。

```sh
git clone https://github.com/my-account/project.git
cd project
git remote add upstream https://github.com/original-owner/project.git
git remote -v
git fetch upstream
```

## 需要改寫個人分支時

若已對「只有自己使用」的 feature 分支執行 rebase，一般 push 會被拒絕，此時使用：

```sh
git push --force-with-lease
```

`--force-with-lease` 會在遠端已出現本機不知道的新 commit 時拒絕覆寫，比 `--force` 安全。不要對 `main`、`develop` 或其他共用分支 force push。
