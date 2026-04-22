---
title: 4.3 - Props 傳遞資料
sidebar_label: "4.3 - Props 傳遞資料"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 中，**Props (Properties)** 是父元件用來傳遞資料給子元件的機制。  
> 就像函式的參數一樣，子元件透過 Props 接收，不能直接修改。

## 1. 基本用法

### 子元件：接收資料

```vue
<!-- src/components/UserCard.vue -->
<template>
  <div class="card">
    <h2>{{ name }}</h2>
    <p>年齡：{{ age }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  age: Number,
});
</script>
```

### 父元件：傳入資料

```vue
<!-- src/App.vue -->
<script setup>
import UserCard from "./components/UserCard.vue";
</script>

<template>
  <UserCard name="Tom" :age="20" />
</template>
```

📌 **重點**

- 靜態字串可直接傳：`name="Tom"`。
- 動態資料需加 `:`：`:age="20"`。

## 2. Props 型別與預設值

可以為 Props 定義型別、是否必填、預設值。

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});
</script>
```

📌 好處：

- 方便維護，避免父元件傳錯資料型別。
- 可設定預設值，避免未傳值時出錯。

## 3. 動態綁定 Props

父元件可以透過 **物件展開** 一次性傳多個 Props。

```vue
<script setup>
import UserCard from "./components/UserCard.vue";

const user = {
  name: "Amy",
  age: 18,
};
</script>

<template>
  <!-- 等同於 name="Amy" :age="18" -->
  <UserCard v-bind="user" />
</template>
```

## 4. 單向資料流

- Props 是 **唯讀的**，子元件不能直接修改。
- 如果要改，應該複製到自己的變數再處理。

```vue
<script setup>
const props = defineProps({ count: Number });

// ❌ 不可直接改 props.count++
// ✅ 建立本地變數
import { ref } from "vue";
const localCount = ref(props.count);
</script>
```

## 5\. 小結

- Props 是父傳子的方式，就像函式參數。
- 使用 `defineProps` 宣告並接收。
- 建議加上型別、必填、預設值，方便維護。
- Props 遵循 **單向資料流**：父 → 子，不能在子元件中直接修改。
