---
title: 日期處理
sidebar_label: "日期處理"
description: 本文將介紹 JavaScript 中日期處理的基本概念、dayjs 使用方式與實務應用。
tags:
  - JS
---

# 日期處理（Date Processing）

## 使用時機

日期處理在實務開發中非常常見，主要用於：

- 顯示訂單建立時間
- 顯示文章發布時間
- 判斷是否在本週 / 本月
- 倒數計時
- 報表統計
- API 日期格式轉換

👉 幾乎所有專案都會處理日期。

---

## 基本觀念

### JavaScript Date

JavaScript 內建：

```js
const now = new Date();

console.log(now);
```

### Timestamp（時間戳）

Timestamp 是：

👉 從 1970/01/01 00:00:00 UTC 開始計算的時間

### timestamp (毫秒)

```js
Date.now();
```

### Unix timestamp（秒）

```js
Math.floor(Date.now() / 1000);
```

## Date 原生問題

原生 Date：

- API 複雜
- 格式化麻煩
- 時區容易出錯

所以實務上常用：

👉 dayjs

## dayjs 基本使用

### 安裝

```bash
npm install dayjs
```

### 引入

```js
import dayjs from "dayjs";
```

## 日期格式化

### 基本格式化

```js
dayjs().format("YYYY/MM/DD");
```

### 日期與時間

```js
dayjs().format("YYYY/MM/DD HH:mm:ss");
```

### 常見日期格式

| 格式               | 結果             |
| ------------------ | ---------------- |
| `YYYY/MM/DD`       | 2026/05/25       |
| `YYYY-MM-DD`       | 2026-05-25       |
| `HH:mm:ss`         | 14:30:25         |
| `YYYY/MM/DD HH:mm` | 2026/05/25 14:30 |

## 常用 dayjs 方法

| 方法         | 用途                |
| ------------ | ------------------- |
| `format()`   | 格式化日期          |
| `unix()`     | 處理 Unix timestamp |
| `diff()`     | 計算時間差          |
| `add()`      | 增加時間            |
| `subtract()` | 減少時間            |
| `startOf()`  | 某時間起點          |
| `endOf()`    | 某時間終點          |
| `isBefore()` | 是否在之前          |
| `isAfter()`  | 是否在之後          |

## 常見日期操作

### 增加時間

```js
// 在當前時間基礎上，增加 7 天
dayjs().add(7, "day");
```

### 減少時間

```js
// 在當前時間基礎上，減少 1 個月
dayjs().subtract(1, "month");
```

### 本月開始

```js
// 取得當前月份的第一天（00:00:00）
dayjs().startOf("month");
```

### 本月結束

```js
// 取得當前月份的最後一天（23:59:59）
dayjs().endOf("month");
```

## 實務案例

### 範例 1：格式化訂單時間

```js live
function formatDate(timestamp) {
  return dayjs.unix(timestamp).format("YYYY/MM/DD HH:mm");
}

const createdAt = 1716610000;

console.log(formatDate(createdAt)); // 2024/05/25 13:26
```

### 範例 2：為訂單加入 formattedDate

```js
function formatOrders(orders) {
  return orders.map((order) => ({
    ...order,
    formattedDate: dayjs.unix(order.createdAt).format("YYYY/MM/DD"),
  }));
}
```

### 範例 3：取得本週訂單

```js
function getThisWeekOrders(orders) {
  const startWeek = dayjs().startOf("week");
  const endWeek = dayjs().endOf("week");

  return orders.filter((order) => {
    const orderDate = dayjs.unix(order.createdAt);

    return orderDate.isAfter(startWeek) && orderDate.isBefore(endWeek);
  });
}
```

### 範例 4：顯示幾天前

```js
const daysAgo = dayjs().diff(dayjs.unix(order.createdAt), "day");

console.log(`${daysAgo} 天前`);
```

### 範例 5：判斷訂單是否超過 7 天 (範例 4 的寫法展開來)

```js
function isOrderOverdue(timestamp) {
  const now = dayjs();

  const date = dayjs.unix(timestamp);

  return now.diff(date, "day") > 7;
}
```
