---
title: 將專案上傳至Github
sidebar_label: "將專案上傳至Github"
keywords:
  - React
  - github
tags:
  - React
---

## 上傳至 github 的操作步驟

1. 在檔案表中新增一個叫做`.gitignore`的檔案，這個檔案可以會讓我們再將檔案上傳時將特定的檔案不會上傳到 github 中
2. 在`.gitignore`檔案中貼上下面的內容，可以依照自己專案的內容修改，如果不知道也可以直接貼給 AI 請 AI 幫忙修改

   ```env
   # Logs
   logs
   *.log
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   pnpm-debug.log*
   lerna-debug.log*

   node_modules
   .DS_Store
   dist
   dist-ssr
   coverage
   *.local

   .env

   /cypress/videos/
   /cypress/screenshots/

   # Editor directories and files
   .vscode/*
   !.vscode/extensions.json
   .idea
   *.suo
   *.ntvs*
   *.njsproj
   *.sln
   *.sw?

   *.tsbuildinfo
   .env
   ```

3. 開啟終端機（Terminal），進入你的專案資料夾。

```bash
cd 專案名稱
```

4. 初始化 Git 專案（只需第一次執行）。

```bash
git init
```

5. 將目前所有檔案加入 Git 暫存區。

```bash
git add .
```

6. 建立第一次提交紀錄（commit）。

```bash
git commit -m "first commit"
```

7.  到 GitHub 官網登入帳號，新增一個 Repository（專案倉庫）。

    - 點選右上角 `+`
    - 選擇 `New repository`
    - 輸入專案名稱
    - 點擊 `Create repository`

8.  建立完成後，GitHub 會提供連線指令，將它貼到終端機執行。

```bash
git remote add origin https://github.com/你的帳號/專案名稱.git
git branch -M main
git push -u origin main
```

9. 上傳完成後，重新整理 GitHub 頁面，就可以看到你的專案檔案。
