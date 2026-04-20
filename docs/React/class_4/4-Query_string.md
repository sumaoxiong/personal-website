---
title: Query string
sidebar_label: "4.4 - Query string"
keywords:
  - React
  - router
tags:
  - React
---

## 4. Query String

### 📌 範例程式

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();
const page = searchParams.get("page");
```

### 📌 URL 範例

```
/product?page=1
```

👉 `page = 1`

### 📌 與動態路由差異

| 類型     | 範例            |
| -------- | --------------- |
| 動態路由 | /product/123    |
| Query    | /product?page=1 |
