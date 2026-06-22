---
title: 基本資料型別
description: TypeScript 基本資料型別（Primitive Types）
sidebar_position: 2
tags:
  - TypeScript
  - Primitive Types
---

# Primitive Types（基本資料型別）

## 為什麼要學這個？

在 TypeScript 中，所有型別的基礎都是 Primitive Types（基本資料型別）。

無論是：

- 變數宣告
- 函式參數
- API 回傳資料
- Interface
- React Props

都會使用到這些型別。

理解 Primitive Types 是學習 TypeScript 最重要的第一步。

---

# 什麼是 Primitive Type？

Primitive Type（基本資料型別）指的是：

> 不可再拆分的最基本資料型別

TypeScript 與 JavaScript 共有以下 Primitive Types：

| Type      | 說明       |
| --------- | ---------- |
| string    | 字串       |
| number    | 數字       |
| boolean   | 布林值     |
| null      | 空值       |
| undefined | 未定義     |
| bigint    | 大整數     |
| symbol    | 唯一識別值 |

---

# String

用來表示文字資料。

```ts
let username: string = "Tom";
let city: string = "Taipei";
```

---

## 字串拼接

```ts
let firstName: string = "Tom";
let lastName: string = "Lee";

let fullName: string = firstName + " " + lastName;

console.log(fullName);
```

---

## Template Literal（模板字串）

推薦使用模板字串：

```ts
let name: string = "Tom";

let message: string = `Hello ${name}`;
```

輸出：

```txt
Hello Tom
```

---

# Number

TypeScript 不區分：

- 整數（Integer）
- 浮點數（Float）

全部都屬於：

```ts
number;
```

---

## 範例

```ts
let age: number = 18;

let price: number = 99.99;

let score: number = 100;
```

---

## 常見運算

```ts
let a: number = 10;
let b: number = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
```

---

# Boolean

表示兩種狀態：

```txt
true
false
```

---

## 範例

```ts
let isLogin: boolean = true;

let isAdmin: boolean = false;
```

---

## 搭配條件判斷

```ts
let isLogin: boolean = true;

if (isLogin) {
  console.log("登入成功");
}
```

---

# Undefined

代表：

> 已宣告，但尚未賦值

---

## 範例

```ts
let username: undefined = undefined;
```

實際開發較少直接這樣使用。

更常見的是：

```ts
let username: string | undefined;
```

表示：

```txt
可能有值
可能沒有值
```

---

## JavaScript 範例

```ts
let name;

console.log(name);
```

輸出：

```txt
undefined
```

---

# Null

代表：

> 開發者主動設定的空值

---

## 範例

```ts
let selectedUser: null = null;
```

---

## 常見情境

```ts
let currentUser: string | null = null;
```

登入後：

```ts
currentUser = "Tom";
```

登出後：

```ts
currentUser = null;
```

---

# Null vs Undefined

這是面試常考題。

| 項目     | null         | undefined  |
| -------- | ------------ | ---------- |
| 是否有值 | 沒有         | 沒有       |
| 誰設定的 | 開發者       | JavaScript |
| 使用情境 | 主動清空資料 | 尚未賦值   |

---

## undefined

```ts
let username;
```

結果：

```txt
undefined
```

---

## null

```ts
let username = null;
```

表示：

```txt
目前沒有資料
```

是開發者主動指定的。

---

# BigInt

用於處理超大整數。

---

## Number 最大安全值

```ts
console.log(Number.MAX_SAFE_INTEGER);
```

輸出：

```txt
9007199254740991
```

超過此範圍可能產生精度誤差。

---

## BigInt

```ts
let bigNumber: bigint = 90071992547409999999n;
```

注意：

```ts
n;
```

不可省略。

---

## 錯誤示範

```ts
let a: bigint = 100n;
let b: number = 10;

console.log(a + b);
```

錯誤：

```txt
Cannot mix BigInt and other types
```

必須先轉換型別。

---

# Symbol

用於建立唯一值（Unique Value）。

即使內容相同：

```ts
Symbol("id");
```

每次建立的值都不同。

---

## 範例

```ts
const id1: symbol = Symbol("id");
const id2: symbol = Symbol("id");

console.log(id1 === id2);
```

輸出：

```txt
false
```

---

## 使用情境

建立唯一識別碼：

```ts
const USER_ID = Symbol("USER_ID");
```

大型框架底層常使用：

- React
- Vue
- Node.js

---

# typeof 檢查型別

JavaScript 提供：

```ts
typeof
```

來檢查資料型別。

---

## String

```ts
console.log(typeof "Hello");
```

結果：

```txt
string
```

---

## Number

```ts
console.log(typeof 100);
```

結果：

```txt
number
```

---

## Boolean

```ts
console.log(typeof true);
```

結果：

```txt
boolean
```

---

## Null（特殊情況）

```ts
console.log(typeof null);
```

結果：

```txt
object
```

這是 JavaScript 歷史遺留問題，不是 TypeScript 的 Bug。

---

# Primitive Type vs Object Type

| 類型           | 範例                    |
| -------------- | ----------------------- |
| Primitive Type | string、number、boolean |
| Object Type    | object、array、function |

---

## Primitive Type

```ts
let name: string = "Tom";
let age: number = 18;
```

---

## Object Type

```ts
const user = {
  name: "Tom",
  age: 18,
};
```

---

# 常見錯誤

## 錯誤 1：數字使用字串

```ts
let age: number = "18";
```

錯誤：

```txt
Type 'string' is not assignable to type 'number'
```

---

## 錯誤 2：布林值使用字串

```ts
let isLogin: boolean = "true";
```

錯誤：

```txt
Type 'string' is not assignable to type 'boolean'
```

---

## 錯誤 3：忘記 BigInt 的 n

```ts
let bigNumber: bigint = 100;
```

錯誤：

```txt
Type 'number' is not assignable to type 'bigint'
```

正確：

```ts
let bigNumber: bigint = 100n;
```

---

# Primitive Type 總整理

| Type      | 範例           |
| --------- | -------------- |
| string    | `"Hello"`      |
| number    | `100`          |
| boolean   | `true`         |
| undefined | `undefined`    |
| null      | `null`         |
| bigint    | `100n`         |
| symbol    | `Symbol("id")` |

---

# 實務開發建議

### 最常用

```ts
string;
number;
boolean;
```

約佔日常開發的 90% 以上。

---

### API 資料

通常搭配：

```ts
string | null;
```

或：

```ts
string | undefined;
```

---

### BigInt

主要用於：

- 金融系統
- 區塊鏈
- 高精度計算

一般前端較少使用。

---

### Symbol

大多出現在：

- 框架原始碼
- 套件開發
- 底層實作

一般業務開發較少使用。

---

# 本章重點

✅ Primitive Types 是 TypeScript 最基礎的型別

✅ 常見型別：

```ts
string;
number;
boolean;
```

✅ null 與 undefined 不同

```txt
null → 開發者主動設定
undefined → 尚未賦值
```

✅ bigint 用於超大整數

```ts
100n;
```

✅ symbol 用於建立唯一識別值

```ts
Symbol("id");
```
