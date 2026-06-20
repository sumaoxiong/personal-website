---
title: 陣列方法使用時機
sidebar_label: "陣列方法使用時機"
description: 本文將介紹 JS 常用陣列方法（find、filter、map、reduce、some、forEach）的使用時機與實務應用。
tags:
  - JS
---

# 陣列方法使用時機（Array Methods Usage）

## 使用時機

在實務開發中，陣列方法幾乎用於所有資料處理場景，例如：

- API 回傳資料整理
- 購物車邏輯處理
- 清單篩選（商品 / 訂單）
- 資料轉換（後端 → 前端 UI）
- 統計與加總（報表）

👉 面試與實務最常用的一組技能

---

## 基本觀念

常見陣列方法可以分成三大類：

| 類型 | 方法           | 用途               |
| ---- | -------------- | ------------------ |
| 查找 | `find`、`some` | 找資料 / 判斷存在  |
| 篩選 | `filter`       | 篩選多筆資料       |
| 轉換 | `map`          | 轉換資料格式       |
| 統計 | `reduce`       | 加總 / 分組 / 計算 |
| 迭代 | `forEach`      | 執行操作（不回傳） |

---

## 使用時機整理

### find（找一筆）

👉 用途：找「第一筆符合條件的資料」

```js
const user = users.find((user) => user.id === 1);
```

- 回傳：單一物件
- 找不到：undefined

### some（判斷存在）

👉 用途：確認是否「存在符合條件的資料」

```js
const hasVIP = users.some((user) => user.isVIP);
```

- 回傳：true / false

### filter（篩選多筆）

👉 用途：取得「所有符合條件的資料」

```js
const cheapProducts = products.filter((p) => p.price < 1000);
```

- 回傳：新陣列

### map（資料轉換）

👉 用途：將資料「轉換成另一種格式」

```js
const names = users.map((user) => user.name);
```

- 回傳：新陣列

### reduce（統計 / 加總）

👉 用途：做加總、統計、資料整理（最強）

```js
const total = carts.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);
```

- 回傳：任何型別

### forEach

👉 用途：執行動作（不回傳）

```js
users.forEach((user) => {
  console.log(user.name);
});
```

- 沒有回傳值

## 實務案例

### 範例 1：購物車總金額（reduce）

```js
const carts = [
  { price: 100, quantity: 2 },
  { price: 200, quantity: 1 },
];

const total = carts.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

console.log(total); // 400
```

### 範例 2：篩選已付款訂單（filter）

```js
const paidOrders = orders.filter((order) => order.isPaid);
```

### 範例 3：API 資料轉換（map）

```js
const products = apiData.map((item) => ({
  id: item.id,
  title: item.name,
  price: item.price,
}));
```

### 範例 4：找指定商品（find）

```js
const product = products.find((p) => p.id === targetId);
```

### 範例 5：檢查是否存在（some）

```js
const hasOutOfStock = products.some((p) => p.stock === 0);
```

## 綜合應用

👉 實務最常出現：filter + map / filter + reduce

### 範例：取得 VIP 使用者名稱

```js title="filter + map"
// prettier-ignore
const vipNames = users
  .filter(user => user.isVIP)
  .map(user => user.name);
```

### 範例：計算已付款訂單總額

```js title="filter + reduce"
// prettier-ignore
const total = orders
  .filter(order => order.isPaid)
  .reduce((sum, order) => sum + order.amount, 0);
```

:::info[]
在寫的時候請記住要先寫`filter`再寫`map`或是`reduce`，這樣會讓程式運行比較順暢
:::

## 判斷表

| 需求        | 方法     |
| ----------- | -------- |
| 找一筆      | `find`   |
| 判斷存在    | `some`   |
| 篩選多筆    | `filter` |
| 轉換資料    | `map`    |
| 加總 / 統計 | `reduce` |
