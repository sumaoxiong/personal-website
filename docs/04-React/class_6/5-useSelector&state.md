---
title: useSelector & state
sidebar_label: "6.5 - useSelector & state"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## useSelector & state

### 結構

```javascript=
//   ...src/components/xxxComponent.jsx

import {useSelector} from "react-redux";

const xxxComponent = () =>{
    const aaa = useSelector(state => {
        console.log(state.abc); //顯示slice中initialState的資料，ccc和asu的資料都會出現

        return state.abc.ccc
    })
    return (<>
        <h2>元件內容 {aaa}</h2>
    </>);
}

```

### 說明

- 只要有任何的元件需要使用到 redux 的資料就必須用 useSelector 來去取得資料，如果不使用 useSelector 就無法取的 redux 的資料
- 第 6 行`aaa`名稱隨意
- 第 9 行的 return 的規範
  - 第一階：通常是寫`state`
  - 第二階：在 store.js 中設定的物件名稱
  - 第三階：在 Slice 中 `initialState` 裡面的變數
  - 整體會是：`state.store矩陣名稱.slice變數名稱`
