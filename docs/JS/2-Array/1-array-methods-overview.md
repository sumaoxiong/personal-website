---
title: 陣列方法總覽
sidebar_label: "陣列方法總覽"
description: 本文將介紹 JS 常用陣列方法的基本概念與總覽。
tags:
  - JS
---

# 陣列方法總覽（Array Methods Overview）

## 使用時機

陣列方法主要用來處理「多筆資料」，實務上常見於：

- 商品列表
- 購物車資料
- 訂單列表
- API 回傳資料
- 表單資料整理
- 報表統計

👉 只要資料是「陣列」，通常就會用到陣列方法。

---

## 基本觀念

陣列是一種用來儲存「多筆資料」的資料結構。

```js
const products = [
  { id: 1, title: "手機", price: 12000 },
  { id: 2, title: "耳機", price: 3000 },
  { id: 3, title: "鍵盤", price: 2500 },
];
```

每一筆資料可以是：

```js
const numbers = [1, 2, 3];

const names = ["Tom", "Amy", "John"];

const users = [
  { name: "Tom", age: 18 },
  { name: "Amy", age: 20 },
];
```

## 常用陣列方法總覽

| 方法        | 用途                       | 回傳值                 | 是否改變原陣列 |
| ----------- | -------------------------- | ---------------------- | -------------- |
| `push()`    | 新增資料到陣列最後         | 新長度                 | ✅ 會          |
| `length`    | 取得陣列長度               | 數字                   | ❌ 不會        |
| `find()`    | 找第一筆符合條件的資料     | 單筆資料 / `undefined` | ❌ 不會        |
| `filter()`  | 篩選多筆符合條件的資料     | 新陣列                 | ❌ 不會        |
| `some()`    | 判斷是否至少有一筆符合條件 | `true / false`         | ❌ 不會        |
| `map()`     | 將資料轉換成新格式         | 新陣列                 | ❌ 不會        |
| `forEach()` | 逐筆執行操作               | `undefined`            | ❌ 不會        |
| `reduce()`  | 加總、統計、資料整理       | 依情況決定             | ❌ 不會        |
| `new Set()` | 去除重複資料               | `Set` 物件             | ❌ 不會        |

## 基本方法介紹

### 1️⃣ push：新增資料

```js
const carts = [];

carts.push({
  id: 1,
  title: "手機",
  quantity: 1,
});

console.log(carts);
```

- `push()` 會直接修改原陣列

### 2️⃣ length：取得陣列長度

```js
const products = ["手機", "耳機", "鍵盤"];

console.log(products.length); // 3
```

常用於判斷是否有資料：

```js
if (products.length === 0) {
  console.log("目前沒有商品");
}
```

### 3️⃣ find：找一筆資料

```js
const product = products.find((item) => item.id === 1);
```

- 適合用在「找指定 id 的資料」

### 4️⃣ filter：篩選多筆資料

```js
const cheapProducts = products.filter((item) => item.price < 5000);
```

- 適合用在商品篩選、訂單篩選

### 5️⃣ some：判斷是否存在

```js
const hasExpensiveProduct = products.some((item) => item.price > 10000);
```

- 適合用在「是否有符合條件的資料」

### 6️⃣ map：轉換資料格式

```js
const productNames = products.map((item) => item.title);
```

- 適合用在 API 資料整理、畫面資料轉換

### 7️⃣ forEach：逐筆執行

```js
products.forEach((item) => {
  console.log(item.title);
});
```

- 適合用在單純執行動作，例如印出資料

### 8️⃣ reduce：加總與統計

```js
const total = products.reduce((sum, item) => {
  return sum + item.price;
}, 0);
```

- 適合用在總金額、統計、分組

### 9️⃣ new Set：去除重複資料

```js
const categories = ["手機", "耳機", "手機"];

const uniqueCategories = [...new Set(categories)];

console.log(uniqueCategories); // ["手機", "耳機"]
```

## 實務案例

### 範例 1：購物車是否為空

```js
if (carts.length === 0) {
  console.log("購物車是空的");
}
```

### 範例 2：找指定訂單

```js
const order = orders.find((order) => order.id === targetOrderId);
```

### 範例 3：篩選特價商品

```js
const saleProducts = products.filter((product) => product.isSale);
```

### 範例 4：計算購物車總金額

```js
const total = carts.reduce((sum, cart) => {
  return sum + cart.price * cart.quantity;
}, 0);
```

## 陣列方法選擇表

| 需求         | 建議方法              |
| ------------ | --------------------- |
| 新增資料     | `push()` / 展開運算子 |
| 取得數量     | `length`              |
| 找一筆       | `find()`              |
| 篩選多筆     | `filter()`            |
| 判斷是否存在 | `some()`              |
| 轉換格式     | `map()`               |
| 加總 / 統計  | `reduce()`            |
| 去除重複     | `new Set()`           |
| 單純執行操作 | `forEach()`           |
