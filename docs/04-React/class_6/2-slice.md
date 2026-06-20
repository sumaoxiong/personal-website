---
title: Slice
sidebar_label: "6.2 - Slice"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## Slice

### 結構

```javascript
//   ...src/slices/xxxSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const xxxSlice = createSlice({
  name: "xxx",
  initialState: {
    ccc: 100,
    asu: "我是asu",
  },
});

export default xxxSlice.reducer;
```

### 說明

- `name`和`initialState`是必須要有的
- 在最後匯出時名稱後面需要加上`.reducer`
