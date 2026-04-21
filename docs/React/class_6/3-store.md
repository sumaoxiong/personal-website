---
title: Store
sidebar_label: "6.3 - Store"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## store

### 結構

```javascript=
//   ...src/store/store.js
// 如果專案不大可以直接   ...src/store.js ，大部分都用這種就可以

import { configureStore } from '@reduxjs/toolkit';
import xxxReducer from '../slices/xxxSlice';

export const store = configureStore({
    reducer:{
        abc: xxxReducer // 可以直接寫 xxxReducer，像下面的另一種寫法一樣
    }
})

```

另一種寫法

```javascript=
export const store = configureStore({
    reducer:{
        xxxReducer // 這是 ES6 縮寫，等於 xxxReducer: xxxReducer
        // 在使用useSlector取得狀態時，路徑會變成 state.xxxReducer.ccc
    }
})
```

### 說明

- 第二個的 import 需要手動輸入整行
- 第 8 行的 reducer 是必須要有的
- 第 7 行的`store`名稱可以自己改，但通常都是 store
- 第 9 行的`abc`名稱可以自己改，主要用途是在於後需矩陣取值時有名稱會較方便，直接寫`xxxReducer`不設定名稱也沒關係，後續矩陣的名稱預設就會變成`xxxReducer`
