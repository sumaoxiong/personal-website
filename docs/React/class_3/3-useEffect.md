---
title: useEffect
sidebar_label: "3.3 - useEffect"
keywords:
  - React
  - hooks
tags:
  - React
---

## 3. useEffect

### 📌 範例程式碼

```jsx
import { useEffect } from "react";

useEffect(() => {
  console.log("頁面載入");

  return () => {
    console.log("元件被移除");
  };
}, []);
```

### 📌 用途

處理：

- API 呼叫
- 監聽變化
- 副作用（side effect）

### 📌 常見寫法

```jsx
// 只執行一次（類似 mounted），頁面初次載入時
useEffect(() => {}, []);
```

```jsx
// 監聽變數變化
useEffect(() => {}, [count]); //當count發生變化時會執行
```

:::info
可以把它想像成是 if 判斷式，並且執行後會重先渲染頁面，也就是 re-render

- {} -> 要執行的程式
- [] -> 觸發條件，如果是空的就只會在進入頁面時執行一次
  :::

:::warning
請注意一定要有`[]`，如果沒有程式會變成無限迴圈一直執行，直到電腦壞掉
:::
