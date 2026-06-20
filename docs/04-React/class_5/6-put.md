---
title: 實戰：PUT
sidebar_label: "5.6 - 實戰：PUT"
keywords:
  - React
  - API
tags:
  - React
---

## 5.6 實戰：PUT（更新資料）

### 範例 1 - 基本結構(含 loading + 錯誤處理)

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const updateProduct = async (id) => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.put(`/api/products/${id}`, {
      title: "修改商品",
      price: 200,
    });
    console.log("更新成功：", res.data);
  } catch (err) {
    setError(err.response?.data?.message || "更新失敗");
  } finally {
    setLoading(false);
  }
};
```

### 範例 2 - 串接編輯表單（預填現有資料）

```jsx
// 點「編輯」時，把現有資料預填進表單
const [form, setForm] = useState({ title: "", price: "" });
const [editId, setEditId] = useState(null);

const handleEdit = (product) => {
  setEditId(product.id);
  setForm({ title: product.title, price: product.price }); // 預填
};

const handleChange = (e) => {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async () => {
  try {
    const res = await axios.put(`/api/products/${editId}`, form);
    console.log(res.data);
    setEditId(null); // 關閉編輯模式
  } catch (err) {
    console.error(err);
  }
};

// JSX
<input name="title" value={form.title} onChange={handleChange} />
<input name="price" value={form.price} onChange={handleChange} />
<button onClick={handleSubmit}>儲存</button>
```

### 範例 3 - 更新後同步畫面上的列表

```jsx
const [products, setProducts] = useState([]);

const updateProduct = async (id) => {
  try {
    const res = await axios.put(`/api/products/${id}`, form);

    // 找到該筆資料，替換成後端回傳的最新版本
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  } catch (err) {
    console.error(err);
  }
};
```
