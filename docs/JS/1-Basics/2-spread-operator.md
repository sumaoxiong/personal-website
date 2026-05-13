---
title: 展開運算子
sidebar_label: "展開運算子"
description: 本文將介紹 JS 的展開運算子（Spread Operator）與實務應用。
tags:
  - JS
---

# 展開運算子（Spread Operator）

## 📌 使用時機

展開運算子（`...`）在實務中非常常見，主要用於：

- 複製陣列 / 物件（避免修改原資料）
- 合併資料（array / object）
- 更新 state（React / Vue）
- 函式參數展開
- 不可變資料處理（immutable）

👉 幾乎所有前端框架（React / Vue）都會用到

## 基本觀念

展開運算子（Spread Operator）使用 `...`，可以將資料「展開」：

### 1️⃣ 陣列展開

```js
const arr = [1, 2, 3];
const newArr = [...arr];

console.log(newArr); // [1, 2, 3]
```

👉 等同於複製一份新陣列

### 2️⃣ 物件展開

```js
const user = { name: "Tom", age: 18 };
const newUser = { ...user };

console.log(newUser); // { name: "Tom", age: 18 }
```

### 3️⃣ 合併資料

#### 陣列合併

```js
const a = [1, 2];
const b = [3, 4];

const result = [...a, ...b];
console.log(result); // [1, 2, 3, 4]
```

#### 物件合併

```js
const a = { name: "Tom" };
const b = { age: 18 };

const result = { ...a, ...b };
console.log(result); // { name: "Tom", age: 18 }
```

## ⚠️ 重要觀念

### 淺拷貝（Shallow Copy）

```js
const user = {
  name: "Tom",
  address: { city: "Taipei" },
};

const newUser = { ...user };

newUser.address.city = "Kaohsiung";

console.log(user.address.city); // "Kaohsiung"
```

👉 原因：

- ... 只複製第一層
- 巢狀物件還是共用記憶體

## 實務案例

### 範例 1：更新購物車（不可變資料）

```js
function updateCartItem(carts, cartId, quantity) {
  return carts.map((cart) =>
    cart.id === cartId ? { ...cart, quantity } : cart
  );
}
```

👉 重點：

- 不直接修改原資料
- 使用 `{ ...cart }` 建立新物件

### 範例 2：新增資料

```js
const carts = [{ id: 1 }, { id: 2 }];

const newCart = { id: 3 };

const newCarts = [...carts, newCart];
```

### 範例 3：API 資料加工

```js
const apiUser = {
  name: "Tom",
  age: 18,
};

const formattedUser = {
  ...apiUser,
  isAdult: apiUser.age >= 18,
};
```
