---
title: 陣列型別
description: TypeScript 陣列型別（Array Types）
sidebar_position: 3
tags:
  - TypeScript
  - Array Types
---

# Array Types（陣列型別）

## 為什麼要學這個？

陣列（Array）是前端開發中最常見的資料結構之一。

例如：

- 商品列表
- 使用者列表
- API 回傳資料
- React State
- 下拉選單選項

在 JavaScript 中，陣列可以混合存放各種型別：

```js
const data = ["Tom", 18, true];
```

雖然合法，但在大型專案中容易造成維護困難。

TypeScript 可以限制陣列中允許存放的資料型別，讓程式更加安全且容易維護。

---

## Array Type 基本語法

最常見的寫法：

```ts
let names: string[] = ["Tom", "John", "Mary"];
```

語法：

```ts
type[]
```

表示：

```txt
由指定型別所組成的陣列
```

---

### String Array

```ts
let fruits: string[] = ["Apple", "Banana", "Orange"];
```

---

### 新增資料

```ts
fruits.push("Mango");
```

合法：

```ts
fruits.push("Grape");
```

---

錯誤：

```ts
fruits.push(123);
```

錯誤訊息：

```txt
Argument of type 'number' is not assignable to parameter of type 'string'
```

---

### Number Array

```ts
let scores: number[] = [80, 90, 100];
```

---

```ts
scores.push(95);
```

合法。

---

```ts
scores.push("100");
```

錯誤。

---

### 聯合型別陣列 (Union Type Array)

當陣列中需要同時包含多種不同的型別時，可以使用 `(Type1 | Type2)[]` 的語法（即 Union Type 聯合型別）。

```ts
const arr1 = [1, 2, "3"]; //將空陣列內的型別限定在number和string，不建議用這種寫法，後續維護時無法快速判斷

const arr2: (number | boolean)[] = []; //將空陣列內的型別限定在number和boolean
```

進階寫法請參考後面的[`Tuple`](#tuple元組)

---

### Boolean Array

```ts
let permissions: boolean[] = [true, false, true];
```

---

### Type Inference

TypeScript 可以自動推斷陣列型別。

```ts
const names = ["Tom", "John"];
```

推斷結果：

```ts
string[]
```

---

```ts
names.push("Mary");
```

合法。

---

```ts
names.push(123);
```

錯誤。

---

## Array 寫法

除了：

```ts
string[]
```

之外，也可以寫成：

```ts
Array<string>;
```

---

### 範例

```ts
let users: Array<string> = ["Tom", "John", "Mary"];
```

---

### Number

```ts
let scores: Array<number> = [80, 90, 100];
```

---

### 比較

| 寫法            | 說明     |
| --------------- | -------- |
| `string[]`      | 最常見   |
| `Array<string>` | 泛型寫法 |

---

實務上通常使用：

```ts
string[]
number[]
User[]
```

可讀性較高。

---

## Object Array

實務上最常見。

例如 API 回傳：

```ts
const users = [
  {
    id: 1,
    name: "Tom",
  },
  {
    id: 2,
    name: "John",
  },
];
```

---

### 型別定義

```ts
type User = {
  id: number;
  name: string;
};
```

---

```ts
const users: User[] = [
  {
    id: 1,
    name: "Tom",
  },
  {
    id: 2,
    name: "John",
  },
];
```

---

## 多維陣列（Nested Array）

陣列中包含陣列。

---

### 範例

```ts
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
```

---

型別結構：

```txt
number[][]
```

表示：

```txt
陣列裡面放 number[]
```

---

### 三維陣列

```ts
const cube: number[][][] = [
  [
    [1, 2],
    [3, 4],
  ],
];
```

---

## ReadonlyArray

有些資料不希望被修改。

例如：

```ts
國家列表;
權限列表;
設定檔;
```

---

### 寫法

```ts
const countries: ReadonlyArray<string> = ["Taiwan", "Japan", "USA"];
```

---

### 錯誤示範

```ts
countries.push("Korea");
```

錯誤：

```txt
Property 'push' does not exist on type 'readonly string[]'
```

---

### 簡寫

```ts
const countries: readonly string[] = ["Taiwan", "Japan"];
```

---

## Tuple（元組）

Tuple 是：

> 固定長度且固定順序的陣列

---

### 範例

```ts
let user: [string, number];
```

```ts title="二維陣列"
const tu1: [number, number][] = [
  [11, 22],
  [33, 44],
];
```

---

```ts
user = ["Tom", 18];
```

合法。

---

```ts
user = [18, "Tom"];
```

錯誤。

---

因為順序不符合：

```ts
[string, number];
```

---

### 使用情境

常見於：

```ts
[x, y];
```

座標資料。

---

```ts
const point: [number, number] = [100, 200];
```

---

日期資料：

```ts
const date: [number, number, number] = [2025, 5, 1];
```

---

## Array 常用方法

TypeScript 會自動推斷型別。

---

### map

```ts
const numbers: number[] = [1, 2, 3];
```

---

```ts
const result = numbers.map((item) => item * 2);
```

推斷：

```ts
number[]
```

---

### filter

```ts
const result = numbers.filter((item) => item > 1);
```

推斷：

```ts
number[]
```

---

### find

```ts
const result = numbers.find((item) => item === 2);
```

推斷：

```ts
number | undefined;
```

---

## 常見錯誤

### 錯誤 1：混入不同型別

```ts
const names: string[] = ["Tom", "John", 123];
```

錯誤：

```txt
Type 'number' is not assignable to type 'string'
```

---

### 錯誤 2：Tuple 順序錯誤

```ts
const user: [string, number] = [18, "Tom"];
```

錯誤。

---

### 錯誤 3：修改 ReadonlyArray

```ts
const data: readonly string[] = ["A", "B"];

data.push("C");
```

錯誤。

---

## 實務開發建議

### 一般陣列

使用：

```ts
string[]
number[]
User[]
```

---

### API 資料

通常會搭配：

```ts
interface User {
  id: number;
  name: string;
}
```

---

```ts
const users: User[] = [];
```

---

### 設定檔

使用：

```ts
readonly string[]
```

避免被修改。

---

### Tuple

僅在固定順序資料時使用：

```ts
[number, number];
```

例如：

- 座標
- 日期
- RGB
