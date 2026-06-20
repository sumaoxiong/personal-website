---
title: 5.6 - 導航守衛 (Navigation Guards)
sidebar_label: "5.6 - 導航守衛"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vue Router 中，**導航守衛 (Navigation Guards)** 可以讓我們在路由跳轉時，控制是否允許進入或離開某個頁面，或在切換前後執行一些邏輯。  
常見應用場景：

- 權限驗證（例如：未登入不能進入會員中心）
- 頁面切換前的提醒（例如：表單未儲存，提示是否離開）
- 設定網頁標題、紀錄分析

## 1. 全域導航守衛

### beforeEach

在 **每次路由切換前** 執行。

```javascript
// src/router/index.js
router.beforeEach((to, from) => {
  const isAuthRequired = to.meta.requiresAuth;
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  if (isAuthRequired && !isLoggedIn) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});
```

📌 **說明**

- `to`：即將進入的路由。
- `from`：當前要離開的路由。
- `return false` → 取消導航。
- `return { name: 'login' }` → 導向其他路由。

### afterEach

在 **每次路由切換完成後** 執行。

```javascript
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | MyApp` : "MyApp";
});
```

📌 **應用範例**

- 設定頁面標題。
- 發送 GA 分析事件。

## 2. 路由獨享守衛

可以直接在某個路由定義 `beforeEnter`，只對該路由生效。

```javascript
const routes = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView.vue"),
    beforeEnter: (to, from) => {
      if (!localStorage.getItem("isAdmin")) {
        return { name: "home" };
      }
    },
  },
];
```

## 3. 元件內守衛

Vue Router v4 移除了 Options API 的 `beforeRouteEnter`、`beforeRouteLeave` 的自動支援。  
在 Composition API 中，可以改用 **路由生命週期鉤子**：

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

onBeforeRouteLeave((to, from, next) => {
  const hasUnsaved = true;
  if (hasUnsaved && !confirm("確定要離開？資料尚未儲存")) {
    return next(false); // 取消導航
  }
  next();
});

onBeforeRouteUpdate((to, from, next) => {
  // 當同一路由但參數改變時（如 /users/1 → /users/2）
  console.log("路由參數改變，重新載入資料");
  next();
});
</script>
```

📌 **應用範例**

- `onBeforeRouteLeave`：離開頁面前檢查（例如：未儲存表單）。
- `onBeforeRouteUpdate`：同一頁面路由參數改變時，重新取得資料。

## 4. 範例：簡單的權限驗證

### 定義需要驗證的路由

```javascript
const routes = [
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: { requiresAuth: true }, // 需要登入
  },
];
```

### 在全域守衛中驗證

```javascript
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});
```

📌 **效果**：

- 未登入 → 自動導向登入頁。
- 登入後 → 可正常進入 `profile` 頁面。

## 小結

- **全域守衛**：`beforeEach`、`afterEach` → 每次切換都會觸發。
- **路由獨享守衛**：`beforeEnter` → 只在特定路由觸發。
- **元件內守衛**：`onBeforeRouteLeave`、`onBeforeRouteUpdate` → 與元件綁定。
- 常見用途：權限驗證、提示離開、修改標題、紀錄分析。
