---
title: 9.1 - 環境變數
sidebar_label: "9.1 - 環境變數"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vite 專案中，**環境變數（Environment Variables）** 用來根據不同環境（例如開發、測試、正式）  
設定對應的 API 網址、金鑰、模式或行為。

這個章節將介紹 `.env` 檔案的用途、命名規則，以及在 Vue3 專案中如何安全地存取環境變數。

## 1. 為什麼需要環境變數？

在實務開發中，我們常有多個運行環境：

| 環境     | 範例                              | 說明                   |
| -------- | --------------------------------- | ---------------------- |
| 開發環境 | `http://localhost:5173`           | 本機開發測試使用       |
| 測試環境 | `https://staging.api.example.com` | 測試 API、內部測試版本 |
| 正式環境 | `https://api.example.com`         | 上線後的正式服務       |

若直接把這些網址寫死在程式裡，部署時很容易出錯。  
使用 `.env` 檔可讓我們**根據執行模式自動切換設定**，更方便、更安全。

## 2. `.env` 檔案命名規則

Vite 支援多個環境設定檔，會根據執行模式自動載入：

| 檔案名稱           | 載入時機                           | 說明                     |
| ------------------ | ---------------------------------- | ------------------------ |
| `.env`             | 所有環境共用                       | 全域預設設定             |
| `.env.development` | `vite` 或 `npm run dev` 時         | 開發環境                 |
| `.env.production`  | `vite build` 或 `npm run build` 時 | 正式環境                 |
| `.env.staging`     | `vite --mode staging` 時           | 自訂模式（例如測試環境） |

📌 **注意**

- 變數名稱必須以 **`VITE_`** 開頭，否則無法在前端程式中讀取。
- 不建議將敏感資訊（API 金鑰、密碼）放在前端 `.env` 檔中。

## 3. 環境變數範例

### 📄 `.env.development`

```env
# 開發環境
VITE_APP_TITLE=My Vue App (Dev)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_DEBUG=true
```

### 📄 `.env.production`

```env
# 正式環境
VITE_APP_TITLE=My Vue App
VITE_API_BASE_URL=https://api.example.com
VITE_DEBUG=false
```

### 📄 `.env.staging`

```env
# 測試環境
VITE_APP_TITLE=My Vue App (Staging)
VITE_API_BASE_URL=https://staging.api.example.com
VITE_DEBUG=true
```

## 4. 在程式中使用環境變數

在 Vue 組件或 JavaScript 檔中，可以透過 `import.meta.env` 取得：

```javascript
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.VITE_API_BASE_URL);
```

📌 **說明**

- `import.meta.env` 是 Vite 提供的全域物件。
- 會自動依據當前模式載入對應的 `.env` 檔案。

### 在 API 模組中使用

```javascript
// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

export default api;
```

📌 這樣就能讓同一支程式在不同環境下，自動切換 API 網址。

## 5. 進階用法：多模式環境設定

你可以在 `package.json` 中新增自訂的啟動命令：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview"
  }
}
```

當執行 `npm run build:staging` 時，Vite 會自動讀取 `.env.staging` 的內容。

## 6. 在模板或畫面中使用環境變數

新增一個 vue router 並將頁面程式碼如下，後續再測試頁面內容是否有問題時，就可以進入這個頁面中確認當前專案運行的是哪個環境

```vue
<template>
  <footer>
    <small>目前執行環境：{{ env }}</small>
  </footer>
</template>

<script setup>
const env = import.meta.env.VITE_APP_TITLE;
</script>
```

這樣你可以直接在畫面中顯示目前的專案環境資訊，方便除錯。

## 7. 保護敏感資料（非常重要）

:::warning
⚠️ **不要在前端的 `.env` 檔放入秘密金鑰或帳號密碼！**
:::

原因：

- 所有前端 `.env` 內容都會在編譯時被「打包進前端程式」中。
- 任何人都能在瀏覽器 DevTools 中看到這些變數。

✅ **建議做法**

- 敏感資訊放在後端環境變數中（例如 Node.js 的 `.env`）。
- 前端只存放「公開設定」：API 網址、應用名稱、版本等。

## 8. 常見錯誤與解法

| 問題                           | 原因                          | 解法                         |
| ------------------------------ | ----------------------------- | ---------------------------- |
| 變數無法被讀取                 | 沒加上 `VITE_` 前綴           | 修改為 `VITE_API_URL`        |
| `.env` 修改後沒更新            | Vite 須重新啟動才能載入新內容 | 執行 `npm run dev` 重新啟動  |
| import.meta.env 顯示 undefined | `.env` 檔案命名錯誤或路徑錯誤 | 確認檔名與目錄層級           |
| 在 template 直接使用失敗       | 環境變數不能在模板中直接取用  | 先在 script 中指定變數再顯示 |

## 9. 小結

| 重點            | 說明                                            |
| --------------- | ----------------------------------------------- |
| `.env` 檔案用途 | 定義不同執行環境的設定變數                      |
| 命名規則        | 所有變數必須以 `VITE_` 開頭                     |
| 存取方式        | 使用 `import.meta.env`                          |
| 敏感資訊        | 不可放在前端 `.env`，需放後端                   |
| 切換模式        | 透過 `vite --mode xxx` 載入對應 `.env.xxx` 檔案 |

✅ **實務建議**

- 專案初期就規劃好環境變數檔，避免混亂。
- 把 `.env.production` 加入 `.gitignore`（若含敏感資訊）。
- 可在 `.env.example` 放預設變數，方便團隊共享設定格式。
