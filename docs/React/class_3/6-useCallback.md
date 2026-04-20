---
title: useCallback
sidebar_label: "3.6 - useCallback"
keywords:
  - React
  - hooks
tags:
  - React
---

## 6. useCallback

### 📌 範例程式碼

```jsx
import { useCallback } from "react";

const handleClick = useCallback(
  (e) => {
    console.log("click");
    if (e.target.checked) {
      setItems([...items, e.target.value]);
    } else {
      setItems(item.filter((item) => item !== e.target.value));
    }
  },
  [item]
);
```

> 範例程式碼中如果條件為空，`[item]`變成`[]`，`handleClick` 只會在組件掛載時建立一次，這會導致函式永遠只能存取到初始的 `items` 值，而無法取得後續更新後的資料，導致狀態更新異常

### 📌 程式碼結構

```jsx
const xxx = useCallback(
  (/**傳入的值，可以是空的**/) => {
    /**程式碼**/
  },
  [
    /**條件變數(觸發條件)**/
  ]
);
```

### 📌 用途

避免 function 每次都重新建立

### 📌 useMemo vs useCallback

| Hook        | 用途             |
| ----------- | ---------------- |
| useMemo     | 記住「計算結果」 |
| useCallback | 記住「函式」     |
