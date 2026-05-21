---
title: Axios 使用
sidebar_label: "Axios"
description: 本文將介紹 Axios 的使用方式、與 fetch 的差異，以及實務應用。
tags:
  - JS
  - API
---

# Axios 使用（Axios）

## 使用時機

Axios 是一個常見的 HTTP 請求套件，主要用於：

- 呼叫後端 API
- 串接第三方服務
- 處理 CRUD（GET / POST / PATCH / DELETE）
- 攔截請求與回應（interceptor）
- Token 驗證處理

👉 幾乎所有 React / Vue 專案都很常使用 Axios

---

## 基本觀念

### Axios 是什麼？

Axios 是基於 Promise 的 HTTP Client。

👉 可以用來發送 HTTP 請求。

---

### 安裝方式

```bash
npm install axios
```

### 引入方式

```js
import axios from "axios";
```

## 基本用法

### 1️⃣ GET（取得資料）

```js
const res = await axios.get("/api/products");

console.log(res.data);
```

### 2️⃣ POST（新增資料）

```js
const res = await axios.post("/api/products", {
  title: "手機",
  price: 12000,
});

console.log(res.data);
```

### 3️⃣ PATCH（更新資料）

```js
const res = await axios.patch("/api/products/1", {
  price: 10000,
});
```

### 4️⃣ DELETE（刪除資料）

```js
const res = await axios.delete("/api/products/1");
```

## Axios 回傳結構

Axios 回傳的是：

```js
{
  data, status, headers, config;
}
```

## 實務案例

### 範例 1：取得商品列表

```js
async function getProducts() {
  const res = await axios.get("/api/products");

  return res.data;
}
```

### 範例 2：新增購物車商品

```js
async function addToCart(productId, quantity) {
  const res = await axios.post("/api/cart", {
    productId,
    quantity,
  });

  return res.data;
}
```

### 範例 3：更新購物車數量

```js
async function updateCartItem(cartId, quantity) {
  const res = await axios.patch("/api/cart", {
    id: cartId,
    quantity,
  });

  return res.data;
}
```

### 範例 4：帶 Token 請求

```js
async function getOrders(token) {
  const res = await axios.get("/api/orders", {
    headers: {
      authorization: token,
    },
  });

  return res.data;
}
```

## 錯誤處理

Axios 與 fetch 最大差異之一： **Axios API 錯誤會自動進 catch**

```js
async function getProducts() {
  try {
    const res = await axios.get("/api/products");

    return res.data;
  } catch (error) {
    console.error(error.message);
  }
}
```

## Axios Interceptor (Axios 攔截器)

### Request Interceptor

常用於：

- 自動加 Token
- 統一 headers
- 請求前處理

```js
axios.interceptors.request.use((config) => {
  config.headers.authorization = token;

  return config;
});
```

### Response Interceptor

常用於：

- 統一錯誤處理
- 401 登出
- API 錯誤提示

```js
axios.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response.status === 401) {
      console.log("未登入");
    }

    return Promise.reject(error);
  }
);
```

## fetch vs axios

| 項目      | fetch             | axios        |
| --------- | ----------------- | ------------ |
| 是否內建  | ✅                | ❌           |
| JSON 轉換 | 手動 `res.json()` | 自動         |
| 錯誤處理  | 手動判斷 `res.ok` | 自動進 catch |
| 攔截器    | ❌                | ✅           |
| 語法簡潔  | 普通              | 較簡潔       |
| 使用率    | 高                | 很高         |
