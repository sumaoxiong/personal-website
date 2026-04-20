---
title: Component
sidebar_label: "2.3 - Component"
keywords:
  - React
  - Component
tags:
  - React
---

## 3. Component

### 📌 用途

1. 把「可重複使用的 UI / 功能」抽出來，讓多個頁面可以共用

例如：

- 分頁（Pagination）
- 卡片（Card）
- Modal
- Navbar

### 📌 範例程式碼

```jsx
function Pagination({ pagination, onChangePage }) {
  return (
    <>
      <button onClick={() => onChangePage(1)}>第一頁</button>
    </>
  );
}

export default Pagination;
```
