---
title: 多人協作與分支流程
sidebar_label: "3. 多人協作與分支"
keywords:
  - git
  - branch
  - pull request
  - rebase
tags:
  - git
---

實務上通常不直接在 `main` 開發，也不在本機直接把 feature 分支合併回 `main`。團隊會保護 `main`，要求透過 Pull Request（PR）進行自動檢查與 Code Review，再由 GitHub 合併。

## 常用分支指令

```sh
git branch                       # 本機分支
git branch -a                    # 本機＋遠端追蹤分支
git branch -vv                   # 分支的 upstream 與領先/落後狀態
git switch main                  # 切換到 main分支
git switch -c feature/login      # 建立並切換到新分支
git branch -m new-name           # 重新命名目前分支
```

`git checkout main` 與 `git checkout -b feature/login` 仍可使用，但 `switch` 專門處理分支，意圖較清楚。

## 完整協作流程

### 1. 從最新 `main` 建立工作分支

```sh
git switch main
git pull --ff-only
git switch -c feature/login
```

`--ff-only` 只允許 fast-forward，如果本機 `main` 有未同步的分叉，Git 會停下來而不會自動製造 merge commit。

常見命名方式：

```text
feature/login
fix/cart-total
docs/setup-guide
refactor/api-client
```

若團隊有 ticket，可加上編號，例如 `feature/PROJ-123-login`。

### 2. 開發並建立小而清楚的 commit

```sh
git status
git diff
git add -p
git diff --staged
git commit -m "feat: add login form validation"
```

可多次 commit，不需等功能全部做完才留下紀錄。

### 3. 推送分支

```sh
git push -u origin feature/login
```

後續新增 commit 只需：

```sh
git push
```

### 4. 開啟 Pull Request

在 GitHub 將 `feature/login` PR 到 `main`，並在描述中寫清楚：

- 為什麼需要這次改動。
- 具體改了什麼。
- 如何測試，有哪些風險或截圖。
- 對應的 issue / ticket。

有 review 意見時，直接在同一分支修改、commit 與 `git push`，PR 會自動更新，不需重開 PR。

### 5. PR 合併後清理分支

```sh
git switch main
git pull --ff-only
git branch -d feature/login
git fetch --prune
```

GitHub 上的遠端分支若未由 PR 頁面刪除：

```sh
git push origin --delete feature/login
```

`git branch -d` 會在 Git 判斷分支尚未合併時拒絕刪除。`-D` 會強制刪除，使用前要先確認 commit 已不需要。

## 開始處理別人已推上去的分支

```sh
git fetch origin
git switch --track origin/feature/login
```

若本機分支名與遠端同名，新版 Git 通常也能直接：

```sh
git switch feature/login
```

## 讓工作分支跟上 `main`

當 PR 尚未合併，`main` 已有新進度，先抓遠端狀態：

```sh
git fetch origin
git switch feature/login
```

### 做法 A：rebase（適合只有自己使用的分支）

```sh
git rebase origin/main
git push --force-with-lease
```

rebase 會把 feature commits 重放到最新 `origin/main` 後方，歷史較線性，但 commit ID 會改變。不要 rebase 其他人也在使用的共用分支。

### 做法 B：merge（適合多人共用的 feature 分支）

```sh
git merge origin/main
git push
```

merge 不改寫已有 commit，對共用分支比較安全，但可能產生 merge commit。團隊若已規定策略，以團隊規範為準。

## 處理衝突

Git 會在衝突檔案放入標記：

```text
1 | <<<<<<< HEAD
目前這一側的內容
2 | =======
另一側的內容
3 | >>>>>>> branch-or-commit
```

`1 |`、`2 |`、`3 |` 是這裡為了說明加上的行號，實際衝突檔案不會出現。

1. 用 `git status` 找出衝突檔案。
2. 與相關開發者確認正確結果，編輯檔案並移除標記。
3. 執行測試後 `git add` 解決的檔案。
4. 根據原操作繼續：

```sh
# rebase 衝突
git add path/to/resolved-file
git rebase --continue

# merge 衝突
git add path/to/resolved-file
git commit
```

若不想繼續，可回到操作前：

```sh
git rebase --abort
git merge --abort
```

## 團隊建議設定

在 GitHub 對 `main` 設定 branch protection / ruleset，常見規則包含：

- 只能透過 PR 合併。
- 至少一人 review 通過。
- CI（測試、lint、build）成功後才能合併。
- 禁止 force push 與刪除主分支。

這些規則是在 GitHub 上執行，不是只靠團隊成員記得不要執行 `git merge`。
