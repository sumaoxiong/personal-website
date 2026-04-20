---
title: 實戰：POST
sidebar_label: "5.5 - 實戰：POST"
keywords:
  - React
  - API
tags:
  - React
---

## 5.5 實戰：POST（新增資料）

### 範例 1 - 基本結構(含 loading + 錯誤處理)

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const addProduct = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.post("/api/products", {
      title: "新商品",
      price: 100,
    });
    console.log("新增成功：", res.data);
  } catch (err) {
    setError(err.response?.data?.message || "新增失敗");
  } finally {
    setLoading(false); //確保不管成功或失敗，loading 一定會被關掉
  }
};
```

> 這邊因為要示範，所以將要傳入後端的資料直接做成一個物件，以方便理解，正常會是一個參數

### 範例 2 - 串接表單

```jsx
const [form, setForm] = useState({ title: "", price: "" });

const handleChange = (e) => {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async () => {
  try {
    const res = await axios.post("/api/products", form);
    console.log(res.data);
    setForm({ title: "", price: "" }); // 送出後清空
  } catch (err) {
    console.error(err);
  }
};

// JSX 表單
<input name="title" value={form.title} onChange={handleChange} />
<input name="price" value={form.price} onChange={handleChange} />
<button onClick={handleSubmit}>新增</button>
```

### 範例 3 - 帶 JWT Token（需登入的 API）

> 確保此次 API 執行是有經過身份驗證的

```jsx
const addProduct = async () => {
  const token = localStorage.getItem("token"); //從瀏覽器的 LocalStorage 中提取存儲好的 token
  try {
    const res = await axios.post(
      "/api/products",
      { title: "新商品", price: 100 },
      { headers: { Authorization: `Bearer ${token}` } } //將token給後端，讓後端先驗證使用者
    );
    console.log(res.data);
  } catch (err) {
    if (err.response?.status === 401) {
      console.log("Token 失效，請重新登入");
    }
  }
};
```

### 範例 4 - 新增後更新畫面上的列表

```jsx
const [products, setProducts] = useState([]);

const addProduct = async () => {
  try {
    const res = await axios.post("/api/products", {
      title: "新商品",
      price: 100,
    });

    // 方法 A：直接把後端回傳的資料加進去（推薦）
    setProducts((prev) => [...prev, res.data]);

    // 方法 B：重新打 GET 取得最新資料
    // await fetchProducts();
  } catch (err) {
    console.error(err);
  }
};
```

> **方法 A** ：速度快、不多打一支 API；**方法 B** ：確保資料完全同步後端（有排序、計算欄位時適合）。

:::info
**使用建議：** 大部分的實際專案，會把情境 1 + 2 組合在一起（表單 + loading + 錯誤處理），情境 3 視後端是否需要 JWT 再加上去。情境 4 的「方法 A」是日常首選

:::
