---
title: 實戰：DELETE
sidebar_label: "5.7 - 實戰：DELETE"
keywords:
  - React
  - API
tags:
  - React
---

## 5.7 實戰：DELETE（刪除資料）

### 範例 1 - 基本結構(含 loading + 錯誤處理)

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const deleteProduct = async (id) => {
  setLoading(true);
  setError(null);
  try {
    await axios.delete(`/api/products/${id}`);
    console.log("刪除成功");
  } catch (err) {
    setError(err.response?.data?.message || "刪除失敗");
  } finally {
    setLoading(false);
  }
};
```

### 範例 2 - 刪除後同步移除列表中的該筆

```jsx
const [products, setProducts] = useState([]);

const deleteProduct = async (id) => {
  try {
    await axios.delete(`/api/products/${id}`);

    // 從列表中移除該筆，不重打 GET
    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (err) {
    console.error(err);
  }
};
```

> 用  `.filter()`  把對應 id 的那筆從陣列中濾掉，其他保持不動。這是 DELETE 後更新畫面最標準的做法。
