---
title: 7.5 - Pinia進階應用
sidebar_label: "7.5 - Pinia進階應用"
keywords:
  - Vue3
tags:
  - Vue3
---

學會了 Pinia 的基本使用後，可以進一步掌握一些進階技巧，讓專案更容易維護與擴充。

## 1. 跨組件共享（補充）

Pinia 的 Store 是 **單例**，任何組件都可以存取同一份狀態。  
這樣可以取代繁瑣的 Props 傳遞與事件層層傳送。

### 範例：登入狀態共享

```js
// src/stores/user.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const isLogin = ref(false);
  const name = ref("");

  function login(username) {
    name.value = username;
    isLogin.value = true;
  }

  function logout() {
    name.value = "";
    isLogin.value = false;
  }

  return { isLogin, name, login, logout };
});
```

在不同組件中：

```vue
<!-- Header.vue -->
<script setup>
import { useUserStore } from "../stores/user";
const user = useUserStore();
</script>

<template>
  <p v-if="user.isLogin">歡迎，{{ user.name }}</p>
</template>
```

```vue
<!-- LoginForm.vue -->
<script setup>
import { useUserStore } from "../stores/user";
const user = useUserStore();
</script>

<template>
  <button @click="user.login('Amy')">登入</button>
</template>
```

📌 **效果**：在 `LoginForm.vue` 登入後，`Header.vue` 也會立即更新。
