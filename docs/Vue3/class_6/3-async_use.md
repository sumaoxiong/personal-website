---
title: 6.3 - async/await 與常見用法
sidebar_label: "6.3 - async/await 與常見用法"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vue3 + Axios 的開發中，建議搭配 **async/await** 來處理非同步請求。  
它能讓程式碼比傳統的 `.then()` 更直觀、可讀性更高，錯誤處理也更清晰。

## 1. 基本語法

### - 箭頭函式

```js
const getData = async () => {
  try {
    const res = await api.get("/example");
    console.log(res); // 回傳的資料
  } catch (error) {
    console.log("發生錯誤", error);
  }
};
```

📌 **重點**

- `await` → 會等待 Promise 執行完成才繼續往下。
- `try...catch` → 用來捕捉錯誤。
- `finally` → 無論成功或失敗都會執行（例如關閉 Loading）。

### - function 宣告

```javascript
async function getData() {
  try {
    const res = await api.get("/example");
    console.log(res); // 回傳的資料
  } catch (error) {
    console.log("發生錯誤", error);
  }
}
```

:::info
下面的內容都會用箭頭函式來做展示
:::

## 2. 登入 API 範例

```javascript
// src/apis/authApi.js
import api from "@/utils/api";

export const login = async (email, password) => {
  return await api.post("/auth/login", { email, password });
};
```

```vue
<script setup>
import { ref } from "vue";
import { login } from "@/apis/authApi";

const email = ref("");
const password = ref("");
const message = ref("");

const handleLogin = async () => {
  try {
    const res = await login(email.value, password.value);
    localStorage.setItem("token", res.token);
    message.value = "登入成功！";
  } catch (err) {
    message.value = err.response?.data?.message || "登入失敗";
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button>登入</button>
    <p>{{ message }}</p>
  </form>
</template>
```

## 3. CRUD 常見用法

以下以 **文章 (Post)** 為例，示範 CRUD API。

### (1) 取得所有資料 (Read - GET)

```javascript
// src/apis/postApi.js
import api from "@/utils/api";

export const getPosts = async () => {
  return await api.get("/posts");
};
```

使用：

```vue
<script setup>
import { ref, onMounted } from "vue";
import { getPosts } from "@/apis/postApi";

const posts = ref([]);

onMounted(async () => {
  posts.value = await getPosts();
});
</script>
```

### (2) 取得單筆資料 (Read - GET by ID)

```javascript
export const getPostById = async (id) => {
  return await api.get(`/posts/${id}`);
};
```

### (3) 新增資料 (Create - POST)

```javascript
export const createPost = async (data) => {
  return await api.post("/posts", data);
};
```

### (4) 更新資料 (Update - PUT / PATCH)

```javascript
// 全量更新 (PUT)
export const updatePost = async (id, data) => {
  return await api.put(`/posts/${id}`, data);
};

// 局部更新 (PATCH)
export const patchPost = async (id, data) => {
  return await api.patch(`/posts/${id}`, data);
};
```

### (5) 刪除資料 (Delete - DELETE)

```javascript
export const deletePost = async (id) => {
  return await api.delete(`/posts/${id}`);
};
```

## 4. 在組件中搭配 async/await 的最佳實務

- **搭配 Loading 狀態**

```vue
<script setup>
import { ref } from "vue";
import { createPost } from "@/apis/postApi";

const loading = ref(false);
const error = ref("");
const success = ref("");

const savePost = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";
  try {
    await createPost({ title: "新文章", body: "內容" });
    success.value = "新增成功！";
  } catch (err) {
    error.value = err.response?.data?.message || "新增失敗";
  } finally {
    loading.value = false;
  }
};
</script>
```

## 5. 寫在 Pinia Action (最佳實務用法)

建議把 async/await API 呼叫放在 Pinia Store 的 `action`，再讓組件呼叫，讓 UI 保持乾淨。

### 1). 建立 Store（Setup Store）

```javascript
// src/stores/post.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { getPosts, createPost } from "@/apis/postApi";

export const usePostStore = defineStore("post", () => {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Action：讀取文章列表
  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;
    try {
      posts.value = await getPosts();
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  // Action：新增文章
  const addPost = async (newPost) => {
    loading.value = true;
    error.value = null;
    try {
      const created = await createPost(newPost);
      posts.value.push(created);
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  return { posts, loading, error, fetchPosts, addPost };
});
```

### 2). 在組件中使用

```vue
<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";
import { onMounted } from "vue";

const postStore = usePostStore();
const { posts, loading, error } = storeToRefs(postStore);

onMounted(() => {
  postStore.fetchPosts();
});

const addSamplePost = () => {
  postStore.addPost({ title: "新文章", body: "內容" });
};
</script>

<template>
  <section>
    <h1>文章列表</h1>
    <button @click="postStore.fetchPosts" :disabled="loading">重新載入</button>
    <button @click="addSamplePost" :disabled="loading">新增文章</button>

    <p v-if="loading">載入中...</p>
    <p v-if="error" class="error">錯誤：{{ error }}</p>

    <ul>
      <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
    </ul>
  </section>
</template>
```

📌 **好處**

- **Store 集中管理邏輯** → API 呼叫、錯誤處理、Loading 狀態。
- **組件保持乾淨** → 只負責 UI 呈現，直接呼叫 `store.action` 即可。
- **跨組件共用** → 任何地方都能呼叫相同的 Store，避免重複寫邏輯。

## 小結

- async/await 比 `.then()` 更清晰，適合處理複雜 API 流程。
- CRUD 對應：
  - **Create** → `POST`
  - **Read** → `GET`
  - **Update** → `PUT` / `PATCH`
  - **Delete** → `DELETE`
- 登入 API、錯誤處理、Loading 狀態，都建議用 `try/catch/finally` 包裝。
- 最佳實務：在 **Pinia Action** 集中管理 API，組件只專注於 UI。
