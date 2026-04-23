---
title: 6.4 - async/await 寫法
sidebar_label: "6.4 - async/await 寫法"
keywords:
  - Vue3
tags:
  - Vue3
---

> async/await 中 **function 宣告** 與 **箭頭函式** 兩種寫法的比較

## 1. 簡單敘述

- **Function 宣告**

  ```javascript
  async function getData() {
    const res = await api.get("/example");
    return res;
  }
  ```

  ➜ 傳統寫法，可用在任何地方（有 _函式提升_）。

- **箭頭函式**
  ```javascript
  const getData = async () => {
    const res = await api.get("/example");
    return res;
  };
  ```
  ➜ ES6 新語法，常用在 Vue/React 等現代開發中，寫法更簡潔。

## 2. 差異比較

| 項目             | Function 宣告              | 箭頭函式                            |
| ---------------- | -------------------------- | ----------------------------------- |
| **寫法**         | `function getData() {...}` | `const getData = () => {...}`       |
| **函式提升**     | 有提升，可在宣告前呼叫     | 無提升，必須先宣告再使用            |
| **this 綁定**    | 動態，取決於呼叫位置       | 靜態，繼承外層 `this`               |
| **Vue 開發習慣** | 偶爾用於 `methods`         | 更常見，搭配 `const` 宣告，語法統一 |
| **程式碼風格**   | 偏傳統，較冗長             | 簡潔，適合現代開發                  |

## 3. 優缺點

### Function 宣告

✅ **優點**

- 有 _函式提升_，可先使用再宣告
- `this` 動態綁定，適合需要不同上下文的情境

❌ **缺點**

- 寫法相對冗長
- 在 Vue/React 裡較少使用，程式碼風格不一致

---

### 箭頭函式

✅ **優點**

- 簡潔，適合匿名或一次性函式
- `this` 靜態繼承外層，避免混淆
- 符合 Vue/React 常見寫法，程式碼統一

❌ **缺點**

- 沒有函式提升，必須在宣告後才能使用
- 無法當建構函式 (`new`) 使用
