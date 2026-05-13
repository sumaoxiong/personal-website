---
title: 解構賦值
sidebar_label: "解構賦值"
description: 本文將介紹 JS 的解構賦值（Destructuring）與實務應用。
tags:
  - JS
---

# 解構賦值（Destructuring）

## 📌 使用時機

解構賦值在實務中非常常見，主要用於：

- 取得物件屬性（API 回傳資料）
- 簡化變數存取（避免重複寫 `obj.xxx`）
- 函式參數處理
- 搭配 React / Vue 使用（props / state）
- 陣列資料拆解

👉 幾乎所有前端 / Node.js 專案都會使用

---

## 基本觀念

解構賦值是從「物件 / 陣列中取值並賦值給變數」

---

### 1️⃣ 物件解構

```js
const user = {
  name: "Tom",
  age: 18,
};

const { name, age } = user;

console.log(name); // Tom
console.log(age); // 18
```

👉 等同於：

```js
const name = user.name;
const age = user.age;
```

### 2️⃣ 陣列解構

```js
const arr = [10, 20, 30];

const [a, b, c] = arr;

console.log(a); // 10
console.log(b); // 20
```

## 進階用法

### 1️⃣ 重新命名

```js
const user = { name: "Tom" };

const { name: userName } = user;

console.log(userName); // Tom
```

### 2️⃣ 預設值

```js
const user = { name: "Tom" };

const { age = 18 } = user;

console.log(age); // 18
```

### 3️⃣ 巢狀解構

```js
const user = {
  name: "Tom",
  address: {
    city: "Taipei",
  },
};

const {
  address: { city },
} = user;

console.log(city); // Taipei
```

### 4️⃣ 搭配 Rest

```js
const user = {
  name: "Tom",
  age: 18,
  city: "Taipei",
};

const { name, ...rest } = user;

console.log(name); // Tom
console.log(rest); // { age: 18, city: "Taipei" }
```

👉 將 user 物件中的 name 取出來，並將剩下的資料丟到 rest 裡面
:::info[備註]
rest 這個名稱是可以隨意改的，例如：

- `const { password, ...safeUser } = user;`

  :::

## 實務案例

### 範例 1：API 回傳資料

```js
const response = {
  data: {
    user: {
      name: "Tom",
      age: 18,
    },
  },
};

const {
  data: {
    user: { name, age },
  },
} = response;

console.log(name, age);
```

### 範例 2：購物車資料處理

```js
const cart = {
  product: {
    title: "手機",
  },
  quantity: 2,
};

const {
  product: { title },
  quantity,
} = cart;

console.log(title, quantity);
```

### 範例 3：函式參數解構

```js
function createUser({ name, age }) {
  console.log(name, age);
}

createUser({
  name: "Tom",
  age: 18,
});
```

## 總結

- 解構可以快速從物件 / 陣列取值
- 可搭配預設值、重新命名、rest 使用
- 常見於 API、函式參數、框架開發
- 巢狀解構要注意安全性
