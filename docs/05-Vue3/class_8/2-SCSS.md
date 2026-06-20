---
title: 8.2 - 全域 SCSS / CSS
sidebar_label: "8.2 - 全域 SCSS / CSS"
keywords:
  - Vue3
tags:
  - Vue3
---

雖然 `<style scoped>` 能讓樣式只在元件內生效，但實務上仍需要一些「全域樣式」，  
例如：

- 重置（Reset / Normalize CSS）
- 共用顏色變數、字型、間距規則
- 全域排版設定（body, html, container）

這章將介紹如何在 **Vite + Vue3** 專案中設定與使用 **全域 SCSS / CSS**。

## 1. 全域樣式檔案結構建議

在 `src/assets/styles/` 中建立共用樣式資料夾：

```
src/
├── assets/
│ ├── styles/
│ │ ├── base.scss # 基礎樣式（reset、字型、body 設定）
│ │ ├── variables.scss # 全域變數 (顏色、字體、間距)
│ │ ├── mixins.scss # SCSS 混入 (mixin)
│ │ └── index.scss # 匯總所有樣式
│ └── ...
```

## 2. 建立全域樣式檔案

### 🧩 `base.scss`

重置樣式 + 基礎排版設定：

```scss
/* src/assets/styles/base.scss */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Noto Sans TC", sans-serif;
  color: #1f2937;
  background-color: #fff;
  line-height: 1.6;
}
```

### 🎨 `variables.scss`

設定全域變數（顏色、字型、間距等）：

```scss
/* src/assets/styles/variables.scss */
$primary: #0ea5e9;
$secondary: #64748b;
$danger: #ef4444;
$success: #22c55e;

$font-main: "Noto Sans TC", sans-serif;

$spacer: 1rem;
$radius: 8px;
```

### 🧱 `mixins.scss`

建立共用的樣式模組或函式：

```scss
/* src/assets/styles/mixins.scss */
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin btn($color) {
  background: $color;
  color: #fff;
  padding: 8px 16px;
  border: 0;
  border-radius: $radius;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
```

### 📦 `index.scss`

將所有樣式整合，方便一次引入：

```scss
/* src/assets/styles/index.scss */
@import "./variables.scss";
@import "./mixins.scss";
@import "./base.scss";
```

## 3. 在 `main.js` 中引入全域樣式

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 引入全域樣式
import "@/assets/styles/index.scss";

createApp(App).use(router).mount("#app");
```

📌 **說明**

- 使用 `@` 代表 `src/` 目錄（Vite 預設別名）。
- 此方式會在整個專案中自動套用樣式。

## 4. 全域注入 SCSS 變數（推薦）

在大型專案中，我們常需要在每個元件的 `<style lang="scss">` 內使用全域變數。  
可透過 **Vite 設定自動注入**。

### 設定方式：

```javascript
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 每個 .vue 檔案都會自動注入以下內容
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `,
      },
    },
  },
});
```

這樣就能在任何組件中直接使用變數與 mixin：

```vue
<style lang="scss" scoped>
.btn {
  @include btn($primary);
}
</style>
```

## 5. 使用全域變數搭配 Scoped 樣式

你仍可在 scoped 區塊中使用全域變數：

```vue
<style lang="scss" scoped>
.card {
  border: 2px solid $primary;
  border-radius: $radius;
  padding: $spacer;
}
</style>
```

📌 **說明**

- 因為變數是編譯階段導入，所以不受 scoped 限制。
- 即使樣式區域化，仍可全域共享顏色、尺寸等設定。

## 6. 延伸應用：主題切換（Dark / Light）

可結合 CSS 變數實現主題切換：

```scss
:root {
  --color-bg: #ffffff;
  --color-text: #1f2937;
}

.dark {
  --color-bg: #0f172a;
  --color-text: #f9fafb;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

在 Vue 中切換主題：

```javascript
document.documentElement.classList.toggle("dark");
```

## 7. 小結

| 類型          | 功能                | 優點         |
| ------------- | ------------------- | ------------ |
| `scoped` 樣式 | 元件區域化          | 避免樣式外溢 |
| 全域 SCSS     | 共用設定、樣式基礎  | 統一風格     |
| Vite 自動注入 | 免手動 import       | 提高開發效率 |
| CSS 變數      | 動態主題 / 即時調整 | 不需重新編譯 |

✅ **建議做法**

- 使用 Scoped 控制局部樣式。
- 使用全域 SCSS 管理變數與 Reset。
- 使用 CSS 變數 + Dark/Light 模式做主題切換。
