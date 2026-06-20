---
title: 迴圈渲染：v-for
sidebar_label: "迴圈渲染：v-for"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 中，可以使用 `v-for` 指令來迭代陣列或物件，動態產生多個元素。

## 1. 基本用法（陣列迭代）

```vue
<script setup>
const items = ["蘋果", "香蕉", "芒果"];
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>
```

📌 **重點**

- `v-for="item in items"` → 逐一取出陣列元素。
  - `item` 是一個臨時變數，就像一個裝東西的盒子，會依序裝入陣列中的每一個元素（「蘋果」→「香蕉」→「芒果」）
- `:key` → 建議加上唯一鍵值，幫助 Vue 優化渲染。
  - **`:key`** 就像是每個元素的**專屬身分證字號**。當 Vue 更新頁面時，它需要一個唯一的值來識別每個元素。加上 `:key` 可以讓 Vue 更有效地重複利用或移動現有的元素，而不是把整個列表都重新建立一遍，**能大幅提升效能**。

## 2. 同時取出索引

如果你想知道每個元素是第幾個，可以同時取出**索引值**（index）。索引值從 `0` 開始。

```vue
<li v-for="(item, index) in items" :key="index">
  {{ index }} - {{ item }}
</li>
```

這段程式碼會顯示：
`0 - 蘋果`
`1 - 香蕉`
`2 - 芒果`

## 3. 迭代物件

`v-for` 不只可以用在陣列，也能用來顯示物件裡的資料，遍歷物件的 key/value。

```vue
<script setup>
const user = {
  name: "Tom",
  age: 20,
  city: "Taipei",
};
</script>

<template>
  <ul>
    <li v-for="(value, key) in user" :key="key">{{ key }}: {{ value }}</li>
  </ul>
</template>
```

請把 `user` 物件裡的每一個\*\*鍵（key）**和**值（value）\*\*都拿出來，然後產生一個 `<li>` 標籤來顯示它們。
這段程式碼會自動產生：
`name: Tom`
`age: 20`
`city: Taipei`

## 4. 搭配多層元素

一個頁面中可以有多層迴圈，常見於清單 + 子清單的情境。

```vue
<script setup>
const categories = [
  { name: "水果", items: ["蘋果", "香蕉"] },
  { name: "飲料", items: ["咖啡", "茶"] },
];
</script>

<template>
  <div v-for="category in categories" :key="category.name">
    <h3>{{ category.name }}</h3>
    <ul>
      <li v-for="item in category.items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
```

這段程式碼的邏輯是：

1.  首先，用第一個 `v-for` 處理 `categories` 陣列，產生兩個 `div`，一個是「水果」類別，一個是「飲料」類別。
2.  然後，在每個 `div` 裡面，再用第二個 `v-for` 去處理各自的 `items` 陣列，產生對應的水果或飲料清單。

## 5. 搭配 `template` 使用

如果不想額外產生多餘的元素，可以搭配 `<template>`。

```vue
<template v-for="n in 3" :key="n">
  <p>第 {{ n }} 筆資料</p>
</template>
```

`<template>` 標籤在渲染時**不會產生任何額外的 HTML 元素**，它只是一個「佔位符」的角色，用來告訴 Vue 說：「這一段的內容要重複顯示」。
這段程式碼會直接生成：
`<p>第 1 筆資料</p>`
`<p>第 2 筆資料</p>`
`<p>第 3 筆資料</p>`

`<template>` 標籤常見於 `v-for` 和 `v-if` 需要同時使用時。  
如果直接把兩者寫在同一個元素上，有時會造成語法錯誤或不易閱讀。這時候我們就會用 `<template>` 把條件或迴圈包起來。

由於 `<template>` 本身**不會渲染成實際的 DOM 元素**（不像 `<div>` 或 `<span>` 會顯示出來），所以可以避免額外產生不必要的標籤。

範例：`v-for` 與 `v-if` 一起使用

```vue
<template>
  <ul>
    <!-- ❌ 錯誤寫法：直接將 v-for 和 v-if 寫在同一元素上 -->
    <!-- 這樣 Vue 會報錯，因為它無法同時處理 -->
    <!-- <li v-for="user in users" v-if="user.active" :key="user.id">
      {{ user.name }}
    </li> -->

    <!-- ✅ 正確寫法：用 template 包裹 v-for，再在內部加上 v-if -->
    <template v-for="user in users" :key="user.id">
      <li v-if="user.active">
        {{ user.name }}
      </li>
    </template>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  { id: 1, name: "小明", active: true },
  { id: 2, name: "小華", active: false },
  { id: 3, name: "小美", active: true },
]);
</script>
```

### 說明

1.  `<template v-for="...">`：不會輸出任何標籤，但可以包住多個子元素。
2.  子元素 `<li v-if="...">`：只有符合條件的項目才會顯示。
3.  如果不用 `<template>`，Vue 會報錯，因為同一個元素同時加 `v-for` 和 `v-if` 會有衝突。

---

### `template` 在 `v-for` 與 `v-if` 同時使用時的比較

| 寫法        | 結果     | 說明                               |
| ----------- | -------- | ---------------------------------- |
| ❌ 錯誤寫法 | 報錯     | Vue 無法同時處理 `v-for` 與 `v-if` |
| ✅ 正確寫法 | 正確顯示 | 使用 `<template>` 作為「虛擬容器」 |

### ❌ 錯誤程式碼

```vue
<li v-for="user in users" v-if="user.active" :key="user.id">
  {{ user.name }}
</li>
```

### ✅ 正確程式碼

```vue
<template v-for="user in users" :key="user.id">
  <li v-if="user.active">{{ user.name }}</li>
</template>
```

## 6. 小結

- `v-for` → 用來迭代陣列或物件。
- 建議加上 **`:key`**，避免渲染效能問題。
- 常搭配 `<template>`，避免產生多餘元素。
