---
title: 型別與轉換
sidebar_label: "型別與轉換"
description: 本文將介紹 JS 的型別與轉換。
tags:
  - JS
---

# 型別與轉換（Data Types & Type Conversion）

## 📌 使用時機

在實務開發中，型別與轉換幾乎無所不在，常見情境包含：

- API 回傳資料型別不一致（例如數字變字串）
- 表單輸入（input 永遠是字串）
- 計算金額（需要確保為 number）
- 判斷條件（truthy / falsy）
- 資料庫資料處理（型別轉換）

👉 幾乎所有 JS 專案都會遇到

---

## 基本觀念

### JS 型別分類

JavaScript 有兩大類型：

### 1️⃣ Primitive（基本型別）

```js
string;
number;
boolean;
null;
undefined;
symbol;
bigint;
```

### 2️⃣ Reference（參考型別）

```js
object
array
function
```

#### 型別檢查方式

```js
typeof "hello"; // "string"
typeof 123; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" ❗ (歷史 bug)
typeof []; // "object"
typeof {}; // "object"
```

👉 注意：

- `null` 是 bug（面試很常問）
- `array` 需要用下面方式判斷：

```js
Array.isArray([]); // true
```

## 型別轉換

### 1️⃣ 顯式轉換（Explicit）

👉 主動轉換（推薦）

```js
Number("123"); // 123
String(123); // "123"
Boolean(1); // true
```

### 2️⃣ 隱式轉換（Implicit）

👉 JS 自動幫你轉（容易出 bug）

```js
"5" + 1; // "51"（字串拼接）
"5" - 1; // 4（數字運算）
```

## ⚠️ 常見錯誤

### ❌ == vs ===

```js
"5" == 5; // true（會轉型）
"5" === 5; // false（不轉型）
```

👉 實務上：

👉 一律使用 ===

## 💡 實務案例

### 範例：購物車金額計算

```js
const cart = [
  { price: "100", quantity: 2 },
  { price: "200", quantity: 1 },
];

const total = cart.reduce((sum, item) => {
  return sum + Number(item.price) * item.quantity;
}, 0);

console.log(total); // 400
```

👉 重點：

- API 回來可能是字串
- 要先轉成 Number 再計算

### 範例：表單輸入處理

```js
const quantity = document.querySelector("input").value;

if (Number(quantity) > 0) {
  console.log("有效數量");
}
```

👉 input 一定是字串 → 必須轉型
