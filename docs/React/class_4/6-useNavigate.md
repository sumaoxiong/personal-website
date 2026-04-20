---
title: useNavigate
sidebar_label: "4.6 - useNavigate"
keywords:
  - React
  - router
tags:
  - React
---

## 6. useNavigate

### 📌 範例程式

```jsx
import { useNavigate } from "react-router-dom";

function Demo() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/login")}>前往登入</button>;
}
```

### 📌 用途

👉 用程式控制跳轉（不像 Link 是點擊用）

### 📌 常見用法

```jsx
// 跳頁
navigate("/home");

// 回上一頁
navigate(-1);
```
