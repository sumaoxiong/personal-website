---
title: filter + map 實戰應用
sidebar_label: "filter + map"
description: 本文將介紹 filter 與 map 的組合使用方式與實務應用。
tags:
  - JS
---

# filter + map 實戰應用

## 📌 使用時機

`filter + map` 是實務中非常常見的組合，主要用於：

- 篩選符合條件的資料後，轉換成 UI 可用格式
- API 回傳資料整理（後端 → 前端）
- 商品 / 訂單列表顯示
- 搜尋與結果呈現

👉 核心概念：

👉 **先篩選（filter）→ 再轉換（map）**

---

## 🧠 基本觀念

### filter（篩選）

👉 取得「符合條件的資料」

```js
const vipUsers = users.filter((user) => user.isVIP);
```
