---
title: 4.1 - 組件與 Props/Emit 說明
sidebar_label: "4.1 - 組件與 Props/Emit 說明"
keywords:
  - Vue3
tags:
  - Vue3
---

Vue 的強大之處在於 **元件化 (Component)**。  
透過元件，我們可以將頁面拆分為小區塊，讓程式更容易維護、重複使用。

在這個章節，我們會學習：

1. **建立組件與引入** → 如何拆分程式成獨立元件。
2. **Props 傳遞資料** → 父元件傳資料給子元件。
3. **Emit 事件傳遞** → 子元件回傳事件給父元件。
4. **父子元件資料流範例** → Props + Emit 的綜合應用。
5. **插槽 (Slots) 基本用法** → 傳遞自訂內容到子元件。

## 元件的基本概念

- **元件 (Component)**：Vue 應用的最小組成單位。
- **父元件 (Parent)**：包含其他元件的組件。
- **子元件 (Child)**：被父元件引入使用的組件。

### 範例：最簡單的元件使用

```vue
<!-- 子元件 HelloWorld.vue -->
<template>
  <h1>Hello Vue3 組件！</h1>
</template>

<!-- 父元件 App.vue -->
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <HelloWorld />
</template>
```

📌 這樣就完成了最簡單的組件拆分。

## 為什麼需要 Props 與 Emit？

1.  **Props** → 用來讓父元件 **傳遞資料** 給子元件。
    - 就像函式的參數一樣。
2.  **Emit** → 用來讓子元件 **回傳事件** 給父元件。
    - 就像函式的回呼 (callback)。

📌 搭配使用，就能讓父子元件之間建立資料流。

## 插槽 (Slots)

有些時候，父元件不只是傳資料，而是想 **傳結構/內容** 到子元件。  
這時就會用到 **插槽 (slot)**。

## 小結

- Vue 的開發核心在於 **組件化**。
- Props → 父傳子。
- Emit → 子傳父。
- 插槽 → 父傳內容給子。
- 父子元件之間的資料流是 Vue 開發的基礎。
