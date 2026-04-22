---
title: 4.2 - 建立組件與引入
sidebar_label: "4.2 - 建立組件與引入"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 中，**元件 (Component)** 是應用的最小組成單位。  
> 我們可以把頁面切割成許多小區塊，讓程式碼更容易維護與重複使用。

## 1. 建立子元件

元件通常放在 `src/components/` 資料夾內。

### 範例：建立一個 `HelloWorld.vue`

```vue
<!-- src/components/HelloWorld.vue -->
<template>
  <h1>Hello Vue3 組件！</h1>
</template>

<script setup>
// 這裡可以寫元件邏輯
</script>

<style scoped>
h1 {
  color: teal;
}
</style>
```

📌 **說明**

- `<template>` → 負責畫面結構。
- `<script setup>` → 放程式邏輯。
- `<style scoped>` → 樣式只作用於該元件。

## 2. 在父元件中引入子元件

通常父元件會是 `App.vue` 或某個頁面 (`views/` 下的檔案)。

```vue
<!-- src/App.vue -->
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <HelloWorld />
  </div>
</template>
```

📌 **重點**

- 先用 `import` 引入子元件。
- 在 `<template>` 中以標籤方式使用 `<HelloWorld />`。
- 標籤名稱需符合 **PascalCase** 或 **kebab-case**。

## 3. 元件命名方式

Vue 元件命名通常有兩種習慣：

1.  **PascalCase** → `<HelloWorld />`（官方推薦，適合單檔元件）。
2.  **kebab-case** → `<hello-world />`（HTML 標準大小寫不敏感）。

## 4. 多層元件

元件之間可以彼此組合，形成元件樹。

```vue
<!-- src/components/Layout/Header.vue -->
<template>
  <header>
    <h2>這是網站標頭</h2>
  </header>
</template>
```

```vue
<!-- src/App.vue -->
<script setup>
import Header from "./components/Layout/Header.vue";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <Header />
    <HelloWorld />
  </div>
</template>
```

## 5. 小結

- 元件檔案通常放在 `src/components/`。
- 建立子元件 → `import` 引入 → `<template>` 中使用。
- 命名習慣：**PascalCase** 或 **kebab-case**。
- 元件可以多層組合，形成完整頁面。
