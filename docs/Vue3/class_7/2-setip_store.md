---
title: 7.2 - 定義 Store (Setup Store)
sidebar_label: "7.2 - 定義 Store (Setup Store)"
keywords:
  - Vue3
tags:
  - Vue3
---

在 Pinia 中，**Store** 就是「集中管理狀態的容器」。  
每個 Store 就像是一個獨立的資料模組，裡面可以放 **state**（資料）、**getter**（計算屬性）、**action**（方法）。

:::warning[注意]
請注意，pinia 有兩種的寫法，分別是 Option Store 和 Setup Store

- Option Store：適合 Option API
- Setup Store：適合 Composition API
  :::

官方文件：https://pinia.vuejs.org/zh/core-concepts/

## 1. 建立 Store 檔案

建議在 `src/stores/` 建立 Store 檔案，例如 `counter.js`。

```js
// src/stores/counter.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // state
  const count = ref(1); //預設一個count變數的數值為1

  // getters
  const double = computed(() => count.value * 2); //計算數值，將count*2

  // actions
  function increment() {
    count.value++; //count+1
  }

  return { count, double, increment };
});
```

📌 **重點**

- `defineStore('counter', () => {...})` → 第二個參數改成函式。
- 用 `ref`、`reactive` 來建立 state。
- Getter 可以直接用 `computed`。
- Action 就是一般的函式。
- 在寫 export 的變數設定時變數的開頭要有`use`，例如範例中的`useCounterStore`

## 2. 在組件中使用 Store

```vue
<script setup>
import { useCounterStore } from "../stores/counter";
const counter = useCounterStore();
</script>

<template>
  <p>目前數字：{{ counter.count }}</p>
  <p>兩倍數字：{{ counter.double }}</p>
  <button @click="counter.increment">+1</button>
</template>
```

📌 **說明**

- 取出的 `counter` 就像一個響應式物件。
- 可以直接存取 state (`counter.count`)、getter (`counter.double`)、action (`counter.increment`)。

## 3. 多個 Store

一個專案中通常會有多個 Store，分別管理不同的資料。

```javascript
// src/stores/user.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const name = ref("Tom");
  const isLogin = ref(false);

  function login(username) {
    name.value = username;
    isLogin.value = true;
  }

  function logout() {
    name.value = "";
    isLogin.value = false;
  }

  return { name, isLogin, login, logout };
});
```

在組件中使用：

```vue
<script setup>
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
</script>

<template>
  <p>使用者：{{ userStore.name }}</p>
  <p v-if="userStore.isLogin">已登入</p>
  <button @click="userStore.login('Amy')">登入</button>
  <button @click="userStore.logout">登出</button>
</template>
```

## 4. 小結

- Setup Store 用 **Composition API** 定義：`ref`、`computed`、`function`。
- 使用 `defineStore('id', () => {...})`。
- 在組件中 `useStore()` 取得實例，直接使用 state、getter、action。
- 適合使用 `<script setup>` 的 Vue3 專案。
