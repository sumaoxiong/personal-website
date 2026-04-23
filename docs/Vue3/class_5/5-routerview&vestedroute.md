---
title: 5.5 - RouterView 與巢狀路由
sidebar_label: "5.5 - RouterView 與巢狀路由"
keywords:
  - Vue3
tags:
  - Vue3
---

## 1. 基本概念

- `<RouterView>` 是 Vue Router 提供的「出口 (outlet)」，用來顯示當前路由對應的元件。
- 在單層路由中，`<RouterView>` 會渲染對應的元件。
- 在 **巢狀路由 (Nested Routes)** 中，每一層的父元件都需要放置一個 `<RouterView>`，這樣子路由對應的子元件才會有地方顯示。

## 2. 巢狀路由範例

### 路由設定

```javascript
// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Team from "@/views/Team.vue";
import Member from "@/views/Member.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About, // 第一層
    children: [
      {
        path: "team", // /about/team
        component: Team, // 第二層
        children: [
          {
            path: ":id", // /about/team/:id
            component: Member, // 第三層
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### 對應的頁面結構

```vue
<!-- About.vue -->
<template>
  <div>
    <h2>關於我們</h2>
    <!-- 子路由會顯示在這裡 -->
    <RouterView />
  </div>
</template>
```

```vue
<!-- Team.vue -->
<template>
  <div>
    <h3>團隊介紹</h3>
    <!-- 更深一層的子路由 -->
    <RouterView />
  </div>
</template>
```

```vue
<!-- Member.vue -->
<template>
  <div>
    <p>這裡顯示特定成員的詳細資料</p>
  </div>
</template>
```

## 3. 運作流程

1.  **訪問 `/about`**
    - 顯示 `About.vue` (父層元件)。
2.  **訪問 `/about/team`**
    - 因為 `About.vue` 中有 `<RouterView>`，所以會在該位置渲染 `Team.vue`。
3.  **訪問 `/about/team/123`**
    - 因為 `Team.vue` 中也有 `<RouterView>`，所以會在那裡再渲染 `Member.vue`。

## 4. 重點整理

- `<RouterView>` 就是「插槽」，負責放子路由內容。
- 巢狀路由的每一層父元件都要放 `<RouterView>`，否則子元件不會顯示。
- 巢狀層數與 `<RouterView>` 出口數量要對應起來。

> ✅ **小提醒**  
> 如果你看到子路由沒有顯示，通常就是因為父層少放了一個 `<RouterView>`。
