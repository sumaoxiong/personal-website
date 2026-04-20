---
title: useRef
sidebar_label: "3.4 - useRef"
keywords:
  - React
  - hooks
tags:
  - React
---

## 4. useRef

### 📌 範例程式碼

```jsx
import { useRef } from "react";

function Demo() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>focus</button>
    </>
  );
}
```

### 📌 用途

1.  操作 DOM
2.  儲存不會觸發 re-render 的值
