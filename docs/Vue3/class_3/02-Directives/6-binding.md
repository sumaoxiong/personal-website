---
title: 雙向綁定：v-model
sidebar_label: " 雙向綁定：v-model"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 中，`v-model` 用來建立 **表單元素與資料之間的雙向綁定**。  
> 這代表使用者輸入的資料會自動更新到變數，而變數的改變也會即時反映在畫面上。

## 1. 基本用法

```vue
<script setup>
import { ref } from "vue";
const text = ref("");
</script>

<template>
  <input v-model="text" placeholder="輸入一些文字" />
  <p>你輸入的內容是：{{ text }}</p>
</template>
```

📌 **重點**

- `text` 是響應式變數。
- 當輸入框改變時，`text` 的值也會更新。
- 當程式改變 `text`，輸入框也會同步更新。

2. 支援的元素類型

- `<input type="text">`
- `<input type="checkbox">`
- `<input type="radio">`
- `<select>`
- `<textarea>`

### 範例：核取方塊

```vue
<script setup>
import { ref } from "vue";
const checked = ref(false);
</script>

<template>
  <input type="checkbox" v-model="checked" /> 同意條款
  <p>勾選狀態：{{ checked }}</p>
</template>
```

### 範例：選單

```vue
<script setup>
import { ref } from "vue";
const selected = ref("apple");
</script>

<template>
  <select v-model="selected">
    <option value="apple">蘋果</option>
    <option value="banana">香蕉</option>
    <option value="mango">芒果</option>
  </select>
  <p>選擇的水果是：{{ selected }}</p>
</template>
```

## 3. 修飾符

Vue 提供了幾個修飾符來處理輸入。

```vue
<script setup>
import { ref } from "vue";
const number = ref(0);
const lazyText = ref("");
const trimmed = ref("");
</script>

<template>
  <!-- .number → 自動轉型成數字 -->
  <input v-model.number="number" type="number" />
  <p>數字：{{ number }} (型別：{{ typeof number }})</p>

  <!-- .lazy → 輸入後需失焦才會更新 -->
  <input v-model.lazy="lazyText" placeholder="失焦才更新" />
  <p>文字：{{ lazyText }}</p>

  <!-- .trim → 自動移除前後空白 -->
  <input v-model.trim="trimmed" placeholder="會自動去除空白" />
  <p>文字：{{ trimmed }}</p>
</template>
```

## 4. 在自訂元件中使用 `v-model`

除了表單元素，`v-model` 也能用在自訂元件中。  
Vue3 支援 **多個 v-model**，可以命名。

```vue
<!-- 父元件 -->
<CustomInput v-model="username" />

<!-- 子元件 CustomInput.vue -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
```

📌 **說明**

- `v-model` 在底層等同於 **`:modelValue` + `@update:modelValue`**。
- 這是 Vue3 的標準規範。

## 5\. 小結

- `v-model` = 雙向綁定，常用於表單元素。
- 修飾符：
  - `.number` → 轉數字
  - `.trim` → 去除空白
  - `.lazy` → 失焦才更新
- 在自訂元件中，透過 `modelValue` 與 `update:modelValue` 實現。
