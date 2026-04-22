---
title: 插值與綁定：{{ }}、:屬性、v-text、v-once、v-html
sidebar_label: "插值與綁定：{{ }}、:屬性、v-text、v-once、v-html"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 模板中，最基本的功能就是將 **資料顯示在畫面上**，這可以透過「插值」與「綁定」來完成。

## 1. 插值語法 `{{ }}`

- 用於在模板中輸出變數或表達式。
- 支援 JS 運算，但建議保持簡單。

```vue
<script setup>
const message = "Hello Vue3";
const count = 5;
</script>

<template>
  <p>{{ message }}</p>
  <p>{{ count + 1 }}</p>
</template>
```

## 2. 屬性綁定 `:屬性`

- 使用 `:` 前綴來綁定 HTML 屬性，使其能動態更新。

```vue
<script setup>
const imageUrl = "https://vuejs.org/images/logo.png";
</script>

<template>
  <!-- 動態設定 src -->
  <img :src="imageUrl" alt="Vue logo" />
</template>
```

## 3\. `v-text`

- 功能與 `{{ }}` 類似，但會直接設定元素文字內容。

```vue
<script setup>
const message = "Hello Vue3 with v-text";
</script>

<template>
  <p v-text="message"></p>
  <!-- 等同於 -->
  <p>{{ message }}</p>
</template>
```

## 4. `v-once`

- 只渲染一次，之後不會隨資料變化而更新。
- 適合顯示靜態、不會改變的內容。

```vue
<script setup>
import { ref } from "vue";
const title = ref("初始標題");
</script>

<template>
  <h1 v-once>{{ title }}</h1>
  <button @click="title = '更新後標題'">改變標題</button>
</template>
```

📌 即使按下按鈕，標題也不會更新。

## 5. `v-html`

- 將資料內容當作 HTML 插入，而不是純文字。

```vue
<script setup>
const htmlContent = '<strong style="color:red;">這是紅色字</strong>';
</script>

<template>
  <p v-html="htmlContent"></p>
</template>
```

:::warning
⚠️ **安全提醒**：  
若 `htmlContent` 來自使用者輸入，可能造成 **XSS 攻擊**。  
避免直接渲染不可信的資料。
詳細說明可參考：https://cn.vuejs.org/api/built-in-directives#v-html
:::

## 6. `v-bind`

- 縮寫是 `:`，用來將 **HTML 屬性** 綁定到動態變數。
- 前面「屬性綁定」章節其實就是 `v-bind` 的應用。

```vue
<script setup>
const url = "https://vuejs.org";
</script>

<template>
  <a v-bind:href="url">Vue 官方網站</a>
  <!-- 縮寫 -->
  <a :href="url">Vue 官方網站</a>
</template>
```

## 7. 小結

- `{{ }}` → 最常用的插值，簡單直觀。
- `:屬性` → 綁定 HTML 屬性。
- `v-text` → 插入文字（功能等同 `{{ }}`）。
- `v-once` → 渲染一次後不再更新。
- `v-html` → 插入 HTML（⚠️ 需注意安全性）。
- **`v-bind`** → 動態綁定屬性（縮寫 `:`）。
