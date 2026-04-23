---
title: 5.2 - RouterView與RouterLink
sidebar_label: "5.2 - RouterView與RouterLink"
keywords:
  - Vue3
tags:
  - Vue3
---

Vue Router 提供了兩個核心組件：

- **RouterView**：用來顯示目前路由對應的頁面元件。
- **RouterLink**：用來在頁面之間切換，取代 `<a>` 避免整頁重整。

## 1. RouterView

### 基本用法

`<RouterView>` 是一個「佔位符」，會渲染當前路由對應的頁面元件。

```vue
<!-- App.vue -->
<template>
  <header>
    <h1>我的網站</h1>
  </header>

  <main>
    <RouterView />
    <!-- 在這裡顯示對應的頁面 -->
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
```

📌 **重點**

- 當網址為 `/` → 渲染 `HomeView.vue`。
- 當網址為 `/about` → 渲染 `AboutView.vue`。
- 可以在 Layout 中固定放置 `<RouterView>`，用來切換不同子頁面。

:::info
**RouterView** 會和 **巢狀路由** 做搭配使用，請先觀看[巢狀路由](/HkzTmDF3ex)，理解後再到[RouterView 與巢狀路由](/r19Hr_tngx)章節中觀看詳細說明
:::

## 2. RouterLink

### 基本用法

使用 `<RouterLink>` 來建立導航連結。

```vue
<template>
  <nav>
    <RouterLink to="/">首頁</RouterLink>
    <RouterLink to="/about">關於我們</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
```

📌 **差異**

- `<a href="/about">`：會重新載入整個頁面。
- `<RouterLink to="/about">`：只切換頁面內容，SPA 不會整頁刷新。

> to 的路由寫法就跟一般的路由寫法一樣，可以使 **絕對路徑** 或是 **相對路徑**

### 使用路由名稱導航

`to` 屬性除了直接寫路徑，還可以用 **路由名稱** 搭配 `params` 或 `query`。

```vue
<template>
  <!-- 對應 routes 裡的 { name: 'about' } -->
  <RouterLink :to="{ name: 'about' }">關於我們</RouterLink>

  <!-- 搭配參數 -->
  <RouterLink :to="{ name: 'user-detail', params: { id: 10 } }">
    使用者 #10
  </RouterLink>

  <!-- 搭配查詢字串 -->
  <RouterLink :to="{ name: 'search', query: { q: 'vue3' } }">
    搜尋 Vue3
  </RouterLink>
</template>
```

:::info
實務上"使用路由名稱導航"會比較少使用，更多的還是會使用基本用法
:::

## 3. Active 樣式

Vue Router 會自動為當前路由的 `<RouterLink>` 加上 `router-link-active` class。

```vue
<style>
.router-link-active {
  font-weight: bold;
  color: teal;
}
</style>
```

如果需要自訂 class，可以使用 `active-class` 屬性。

```vue
<RouterLink to="/about" active-class="is-active">關於我們</RouterLink>
```

## 小結

- **RouterView** → 顯示目前路由對應的頁面元件。
- **RouterLink** → 建立頁面之間的導航，避免整頁重載。
- RouterLink 可以用 **路徑 (path)** 或 **名稱 (name)** 導航，並支援 `params` / `query`。
- 當前頁面的連結會自動帶有 `router-link-active` class。
