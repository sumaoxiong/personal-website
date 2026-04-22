---
title: watch 與 watchEffect
sidebar_label: "watch 與 watchEffect"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue3 中，當你需要 **監聽資料變化並執行副作用**（side effect，例如 console.log、呼叫 API），可以使用 `watch` 或 `watchEffect`。

## 1. `watch`

### 基本語法

```vue
<script setup>
import { ref, watch } from "vue";

const count = ref(0);

// 監聽 count 的變化
watch(count, (newVal, oldVal) => {
  console.log(`count 從 ${oldVal} 變成 ${newVal}`);
});
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
</template>
```

📌 **重點**

- `watch(要監聽的資料, callback)`
- `callback` 會接收 `(newVal, oldVal)`。
- 適合用於需要「指定監聽對象」的情境。

### 監聽多個值

```javascript
watch([countA, countB], ([newA, newB], [oldA, oldB]) => {
  console.log(`A: ${oldA} -> ${newA}, B: ${oldB} -> ${newB}`);
});
```

### 深層監聽 (deep)

`reactive` 預設只會監聽「第一層屬性」，要監聽深層物件需加上 `deep: true`。

```javascript
const user = reactive({ name: "Tom", info: { age: 20 } });

watch(
  () => user.info,
  (newVal, oldVal) => {
    console.log("info 變了:", newVal);
  },
  { deep: true }
);
```

## 2. `watchEffect`

### 基本語法

```vue
<script setup>
import { ref, watchEffect } from "vue";

const count = ref(0);

watchEffect(() => {
  console.log(`count 現在是：${count.value}`);
});
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
</template>
```

📌 **重點**

- `watchEffect` 會 **自動收集依賴**。
- 任何在回調函式裡用到的響應式變數，都會自動被監聽。
- **初始時會自動執行一次**。

### 停止監聽

```javascript
const stop = watchEffect(() => {
  console.log(count.value);
});

// 停止監聽
stop();
```

## 3. `watch` vs `watchEffect` 差異

| 特性     | `watch`                            | `watchEffect`               |
| -------- | ---------------------------------- | --------------------------- |
| 監聽對象 | 需要明確指定 (ref/reactive)        | 自動收集依賴                |
| 初始執行 | 預設不會（除非 `immediate: true`） | 會立即執行一次              |
| 回調參數 | `(newVal, oldVal)`                 | 只有新的值（不提供 oldVal） |
| 適合情境 | 監聽特定資料、需要 oldVal 時       | 監聽多個資料、快速測試      |

## 4. 常見應用場景

- `watch`
  - 監聽表單輸入 → 驗證格式。
  - 監聽路由參數 → 重新載入資料。
  - 需要 oldVal 與 newVal 來比較。
- `watchEffect`
  - 自動同步一些副作用，例如 console.log。
  - 初始化時需要馬上執行一次的邏輯（例如先打一次 API）。

## 5. 小結

- **`watch`** → 明確監聽目標，適合需要舊值比較。
- **`watchEffect`** → 自動收集依賴，適合快速響應副作用。
- 若需要馬上執行一次，可以：
  - `watch` 加 `immediate: true`。
  - 或者直接用 `watchEffect`。
