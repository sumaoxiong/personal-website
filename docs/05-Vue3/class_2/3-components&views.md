---
title: 2.3 - components / views 差異
sidebar_label: "2.3 - components / views 差異"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue3 專案中，檔案常被放在 `components/` 或 `views/` 資料夾。  
> 它們雖然看起來都寫成 `.vue` 檔案，但用途與角色不同。

## 1. **views/**（頁面）

- **角色**：代表「完整頁面」，通常會對應到 **路由 (Route)**。
- **命名方式**：建議使用 `*View.vue`，例如：`HomeView.vue`、`LoginView.vue`。
- **特性**：
  - 一個 `view` 通常就是一個完整的畫面。
  - 大部分情況下，會由 `App.vue` 中的 `<RouterView />` 渲染出來。
  - 裡面通常會組合多個 `components` 來完成頁面。

### 範例

- src/views/HomeView.vue
- src/views/LoginView.vue
- src/views/DashboardView.vue

```vue
<!-- HomeView.vue -->
<template>
  <div>
    <HeroBanner />
    <FeatureList />
    <FooterSection />
  </div>
</template>

<script setup>
import HeroBanner from "@/components/home/HeroBanner.vue";
import FeatureList from "@/components/home/FeatureList.vue";
import FooterSection from "@/components/layout/FooterSection.vue";
</script>
```

## 2. **components/**（元件）

- **角色**：代表「頁面中的零件」，可被多個頁面重複使用。
- **命名方式**：依功能命名，避免與 `views` 混淆，例如：`NavBar.vue`、`TodoItem.vue`。
- **特性**：
  - 不直接對應路由。
  - 通常較小，負責單一功能或 UI 區塊。
  - 可以被多個 `views` 或其他 `components` 引入使用。

### 範例

- src/components/NavBar.vue
- src/components/TodoItem.vue
- src/components/base/BaseButton.vue

```vue
<!-- TodoItem.vue -->
<template>
  <li>
    <input type="checkbox" v-model="todo.done" />
    <span>{{ todo.content }}</span>
  </li>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>
```

## 3. **簡單結論**

- **views/** = **頁面**
  - 每個檔案通常綁定一個路由。
  - 可以組合多個 components。
- **components/** = **零件**
  - 負責 UI 或功能模組。
  - 可以重複使用在多個 views 中。

👉 記法：

- **view 是整棟房子**（整個頁面）。
- **component 是房子裡的傢俱**（按鈕、卡片、表單等）。

## 4. **檔案路徑設計**

### components

```bash
src/components/
├── base/        # 基礎元件（BaseButton、BaseInput，常可全域註冊）
├── layout/      # 共用框架（NavBar、Footer、Sidebar）
├── global/      # 全域功能（Toast、Loading、Modal）
└── feature/     # 功能模組（TodoItem、ProductCard）
```

- **base/** - 基礎元件層

  - **原子化設計**：最小可複用的 UI 單元
  - **無業務邏輯**：只負責樣式和基本交互
  - **高度可配置**：透過 props 控制外觀和行為
  - **全域註冊**：因為使用頻率極高，通常會全域註冊

- **layout/** - 佈局框架層

  - **頁面骨架**：定義頁面的整體結構
  - **跨頁面共用**：多個頁面都會使用的佈局元件
  - **響應式設計**：通常包含斷點適配邏輯

- **global/** - 全域功能層

  - **全域狀態管理**：通常配合 Pinia/Vuex 使用
  - **指令式調用**：可透過 API 方式調用（如 `$toast.show()`）
  - **層級管理**：處理 z-index 和遮罩層級
  - **單例模式**：通常只存在一個實例

- **feature/** - 業務功能層
  - **業務邏輯封裝**：包含特定的業務邏輯
  - **功能完整性**：一個元件完成一個完整功能
  - **可組合性**：可以組合多個 base 元件
  - **領域特定**：針對特定業務場景設計

#### 分層

```bash
頁面 → feature → base
     ↓
   layout + global
```

#### 依賴關係

- `feature` 依賴 `base`
- `layout` 可能依賴 `base` 和 `global`
- `base` 不依賴其他層級
- `global` 相對獨立

### view

view 在做檔案規劃時會有兩種形式

1. 依照網站地圖最規劃（推薦）
2. 依照功能做規劃

- **網站地圖模式**
  路徑範例

```bash
src/views/
├── home/
│   └── index.vue                    # /
├── about/
│   └── index.vue                    # /about
├── auth/
│   ├── login.vue                    # /auth/login
│   ├── register.vue                 # /auth/register
│   └── forgot-password.vue          # /auth/forgot-password
├── user/
│   ├── profile.vue                  # /user/profile
│   ├── settings.vue                 # /user/settings
│   └── [id]/
│       └── index.vue                # /user/:id
├── product/
│   ├── index.vue                    # /product
│   ├── [id]/
│       ├── index.vue                # /product/:id
│       └── edit.vue                 # /product/:id/edit
│   └── create.vue                   # /product/create
└── admin/
    ├── dashboard.vue                # /admin/dashboard
    ├── users/
    │   ├── index.vue                # /admin/users
    │   └── [id].vue                 # /admin/users/:id
    └── products/
        ├── index.vue                # /admin/products
        └── [id].vue                 # /admin/products/:id
```

優點：

1. 直觀
2. 路由(router)在寫的時候會跟檔案結構一樣

- **功能模組結構**

```bash
src/views/
├── auth/
├── user/
├── product/
├── admin/
└── common/
```

優點：

1. 如果遇到頁面功能差不多但會在其他的地方重複使用到時就可以重複利用，不必重新寫一個

> “功能模組結構”算是網站地圖結構的變體，是將利用率拉到最多的用法
