---
title: 4.6 - 插槽 (Slots) 基本用法
sidebar_label: "4.6 - 插槽 (Slots) 基本用法"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Vue 中，**插槽 (Slot)** 提供一種方式，讓父元件可以把「內容」傳遞到子元件中，而不只是單純傳遞資料。  
這讓元件更有彈性與可重複使用性。

## 1. 基本插槽

子元件使用 `<slot>` 標籤來定義插槽位置。

### 子元件：BaseCard.vue

```vue {3-4}
<template>
  <div class="card">
    <slot></slot>
    <!-- 父元件傳入的內容會放在這裡 -->
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}
</style>
```

### 父元件：App.vue

```vue
<script setup>
import BaseCard from "./components/BaseCard.vue";
</script>

<template>
  <BaseCard>
    <h2>這是一個標題</h2>
    <p>這段文字是父元件傳入的內容。</p>
  </BaseCard>
</template>
```

📌 **效果**：父元件的 `<h2>` 和 `<p>`，會顯示在子元件 `<slot>` 的位置。

## 2. 具名插槽

若子元件有多個插槽，可以用 `name` 來區分。

### 子元件：BaseLayout.vue

```vue
<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
    <!-- 預設插槽 -->
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>
```

### 父元件：App.vue

```vue
<BaseLayout>
  <template #header>
    <h1>這是標頭</h1>
  </template>

  <p>這是主要內容</p>

  <template #footer>
    <p>這是頁尾</p>
  </template>
</BaseLayout>
```

📌 **縮寫**：`<template v-slot:header>` 可以寫成 `<template #header>`。

## 3. 作用域插槽 (Scoped Slot)

插槽不僅能傳內容，子元件還可以把資料回傳給父元件使用。

### 子元件：ItemList.vue

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: Array,
});
</script>
```

### 父元件：App.vue

```vue
<script setup>
import ItemList from "./components/ItemList.vue";
</script>

<template>
  <ItemList :items="['蘋果', '香蕉', '芒果']">
    <template #default="{ item }">
      <strong>{{ item }}</strong>
    </template>
  </ItemList>
</template>
```

📌 **效果**：子元件把 `item` 傳給父元件 → 父元件決定如何渲染。

## 4. 小結

- **基本插槽** → 父元件傳內容給子元件。
- **具名插槽** → 多個插槽，用 `name` 區分。
- **作用域插槽** → 子元件提供資料，父元件決定如何顯示。

👉 插槽讓元件更靈活，能支援複雜的 UI 排版與內容客製化。
