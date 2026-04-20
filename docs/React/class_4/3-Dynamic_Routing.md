---
title: 動態路由
sidebar_label: "4.3 - 動態路由"
keywords:
  - React
  - router
tags:
  - React
---

## 3. 動態路由

### 📌 範例程式

```jsx
{
    path: "product/:id",//動態路由
    element: <SingleProduct />,
},
```

### 📌 取得參數

```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();
```

### 📌 URL 範例

```
https://domainname/product/123
```

👉 `id = 123`
