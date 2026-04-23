---
title: 6.6 - 非同步處理與錯誤捕捉
sidebar_label: "6.6 - 非同步處理與錯誤捕捉"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vue3 + Axios 的開發中，非同步請求的**四個基本狀態**是：`loading`、`data`、`error`、`empty`。  
這章整理實務常用的 Composition API 寫法，教你如何**穩健**處理 API 請求與錯誤。

## 1. 最小可用範例：`try/catch/finally`

```vue
<script setup>
import { ref, onMounted } from "vue";
import api from "@/utils/api"; // 你前面建立的 Axios 實例

const loading = ref(false);
const error = ref(null);
const posts = ref([]);

async function fetchPosts() {
  loading.value = true;
  error.value = null;
  try {
    const res = await api.get("/posts"); // 若有 response 攔截器已回傳 data
    posts.value = res;
  } catch (err) {
    error.value = normalizeError(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPosts);

// 將各種錯誤格式轉為單一訊息
function normalizeError(err) {
  return err?.response?.data?.message || err?.message || "發生未知錯誤";
}
</script>

<template>
  <section>
    <button @click="fetchPosts" :disabled="loading">重新載入</button>

    <p v-if="loading">載入中…</p>
    <p v-else-if="error">錯誤：{{ error }}</p>
    <ul v-else-if="posts.length">
      <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
    </ul>
    <p v-else>目前沒有資料</p>
  </section>
</template>
```

## 2. 抽成可重用的 composable：`useApi`

把「載入/錯誤/重試」模式抽出來，避免在每個元件重複寫樣板碼。

```javascript
// src/composables/useApi.js
import { ref } from "vue";
import api from "@/utils/api";

export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  // 統一的請求執行器
  const run = async (requestFn) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await requestFn(api); // 將 api 實例注入
      return data;
    } catch (err) {
      error.value =
        err?.response?.data?.message || err.message || "發生未知錯誤";
      throw err; // 視需求是否往外拋
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, run };
}
```

使用：

```vue
<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/useApi";

const posts = ref([]);
const { loading, error, run } = useApi();

const load = async () => {
  const data = await run((api) => api.get("/posts"));
  posts.value = data;
};

onMounted(load);
</script>
```

## 3. 取消請求 / 防止「過期回應」覆蓋新資料

常見在搜尋輸入、切換路由時：上一個請求慢到，資料被新請求覆蓋。  
使用 `AbortController`（Axios 1+ 支援）避免過期回應。

```javascript
// 在組件或 composable
import { ref, onBeforeUnmount } from "vue";
import api from "@/utils/api";

const controller = ref(null);

async function fetchUsers(q) {
  // 取消上一次尚未完成的請求
  controller.value?.abort();
  controller.value = new AbortController();

  return api.get("/users", {
    params: { q },
    signal: controller.value.signal,
  });
}

onBeforeUnmount(() => controller.value?.abort());
```

## 4. 併發請求與錯誤容忍：`Promise.allSettled`

當需要**同時**拿多種資料（且允許部分失敗）時：

```javascript
const [postsRes, usersRes] = await Promise.allSettled([
  api.get("/posts"),
  api.get("/users"),
]);

const posts = postsRes.status === "fulfilled" ? postsRes.value : [];
const users = usersRes.status === "fulfilled" ? usersRes.value : [];
```

> 如果全都必須成功，使用 `Promise.all`，並用 `try/catch` 一次處理。

## 5. 表單送出：回應碼與欄位錯誤 (422)

實務上常見 400/422 回傳欄位錯誤，需要回填到表單。

```vue
<script setup>
import { reactive, ref } from "vue";
import api from "@/utils/api";

const form = reactive({ email: "", password: "" });
const fieldErrors = reactive({});
const submitting = ref(false);
const globalError = ref("");

async function submit() {
  submitting.value = true;
  globalError.value = "";
  Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);

  try {
    await api.post("/auth/login", form);
    // 成功 → 導頁/提示
  } catch (err) {
    const res = err.response;
    if (res?.status === 422 && res.data?.errors) {
      // 後端約定：{ errors: { email: '格式錯誤', password: '必填' } }
      Object.assign(fieldErrors, res.data.errors);
    } else {
      globalError.value = res?.data?.message || err.message || "登入失敗";
    }
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <p v-if="globalError" class="error">{{ globalError }}</p>

    <label>
      Email
      <input v-model="form.email" type="email" />
      <span class="field-error" v-if="fieldErrors.email">{{
        fieldErrors.email
      }}</span>
    </label>

    <label>
      密碼
      <input v-model="form.password" type="password" />
      <span class="field-error" v-if="fieldErrors.password">{{
        fieldErrors.password
      }}</span>
    </label>

    <button :disabled="submitting">
      {{ submitting ? "送出中…" : "送出" }}
    </button>
  </form>
</template>
```

## 6. 在 Pinia Action 中集中處理錯誤（推薦）

把 API 與錯誤處理集中到 store，元件更乾淨。

```javascript
// src/stores/post.js (Setup Store)
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/utils/api";

export const usePostStore = defineStore("post", () => {
  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      items.value = await api.get("/posts");
    } catch (err) {
      error.value = err?.response?.data?.message || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { items, loading, error, load };
});
```

在組件：

```vue
<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";

const postStore = usePostStore();
const { items, loading, error } = storeToRefs(postStore);

postStore.load();
</script>
```

## 7. 全域錯誤顯示與記錄

- **Response 攔截器**：統一轉換錯誤格式。
- **Toast/Modal**：顯示友善訊息（避免直接 `alert`）。
- **Logger**：在 `catch` 中上報錯誤（Sentry / 自建 logger）。

簡化訊息函式：

```javascript
export function getErrorMessage(err, fallback = "發生未知錯誤") {
  return err?.response?.data?.message || err?.message || fallback;
}
```
