---
title: Page
sidebar_label: "2.2 - Page"
keywords:
  - React
  - Page
tags:
  - React
---

## 2. Page

### 📌 用途

1. 每個「路由對應的畫面」
2. 負責：
   - API 呼叫
   - 資料管理（state）
   - 組合 Component

### 📌 範例程式碼

```jsx
import Pagination from "@/components/Pagination";

function LoginPage() {
  const pagination = {};
  const getProducts = () => {};

  return (
    <>
      <h1>登入頁</h1>

      <Pagination pagination={pagination} onChangePage={getProducts} />
    </>
  );
}

export default LoginPage;
```
