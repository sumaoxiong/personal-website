---
title: 身份驗證路由保護
sidebar_label: "7.4 - 身份驗證路由保護"
keywords:
  - React
tags:
  - React
---

## 身份驗證路由保護

> 只有登入後才能看到的頁面

路由保護（Protected Route）是一個 Wrapper 元件，檢查使用者是否已登入，未登入則自動導向登入頁。

### 建立 `ProtectedRoute` 元件

```jsx
// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 見 6.7

export default function ProtectedRoute() {
  const { user } = useAuth();

  // 未登入 → 導向 /login，並記錄原本想去的頁面
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 已登入 → 渲染子路由
  return <Outlet />;
}
```

### 在 Router 中使用

```jsx
// App.jsx 或 router.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />, // 父層做保護
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

### 流程圖

```
使用者訪問 /dashboard
       ↓
ProtectedRoute 檢查 user 狀態
       ↓
  ┌────┴────┐
  │         │
有 user   無 user
  │         │
渲染頁面  Navigate to /login
```
