---
title: onMounted
sidebar_label: "onMounted"
keywords:
  - Vue3
tags:
  - Vue3
---

> `onMounted` 是 Vue3 中最常用的生命週期 Hook 之一。  
> 它會在 **元件掛載完成後 (mounted)** 執行，此時 DOM 已經可以操作，適合放置初始化邏輯。

## 1. 什麼時候觸發？

- 元件第一次被渲染，並且掛載到 DOM 後。
- 此時可以安全地存取 DOM 元素，或執行需要畫面存在的操作。

## 2. 基本用法

```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("元件已經掛載完成，可以操作 DOM");
});
</script>

<template>
  <p>這是一個 onMounted 範例</p>
</template>
```

## 3. 常見應用場景

1. **呼叫 API**：元件一開始就需要資料時。

   ```vue
   <script setup>
   import { ref, onMounted } from "vue";

   const users = ref([]);

   onMounted(async () => {
     const res = await fetch("https://jsonplaceholder.typicode.com/users");
     users.value = await res.json();
   });
   </script>

   <template>
     <ul>
       <li v-for="user in users" :key="user.id">{{ user.name }}</li>
     </ul>
   </template>
   ```

2. 操作 DOM

   ```vue
   <script setup>
   import { ref, onMounted } from "vue";

   const inputRef = ref(null);

   onMounted(() => {
     inputRef.value.focus(); // 自動聚焦
   });
   </script>

   <template>
     <input ref="inputRef" placeholder="自動聚焦輸入框" />
   </template>
   ```

3. 註冊事件 / 啟動外部套件

   ```vue
   <script setup>
   import { onMounted, onUnmounted } from "vue";

   const handleResize = () => {
     console.log("視窗大小改變");
   };

   onMounted(() => {
     window.addEventListener("resize", handleResize);
   });

   onUnmounted(() => {
     window.removeEventListener("resize", handleResize); // 清理事件
   });
   </script>
   ```

## 4. 注意事項

- `onMounted` 只會在 **第一次掛載** 時執行一次。
- 不適合放需要隨資料更新的邏輯（那應該用 `watch` 或 `onUpdated`）。
- 如果需要在 **伺服器端渲染 (SSR)** 中執行初始化，記得注意 `onMounted` 只會在 **瀏覽器端** 執行。

## 5. 小結

- `onMounted` → 元件掛載完成後觸發。
- 常用於：呼叫 API、操作 DOM、註冊事件。
- 記得搭配 `onUnmounted` 清理資源，避免記憶體洩漏。
