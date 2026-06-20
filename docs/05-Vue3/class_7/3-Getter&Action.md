---
title: 7.3 - Getter 與 Action
sidebar_label: "7.3 - Getter 與 Action"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Pinia 的 **Setup Store** 中：

- **Getter**：用 `computed` 來定義，類似元件中的 `computed`，用來處理衍生資料。
- **Action**：用一般函式來定義，可以修改 state，也可以執行非同步邏輯（例如呼叫 API）。

## 1. Getter（衍生資料）

Getter 適合用來處理「根據 state 衍生出的資料」。

```js
// src/stores/counter.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  // Getter：計算兩倍的數字
  const double = computed(() => count.value * 2);

  return { count, double };
});
```

使用範例：

```vue
<script setup>
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
</script>

<template>
  <p>原始數字：{{ counter.count }}</p>
  <p>兩倍數字：{{ counter.double }}</p>
</template>
```

📌 **重點**

- Getter 本質上就是 `computed`。
- 只有相依的 state 改變時，才會重新計算。

## 2. Action（方法 / 非同步邏輯）

Action 是修改 state 的主要方式，也可以處理非同步請求。

```javascript
// src/stores/counter.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  const double = computed(() => count.value * 2);

  // Action：同步方法
  function increment() {
    count.value++;
  }

  // Action：非同步方法
  async function incrementAfterDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    count.value++;
  }

  return { count, double, increment, incrementAfterDelay };
});
```

使用範例：

```vue
<script setup>
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
</script>

<template>
  <p>數字：{{ counter.count }}</p>
  <button @click="counter.increment">+1</button>
  <button @click="counter.incrementAfterDelay">延遲 +1</button>
</template>
```

📌 **重點**

- Action 可以直接修改 state。
- Action 可以是同步或非同步函式。
- 在組件中呼叫 Action 就像呼叫一般方法。

## 3. 小結

- **Getter** → 用 `computed` 定義，適合做資料的「衍生運算」。
- **Action** → 用函式定義，適合處理「邏輯與非同步操作」。
- 在 Setup Store 裡，Getter 和 Action 與 Vue3 的 Composition API 寫法完全一致。
