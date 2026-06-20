---
title: 8.1 - Scoped 樣式
sidebar_label: "8.1 - Scoped 樣式"
keywords:
  - Vue3
tags:
  - Vue3
---

`<style scoped>` 可以讓 **該元件的樣式只作用在該元件內**，避免影響到其他元件，提升維護性。  
Vue 會在編譯 SFC（單檔元件）時，自動為模板與樣式加上一組 **唯一屬性（如 `data-v-xxxx`）** 來實現作用域隔離。

## 1. 基本用法

```vue
<!-- ButtonPrimary.vue -->
<template>
  <button class="btn">送出</button>
</template>

<script setup>
// 組件邏輯…
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  background: #0ea5e9;
  color: #fff;
  border: 0;
}
</style>
```

- 這段 `.btn` **只會影響此元件內** 的 `.btn`。
- Vue 會將 DOM 標記為：`<button class="btn" data-v-abc123>`，CSS 也會被重寫成 `.btn[data-v-abc123]`。

> 注意：**scoped 不會阻擋「全域樣式」覆蓋**（如 reset.css、外部 UI 套件）；它只避免你的元件 CSS 外溢。

## 2. 與子元件 / slot 的互動

### 2.1 深層選擇器：`::v-deep()` / `:deep()`

當你需要在父元件的 scoped 樣式內，**修改子元件內部元素** 或 **第三方元件** 的樣式：

```vue
<!-- Parent.vue -->
<template>
  <ThirdPartyTable class="tbl" />
</template>

<style scoped>
/* 推薦寫法（Vue 3）： */
::v-deep(.tbl .tp-row.selected) {
  background: #fef3c7;
}

/* 另一個等價寫法： */
:deep(.tbl .tp-row.selected) {
  background: #fef3c7;
}
</style>
```

> 小心使用：深層選擇器會打破隔離，請**只在必要時**使用，以免未來升級/改版時樣式脆弱。

### 2.2 作用於插槽內容：`:slotted()`

當「父元件**傳進來的 slot 內容**」需要被子元件的 scoped 樣式客製化：

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  padding: 16px;
  border: 1px solid #eee;
}

/* 只影響“傳入到這個 slot 的內容” */
:slotted(h3) {
  margin: 0 0 8px;
  color: #0f172a;
}
</style>
```

### 2.3 局部逃脫到全域：`:global()`

在 scoped 區塊中，若你需要**定義一個全域 class**（例如第三方套件需要）：

```vue
<style scoped>
/* 平常仍是 scoped */
.wrapper {
  padding: 12px;
}

/* 這裡宣告的 .toast 是全域的 */
:global(.toast) {
  position: fixed;
  right: 16px;
  bottom: 16px;
}
</style>
```

## 3. 與 CSS 預處理器 (SCSS) 一起用

```vue
<style scoped lang="scss">
.card {
  padding: 16px;

  .title {
    font-weight: 600;
  }

  /* 深層選擇器在 SCSS 中建議用 :deep() / ::v-deep() 包起來 */
  ::v-deep(.ant-btn) {
    border-radius: 10px;
  }
}
</style>
```

> 舊式的 `>>>`、`/deep/` 在 Vue 3 已屬相容語法，建議改用 `:deep()` 或 `::v-deep()`。

## 4. 與動態類別、條件樣式

scoped 不影響你動態綁定 class 的方式：

```vue
<template>
  <button :class="['btn', { danger }]">刪除</button>
</template>

<script setup>
import { ref } from "vue";
const danger = ref(false);
</script>

<style scoped>
.btn {
  background: #0ea5e9;
}
.btn.danger {
  background: #dc2626;
}
</style>
```

## 5. 常見問題與雷點

1.  **優先度 / 覆寫問題**

    - scoped 只是加了屬性選擇器，**不會自動提升 specificity**。
    - 若你要覆蓋第三方樣式，可能需要更精準的選擇器或 `!important`（謹慎使用）。

2.  **跨元件覆蓋**

    - 一般情況 parent 的 scoped 樣式**不會**影響 child 的內部；必要時改用 `:deep()` 指定子元素選擇器。

3.  **全域主題 / 變數**

    - 建議以 **CSS 變數** 搭配全域定義（例如在 `:root` 或 `body`）：
      ```css
      :root {
        --primary: #0ea5e9;
        --text: #0f172a;
      }
      ```
      在 scoped 區塊直接使用：
      ```css
      .btn {
        background: var(--primary);
        color: #fff;
      }
      ```

4.  **效能考量**
    - scoped 透過屬性選擇器匹配，對大多數應用足夠快；但過度使用深層選擇器可能增長樣式複雜度與維護成本。

## 6. 與 CSS Modules 的比較（補充）

除了 `<style scoped>`，Vue 也支援 **CSS Modules**：

```vue
<template>
  <h1 :class="$style.title">標題</h1>
</template>

<style module>
.title {
  color: rebeccapurple;
}
</style>
```

- Modules 會產生哈希類名（如 `title_xyz`），用 `$style.xxx` 存取。
- **scoped** 偏向「選擇器加屬性」的隔離；**modules** 偏向「類名命名空間」。
- 有需要更嚴格命名隔離時可考慮 modules；一般情境用 scoped 即可。

## 7. 小結 & 建議

- 預設使用 **`<style scoped>`** 以避免樣式外溢。
- 修改第三方/子元件時再使用 **`:deep()` / `::v-deep()`**，且務必最小化覆蓋範圍。
- 對外一致的主題色與間距，建議用 **CSS 變數** 放在全域，scoped 內直接使用。
- 若專案對類名隔離要求嚴格，可評估 **CSS Modules**。
