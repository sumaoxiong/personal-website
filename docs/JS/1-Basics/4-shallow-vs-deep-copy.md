---
title: 淺拷貝與深拷貝
sidebar_label: "淺拷貝 vs 深拷貝"
description: 本文將介紹 JS 的淺拷貝與深拷貝差異與實務應用。
tags:
  - JS
---

# 淺拷貝 vs 深拷貝（Shallow Copy vs Deep Copy）

## 📌 使用時機

在實務開發中，拷貝資料非常常見，尤其是在：

- 更新 state（React / Vue）
- 處理 API 回傳資料
- 避免修改原始資料（immutable）
- 資料轉換與加工
- Redux / Pinia 狀態管理

👉 幾乎所有前端與 Node.js 專案都會遇到

---

## 基本觀念

### 變數儲存方式

JS 分成兩種：

| 類型      | 儲存方式                |
| --------- | ----------------------- |
| Primitive | 值（Value）             |
| Reference | 記憶體位址（Reference） |

---

### 範例：Reference 問題

```js
const a = { name: "Tom" };
const b = a;

b.name = "John";

console.log(a.name); // "John"
```

👉 原因：

- a 和 b 指向同一個記憶體

## 淺拷貝（Shallow Copy）

👉 只複製第一層

### 常見寫法

#### 1️⃣ 展開運算子

```js
const user = { name: "Tom", address: { city: "Taipei" } };

const newUser = { ...user };
```

#### 2️⃣ Object.assign

```js
const newUser = Object.assign({}, user);
```

### ⚠️ 問題

```js
const user = {
  name: "Tom",
  address: { city: "Taipei" },
};

const newUser = { ...user };

newUser.address.city = "Kaohsiung";

console.log(user.address.city); // "Kaohsiung"
```

👉 巢狀物件仍然共用記憶體

:::info[簡單記法]
有使用到 "展開運算子" 的都是屬於淺拷貝
:::

## 深拷貝（Deep Copy）

👉 完整複製所有層級

### 1️⃣ structuredClone（推薦）

```js
const user = {
  name: "Tom",
  address: { city: "Taipei" },
};

const newUser = structuredClone(user);

newUser.address.city = "Kaohsiung";

console.log(user.address.city); // "Taipei"
```

## 實務案例

### 範例 1：購物車更新

#### ❌ 錯誤寫法

```js
const newCart = cart;
newCart.quantity = 5;
```

👉 會改到原資料

#### ✅ 正確寫法

```js
const newCart = { ...cart, quantity: 5 };
```

### 範例 2：巢狀資料更新

```js
const user = {
  name: "Tom",
  address: { city: "Taipei" },
};

const newUser = {
  ...user,
  address: {
    ...user.address,
    city: "Kaohsiung",
  },
};
```

👉 手動做「深一層拷貝」

### 範例 3：API 資料保護

```js
const safeData = structuredClone(apiResponse);
```

👉 避免污染原資料

## 淺拷貝 vs 深拷貝比較

| 項目           | 淺拷貝（Shallow Copy）   | 深拷貝（Deep Copy）                                 |
| -------------- | ------------------------ | --------------------------------------------------- |
| 複製層級       | 只複製第一層             | 複製所有層級                                        |
| 巢狀物件       | ❌ 共用記憶體            | ✅ 完全獨立                                         |
| 是否影響原資料 | 可能會影響               | 不會影響                                            |
| 常見方法       | `...`、`Object.assign()` | `structuredClone()`、`JSON.parse(JSON.stringify())` |
| 效能           | 較好（較快）             | 較差（較慢）                                        |
| 使用時機       | 單層資料、簡單更新       | 巢狀資料、需要完全隔離                              |
| 安全性         | 較低（容易誤改）         | 較高                                                |

:::info[]
大部分情況下都是使用淺拷貝
:::
