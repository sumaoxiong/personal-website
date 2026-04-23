---
title: 5.4 - 巢狀路由
sidebar_label: "5.4 - 巢狀路由"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vue Router 中，**巢狀路由 (Nested Routes)** 可以讓我們建立「多層次的頁面結構」。  
常見的應用場景是 **版型 (Layout)**，例如：後台系統通常有固定的側邊欄與上方導覽列，內部內容會依不同子頁面切換。

## 1. 基本概念

巢狀路由是指：

- 父路由 → 對應一個 **Layout 元件**（帶有 `<RouterView>`）。
- 子路由 → 渲染在父元件的 `<RouterView>` 中。

## 2. 定義子路由

```js
// src/router/index.js
const routes = [
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () => import("@/views/DashboardHome.vue"),
      },
      {
        path: "profile",
        name: "dashboard-profile",
        component: () => import("@/views/DashboardProfile.vue"),
      },
    ],
  },
];
```

📌 **說明**

- `/dashboard` → 會渲染 `DashboardLayout.vue`，並在其中顯示 `DashboardHome.vue`。
- `/dashboard/profile` → 會渲染 `DashboardLayout.vue`，並在其中顯示 `DashboardProfile.vue`。
- 子路由的 `path` **不用加 `/`**，會自動拼接到父路由。

## 3. 建立版型元件

```vue
<!-- src/views/DashboardLayout.vue -->
<template>
  <div class="dashboard">
    <Sidebar />
    <main class="content">
      <!-- 子路由會顯示在這裡 -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/layout/Sidebar.vue";
</script>
```

📌 **重點**

- 父層的 `<RouterView>` 用來放置子路由。
- 子頁面只會渲染在 `<RouterView>` 位置，而父層的 Layout 保持不變。

## 4. 導航到子路由

```vue
<!-- 側邊選單 -->
<template>
  <nav>
    <RouterLink :to="{ name: 'dashboard-home' }">總覽</RouterLink>
    <RouterLink :to="{ name: 'dashboard-profile' }">個人檔案</RouterLink>
  </nav>
</template>
```

:::info
`:to`的部分可以改成`to="/dashboard-home"`
:::

## 5. 多層巢狀路由

巢狀路由可以繼續往下延伸。  
例如 `/dashboard/settings/account`：

```javascript
{
  path: '/dashboard',
  component: () => import('@/views/DashboardLayout.vue'),
  children: [
    {
      path: 'settings',
      component: () => import('@/views/SettingsLayout.vue'),
      children: [
        { path: 'account', component: () => import('@/views/AccountView.vue') },
        { path: 'privacy', component: () => import('@/views/PrivacyView.vue') },
      ],
    },
  ],
}
```

## 小結

- 巢狀路由用來建立「父頁面 + 子頁面」結構。
- 父元件需要有 `<RouterView>`，子路由才會顯示。
- 子路由 `path` 不需要 `/`，會自動拼接父路由。
- 適合用在後台系統或需要固定 Layout 的情境。
