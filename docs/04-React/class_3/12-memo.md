---
title: 進階：memo
sidebar_label: "3.12 - 進階：memo"
keywords:
  - React
  - hooks
tags:
  - React
---

## 12. 進階：memo

memo 本身並非是 hook，但常會和`useMemo`和`useCallback`一起使用來提高效能

### 📌 和`useMemo`比較

|              | `memo`                     | `useMemo`                  |
| ------------ | -------------------------- | -------------------------- |
| **是什麼**   | 包裝**元件**               | 包裝**計算結果（值）**     |
| **目的**     | 避免子元件不必要的重新渲染 | 避免函式重複執行昂貴的計算 |
| **回傳**     | 一個新的元件               | 一個計算出來的值           |
| **比較對象** | props                      | dependencies array         |

### 📌 範例程式碼

```jsx
import { memo } from "react";

// 包的是「元件」
const Child = React.memo(({ name }) => {
  return <div>{name}</div>;
});

// 只有 name 改變，Child 才會重新渲染
```
