---
title: 9.3 - 專案打包與部署
sidebar_label: "9.3 - 專案打包與部署"
keywords:
  - Vue3
tags:
  - Vue3
---

當你的 Vue3 + Vite 專案開發完成後，最後一步就是 **打包 (Build)** 與 **部署 (Deploy)**。  
這章將介紹如何正確地將 Vite 專案打包、調整輸出設定、  
以及如何部署到常見的平台（GitHub Pages、Netlify、Render、Hostinger 等）。

## 1. 打包指令

Vite 內建打包命令，不需要額外安裝任何工具：

```bash
npm run build
```

執行後，Vite 會：

- 自動讀取 `.env.production`
- 進行程式壓縮、Tree Shaking、Minify
- 產出最終部署檔案到 `dist/` 資料夾

## 2. 預設打包結構

打包完成後，專案會產出以下結構：

```perl
dist/
├── assets/                # 靜態資源（CSS、JS、圖片）
│   ├── index-xxxx.css
│   ├── index-xxxx.js
│   └── logo.svg
├── index.html             # 網站主頁
└── manifest.webmanifest   # PWA 設定（若有使用）
```

這些檔案即可直接部署到任意靜態網站伺服器上。

## 3. 自訂打包輸出設定

你可以在 `vite.config.js` 中客製打包輸出規則。

### 🧩 基本設定

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist", // 打包輸出資料夾
    assetsDir: "assets", // 靜態資源資料夾名稱
    sourcemap: false, // 是否輸出 source map
    minify: "esbuild", // 壓縮方式：'terser' 或 'esbuild'
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"], // 將第三方套件拆分
        },
      },
    },
  },
});
```

📌 **重點**

- `manualChunks` 可以拆分大型依賴，提升快取利用率。
- `sourcemap` 若設為 `true`，可在正式環境除錯，但建議上線時關閉。

## 4. 本地預覽打包結果

在打包完成後可使用：

```bash
npm run preview
```

這會啟動一個本地伺服器，模擬正式上線後的運行環境。
預設網址是：  
👉 http://localhost:4173

## 5. 部署到 GitHub Pages

### (1) 在 `vite.config.js` 設定 base

若專案不是放在根目錄，例如在 GitHub Pages 上的 `/my-app/`：

```javascript
export default defineConfig({
  base: "/my-app/",
});
```

### (2) 建立部署指令

在 `package.json` 加入：

```javascript
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

:::warning
這個 `deploy` 指令會先執行 `npm run build`，再執行 `gh-pages -d dist`。  
請確認 `package.json` 中已有 `build` 腳本（Vite 專案預設為 `vite build`），否則需要自行新增或修改成對應的建置指令。

:::

然後安裝套件：

```bash
npm install gh-pages --save-dev
```

- gh-pages 套件：https://www.npmjs.com/package/gh-pages?activeTab=readme

執行：

```bash
npm run deploy
```

📌 GitHub Pages 會自動部署 `dist` 內容至 `gh-pages` 分支。

> 以上操作做完後要去 GitHub repo 的 Settings 中的 pages 項目查看 GitHub Pages 的分支是否有設定正確

進階設定請到下一章節 [Vite 專案部署到 GitHub Pages 的 Base 路徑設定](/HkFec0u6le) 中觀看

## 6. 小結

| 主題          | 重點                                             |
| ------------- | ------------------------------------------------ |
| 打包指令      | `npm run build` → 輸出至 `dist/`                 |
| 預覽          | `npm run preview` 可模擬正式環境                 |
| 調整設定      | 透過 `build` 屬性客製 outDir、壓縮等             |
| 常見平台      | GitHub Pages、Netlify、Render、Vercel、Hostinger |
| Router 須注意 | SPA 需設定 `.htaccess` 或 Redirects              |
| 最佳實務      | 使用自動化部署（CI/CD）確保版本一致              |

✅ **實務建議**

- 若是前端練習或個人作品 → 可以透過 github pages 的方式展示
- 若是公司專案 → 可使用 **Render / 自建伺服器**。
- 若搭配後端 API → 確保 CORS、環境變數、HTTPS 都配置正確。
