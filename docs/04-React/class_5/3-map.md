---
title: map() 語法
sidebar_label: "5.3 - map() 語法"
keywords:
  - React
  - API
tags:
  - React
---

## 5.3 map() 語法

map()是一種 JS 的陣列處理技巧常見的有

- forEach() =>常被用在 Vue
- map() =>常被用在 React

### 用途

👉 把「陣列資料 → 轉成 UI」

### 結構(限在 react 中的樣貌)

```jsx
{ArrayName.map((currentValue, index, array) => (

  <div>{currentValue.id}</div>
  <div>{currentValue.name}</div>
)};
```

:::info
| **參數** | **說明** | **是否必填** |
| --- | --- | --- |
| **`currentValue`** | 目前正在處理的陣列元素。 | **必填** |
| **`index`** | 目前處理元素的索引值（從 0 開始）。 | 選填 |
| **`array`** | 呼叫 `map()` 的原始陣列本身。 | 選填 |

:::

### 範例

```jsx
const products = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
];

return (
  <>
    {products.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </>
);
```

### 重點

- 一定要有 `key`
- 常用在 API 資料渲染
