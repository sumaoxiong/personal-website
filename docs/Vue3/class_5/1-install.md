---
title: 5.1 - 安裝與基本設定
sidebar_label: "5.1 - 安裝與基本設定"
keywords:
  - Vue3
tags:
  - Vue3
---

> Vue Router 是 Vue 官方提供的 **路由解決方案**，用來管理頁面與網址的對應關係。  
> 透過 Vue Router，可以讓應用程式成為 **單頁應用 (SPA)**，在不重新載入整個頁面的情況下切換不同畫面。

:::warning
建議在專案建立時選擇安裝的套件時就勾選 vue router，因為後續的安裝及設定相對複雜，還不如直接將專案重建再將資料轉移
:::

## 1. 安裝

在 Vue3 專案中安裝 Vue Router：

```bash
npm install vue-router
```

## 2. 建立路由設定檔

通常會在 `src/router/index.js` 或 `src/router/index.ts` 建立路由設定。

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 路由表，每個物件對應到一個頁面
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
  routes, // 路由表
  scrollBehavior() {
    return { top: 0 }; // 切換頁面時回到最上方
  },
});

export default router;
```

📌 **重點**

- `path`：網址路徑，例如 `/about`。
- `name`：路由名稱，建議一定要加，程式導航更安全。
- `component`：對應的 Vue 元件。
- `createWebHistory()`：使用瀏覽器的 History API，網址不會有 `#`。

## 3. 在 `main.js` 掛載 Router

最後，在 Vue 應用中掛載 Router。

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router); // 掛載 Vue Router
app.mount("#app");
```

## 4. 建立頁面元件

在 `src/views/` 中建立幾個頁面元件。

```vue
<!-- src/views/HomeView.vue -->
<template>
  <h1>這是首頁</h1>
</template>
```

```vue
<!-- src/views/AboutView.vue -->
<template>
  <h1>這是關於頁面</h1>
</template>
```

## 5. 在 App.vue 使用 RouterView

`<RouterView>` 是 Vue Router 提供的組件，會根據當前路由顯示對應頁面。

## 小結

1.  安裝 Vue Router → `npm install vue-router`。
2.  建立 `src/router/index.js` → 定義路由表。
3.  在 `main.js` 掛載 Router → `app.use(router)`。
4.  使用 `<RouterView>` 渲染當前路由對應的頁面。
