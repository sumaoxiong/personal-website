---
title: useParams & useSearchParams
sidebar_label: "3.8 - useParams & useSearchParams"
keywords:
  - React
  - hooks
tags:
  - React
---

## 8. useParams & useSearchParams

### ✅ useParams

```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();
```

👉 路徑：`/product/123`

---

### ✅ useSearchParams

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();
const page = searchParams.get("page");
```

👉 網址：`?page=1`

---

### 📌 差異

| Hook            | 用途              |
| --------------- | ----------------- |
| useParams       | 取得路由參數      |
| useSearchParams | 取得 query string |
