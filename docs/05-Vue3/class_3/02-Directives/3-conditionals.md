---
title: 條件判斷：v-if / v-else-if / v-else / v-show / 三元運算子
sidebar_label: "條件判斷：v-if / v-else-if / v-else / v-show / 三元運算子"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 模板中，可以使用條件判斷指令來控制元素是否顯示。  
> 主要有兩種方式：`v-if` 系列 與 `v-show`。

## 1. `v-if`

- 根據布林條件，決定是否渲染元素。
- 條件為 **false 時，元素不會出現在 DOM**。

```vue
<script setup>
import { ref } from "vue";
const isLogin = ref(false);
</script>

<template>
  <p v-if="isLogin">歡迎回來！</p>
  <p v-else>請先登入</p>
  <button @click="isLogin = !isLogin">切換登入狀態</button>
</template>
```

## 2. `v-else-if` 與 `v-else`

- 與 `v-if` 搭配使用，形成多條件判斷。
- `v-else-if` 與 `v-else` **必須緊接在 v-if 或前一個條件後面**。

```vue
<script setup>
import { ref } from "vue";
const score = ref(75);
</script>

<template>
  <p v-if="score >= 90">A 等級</p>
  <p v-else-if="score >= 60">B 等級</p>
  <p v-else>不及格</p>
</template>
```

## 3. `v-show`

- 控制元素的 **顯示 / 隱藏**（透過 `display: none`）。
- 元素 **始終存在於 DOM**，只是被隱藏。

```vue
<script setup>
import { ref } from "vue";
const isVisible = ref(true);
</script>

<template>
  <p v-show="isVisible">這是一段可以顯示或隱藏的文字</p>
  <button @click="isVisible = !isVisible">切換顯示</button>
</template>
```

## 4. `v-if` vs `v-show`

| 特性     | `v-if`（條件渲染）              | `v-show`（顯示/隱藏）             |
| -------- | ------------------------------- | --------------------------------- |
| DOM 存在 | 條件為 false → 元素完全不在 DOM | 元素始終存在，只是 `display:none` |
| 開銷     | 切換頻繁 → 效能較差             | 切換頻繁 → 效能較佳               |
| 使用情境 | 條件不常變動（例如：登入狀態）  | 條件經常變動（例如：展開/收合）   |

## 5. 三元運算子

三元運算子用於**簡化 if...else 判斷**。

### 語法：

```javascript
條件 ? 條件為真時的值 : 條件為假時的值;
```

### 範例 1 (當變數為布林值)：

```vue
<p>{{ isLogin ? '歡迎回來！' : '請先登入' }}</p>
```

> 當 isLogin 是 true 就會回傳 '歡迎回來！'；若是 false 就會回傳 '請先登入'

### 範例 2 (對變數設條件)：

```vue
<p>{{ score.value >=60 ? '及格' : '不及格' }}</p>
```

> 當 score.value 的數字大於等於 60 顯示及格，如果小於 60 則顯示不及格

## 6. 小結

- `v-if` → 依條件決定是否渲染到 DOM。
- `v-else-if` / `v-else` → 與 `v-if` 搭配，形成多分支。
- `v-show` → DOM 永遠存在，僅透過 CSS 切換顯示。
