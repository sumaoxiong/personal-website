---
title: 5.3 - 動態路由與參數
sidebar_label: "5.3 - 動態路由與參數"
keywords:
  - Vue3
tags:
  - Vue3
---

在實際應用中，頁面通常需要根據「不同參數」來顯示不同內容，例如：

- `/users/1` → 顯示使用者 1 的資料
- `/users/2` → 顯示使用者 2 的資料

這時候就需要用到 **動態路由 (Dynamic Route Matching)**。

## 1. 定義動態路由

在路由表中使用 `:參數名稱` 定義動態路由。

```js
// src/router/index.js
const routes = [
  {
    path: "/users/:id",
    name: "user-detail",
    component: () => import("@/views/UserDetailView.vue"),
  },
];
```

📌 **說明**

- `:id` → 動態參數，對應網址上的變數。
- `/users/5` → 會匹配到 `user-detail`，並將 `id = 5`。

## 2. 在元件中取得參數

使用 `useRoute()` 來存取當前路由資訊。

```vue
<!-- src/views/UserDetailView.vue -->
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id;
</script>

<template>
  <h1>使用者 ID：{{ userId }}</h1>
</template>
```

## 3. 以程式方式導航

使用 `useRouter()` 來操作路由跳轉。

```vue
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goUser(id) {
  router.push({ name: "user-detail", params: { id } });
}
</script>

<template>
  <button @click="goUser(10)">前往使用者 #10</button>
</template>
```

📌 **補充**

- `router.push()` → 新增一筆紀錄到歷史紀錄堆疊。
- `router.replace()` → 替換當前紀錄（不會新增歷史）。

## 4. 可選參數與多段參數

### 可選參數

```vue
{ path: '/posts', component: () => import('@/views/PostView.vue') }, { path:
'/posts/:id', component: () => import('@/views/PostView.vue') }
```

- `/posts` 與 `/posts/10` 都能匹配。
- 如果只寫`{ path: '/posts/:id', component: () =>  import('@/views/PostView.vue') }`那麼`/posts`就不能匹配，只有`/posts/xxx`這種後面有參數的才可以

### 多段參數

```vue
{ path: '/articles/:year/:month', component: () =>
import('@/views/ArticleView.vue') }
```

- `/articles/2025/01` → year = 2025, month = 01。

### 查詢參數 (Query)

```vue
{ path: '/search', component: SearchView }
```

- `/search?v=嘉義&a=fire` → `route.query = { v: '嘉義', a: 'fire' }`

這種多參數的方式在路由表中會跟一般的靜態頁面路由寫法一樣，只是在取值的時候就要在對應的頁面(這邊範例是 search 頁面，所以就要寫在 search 頁面)中做到參數查詢

**在元件中取得 query**

```vue
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

// 取得查詢參數
const v = route.query.v; // "嘉義"
const a = route.query.a; // "fire"
</script>
```

**在 RouterLink 傳遞 query**

```vue
<RouterLink :to="{ path: '/search', query: { v: '嘉義', a: 'fire' } }">
  搜尋
</RouterLink>
```

產生的網址就是：`/search?v=嘉義&a=fire`

## 5. 匹配所有路徑 (萬用路由)

用來處理 404 或未知路徑。

```vue
{ path: '/:pathMatch(.*)*', name: 'not-found', component: () =>
import('@/views/NotFound.vue') }
```

## 小結

- **params**：用 `:param` 定義，例如 `/users/:id`，在元件中用 `route.params` 讀取。
- **query**：用 `?key=value`，例如 `/search?q=apple`，在元件中用 `route.query` 讀取。
- 可選參數需定義多條路由（Vue Router v4 不支援 `:id?`）。
- 支援多段參數 (`/articles/:year/:month`) 以及萬用匹配 (404)。
