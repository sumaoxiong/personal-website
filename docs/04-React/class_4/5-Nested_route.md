---
title: 巢狀路由
sidebar_label: "4.5 - 巢狀路由"
keywords:
  - React
  - router
tags:
  - React
---

## 5. 巢狀路由（Nested Routes）

### 📌 範例程式

```jsx
{
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true, //因為是首頁所以可以寫這樣，或是改寫成`path:'/'`
        element: <Home />,
      },
      {
        path: "product",
        element: <Products />,
      },
    ],
}
```

### 📌 Layout 搭配 Outlet

```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>Navbar</header>
      <Outlet />
    </>
  );
}
```

`<Outlet />`是後續頁面會顯示的位置，依照上面巢狀路由配置`Outlet`會顯示的是路由表中 children 內容

### 📌 結果

```
/home → Layout + Home
/login → Layout + Login
```
