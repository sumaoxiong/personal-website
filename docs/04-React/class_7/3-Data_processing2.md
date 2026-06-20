---
title: 資料渲染2(lazy loading)
sidebar_label: "7.3 - 資料渲染2(lazy loading)"
keywords:
  - React
tags:
  - React
---

## 資料渲染 2

> 使用 `.map()` 渲染 API 資料 + 無限滾動 + Lazy Loading

無限滾動（Infinite Scroll）是分頁的替代方案，使用者滾到底部時自動載入下一批資料，常見於社群媒體動態牆。

### 核心思路

1. 監聽使用者是否滾動到頁面底部
2. 抵達底部時，將 `page + 1` 並 fetch 新資料
3. 新資料**追加**（append）到現有陣列，而非取代

### 使用 `IntersectionObserver` 實作

```jsx
import { useState, useEffect, useRef, useCallback } from "react";

export default function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null); // 用來觀察的 sentinel 元素

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await fetch(`/api/posts?page=${page}&limit=10`);
    const json = await res.json();

    setItems((prev) => [...prev, ...json.data]); // 追加資料
    setHasMore(json.hasMore);
    setPage((p) => p + 1);
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    // 建立 observer，當 sentinel 進入視口就觸發 fetchMore
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore();
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchMore]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}

      {/* sentinel：這個元素進入視口就觸發載入 */}
      <div ref={observerRef} style={{ height: "1px" }} />

      {loading && <p>載入中...</p>}
      {!hasMore && <p>已顯示全部資料</p>}
    </div>
  );
}
```

### 圖片 Lazy Loading

```jsx
// 原生 loading="lazy" 屬性（最簡單）
<img src={item.imageUrl} alt={item.name} loading="lazy" />
```

> 💡 `loading="lazy"` 是瀏覽器原生支援的懶載入，圖片進入視口附近才開始下載，不需要額外套件。
