---
title: filter + reduce 實戰應用
sidebar_label: "filter + reduce"
description: 本文將介紹 filter 與 reduce 的組合使用方式與實務應用。
tags:
  - JS
---

# filter + reduce 實戰應用

## 使用時機

`filter + reduce` 是實務中非常常見的組合，主要用於：

- 計算「符合條件」的總金額
- 統計特定資料（例如已付款訂單）
- 報表數據計算
- API 資料分析

👉 核心概念：

👉 **先篩選（filter）→ 再統計（reduce）**

---

## 基本觀念

### filter（篩選）

👉 取得「符合條件的資料」

```js
const paidOrders = orders.filter((order) => order.isPaid);
```

### reduce（統計）

👉 將資料做「加總 / 計算」

```js
const total = paidOrders.reduce((sum, order) => {
  return sum + order.amount;
}, 0);
```

### 組合使用

```js
// prettier-ignore
const total = orders
  .filter(order => order.isPaid)
  .reduce((sum, order) => sum + order.amount, 0);
```

## 實務案例

### 範例 1：計算已付款訂單總金額

```js
const orders = [
  { id: 1, amount: 1000, isPaid: true },
  { id: 2, amount: 500, isPaid: false },
  { id: 3, amount: 2000, isPaid: true },
];

const totalPaid = orders
  .filter((order) => order.isPaid)
  .reduce((sum, order) => sum + order.amount, 0);

console.log(totalPaid); // 3000
```

### 範例 2：計算高價商品總金額

```js
const products = [
  { title: "手機", price: 12000 },
  { title: "耳機", price: 3000 },
  { title: "筆電", price: 35000 },
];

const total = products
  .filter((p) => p.price > 10000)
  .reduce((sum, p) => sum + p.price, 0);

console.log(total); // 47000
```

### 範例 3：計算庫存為 0 的商品數量

```js
const products = [
  { title: "手機", stock: 10 },
  { title: "耳機", stock: 0 },
  { title: "鍵盤", stock: 0 },
];

const outOfStockCount = products
  .filter((p) => p.stock === 0)
  .reduce((count) => count + 1, 0);

console.log(outOfStockCount); // 2
```

### 範例 4：統計某分類商品總數量

```js
const carts = [
  { category: "手機", quantity: 2 },
  { category: "耳機", quantity: 1 },
  { category: "手機", quantity: 3 },
];

const total = carts
  .filter((item) => item.category === "手機")
  .reduce((sum, item) => sum + item.quantity, 0);

console.log(total); // 5
```
