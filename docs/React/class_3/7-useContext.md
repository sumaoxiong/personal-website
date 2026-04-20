---
title: useContext
sidebar_label: "3.7 - useContext"
keywords:
  - React
  - hooks
tags:
  - React
---

## 7. useContext

### 📌 用途

跨元件傳遞資料，避免一層一層往下傳 props（prop drilling）。

### 📌 適合場景

- 使用者登入資訊
- 主題切換（dark / light）
- 全域語系設定

### 📌 完整使用流程

`useContext` 需要搭配 **三個步驟** 才能正確運作：

```
1. createContext()   → 建立 Context 物件
2. <Context.Provider> → 在最外層包住所有需要使用的元件
3. useContext()      → 在子元件中讀取資料
```

### 📌 Step 1 ｜建立 Context（獨立檔案）

建議將 Context 抽出為獨立檔案，方便多處引用：

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

:::info

#### 🔍 children 是什麼？

`children` 是 React 的內建 props，代表**被包在元件標籤內部的所有子內容**。

當你在 `App.jsx` 這樣寫：

```jsx
<ThemeProvider>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</ThemeProvider>
```

`<BrowserRouter>` 以及它底下的所有路由，就會成為 `ThemeProvider` 的 `children`，被放進 `<ThemeContext.Provider>` 裡面渲染。

這樣的結果是：**所有被 `ThemeProvider` 包住的元件，不論在路由的第幾層，都能透過 `useContext(ThemeContext)` 拿到資料**。

```
ThemeProvider
└── {children}  ← BrowserRouter 及底下所有路由都在這裡
    └── Routes
        ├── Home    → useContext 可用 ✅
        ├── About   → useContext 可用 ✅
        └── Profile → useContext 可用 ✅
```

:::

### 📌 Step 2 ｜在 App.jsx 最外層包上 Provider

> ⚠️ **重點：Provider 必須包在所有要使用這個 Context 的元件外層**，路由底下的所有頁面才能正常取用。

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <ThemeProvider>
      {" "}
      {/* ← Provider 包在路由最外層 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
```

### 📌 Step 3 ｜在任意子元件中使用 useContext

不管元件在路由的哪一層，都可以直接呼叫 `useContext` 取得資料，不需要逐層傳 props：

```jsx
// src/pages/Home.jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>目前主題：{theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        切換主題
      </button>
    </div>
  );
}

export default Home;
```

### 📌 Provider 位置示意

```
App.jsx
└── ThemeProvider          ← Context 在這裡提供資料
    └── BrowserRouter
        └── Routes
            ├── Home       ← 可以用 useContext ✅
            ├── About      ← 可以用 useContext ✅
            └── Profile    ← 可以用 useContext ✅
```
