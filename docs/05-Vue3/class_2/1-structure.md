---
title: 2.1 - 目錄結構說明
sidebar_label: "2.1 - 目錄結構說明"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 vite+vue3 專案中的資料夾結構差不多會和下面的內容一樣，不至於差太多

## 專案的資料夾結構

```
project/
├── public/            # 靜態資源
├── src/
│   ├── assets/        # 圖片、CSS、字型等
│   ├── components/    # Vue 元件
│   ├── store/         # Pinia 狀態管理（集中管理全域狀態）
│   ├── router/        # 路由設定（router/index.js）
│   ├── utils/         # 工具函式、API 模組（如 axios 設定、api.js）
│   ├── views/         # 放置頁面內容的資料夾
│   ├── App.vue        # 根組件
│   └── main.js        # 程式入口
├── index.html         # 頁面模板
├── package.json       # 專案設定
├── vite.config.js     # Vite 設定
└── ...                # 其他檔案，如：.gitignore、README.md
```

### 說明補充

- **public/**  
  放置靜態檔案，例如 favicon.ico、靜態圖片。這裡的檔案在程式碼中使用時，可以直接透過絕對路徑 `/` 引用，例如 `/logo.png`。

- **assets/** vs **public/**

  - `assets/` → 會經過 Vite 編譯與壓縮，適合放常用的圖片、樣式檔。
  - `public/` → 不會被編譯，原樣輸出，適合放大型檔案或不需要打包的資源。

- **views/**  
  每個檔案通常對應到一個路由，例如：

  - `HomeView.vue` → `/`
  - `LoginView.vue` → `/login`

- **components/**  
  放置可重複使用的小元件，例如：

  - `NavBar.vue`
  - `TodoItem.vue`
  - `FormInput.vue`

- **store/**  
  使用 [Pinia](https://pinia.vuejs.org/) 進行狀態管理：

  - `user.js` → 管理使用者登入狀態
  - `cart.js` → 管理購物車資料

- **router/**  
  集中管理路由設定，通常檔案名稱為 `index.js` 或 `index.ts`。

- **utils/**  
  放置工具與 API 模組，例如 axios 設定、格式化函式。

---

### 簡單結論

- **views**：整個頁面（與路由對應）。
- **components**：頁面裡的零件，可重複使用。
- **store**：全域狀態集中管理（Pinia）。

👉 這樣結構能讓專案更有層次，隨著功能擴充也比較好維護。
