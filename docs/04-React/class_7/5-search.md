---
title: 項目的搜尋(篩選)與排序
sidebar_label: "7.5 - 項目的搜尋(篩選)與排序"
keywords:
  - React
tags:
  - React
---

## 項目的搜尋（篩選）與排序

> `useMemo` 的常用 / 進階用法

對本地已載入的資料做搜尋和排序，不需要重新打 API，使用 `useMemo` 避免每次 render 都重新計算。

### 常用用法：篩選 + 排序

```jsx
import { useState, useMemo } from "react";

export default function ProductSearch({ products }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name' | 'price'
  const [order, setOrder] = useState("asc"); // 'asc' | 'desc'

  const filteredAndSorted = useMemo(() => {
    // 1. 先篩選
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    // 2. 再排序
    return filtered.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [products, query, sortBy, order]);
  // 只有這些依賴改變時才重新計算

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋商品..."
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">名稱</option>
        <option value="price">價格</option>
      </select>
      <button onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}>
        {order === "asc" ? "↑ 升序" : "↓ 降序"}
      </button>

      <ul>
        {filteredAndSorted.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </>
  );
}
```

### 進階用法：多欄位複合排序

```jsx
const sorted = useMemo(() => {
  return [...products].sort((a, b) => {
    // 先比類別，類別相同再比價格
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.price - b.price;
  });
}, [products]);
```

### `useMemo` vs 直接計算

|                      | `useMemo`                   | 直接計算 |
| -------------------- | --------------------------- | -------- |
| 每次 render          | 讀取快取                    | 重新計算 |
| 資料量小             | 不必要（overhead 反而更大） | ✅ 建議  |
| 資料量大（千筆以上） | ✅ 建議                     | 效能差   |

> ⚠️ **不要過度使用 `useMemo`**，只在計算確實昂貴（大量資料、複雜運算）時使用，否則會增加不必要的複雜度。
