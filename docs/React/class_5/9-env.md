---
title: 環境切換
sidebar_label: "5.9 - 環境切換"
keywords:
  - React
  - API
tags:
  - React
---

## 5.9 環境切換（Dev / Prod）

> 💡 在實務開發時會有兩種(或更多)
>
> 1. 開發模式
> 2. 正式(產品)模式
>
> 因為一個專案在開發時資料庫可能會有兩個或是伺服器會有兩個，分別是給客戶和內部測試使用，這時候 API 的路進可能就會不一樣，這是為了讓工程師有辦法在開發時有資料可以測試，但又不會去影響到客戶的使用

[Vite 官方文件](https://vite.dev/guide/env-and-mode)

### 環境的基本概念

Vite 會依照執行命令自動設定環境模式：

| 環境模式                  | 指令                            | 使用的 `.env` 檔案 | 典型用途       |
| ------------------------- | ------------------------------- | ------------------ | -------------- |
| 開發環境 (Development)    | `npm run dev` 或 `vite`         | `.env.development` | 本機開發與除錯 |
| 正式環境 (Production)     | `npm run build` 或 `vite build` | `.env.production`  | 上線打包版本   |
| 自訂模式 (Staging / Test) | `vite build --mode staging`     | `.env.staging`     | 測試或預備環境 |

---

### 實際範例：開發與正式環境

#### 📄 `.env.development`

```env
VITE_APP_TITLE=projectname (開發環境)
VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEBUG=true
```

#### 📄 `.env.production`

```env
VITE_APP_TITLE=projectname
VITE_API_BASE_URL=https://api.projectname.com/api
VITE_DEBUG=false
```

#### 📄 `.env.staging`

```env
# 測試環境
VITE_APP_TITLE=My Vue App (Staging)
VITE_API_BASE_URL=https://staging.api.example.com
VITE_DEBUG=true
```
