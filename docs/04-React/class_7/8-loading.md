---
title: 非同步處理與載入狀態
sidebar_label: "7.8 - 非同步處理與載入狀態"
keywords:
  - React
tags:
  - React
---

## 非同步處理與載入狀態

> 處理 API、Loading、Error 以及快取

健全的資料請求需要統一處理三種狀態：**載入中**、**成功**、**失敗**，並避免重複請求。

### 基本模式：自訂 `useFetch` Hook

```jsx
// hooks/useFetch.js
import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // 防止 race condition

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    }; // cleanup：元件卸載時取消
  }, [url]);

  return { data, loading, error };
}
```

```jsx
// 使用方式
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>錯誤：{error}</p>;
  return <div>{data?.name}</div>;
}
```

### 進階：使用 TanStack Query(舊名 React Query)（推薦）

TanStack Query（舊名 React Query）是目前最主流的非同步資料管理方案，內建快取、重試、背景更新等功能。

```bash
npm install @tanstack/react-query
```

```jsx
// main.jsx：設定 QueryClient
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 分鐘內的快取視為新鮮，不重新請求
      retry: 2, // 失敗時自動重試 2 次
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

```jsx
// 使用 useQuery 取得資料
import { useQuery } from "@tanstack/react-query";

function UserProfile({ userId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userId], // 快取的 key，userId 不同就是不同快取
    queryFn: () => fetch(`/api/users/${userId}`).then((r) => r.json()),
  });

  if (isLoading) return <p>載入中...</p>;
  if (isError) return <p>錯誤：{error.message}</p>;
  return <div>{data?.name}</div>;
}
```

```jsx
// 使用 useMutation 執行寫入操作（POST / PUT / DELETE）
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo) =>
      fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      }).then((r) => r.json()),

    onSuccess: () => {
      // 新增成功後，讓 todos 列表的快取失效，自動重新 fetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ title: "新 Todo" })}>
      {mutation.isPending ? "新增中..." : "新增"}
    </button>
  );
}
```

### TanStack Query 核心概念整理

| 概念                | 說明                                  |
| ------------------- | ------------------------------------- |
| `queryKey`          | 快取的唯一識別，key 相同就共用快取    |
| `staleTime`         | 資料在多久內視為新鮮（不重新請求）    |
| `gcTime`            | 快取在記憶體中保留多久（預設 5 分鐘） |
| `invalidateQueries` | 讓特定快取失效，觸發重新 fetch        |
| `isPending`         | mutation 執行中                       |
| `isError / error`   | 統一的錯誤狀態                        |

> 💡 **建議：** 中大型專案直接採用 TanStack Query，它解決了 `useEffect` 的 race condition、重複請求、快取同步等大量痛點，是目前業界標準做法。
