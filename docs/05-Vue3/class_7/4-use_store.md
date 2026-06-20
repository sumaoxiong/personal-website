---
title: 7.4 - 在組件中使用 Store
sidebar_label: "7.4 - 在組件中使用 Store"
keywords:
  - Vue3
tags:
  - Vue3
---

定義好 Store 之後，下一步就是在 Vue 組件中使用。  
Pinia 的 Store 本質上就是一個 **響應式物件**，可以像使用 `ref` 或 `reactive` 一樣操作。

## 1. 基本使用

```vue
<script setup>
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
</script>

<template>
  <p>數字：{{ counter.count }}</p>
  <p>兩倍數字：{{ counter.double }}</p>
  <button @click="counter.increment">+1</button>
</template>
```

📌 **重點**

- `useCounterStore()` → 呼叫後會回傳 **該 Store 的單例實例**。
- 在任何組件中呼叫，取得的都是同一個 Store，資料會共享。

## 2. 解構 Store（保持響應性）

如果直接解構 Store，會失去響應性。  
解決方法是使用 Pinia 提供的 `storeToRefs()`。

```vue
<script setup>
import { useCounterStore } from "../stores/counter";
import { storeToRefs } from "pinia";

const counter = useCounterStore();

// 透過 storeToRefs 保持響應性
const { count, double } = storeToRefs(counter);

// Action 不需要包，直接使用即可
const { increment } = counter;
</script>

<template>
  <p>數字：{{ count }}</p>
  <p>兩倍數字：{{ double }}</p>
  <button @click="increment">+1</button>
</template>
```

📌 **重點**

- State 與 Getter → 用 `storeToRefs()` 解構，才能保持響應性。
- Action → 直接解構即可，不會失去響應性。

## 3. 為什麼要「解構」

如果你 **直接用 `store.xxx`** 的方式，也一樣是雙向綁定，不一定需要解構：

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
</script>

<template>
  <p>{{ store.count }}</p>
  <button @click="store.count++">+</button>
</template>
```

這種寫法沒有問題。  
但有些情況下 **解構更方便**：

- 需要頻繁取用很多屬性，避免一直寫 `store.` 前綴。
- 避免 ESLint/TS 提示 `store` 沒被使用完整類型。
- 程式碼更簡潔、可讀性高。

📌 總結

- **不用解構** → 直接用 `store.xxx`，天然就是響應式，雙向綁定沒問題。
- **要解構** → 就必須搭配 `storeToRefs`，否則會失去響應性。
- **取捨點**：
  - 少量屬性 → 直接用 `store.xxx`。
  - 多個屬性 → 解構 + `storeToRefs` 比較乾淨。

## 4. 跨組件共享

Pinia 的特點之一就是 **跨組件共享狀態**。

範例

```vue
<!-- A.vue -->
<script setup>
import { useCounterStore } from "../stores/counter";
const counter = useCounterStore();
</script>

<template>
  <button @click="counter.increment">A 組件 +1</button>
</template>
```

```vue
<!-- B.vue -->
<script setup>
import { useCounterStore } from "../stores/counter";
const counter = useCounterStore();
</script>

<template>
  <p>B 組件的數字：{{ counter.count }}</p>
</template>
```

📌 **效果**

- 在 `A.vue` 點擊按鈕後，`B.vue` 的數字也會更新。
- 因為它們共用同一個 Store。

## 4. 小結

- 在組件中呼叫 `useStore()`，就能使用 Store 的狀態與方法。
- 解構時要用 `storeToRefs()`，避免失去響應性。
- Pinia 的 Store 是單例 → 不同組件之間共享同一份狀態。
