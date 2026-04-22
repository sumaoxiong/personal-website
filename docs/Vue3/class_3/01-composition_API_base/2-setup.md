---
title: setup() 函式
sidebar_label: "setup() 函式"
keywords:
  - Vue3
tags:
  - Vue3
---

> `setup()` 是 Vue3 Composition API 的核心入口點。  
> 所有的響應式變數、函式邏輯，都需要寫在 `setup()` 裡面，並回傳給模板 (`template`) 使用。

## 1. 基本概念

- Vue3 的組件在建立時，會先執行 `setup()`。
- 在 `setup()` 內宣告的變數與方法，可以回傳給模板使用。
- 回傳的物件，會在模板中被直接取用。

## 2. 基本語法

```vue
<script>
import { ref } from "vue";

export default {
  setup() {
    const message = ref("Hello Vue3!");

    const changeMessage = () => {
      message.value = "Hi from setup!";
    };

    return {
      message,
      changeMessage,
    };
  },
};
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="changeMessage">點我改變文字</button>
</template>
```

📌 **說明**

- `message` 是響應式資料，透過 `ref` 建立。
- `changeMessage` 是方法，改變 `message.value`。
- `return` 的物件，才能在模板中使用。

## 3\. 與 `<script setup>` 的關係

Vue3 提供了 **語法糖** `<script setup>`，讓開發更簡潔，省去手動寫 `setup()` 和 `return`。

```vue
<script setup>
import { ref } from "vue";

const message = ref("Hello Vue3!");

const changeMessage = () => {
  message.value = "Hi from <script setup>!";
};
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="changeMessage">點我改變文字</button>
</template>
```

📌 **差異**

- 傳統 `setup()` → 需要 `return { message, changeMessage }`。
- `<script setup>` → 直接宣告，變數與方法自動可用於模板。

## 4. 小結

- `setup()` 是 Composition API 的入口。
- 建立的變數、方法需回傳才能在模板使用。
- 建議在新專案中盡量使用 **`<script setup>`**，更簡潔、直觀。
