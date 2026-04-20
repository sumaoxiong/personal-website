---
title: 實戰：GET
sidebar_label: "5.4 - 實戰：GET"
keywords:
  - React
  - API
tags:
  - React
---

## 5.4 實戰：GET（取得資料）

### 範例

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    } catch (error)
      console.log(error.res.data)
  };

  return (
    <>
      {products.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}
```

### 流程

1.  useEffect → 頁面載入
2.  呼叫 API
3.  setState
4.  map 渲染
