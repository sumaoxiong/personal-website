---
title: onUnmounted
sidebar_label: "onUnmounted"
keywords:
  - Vue3
tags:
  - Vue3
---

`onUnmounted` 是 Vue3 的生命週期 Hook。  
它會在 **元件被銷毀 (卸載) 後** 執行，通常用來做「清理工作」。

## 1. 什麼時候觸發？

- 當元件不再顯示，並且從 DOM 中移除時觸發。
- 典型情境：
  - 路由切換到別的頁面。
  - `v-if` 條件變為 false，元件被移除。

## 2. 基本用法

```vue
<script setup>
import { onUnmounted } from "vue";

onUnmounted(() => {
  console.log("元件已經被卸載");
});
</script>

<template>
  <p>當這個元件被移除時，會觸發 onUnmounted</p>
</template>
```

## 3. 常見應用場景

1.  **移除事件監聽器**

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
      window.removeEventListener("resize", handleResize);
    });
    </script>
    ```

2.  **清除計時器 / Interval**

    ```vue
    <script setup>
    import { ref, onMounted, onUnmounted } from "vue";

    const count = ref(0);
    let timer = null;

    onMounted(() => {
      timer = setInterval(() => {
        count.value++;
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });
    </script>

    <template>
      <p>{{ count }}</p>
    </template>
    ```

3.  **斷開 WebSocket / API 連線**

    ```vue
    <script setup>
    import { onUnmounted } from "vue";

    let socket = new WebSocket("wss://example.com");

    onUnmounted(() => {
      socket.close();
    });
    </script>
    ```

## 4. 注意事項

- 如果有在 `onMounted` 中註冊資源（事件、計時器、連線），記得在 `onUnmounted` 清理，避免 **記憶體洩漏**。
- 若是全域狀態（例如 Pinia store），不會隨著元件卸載而消失，需要手動重設或清理。

## 5. 小結

- `onUnmounted` → 元件被移除後執行。
- 常用於：移除事件、清除計時器、關閉連線。
- 與 `onMounted` 搭配，確保「註冊」與「清理」成對出現。
