---
title: 其他指令：v-bind / v-slot / v-pre / v-memo / v-cloak
sidebar_label: " 其他指令：v-bind / v-slot / v-pre / v-memo / v-cloak"
keywords:
  - Vue3
tags:
  - Vue3
---

> 除了常見的 `v-if`、`v-for`、`v-model` 等指令外，Vue 還有一些不太常見但實用的指令。

## 1. `v-slot`

- 用於 **插槽 (slot)** 的語法糖。
- 讓父元件可以將內容傳入子元件的插槽位置。

```vue
<!-- 子元件 BaseLayout.vue -->
<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<!-- 父元件 -->
<BaseLayout>
  <template v-slot:header>
    <h1>這是標題</h1>
  </template>

  <p>這是主要內容</p>
</BaseLayout>
```

詳細請參考：https://cn.vuejs.org/api/built-in-directives#v-slot

## 2. `v-pre`

- 跳過這個元素的編譯，直接輸出原始內容。
- 常用來顯示「原始 Mustache 插值」或大量靜態內容。

```vue
<template>
  <p v-pre>{{ 這段文字不會被編譯 }}</p>
</template>
```

結果畫面會顯示：

```
{{ 這段文字不會被編譯 }}
```

## 3. `v-memo`

- Vue3 新增，能讓某些區塊「根據指定依賴決定是否要更新」。
- 可用來優化效能，減少不必要的重新渲染。

```vue
<script setup>
import { ref } from "vue";
const count = ref(0);
const staticValue = ref(100);
</script>

<template>
  <!-- 只有 count 變動時，才會更新這個區塊 -->
  <div v-memo="[count]">
    <p>Count: {{ count }}</p>
    <p>Static: {{ staticValue }}</p>
  </div>

  <button @click="count++">+1</button>
  <button @click="staticValue++">Static +1</button>
</template>
```

📌 在上例中，即使 `staticValue` 改變，該區塊也不會更新，除非 `count` 改變。

在單獨使用的情況下能提升的效能有限，但如果搭配`v-for`這種資料量可能會很多的情況，能改善的效能就會顯著提升

### 與`v-for`搭配使用

```vue
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

> 當組件的  `selected`  狀態改變，默認會重新創建大量的 vnode，儘管大部分都跟之前是一模一樣的

:::warning
當搭配  `v-for`  使用  `v-memo`，確保兩者都綁定在同一个元素上。**`v-memo`  不能用在   `v-for`  内部。**
:::

## 4. `v-cloak`

- 解決「畫面閃現未編譯模板」的問題。
- 預設不會消失，需要搭配 CSS 使用。

```html
<style>
  [v-cloak] {
    display: none;
  }
</style>

<div id="app" v-cloak>{{ message }}</div>
```

📌 **效果**：在 Vue 掛載完成前，會隱藏 `#app` 的內容，避免短暫看到 `{{ message }}`。

## 5. 小結

- **`v-slot`** → 插槽語法糖，父元件傳遞內容給子元件。
- **`v-pre`** → 跳過編譯，直接顯示原始內容。
- **`v-memo`** → 記憶渲染，根據依賴決定是否更新。
- **`v-cloak`** → 預防未編譯模板閃現。
