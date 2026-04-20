---
title: 非同步處理說明
sidebar_label: "5.1 - 非同步處理說明"
keywords:
  - React
  - API
tags:
  - React
---

## 5.1 非同步處理說明

### API 是什麼

API 呼叫是「非同步」的（不會馬上拿到資料）

### 常見 API 的種類

:::info
這個章節的示範將以 REST API 為主，這也是最多人使用的種類
:::

| **種類**      | **數據格式** | **傳輸方式**              | **適用情境**         |
| ------------- | ------------ | ------------------------- | -------------------- |
| **REST**      | JSON / XML   | Request-Response          | 一般 Web 服務        |
| **GraphQL**   | JSON         | Request-Response          | 複雜資料、高彈性需求 |
| **SOAP**      | XML          | Request-Response          | 高安全性、企業金融   |
| **gRPC**      | Protobuf     | Request-Response / Stream | 微服務高效能通訊     |
| **WebSocket** | 多種         | Bi-directional (雙向)     | 即時通訊、遊戲       |
| **Webhooks**  | 多種         | Event-driven (事件觸發)   | 自動化通知、金流回傳 |

### 常見寫法（async / await）

```jsx
async function getData() {
  const res = await fetch("/api");
  const data = await res.json();
  console.log(data);
}
```

> 這邊使用的是 fetch()，後續會教使用 Axios 來操作

### 重點

- `await`：等 API 回來
- `async`：讓 function 可以用 await
