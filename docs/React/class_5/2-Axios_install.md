---
title: 安裝Axios
sidebar_label: "5.2 - 安裝Axios"
keywords:
  - React
  - API
  - Axios
tags:
  - React
---

## 5.2 安裝 Axios

### 安裝

```bash
npm install axios
```

### 基本用法

範例 1

```jsx
import axios from "axios";

axios.get("/api").then((res) => {
  console.log(res.data);
});
```

範例 2

```jsx
const getCart = async () => {
  try {
    const response = await axios.get(`https://domainname/api/cart`);
    console.log(response.data.data);
    setCart(response.data.data);
  } catch (error) {
    console.log(error.response.data);
  }
};
```

:::info
通常會加上 範例 2 所使用的 `try...catch`
:::

### Axios 結構

```jsx
// post、put、patch會有三個參數，第三個參數(config)可以不寫
axios.post(url, data, config);
axios.put(url, data, config);
axios.patch(url, data, config);

// get、delete會有兩個三數，第二個參數(config)可以不寫
axios.get(url, config);
axios.delete(url, config);
```

| 參數     | 內容                                        |
| -------- | ------------------------------------------- |
| `url`    | 請求的目標網址                              |
| `data`   | 要送出的資料（request body）                |
| `config` | (選填) 請求的設定，包含 headers、timeout 等 |

### 為什麼不用 fetch()？

- 語法更簡單
- 自動轉 JSON

:::warning
請注意原生 react 支援的是 fetch()，Axois 只是提供一個方便的方式來去做串接，如果 react 學到後面會接觸到 Next.js，而 Next.js 建議使用的就會是 fetch()
:::
