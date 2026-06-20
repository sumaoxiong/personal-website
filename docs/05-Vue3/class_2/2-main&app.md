---
title: 2.2 - main.js / App.vue 解析
sidebar_label: "2.2 - main.js / App.vue 解析"
keywords:
  - Vue3
tags:
  - Vue3
---

> 理解 **專案啟動流程** 能幫你更快上手 Vue3 專案維護。這章節會說明 `main.js` 與 `App.vue` 的職責、常見寫法與最佳實務。

## 一、`main.js` 做什麼？

> **職責**：建立應用（`createApp`）、掛載插件（Router、Pinia…）、註冊全域資源（元件、指令、樣式），最後把 App 掛載到 `index.html` 的 `#app`。

### 1. 最小可用版本

```js
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### 2. 實務常見版本（含 Router + Pinia + 全域樣式）

```js
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

// 路由
import router from "./router";

// 狀態管理（Pinia）
import { createPinia } from "pinia";

// 全域樣式（可放 SCSS / CSS）
import "./assets/main.css"; // 或 './assets/main.scss'

// 建立 App 實例
const app = createApp(App);

// 掛載插件
app.use(createPinia());
app.use(router);

// 可選：註冊全域元件 / 指令
// import BaseButton from '@/components/base/BaseButton.vue'
// app.component('BaseButton', BaseButton)

// 最後掛載
app.mount("#app");
```

> - 所有插件都應該在 `app.mount` 之前 `app.use()`。
> - 全域樣式在 `main.js` 引入 → 任何頁面都會生效。
> - 全域元件只在「整站共用的 UI」才註冊，其他盡量使用局部註冊，避免初次載入過重。

## 二、`App.vue` 做什麼？

> **職責**：應用的根元件，負責放置「全站共用骨架」：Header / Footer / 側邊欄、`<RouterView>`、全域 Modal/Toast 容器等。

### 1. 基本骨架（對應 Router 專案）

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <SiteHeader />

    <!-- 頁面內容入口（由 Router 決定顯示哪個 view） -->
    <main>
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteHeader from "@/components/layout/SiteHeader.vue";
import SiteFooter from "@/components/layout/SiteFooter.vue";
</script>

<style scoped>
main {
  min-height: calc(100vh - 120px);
}
</style>
```

### 2. 放全域 Loading / Toast 的典型寫法

```vue
<template>
  <SiteHeader />

  <main>
    <RouterView />
  </main>

  <GlobalToast />
  <GlobalLoading :active="loading" />

  <SiteFooter />
</template>

<script setup>
import GlobalToast from "@/components/global/GlobalToast.vue";
import GlobalLoading from "@/components/global/GlobalLoading.vue";
// loading 狀態多半來自 Pinia Store 或全域事件總線
// 這裡僅示意：透過 store 取得全域狀態
// import { useUiStore } from '@/store/ui'
// const { loading } = storeToRefs(useUiStore())
</script>
```

## 三、專案啟動流程（從 `index.html` 到畫面）

1.  `index.html` 內有 `<div id="app"></div>`（Vite 的入口）
2.  `main.js`：`createApp(App)` → `app.use(...)` 掛插件 → `app.mount('#app')`
3.  `App.vue`：渲染根布局 → `RouterView` 決定顯示哪個 `views/*`
4.  各 `views` 內再組裝 `components` → 完成頁面
