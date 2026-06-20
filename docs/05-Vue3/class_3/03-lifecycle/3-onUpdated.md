---
title: onUpdated
sidebar_label: "onUpdated"
keywords:
  - Vue3
tags:
  - Vue3
---

> `onUpdated` 是 Vue3 的生命週期 Hook 之一。  
> 它會在 **元件因為響應式資料變化而重新渲染並更新 DOM 後** 執行。

## 1. 什麼時候觸發？

- 當響應式狀態或 props 改變 → Vue 重新渲染元件 → DOM 更新完成後，才會觸發。
- 適合用於需要在「畫面更新完成」後，操作最新的 DOM。

## 2. 基本用法

```vue
<script setup>
import { ref, onUpdated } from "vue";

const count = ref(0);

onUpdated(() => {
  console.log("元件已更新，最新的 count:", count.value);
});
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="count++">+1</button>
</template>
```

📌 每次點擊按鈕，`count` 改變 → 元件更新 → 執行 `onUpdated`。

## 3. 常見應用場景

1. 更新後操作 DOM

   ```vue
   <script setup>
   import { ref, onUpdated } from "vue";

   const message = ref("Hello");

   onUpdated(() => {
     console.log("最新文字長度:", message.value.length);
   });
   </script>

   <template>
     <input v-model="message" />
     <p>{{ message }}</p>
   </template>
   ```

2. **與第三方套件整合**（例如需要重新渲染畫面後再初始化套件）。

## 4. 注意事項

- **onMounted vs onUpdated**
  - `onMounted` → 元件第一次渲染完成後執行（只跑一次）。
  - `onUpdated` → 每次資料更新導致重新渲染後都會執行。
- 如果只是想在資料改變時執行邏輯，通常 **用 `watch` 比較好**，因為 `onUpdated` 側重在「畫面已更新完成」。

## 5. 小結

- `onUpdated` → 每次響應式資料更新並導致 DOM 重新渲染後觸發。
- 適合：操作最新的 DOM、重新初始化外部套件。
- 不適合：純資料監聽（請改用 `watch`）。
