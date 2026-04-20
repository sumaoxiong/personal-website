---
title: 客製化 Hooks
sidebar_label: "3.10 - 客製化 Hooks"
keywords:
  - React
  - hooks
tags:
  - React
---

## 10. 客製化 Hooks

通常會在`src`底下建立一個`hooks`資料夾，來放置自己寫的 hooks

### 📌 範例程式碼

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
}
```

### 📌 使用方式

```jsx
// page.jsx

import { useFetch } from "@/hooks/useFetch"; //匯入hooks

function page() {
  const data = useFetch("/api/products");

  return <></>;
}
```

### 📌 用途

把「重複邏輯」抽出來

### 📌 命名規則

👉 一定要用 `useXXX`
