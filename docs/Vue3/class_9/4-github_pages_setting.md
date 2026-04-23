---
title: 9.4 - GitHub Pages 設定
sidebar_label: "9.4 - GitHub Pages 設定"
keywords:
  - Vue3
tags:
  - Vue3
---

在使用 gh-pages 將 dist 資料夾部署到 GitHub 的 gh-pages 分支之前，我們必須先在 vite.config.js 中調整 base 路徑。

舉例來說：

```js
base: "/github-repo-名稱/";
```

這樣做能讓 GitHub Pages 正確找到靜態檔案。

## 問題：本地開發與部署環境不一致

平常我們會用 `npm run dev` 在本地端啟動專案。
如果 `base` 被設定成 `/github-repo-名稱/`，在本地開發時路由就會出現以下狀況：

- 頁面會詢問是否要轉跳到` /github-repo-名稱/login`
- 點擊後卻是空白頁面
- 但 Vue Devtools 還是能顯示，我們可以用它手動轉跳到路由

這樣每次切換「開發」與「部署」環境，都要重複修改 base，流程非常麻煩。

--

## 解法：使用 Vite 的環境檔 (.env)

根據 [Vite 官方文件](https://vite.dev/guide/env-and-mode.html#node-env-and-modes) ，Vite 預設會根據指令載入不同的` .env` 檔案：

- `npm run dev` → 會載入 `.env.development`
- `npm run build` → 會載入 `.env.production`
- ## `.env` → 兩者皆會載入（共用設定）

## 實作步驟

1. 在專案中新增環境檔案：

- `.env.development`
- `.env.production`

2. 在檔案中設定不同環境下的 `VITE_BASE_URL`（如下圖）
3. 修改 vite.config.js，讀取環境變數設定 base（如下圖）

## 成果

這樣一來：

- 本地開發 (`npm run dev`) → 自動套用 `.env.development`
- 部署 GitHub Pages (`npm run deploy`) → 自動套用 `.env.production`

再也不需要手動切換 `base` 路徑了
