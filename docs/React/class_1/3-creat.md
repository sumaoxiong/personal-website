---
title: 透過Vite建立React專案
sidebar_label: "1.3 - 透過Vite建立React專案"
keywords:
  - React
  - Install
  - dev
tags:
  - React
---

> 在確認好本地端的環境已經沒問題後，那就開始建構我們的 React 專案吧。

## 利用 vite 建立 React 專案

1. 請開啟此[Vite 官方文件](https://vite.dev/guide/#scaffolding-your-first-vite-project)
2. 複製這段終端機指令`npm create vite@latest` (請透過官方文件的方式刺至指令)
3. 開啟終端機，將剛剛複製的指令 **貼上** 並 **執行** (請先透過`cd`指令進對到要新增專案的資料夾中)
4. 畫面出現`Project name`時，請輸入自己的專案名稱(英文為主)，確認後再按下 Enter 鍵進入下一步驟
5. 畫面出現`Select a framework`後請選擇想要的框架，這篇筆記是以 React 為主，所以在這邊選擇`React`（之後各位新的專案要用其他的框架像是 Vue，那麼就選擇 Vue 就行）
6. 畫面出現`Select a variant`時，請選擇自己是要用 TS 或是 JS
7. 上面步驟執行完後會顯示三個指令，分別是`cd 專案名稱`、`npm install`、`npm run dev`，這時候雖然可以照這這三個指令來操作，但在這邊請先幫我透過 VS Code 開啟剛剛建立的專案
8. 請開啟 VS code 的終端機介面
9. 在 VS Code 的終端機中輸入 `npm install`，安裝需要等一下，成功執行後會在檔案列表中出現一個`node_modules`資料夾
10. 在 VS Code 的終端機中輸入`npm run dev`後會顯示一段網址像是這樣`http://localhost:5500/`，可以將這個網址複製到瀏覽器中並執行，就可以在瀏覽器畫面中看到`Vite + React`這樣就成功建立好專案了
11. 如果要關閉畫面或是將 VS Code 的終端機恢復成可以正常輸入令的情況，就請按住鍵盤的 cmd/ctrl + C 鍵
