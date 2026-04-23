---
title: 9.2 - 開發/正式環境設定
sidebar_label: "9.2 - 開發/正式環境設定"
keywords:
  - Vue3
tags:
  - Vue3
---

在開發 Vue3 + Vite 專案時，我們常會面臨不同環境下的需求差異，  
例如：開發時要連本機伺服器、正式上線後要連線到雲端 API。

本章將說明如何利用 **Vite 的環境設定機制** 搭配 `.env` 檔案，  
清楚地區分「開發（Development）」與「正式（Production）」環境設定。

## 1. 環境的基本概念

Vite 會依照執行命令自動設定環境模式：

| 環境模式                  | 指令                            | 使用的 `.env` 檔案 | 典型用途       |
| ------------------------- | ------------------------------- | ------------------ | -------------- |
| 開發環境 (Development)    | `npm run dev` 或 `vite`         | `.env.development` | 本機開發與除錯 |
| 正式環境 (Production)     | `npm run build` 或 `vite build` | `.env.production`  | 上線打包版本   |
| 自訂模式 (Staging / Test) | `vite build --mode staging`     | `.env.staging`     | 測試或預備環境 |

📌 **重點：**

- `VITE_` 前綴是必要的，否則無法被前端讀取。
- 每種環境的變數會自動被合併與覆蓋。

## 2. 實際範例：開發與正式環境

### 📄 `.env.development`

```env
VITE_APP_TITLE=projectname (開發環境)
VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEBUG=true
```

### 📄 `.env.production`

```env
VITE_APP_TITLE=projectname
VITE_API_BASE_URL=https://api.projectname.com/api
VITE_DEBUG=false
```

### 📄 `.env.staging`

```env
# 測試環境
VITE_APP_TITLE=My Vue App (Staging)
VITE_API_BASE_URL=https://staging.api.example.com
VITE_DEBUG=true
```

## 3. 在程式中依環境載入不同設定

### ✅ 在 Vue 組件或 JS 模組中使用

```javascript
// src/utils/config.js
export const APP_TITLE = import.meta.env.VITE_APP_TITLE;
export const API_URL = import.meta.env.VITE_API_BASE_URL;
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
```

使用：

```javascript
import { API_URL, IS_DEV } from "@/utils/config";

if (IS_DEV) {
  console.log("目前是開發環境，API:", API_URL);
}
```

📌 `import.meta.env.DEV` 與 `import.meta.env.PROD` 是 Vite 內建的布林值，可直接判斷當前模式。

## 4. 自訂執行模式（例如：staging 測試環境）

若需要第三種環境（例如測試伺服器），  
可以新增 `.env.staging` 檔，然後在 `package.json` 中加入指令：

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

當執行 `npm run build:staging` Vite 就會自動使`.env.staging`

## 5. 結合 Axios 與環境設定（實務範例）

```javascript
// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// 例如正式環境打 Log 時不顯示除錯訊息
if (import.meta.env.PROD) {
  console.log = () => {};
}

export default api;
```

## 6. 開發與正式環境的差異重點整理

| 類別        | 開發環境 (dev)                       | 正式環境 (prod)              |
| ----------- | ------------------------------------ | ---------------------------- |
| API 網址    | 通常是本機或測試伺服器 (`localhost`) | 正式後端主機                 |
| 除錯模式    | 開啟 (`VITE_DEBUG=true`)             | 關閉                         |
| Source Map  | 開啟（方便除錯）                     | 關閉（避免暴露程式碼）       |
| Console Log | 顯示全部訊息                         | 可隱藏或精簡                 |
| 代理設定    | 可使用 `server.proxy`                | 不需要代理，直接請求正式 API |
| 打包體積    | 未壓縮                               | 會壓縮與最小化               |

## 7. 提示：環境安全與版本控管

- `.env` 檔案通常會被版本控制（Git）追蹤，  
  但若含敏感資訊（如 token、金鑰），建議放入 `.gitignore`。
- 建議在專案中建立 `.env.example` 作為模板，內容如下：

```env
# 範例檔案 (.env.example)
VITE_API_BASE_URL=
VITE_APP_TITLE=
VITE_DEBUG=false
```
