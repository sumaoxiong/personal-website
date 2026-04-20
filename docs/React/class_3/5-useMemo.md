---
title: useMemo
sidebar_label: "3.5 - useMemo"
keywords:
  - React
  - hooks
tags:
  - React
---

## 5. useMemo

### 📌 範例程式碼

```jsx
import { useMemo } from "react";

const result = useMemo(() => {
  return expensiveFunction(data);
}, [data]);
```

### 📌 程式碼結構

```jsx
const result = useMemo(() => 計算邏輯, [依賴項陣列]);
```

> - 使用上跟 `useEffect` 類似，但在最後會有回傳值
> - 後方陣列為空，代表頁面初次載入時才會執行

### 📌 用途

- 避免「重複計算」
- 在一個元件中可能會使用到多個 `useState`，只要其中一個觸發就會將整個元件 re-render，這時如果變數使用的是`useMemo`那麼`useState`所觸發的 re-render 不會去影響`useMemo`的變數
- 常被使用在 **搜尋** 和 **排序**

### 📌 重點

👉 只有依賴的資料改變時才重新計算

:::warning
在 react 中有一個方法叫做`memo`，`memo`和`useMemo`兩個沒有關聯性，一個是 方法，一個是 hook，只是實務上常會搭配`useMemo`和`usecallback`來使用

```jsx
import { memo } from "react";
```

:::

<details>
<summary>詳細說明</summary>

```jsx
import { useMemo, useState } from "react";

const ProductList = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [count, setCount] = useState(0); // 用來測試「不相關的觸發」

  // 1. 觸發條件：[products, filterText] 只要其中一個變了，就會觸發
  // 2. 被觸發後會做什麼：重新執行箭頭函式裡的 Array filter 邏輯
  // 3. 預設是什麼樣：初次渲染時會執行一次，並把結果記下來
  // 4. 如果沒有被觸發：當 count 改變時，React 直接回傳舊的緩存值，完全不跑 filter
  const filteredProducts = useMemo(() => {
    console.log("--- 正在執行昂貴的過濾運算 ---");
    return products.filter((p) => p.name.includes(filterText));
  }, [products, filterText]);

  return (
    <div>
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="搜尋商品..."
      />
      <button onClick={() => setCount(count + 1)}>
        點擊次數：{count} (這不會觸發過濾運算)
      </button>

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

</details>

### 📌 useMemo vs useCallback

| Hook        | 用途             |
| ----------- | ---------------- |
| useMemo     | 記住「計算結果」 |
| useCallback | 記住「函式」     |
