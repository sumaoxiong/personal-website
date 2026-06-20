---
title: RESTful API 概念
sidebar_label: "RESTful API"
description: 本文將介紹 RESTful API 的基本概念、HTTP 方法與實務應用。
tags:
  - JS
  - API
---

# RESTful API 概念

## 📌 使用時機

RESTful API 是前後端溝通的核心，在實務中幾乎所有專案都會用到：

- 前端呼叫後端資料（fetch / axios）
- CRUD 操作（新增、讀取、更新、刪除）
- 串接第三方服務（支付、地圖、登入）
- 後端 API 設計（Node.js / Express）

👉 只要有前後端分離，就一定會用到 RESTful API

---

## 基本觀念

### API 是什麼？

API（Application Programming Interface）：

👉 不同系統之間「溝通的接口」

---

### REST 是什麼？

REST（Representational State Transfer）是一種設計 API 的風格，核心概念是：

👉 **用 URL 表示資源，用 HTTP 方法操作資源**

---

## RESTful API 結構

### 👉 URL 表示資源

```bash
/api/products
/api/orders
/api/users
```

### 👉 HTTP 方法表示操作

| 方法   | 用途         | 說明         |
| ------ | ------------ | ------------ |
| GET    | 讀取         | 取得資料     |
| POST   | 新增         | 建立新資料   |
| PUT    | 更新（全部） | 更新整筆資料 |
| PATCH  | 更新（部分） | 更新部分欄位 |
| DELETE | 刪除         | 刪除資料     |

## CRUD 對應表

| 操作     | 方法   | URL 範例          |
| -------- | ------ | ----------------- |
| 讀取全部 | GET    | `/api/products`   |
| 讀取單筆 | GET    | `/api/products/1` |
| 新增資料 | POST   | `/api/products`   |
| 更新資料 | PATCH  | `/api/products/1` |
| 刪除資料 | DELETE | `/api/products/1` |

## 實務案例

### 範例 1：取得商品列表（GET）

```js
fetch("/api/products")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

### 範例 2：新增商品（POST）

```js
fetch("/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "手機",
    price: 12000,
  }),
});
```

### 範例 3：更新商品（PATCH）

```js
fetch("/api/products/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    price: 10000,
  }),
});
```

### 範例 4：刪除商品（DELETE）

```js
fetch("/api/products/1", {
  method: "DELETE",
});
```

## Request / Response 概念

### 👉 Request（請求）

前端發送給後端：

- URL
- Method（GET / POST / PATCH / DELETE）
- Headers（例如 token）
- Body（資料）

### 👉 Response（回應）

後端回傳給前端：

```json
{
  "status": true,
  "data": {
    "id": 1,
    "title": "手機"
  }
}
```
