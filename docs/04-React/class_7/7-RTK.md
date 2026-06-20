---
title: 全域狀態與 Context API / RTK 整合
sidebar_label: "7.7 - 全域狀態與 Context API / RTK 整合"
keywords:
  - React
tags:
  - React
---

## 全域狀態與 Context API / Redux Toolkit 整合

> 將 6.1 的登入資訊共享給 6.4 的路由保護使用

當多個元件需要共享同一份狀態（如登入的使用者資訊），就需要全域狀態管理。

### 方案一：Context API（輕量，適合中小型專案）

```jsx
// context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = 未登入

  const login = async (credentials) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自訂 hook，讓使用更簡潔
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth 必須在 AuthProvider 內使用");
  return ctx;
}
```

```jsx
// main.jsx：在最外層包覆 Provider
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

```jsx
// 在任何元件中使用
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <span>歡迎，{user?.name}</span>
      <button onClick={logout}>登出</button>
    </nav>
  );
}
```

### 方案二：Redux Toolkit（適合大型專案）

```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
```

```jsx
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
});
```

```jsx
// 在元件中使用
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(logout())}>登出 {user?.name}</button>;
}
```

### Context vs Redux 比較

|            | Context API | Redux Toolkit     |
| ---------- | ----------- | ----------------- |
| 學習成本   | 低          | 中                |
| 適合規模   | 小～中型    | 中～大型          |
| DevTools   | 無          | ✅ Redux DevTools |
| 非同步處理 | 需自行處理  | createAsyncThunk  |
| 效能優化   | 需手動 memo | 內建選擇器優化    |
