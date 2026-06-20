---
title: 現成的 Hooks (別人寫好的hooks)
sidebar_label: "3.11 - 現成的 Hooks (別人寫好的hooks)"
keywords:
  - React
  - hooks
tags:
  - React
---

## 11. 現成的 Hooks (別人寫好的 hooks)

> 💡 有很多開源套件已經幫你寫好常用的 hooks，可以直接用

### 📌 常見資源

例如：  
[react-use](https://github.com/streamich/react-use)

### 📌 用途

1.  不用自己重寫常見功能
2.  提升開發效率
3.  減少 bug

### 📌 常見範例

---

#### 1. useMouse（取得滑鼠位置）

```jsx
import { useMouse } from "react-use";

function Demo() {
  const { x, y } = useMouse();

  return (
    <div>
      滑鼠位置：{x}, {y}
    </div>
  );
}
```

👉 用途：

- 滑鼠追蹤
- UI 特效（例如 hover 動畫）

---

#### 2. useDropArea（拖放功能）

```jsx
import { useDropArea } from "react-use";

function Demo() {
  const [bond, state] = useDropArea();

  return <div {...bond}>{state.isOver ? "拖進來了" : "拖曳到這裡"}</div>;
}
```

---

#### 3. useDebounce（防抖）

```jsx
import { useDebounce } from "react-use";
import { useState } from "react";

function Demo() {
  const [value, setValue] = useState("");

  useDebounce(
    () => {
      console.log("API call:", value);
    },
    500,
    [value]
  );

  return <input onChange={(e) => setValue(e.target.value)} />;
}
```

👉 用途：

- 搜尋欄（避免一直打 API）
- 輸入延遲處理
