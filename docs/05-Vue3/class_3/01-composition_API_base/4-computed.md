---
title: computed 計算屬性
sidebar_label: "computed 計算屬性"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue3 中，當一個值需要 **依賴其他響應式變數** 來計算時，可以使用 `computed`。  
> 它具備 **快取機制**：只有相依的資料變化時，才會重新運算。

## 1. 基本用法

```vue
<script setup>
import { ref, computed } from "vue";

const price = ref(100);
const quantity = ref(2);

// 計算總價
const total = computed(() => price.value * quantity.value);
</script>

<template>
  <p>單價：{{ price }}</p>
  <p>數量：{{ quantity }}</p>
  <p>總價：{{ total }}</p>
</template>
```

📌 **重點**

- `computed` 內回傳的結果會被「快取」。
- 只有當 `price` 或 `quantity` 改變時，`total` 才會重新計算。

## 2. 與方法 (method) 的差別

- **computed** → 有快取，依賴的變數沒變就不會重算。
- **method** → 每次呼叫都會重新執行。

範例

```vue
<script setup>
import { ref, computed } from "vue";

const count = ref(1);

// 計算平方
const squareComputed = computed(() => count.value ** 2);

function squareMethod() {
  return count.value ** 2;
}
</script>

<template>
  <p>count: {{ count }}</p>
  <p>computed: {{ squareComputed }}</p>
  <p>method: {{ squareMethod() }}</p>
</template>
```

📌 在畫面重新渲染時：

- `squareComputed` 只會在 `count` 改變時重算。
- `squareMethod()` 每次都會執行。

## 3. 可寫的 `computed`

`computed` 不只能讀取，也可以設定 setter，實現 **雙向計算屬性**。

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("Tom");
const lastName = ref("Lee");

const fullName = computed({
  get: () => firstName.value + " " + lastName.value,
  set: (val) => {
    const names = val.split(" ");
    firstName.value = names[0] || "";
    lastName.value = names[1] || "";
  },
});
</script>

<template>
  <input v-model="fullName" />
  <p>First: {{ firstName }}</p>
  <p>Last: {{ lastName }}</p>
</template>
```

📌 **說明**

- `get` → 讀取時運算。
- `set` → 修改時，反向更新原始變數。

## 4. 常見應用場景

- 表單輸入的格式化（例如金額加上逗號）。
- 根據狀態計算顯示文字（例如購物車總數）。
- 複雜邏輯結果快取，避免不必要的重算。

## 5. 小結

- **computed** 適合處理 **依賴其他資料** 的值。
- 與 method 的最大不同在於 → computed 有 **快取**。
- 支援 getter / setter，可做雙向資料處理。
