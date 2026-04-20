---
title: Props 傳遞與解構
sidebar_label: "2.3 - Props 傳遞與解構"
keywords:
  - React
  - Props
tags:
  - React
---

## 4. Props 傳遞與解構

### 📌 基本用法

```jsx
// 父元件（Page）
<Pagination pagination={pagination} onChangePage={getProducts} />
```

```jsx
// 子元件（Component）
function Pagination({ pagination, onChangePage }) {
  return <div>{pagination.total}</div>;
}
```

### 📌 重點

1.  Props 是「由上往下傳」
2.  子元件不能直接改 props（只能用
