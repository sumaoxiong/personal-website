---
title: useState
sidebar_label: "3.2 - useState"
keywords:
  - React
  - hooks
tags:
  - React
---

## 2. useState

### 📌 範例程式碼

```jsx
import { useState } from "react";

function Demo() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 📌 用途

用來管理「資料狀態」

### 📌 重點(結構說明)

```jsx
const [狀態, 改變狀態的函式] = useState(初始值);
```

- `狀態`：目前的狀態（讀取用），代表了組件在「當前這一次」的數值
- `改變狀態的函式`：改變狀態的發動機（寫入用），它是修改 `狀態` 的**唯一合法管道**
