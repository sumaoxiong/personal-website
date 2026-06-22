---
title: 型別宣告
description: TypeScript 型別宣告與型別推斷
sidebar_position: 1
tags:
  - TypeScript
  - Type Annotations
---

# Type Annotations（型別宣告）

## 為什麼要學這個？

在 JavaScript 中，變數的型別可以隨時改變：

```js
let data = "Hello";
data = 123;
data = true;
```

雖然寫起來很自由，但大型專案容易產生錯誤。

TypeScript 允許我們在宣告變數時指定型別，讓編譯器提前發現問題。

---

# Type Annotation 語法

基本語法：

```ts
let variableName: type = value;
```

範例：

```ts
let username: string = "Tom";
let age: number = 18;
let isLogin: boolean = true;
```

---

# 常見基本型別

| TypeScript | 說明   | 範例        |
| ---------- | ------ | ----------- |
| string     | 字串   | `"Hello"`   |
| number     | 數字   | `100`       |
| boolean    | 布林值 | `true`      |
| null       | 空值   | `null`      |
| undefined  | 未定義 | `undefined` |
| bigint     | 大整數 | `123n`      |
| symbol     | 唯一值 | `Symbol()`  |

```ts
let name: string = "Tom";
let score: number = 95;
let passed: boolean = true;
```

---

# String

```ts
let firstName: string = "Tom";
let lastName: string = "Lee";

console.log(firstName);
console.log(lastName);
```

也可以使用模板字串：

```ts
let name: string = "Tom";

let message: string = `Hello ${name}`;
```

---

# Number

```ts
let age: number = 18;
let price: number = 99.99;
let count: number = 100;
```

TypeScript 不區分：

- 整數
- 浮點數

全部都是：

```ts
number;
```

---

# Boolean

```ts
let isLogin: boolean = true;
let isAdmin: boolean = false;
```

常用於：

```ts
if (isLogin) {
  console.log("登入成功");
}
```

---

# Type Inference（型別推斷）

大部分情況下 TypeScript 可以自動推斷型別。

```ts
let name = "Tom";
```

等同於：

```ts
let name: string = "Tom";
```

因為：

```ts
name = 123;
```

會出現錯誤：

```txt
Type 'number' is not assignable to type 'string'
```

---

# 什麼時候需要明確宣告型別？

## 1. 宣告時沒有給值

```ts
let username: string;
```

之後：

```ts
username = "Tom";
```

如果不寫型別：

```ts
let username;
```

TypeScript 會推斷成：

```ts
any;
```

失去型別檢查功能。

---

## 2. 函式參數

```ts
function greet(name: string) {
  return `Hello ${name}`;
}
```

---

## 3. API 回傳資料

```ts
let userData: string;
```

方便後續維護與閱讀。

---

# let、const 與型別宣告

## let

```ts
let age: number = 18;

age = 20;
```

可以重新賦值。

---

## const

```ts
const PI: number = 3.14;
```

不可重新賦值：

```ts
PI = 4;
```

錯誤：

```txt
Cannot assign to 'PI'
```

---

# 型別錯誤示範

## 錯誤案例 1

```ts
let age: number = "18";
```

錯誤：

```txt
Type 'string' is not assignable to type 'number'
```

---

## 錯誤案例 2

```ts
let isLogin: boolean = "true";
```

錯誤：

```txt
Type 'string' is not assignable to type 'boolean'
```

---

## 錯誤案例 3

```ts
let name: string = 123;
```

錯誤：

```txt
Type 'number' is not assignable to type 'string'
```

---

# Type Annotation vs Type Inference

| 項目             | Type Annotation    | Type Inference |
| ---------------- | ------------------ | -------------- |
| 是否手動指定型別 | ✅                 | ❌             |
| 程式可讀性       | 高                 | 中             |
| 程式碼長度       | 較長               | 較短           |
| 推薦使用         | 函式參數、API 資料 | 一般變數       |

### Annotation

```ts
let username: string = "Tom";
```

### Inference

```ts
let username = "Tom";
```

---

# 實務開發建議

### 一般變數

讓 TypeScript 自動推斷即可：

```ts
const count = 100;
const name = "Tom";
```

---

### 函式參數

務必指定型別：

```ts
function add(a: number, b: number) {
  return a + b;
}
```

---

### API 資料

建議明確定義型別：

```ts
let userName: string;
let userAge: number;
```

或使用 Interface：

```ts
interface User {
  name: string;
  age: number;
}
```

---

# 本章重點

✅ TypeScript 可以在宣告變數時指定型別

```ts
let name: string = "Tom";
```

✅ 常見型別

- string
- number
- boolean
- null
- undefined

✅ TypeScript 具有 Type Inference

```ts
let age = 18;
```

會自動推斷為：

```ts
number;
```

✅ 函式參數與 API 資料建議明確宣告型別

✅ 型別不符時，TypeScript 會在編譯階段提前報錯
