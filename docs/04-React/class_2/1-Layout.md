---
title: Layout
sidebar_label: "2.1 - Layout"
keywords:
  - React
  - Layout
tags:
  - React
---

> Layout、Page、Component 這三個本身的基本程式碼長的會差不多，因為這三個其實都是用來呈現出頁面內容的程式碼，只是依照功用將其分成三種。

## 1. Layout

### 📌 用途

1. 放「所有頁面共用」的 UI（Navbar、Footer）
2. `<Outlet />` 是子頁面顯示的位置

:::warning
請注意`<Outlet />`是大寫開頭
:::

### 📌 範例程式碼

```jsx
import { Outlet } from "react-router-dom";

function XxxLayout() {
  return (
    <>
      {/* 共用內容，例如 Navbar */}
      <header>Navbar</header>

      <main>
        <Outlet />
      </main>

      {/* 共用內容，例如 Footer */}
      <footer>Footer</footer>
    </>
  );
}

export default XxxLayout;
```
