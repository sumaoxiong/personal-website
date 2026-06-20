---
title: 6.1 - 安裝與設定 Axios
sidebar_label: "6.1 - 安裝與設定 Axios"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vue3 專案中，最常用來處理 API 請求的工具就是 **Axios**。  
Axios 是一個基於 Promise 的 HTTP 客戶端，可以用來進行 `GET`、`POST`、`PUT`、`DELETE` 等常見請求。

## 1. 安裝 Axios

在專案中安裝 Axios：

```bash
npm install axios
```

## 2. 基本使用方式

在 Vue3 組件中，可以直接引入 Axios 發送請求。

```vue
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const posts = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    posts.value = res.data;
  } catch (err) {
    console.error("資料載入失敗", err);
  }
});
</script>

<template>
  <h1>文章列表</h1>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>
```

📌 **重點**

- Axios 預設會回傳一個物件，資料通常在 `res.data` 中。
- 建議使用 `async/await` 搭配 `try...catch` 處理非同步與錯誤。

## 3. 設定基礎 API URL

如果每次請求都要重複寫完整網址，會很麻煩。  
可以透過 `axios.create()` 建立一個帶有預設設定的 Axios 實例。

```javascript
// src/utils/api.js (暫時寫在這裡，下一章會更完整)
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  timeout: 5000, // 請求逾時設定 (毫秒)
});

export default api;
```

📌 **說明**

- `baseURL` → API 的根網址，可以用環境變數控制 (方便切換 dev / prod)。
- `timeout` → 設定請求超時時間，避免 API 無回應時卡住。

## 小結

1.  安裝 Axios → `npm install axios`。
2.  在組件中直接使用 `axios.get/post/...` 發送請求。
3.  建議使用 `axios.create()` 建立 API 實例，設定 `baseURL` 與 `timeout`，方便後續維護。
