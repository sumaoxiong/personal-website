---
title: 資料渲染1(分頁功能)
sidebar_label: "7.2 - 資料渲染1(分頁功能)"
description: 使用 `.map()` 來渲染 API 資料 + 分頁功能
keywords:
  - React
tags:
  - React
---

## 資料渲染 1

> 使用 `.map()` 渲染 API 資料 + 分頁功能

從 API 取得陣列資料後，以 `.map()` 將每筆資料轉為 JSX 元素。分頁功能只需在請求中帶入 `page` 參數，並用 state 記錄目前頁碼。

### 基本範例

```jsx
import { useState, useEffect } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/products?page=${page}&limit=10`);
      const json = await res.json();
      setProducts(json.data);
      setTotalPages(json.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [page]); // page 改變就重新 fetch

  return (
    <>
      {loading ? (
        <p>載入中...</p>
      ) : (
        <ul>
          {products.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}

      <div>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          上一頁
        </button>
        <span>
          {" "}
          第 {page} / {totalPages} 頁{" "}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          下一頁
        </button>
      </div>
    </>
  );
}
```

### 重點觀念

- **`key` 屬性**：務必使用資料的唯一識別欄位（如 `id`）作為 key，不要使用陣列 index，否則在新增/刪除時 React 會產生錯誤的 DOM diff。
- **`useEffect` 依賴陣列**：將 `page` 放入依賴陣列，每次頁碼改變就觸發重新 fetch。
- **分頁按鈕的 disabled**：第一頁時禁用「上一頁」，最後一頁時禁用「下一頁」，避免請求超出範圍。
