---
title: 綜合應用（filter + map + reduce）
sidebar_label: "綜合應用"
description: 本文將介紹 filter、map、reduce 的綜合應用方式與實務案例。
tags:
  - JS
---

# 綜合應用（filter + map + reduce）

## 使用時機

在實務開發中，很少只用單一陣列方法，通常會「組合使用」：

- API 回傳資料 → 篩選 → 轉換 → 統計
- 訂單 / 購物車資料處理
- 報表與數據分析
- UI 顯示資料整理

👉 核心概念：

👉 **filter（篩選）→ map（轉換）→ reduce（統計）**

---

## 基本觀念

三個方法的角色：

| 方法     | 功能        |
| -------- | ----------- |
| `filter` | 篩選資料    |
| `map`    | 轉換資料    |
| `reduce` | 統計 / 計算 |

---

## 🔗 綜合使用流程

```js
const result = data
  .filter((item) => 條件)
  .map((item) => 轉換)
  .reduce((acc, item) => 計算, 初始值);
```

## 實務案例

### 範例 1：計算 VIP 使用者消費總額

```js
const users = [
  { name: "Tom", isVIP: true, amount: 1000 },
  { name: "Amy", isVIP: false, amount: 500 },
  { name: "John", isVIP: true, amount: 2000 },
];

const total = users
  .filter((user) => user.isVIP)
  .map((user) => user.amount)
  .reduce((sum, amount) => sum + amount, 0);

console.log(total); // 3000
```

### 範例 2：取得已付款訂單金額清單

```js
const orders = [
  { id: 1, amount: 1000, isPaid: true },
  { id: 2, amount: 500, isPaid: false },
  { id: 3, amount: 2000, isPaid: true },
];

const paidAmounts = orders
  .filter((order) => order.isPaid)
  .map((order) => order.amount);

console.log(paidAmounts); // [1000, 2000]
```

### 範例 3：高價商品總金額

```js
const products = [
  { title: "手機", price: 12000 },
  { title: "耳機", price: 3000 },
  { title: "筆電", price: 35000 },
];

const total = products
  .filter((p) => p.price > 10000)
  .map((p) => p.price)
  .reduce((sum, price) => sum + price, 0);

console.log(total); // 47000
```

### 範例 4：API 資料整理 + 統計

```js
const apiData = [
  { id: 1, name: "手機", price: 12000, isPublished: true },
  { id: 2, name: "耳機", price: 3000, isPublished: false },
  { id: 3, name: "鍵盤", price: 2500, isPublished: true },
];

const total = apiData
  .filter((item) => item.isPublished)
  .map((item) => item.price)
  .reduce((sum, price) => sum + price, 0);

console.log(total); // 14500
```

### 只用 reduce (範例 3 的另一種寫法)

```js
const products = [
  { title: "手機", price: 12000 },
  { title: "耳機", price: 3000 },
  { title: "筆電", price: 35000 },
];

const total = products.reduce((sum, p) => {
  if (p.price > 10000) {
    return sum + p.price;
  }
  return sum;
}, 0);
```

## 寫法比較

| 寫法                  | 優點     | 缺點       |
| --------------------- | -------- | ---------- |
| filter + map + reduce | 可讀性高 | 會跑多次   |
| 單一 reduce           | 效能較好 | 可讀性較差 |

:::caution[filter + map + reduce 使用注意]
在寫的時候一定要按照順序

1. 先用 filter 篩選資料
2. 再用 map 轉換格式
3. 最後用 reduce 做統計

:::
