---
title: 資料驗證
sidebar_label: "資料驗證"
description: 本文將介紹 JS 中資料驗證的基本觀念與實務應用。
tags:
  - JS
---

# 資料驗證（Validation）

## 使用時機

資料驗證在實務開發中非常常見，主要用於：

- 表單送出前檢查資料
- API 請求前確認格式正確
- 訂單資料驗證
- 註冊 / 登入資料檢查
- 避免錯誤資料進入後端或資料庫

👉 只要有「使用者輸入」，通常就需要資料驗證。

---

## 基本觀念

資料驗證的核心目的是：

👉 **確認資料是否符合規則**

例如：

```js
const user = {
  name: "Tom",
  tel: "0912345678",
  email: "tom@example.com",
};
```

常見驗證規則：

| 欄位     | 驗證規則         |
| -------- | ---------------- |
| 姓名     | 不可為空         |
| 電話     | 必須符合手機格式 |
| Email    | 必須包含 `@`     |
| 數量     | 必須大於 0       |
| 付款方式 | 必須是指定選項   |

## 基本驗證方式

### 1️⃣ 檢查是否為空

```js
function isRequired(value) {
  return value !== undefined && value !== null && value !== "";
}
```

### 2️⃣ 檢查字串去除空白後是否為空

```js
function isNotEmpty(value) {
  return typeof value === "string" && value.trim() !== "";
}
```

### 3️⃣ 檢查 Email

```js
function isEmail(value) {
  return value.includes("@");
}
```

### 4️⃣ 檢查台灣手機格式

```js
function isTaiwanMobile(value) {
  return /^09\d{8}$/.test(value); //正規表達式
}
```

### 5️⃣ 檢查數量

```js
function isValidQuantity(value) {
  return typeof value === "number" && value > 0;
}
```

:::info[正規表達式使用說明]
如果沒有記得正規表達式的要怎嗎寫可以先將條件先列出來再讓 AI 去生成。
:::

## 錯誤累積方式

在實務上常會使用一個空陣列來收集錯誤訊息

```js title="建立空陣列來儲存錯誤訊息"
const errors = [];
```

然後根據不同規則加入錯誤：

```js
if (!data.name) {
  errors.push("姓名不可為空");
}

if (!data.email.includes("@")) {
  errors.push("Email 格式錯誤");
}
```

最後用 errors.length === 0 判斷是否通過驗證：

```js
return {
  isValid: errors.length === 0,
  errors,
};
```

👉 如果 errors.length === 0，代表沒有任何錯誤。

這樣做主要有以下幾個好處

1. 一次收集所有錯誤，提升使用者體驗
2. 精簡邏輯判斷，程式碼更好擴充
3. 最後的結果判斷只需判斷這個陣列有沒有資料就行
4. 前端處理這些資料方式可以更多種(靈活度高)

## 實務案例

### 範例 1：驗證訂單使用者資料

```js
function validateOrderUser(data) {
  const errors = [];
  const paymentMethods = ["ATM", "Credit Card", "Apple Pay"];

  if (!data || typeof data !== "object") {
    return {
      isValid: false,
      errors: ["資料格式錯誤"],
    };
  }

  if (!data.name || data.name.trim() === "") {
    errors.push("姓名不可為空");
  }

  if (!data.tel || !/^09\d{8}$/.test(data.tel)) {
    errors.push("電話必須是 09 開頭的 10 位數字");
  }

  if (!data.email || !data.email.includes("@")) {
    errors.push("Email 格式錯誤");
  }

  if (!data.address || data.address.trim() === "") {
    errors.push("地址不可為空");
  }

  if (!paymentMethods.includes(data.payment)) {
    errors.push("付款方式錯誤");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### 範例 2：驗證購物車數量

```js
function validateCartQuantity(quantity) {
  if (typeof quantity !== "number") {
    return {
      isValid: false,
      error: "數量必須是數字",
    };
  }

  if (quantity <= 0) {
    return {
      isValid: false,
      error: "數量必須大於 0",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}
```

## 補充

### trim()

`trim()` 是一個用來移除字串「開頭」和「結尾」的所有空白字元，但不會影響字串中間的空格

除了我們最常按的空白鍵（Space）之外，trim() 還能自動辨識並移除以下字元：

- 換行字元（\n、\r）
- 縮排／水平定位字元（\t）

:::caution[請注意 `trim()` 不會動到字串中間的空格]

```js
const message = "  Hello   World!  ";
console.log(message.trim());
// 輸出: "Hello   World!"
// 前後的空格消失了，但 "Hello" 和 "World!" 中間的空格完好如初。
```

:::

## 常見錯誤

### 沒使用 trim()

```js
if (data.name === "") {
  errors.push("姓名不可為空");
}
```

👉 如果使用者輸入空白 " "，會通過驗證

正確寫法：

```js
if (!data.name || data.name.trim() === "") {
  errors.push("姓名不可為空");
}
```

## 前端驗證 vs 後端驗證

| 類型     | 目的                                     |
| -------- | ---------------------------------------- |
| 前端驗證 | 提升使用者體驗，避免送出明顯錯誤資料     |
| 後端驗證 | 保護資料安全，防止錯誤或惡意資料進入系統 |

> 前端驗證不能取代後端驗證
