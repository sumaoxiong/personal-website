---
title: Fetch 使用
sidebar_label: "Fetch"
description: 本文將介紹 JavaScript 中 fetch API 的使用方式與實務應用。
tags:
  - JS
  - API
---

# Fetch 使用（Fetch API）

## 使用時機

`fetch` 是瀏覽器原生提供的 API，用於發送 HTTP 請求，常見於：

- 呼叫後端 API（GET / POST / PATCH / DELETE）
- 串接第三方服務
- 前端與後端資料交換
- 取得 JSON 資料

👉 幾乎所有前端專案都會用到

---

## 基本觀念

### fetch 是什麼？

👉 `fetch` 是一個用來發送 HTTP 請求的函式，會回傳一個 Promise。

---

### 基本語法

```js
fetch(url, options);
```

| 參數    | 說明                          |
| ------- | ----------------------------- |
| url     | API 路徑                      |
| options | 設定（method、headers、body） |

## 基本用法

### 1️⃣ GET（取得資料）

```js
fetch("/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
```

### 2️⃣ 使用 async / await (基本上都是用這個)

```js
async function getProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  console.log(data);
}
```

## 常見 HTTP 方法

### 1️⃣ POST（新增資料）

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

### 2️⃣ PATCH（更新資料）

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

### 3️⃣ DELETE（刪除資料）

```js
fetch("/api/products/1", {
  method: "DELETE",
});
```

## 實務案例

### 範例 1：取得商品列表

```js
async function getProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data;
}
```

### 範例 2：新增購物車商品

```js
async function addToCart(productId, quantity) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const data = await res.json();
  return data;
}
```

### 範例 3：帶 Token 請求

```js
async function getOrders(token) {
  const res = await fetch("/api/orders", {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
}
```

### 範例 4：錯誤處理(try...catch)

```js
async function getProducts() {
  try {
    const res = await fetch("/api/products");

    if (!res.ok) {
      throw new Error("API 錯誤");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
```

## 補充

### 常見 headers

```js
headers: {
  "Content-Type": "application/json",
  "Authorization": token
}
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
