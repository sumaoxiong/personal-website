---
title: ref() 與 reactive()
sidebar_label: "ref() 與 reactive()"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue3 Composition API 中，最常用的就是 **響應式資料**。  
> Vue 提供了兩個主要 API：`ref()` 與 `reactive()`，用來建立可追蹤變化的資料。

## 1. `ref()`

- 適合用來處理「單一值」：字串、數字、布林、甚至物件。
- 存取或修改時，要透過 `.value`。

### 範例：計數器

```vue
<script setup>
import { ref } from "vue";

const count = ref(0); //將count的預設值設為0

const add = () => {
  count.value++;
};
</script>

<template>
  <button @click="add">Count: {{ count }}</button>
</template>
```

📌 **重點**

- `ref(0)` 建立了一個響應式變數。
- 修改時使用 `count.value++`。
- 在模板 (`template`) 中會自動幫你取 `.value`，所以可以直接寫 `{{ count }}`。

### 使不使用 ref 的差異

我們將原本範例中 count 的 ref 拿掉，程式碼如下

```vue
<script setup>
import { ref } from "vue";

const count = 0; //將count的預設值設為0

const add = () => {
  count.value++;
};
</script>

<template>
  <button @click="add">Count: {{ count }}</button>
</template>
```

結果會造成雖然 JavaScript 的變數值改了，但 **畫面不會重新渲染**，因為 Vue 不知道你改了 `count`。

📌 **需不需要使用 ref 的判斷**

| 問題                                                   | 答案                        |
| ------------------------------------------------------ | --------------------------- |
| 這個值會在畫面上顯示出來嗎？                           | ✅ 用 `ref()`               |
| 它會被 `v-if`、`v-for`、`v-show`、`v-model` 等使用嗎？ | ✅ 用 `ref()`               |
| 它只是用來計算、暫存、或在函式中傳遞？                 | ❌ 不用 `ref()`             |
| 它是一個物件（例如 user、form）？                      | 🔸 用 `reactive()` 會更方便 |

## 2\. `reactive()`

- 適合用來處理「物件 / 陣列」。
- 不需要 `.value`，可以直接修改屬性。

### 範例：使用者物件

```vue
<script setup>
import { reactive } from "vue";

const user = reactive({
  name: "Tom",
  age: 20,
});

const growUp = () => {
  user.age++;
};
</script>

<template>
  <p>{{ user.name }} - {{ user.age }}</p>
  <button @click="growUp">+1 歲</button>
</template>
```

📌 **重點**

- `reactive({})` 會回傳一個「Proxy 物件」。
- 直接操作屬性即可觸發響應更新。

## 3\. `ref()` 與 `reactive()` 的差異

| 特性         | `ref()`                  | `reactive()`      |
| ------------ | ------------------------ | ----------------- |
| 適合用來處理 | 單一值（字串/數字/布林） | 物件、陣列        |
| 存取方式     | `.value`                 | 直接存取          |
| 模板中存取   | 自動解開 `.value`        | 直接使用          |
| 本質         | 包裝一個值的物件         | 物件/陣列的 Proxy |

## 4\. 特殊情況

### 1) 用 `ref` 包物件

```javascript
const user = ref({ name: "Tom", age: 20 });
user.value.age++; // 需要透過 .value
```

### 2) 搭配解構（需注意）

如果對 `reactive` 物件解構，會失去響應性：

```javascript
const user = reactive({ name: "Tom", age: 20 });
const { name } = user; // ❌ name 不再是響應式
```

解法 → 使用 `toRefs()` 或 `storeToRefs()`（Pinia 常用）：

```javascript
import { toRefs } from "vue";
const { name, age } = toRefs(user); // ✅ 保持響應性
```

## 5\. 小結

- **`ref()`**：單一值，存取用 `.value`。
- **`reactive()`**：物件/陣列，直接操作屬性。
- 解構 reactive 時要小心，避免失去響應性。
- 如果擔心無法判斷什麼時候要使用 **`ref()`** 或 **`reactive()`** ，可以全部都使用`ref()`，後續實戰經驗多了就知道什麼時候要使用`reactive()`了
