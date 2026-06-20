---
title: 6.2 - 建立 API 與管理
sidebar_label: "6.2 - 建立 API 與管理"
keywords:
  - Vue3
tags:
  - Vue3
---

隨著專案規模增大，如果每個組件都直接寫 `axios.get(...)`，會造成程式碼重複、難以維護。  
最佳做法是建立一個 **api.js**，把所有 API 請求統一管理，並模組化拆分。

## 1. 建立 api.js

在 `src/utils/api.js` 建立 Axios 實例。

```js
// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

// 可以在這裡加上攔截器（之後會介紹）
export default api;
```

## 2. 模組化管理 API

把不同功能的 API 請求，拆成多個檔案，方便維護。

### 範例：文章 API

```javascript
// src/apis/postApi.js
import api from "../utils/api";

// 取得所有文章
export const getPosts = () => api.get("/posts");

// 取得單篇文章
export const getPostById = (id) => api.get(`/posts/${id}`);

// 新增文章
export const createPost = (data) => api.post("/posts", data);
```

### 範例：使用者 API

```javascript
// src/apis/userApi.js
import api from "../utils/api";

// 取得所有使用者
export const getUsers = () => api.get("/users");

// 取得單一使用者
export const getUserById = (id) => api.get(`/users/${id}`);
```

## 3. 在組件中使用

透過 Composition API 在 Vue 組件中呼叫 API。

```vue
<script setup>
import { ref, onMounted } from "vue";
import { getPosts } from "@/apis/postApi";

const posts = ref([]);

onMounted(async () => {
  try {
    const res = await getPosts();
    posts.value = res.data;
  } catch (err) {
    console.error("載入失敗", err);
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

## 4. 檔案結構範例

```vue
src/ ├── apis/ │ ├── postApi.js # 管理文章相關 API │ ├── userApi.js #
管理使用者相關 API │ └── ... ├── utils/ │ └── api.js # Axios 實例設定 └── views/
└── PostView.vue # 使用 API 的頁面
```

另一種檔案結構

```
src/

├── utils/
│   └── api/
│   │   ├── api.js       # Axios 實例設定
│   │   ├── postApi.js   # 管理文章相關 API
│   │   └── userApi.js   # 管理使用者相關 API
└── views/
    └── PostView.vue # 使用 API 的頁面
```

> 選擇一種自己喜歡的方式就行

## 小結

1.  在 `src/utils/api.js` 建立 Axios 實例。
2.  在 `src/apis/` 中依功能模組拆分 API。
3.  組件只需要呼叫 API 方法，不需要關心細節。
