---
title: Router基本設定
sidebar_label: "4.2 - Router基本設定"
keywords:
  - React
  - router
tags:
  - React
---

## 2. Router 基本設定

這邊使用的是 hashRouter 來做示範，React 的 router 有兩個分別是

- HashRouter
- BrowserRouter

| **特性**       | **BrowserRouter**                                       | **HashRouter**                             |
| -------------- | ------------------------------------------------------- | ------------------------------------------ |
| **URL 樣式**   | `https://example.com/about`                             | `https://example.com/#/about`              |
| **伺服器需求** | **需要**額外配置。伺服器必須將所有路徑指向 `index.html` | **不需要**。伺服器只會讀取 `#` 前的內容    |
| **SEO 友善度** | **較高**。搜尋引擎偏好乾淨且標準的 URL                  | **較低**。搜尋引擎通常會忽略 `#` 後的內容  |
| **常用場景**   | 現代 Web 應用、具備後端控制權的專案                     | 靜態網頁託管 (如 GitHub Pages)、老舊瀏覽器 |

### 📌 範例程式碼

```jsx
import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import Products from "./views/front/Products";
import Cart from "./views/front/Cart";
import SingleProduct from "./views/front/SingleProduct";
import NotFound from "./views/front/NotFound";
import Checkout from "./views/front/Checkout";
import Login from "./views/login";

export const router = createHashRouter([
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
      {
        path: "product/:id", //動態路由
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
```

### 📌 導頁（Link）

```jsx
import { Link, Outlet } from "react-router-dom";

function FrontendLayout() {
  return (
    <>
      <header>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              首頁
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/product">
              產品列表
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/cart">
              購物車
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/checkout">
              結帳
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/login">
              登入
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default FrontendLayout;
```
