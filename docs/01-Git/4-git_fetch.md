---
title: 同步、復原與排錯
sidebar_label: "4. 同步、復原與排錯"
keywords:
  - git
  - fetch
  - pull
  - restore
  - reflog
tags:
  - git
---

## `fetch` 、`pull` 與 `push` 的差別

| 指令 | 資料方向 | 是否改動目前工作分支 |
| --- | --- | --- |
| `git fetch` | 遠端 → 遠端追蹤分支 | 否 |
| `git pull` | 遠端 → 目前分支 | 是；會 fetch 後 merge 或 rebase |
| `git push` | 本機分支 → 遠端 | 否，但會改動遠端 |

`origin/main` 是 Git 在上一次 fetch 後，對遠端 `main` 的本機紀錄；`main` 則是可以直接開發與 commit 的本機分支。

## 安全檢查遠端進度

```sh
git fetch origin --prune
git status
git branch -vv
git log --oneline --graph --decorate --all
git diff main..origin/main
```

- `fetch` 下載新 commit、tag 與分支資訊，不會合併或改動工作檔案。
- `--prune` 移除已不存在於遠端的「遠端追蹤分支」，不會刪掉本機分支。
- `main..origin/main` 表示比較本機 `main` 到遠端追蹤 `origin/main` 的差異。

其他 fetch 用法：

```sh
git fetch origin            # 取得 origin 的更新
git fetch origin main       # 只取得 origin 的 main
git fetch --all --prune     # 取得所有遠端並清理過期參照
git fetch -v                # 顯示較詳細的過程
```

## 選擇 `pull` 策略

```sh
git pull --ff-only   # 只允許直線前進，共用主分支建議使用
git pull --rebase    # 取得更新後，重放本機尚未 push 的 commit
git pull --no-rebase # 取得更新後 merge
```

不要在不知道專案策略時盲目使用沒有參數的 `git pull`。可設定個人預設，例如：

```sh
git config --global pull.ff only
```

這會讓無參數的 `git pull` 只接受 fast-forward。若團隊有明確的 rebase / merge 規範，應改用團隊規範。

## 暫時收起未完成的修改

需要緊急切換分支，但目前內容還不適合 commit 時：

```sh
git stash push -u -m "WIP: login validation"
git stash list
git switch other-branch
```

`-u` 會同時收起 untracked files。恢復時：

```sh
git stash pop              # 套用並在成功後移除該筆 stash
git stash apply stash@{0}  # 套用但保留 stash
git stash drop stash@{0}   # 刪除指定 stash
```

stash 適合短期切換情境，不應當作長期備份。

## 復原速查表

執行前先用 `git status` 與 `git diff` 確認修改是否已 commit / push。

| 目的 | 指令 | 結果 |
| --- | --- | --- |
| 放棄某檔案尚未暫存的修改 | `git restore path/to/file` | 工作內容會消失 |
| 將檔案移出暫存區 | `git restore --staged path/to/file` | 保留檔案修改 |
| 修改最後一個尚未 push 的 commit | `git commit --amend` | 改寫最後一個 commit |
| 取消最後一個尚未 push 的 commit | `git reset --soft HEAD~1` | 保留且暫存修改 |
| 取消已 push 的 commit | `git revert commit-id` | 新增一個反向 commit，不改寫共用歷史 |

> `restore` 可能讓尚未 commit 的內容永久消失。不確定時，先建立 commit 或 stash。

### 更正最後一個 commit

漏加檔案或 commit message 寫錯，而且尚未 push：

```sh
git add forgotten-file
git commit --amend
```

只修改訊息：

```sh
git commit --amend -m "fix: correct validation message"
```

`amend` 會產生新 commit ID。若已推送到共用分支，應建立新 commit，不要 amend 後強制推送。

### 安全取消已公開的 commit

```sh
git revert commit-id
git push
```

`revert` 不會刪除舊歷史，而是建立一個新 commit 抵銷指定改動，適合團隊共用分支。

### 找回誤刪的 commit 或分支

```sh
git reflog
git show commit-id
git switch -c recovery/branch commit-id
```

`reflog` 記錄本機 `HEAD` 曾經指向的位置，常能救回誤 reset、rebase 或刪除分支後一時找不到的 commit。它只是本機記錄，不應當作備份。

## 常見錯誤

### `remote origin already exists`

```sh
git remote -v
git remote set-url origin git@github.com:account/project.git
```

先確認現有 URL。只有在確定不再需要該連結時，才使用 `git remote remove origin`。

### `rejected (non-fast-forward)`

通常代表遠端分支有本機尚未取得的 commit：

```sh
git fetch origin
git log --oneline --graph --decorate --all
```

查看歷史後，根據團隊策略使用 rebase 或 merge，解決後再 push。不要為了讓錯誤消失就直接 `git push --force`。

### `Your local changes would be overwritten`

Git 為了避免覆寫未提交內容而停止操作。依內容狀態選擇：

```sh
git commit                 # 內容已是一個合理的版本
git stash push -u          # 只是暫時收起
git restore path/to/file   # 確定不需要這些修改
```

### 分支看不到剛被推送的遠端進度

```sh
git fetch origin --prune
git branch -a
git branch -vv
```

### 不確定指令做了什麼

```sh
git help command-name
git command-name -h
```

例如 `git help rebase` 開啟完整手冊，`git rebase -h` 顯示簡短用法。
