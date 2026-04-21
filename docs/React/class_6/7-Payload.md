---
title: 進階實作：傳參數(Payload)到 Action 中
sidebar_label: "6.7 - 進階實作：傳參數(Payload)到 Action 中"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## 進階實作：傳遞參數 (Payload) 到 Action 中

### 結構

#### Slice

```javascript=
//   ...src/slices/xxxSlice.js

import {createSlice} from "@reduxjs/toolkit";

export const xxxSlice = createSlice({
    name:'xxx',
    initialState:{
        ccc: 100,
        asu: "我是asu"
    },
    // 更新state的值
    reducers:{
        // 更新state的值，原值加1
        addCount:(state) => {
            console.log('state',state.ccc);
            state.ccc += 1;
        },
        // 更新state的值，但會接收useDispatch傳過來的值
        addCountByPayload:(state,action)=>{
            console.log('action',action);
            state.ccc += action.payload
        }
    }
})

export const { addCount,addCountByPayload } = xxxSlice.actions //解構

export default xxxSlice.reducer
```

#### component

```javascript=
//   ...src/components/xxxComponent.jsx

import {useSelector, useDispatch} from "react-redux";
import {addCount,addCountByPayload} from './slice/xxxSlice'

const xxxComponent = () =>{
    const aaa = useSelector(state => {
        console.log(state.abc); //顯示slice中initialState的資料，ccc和asu的資料都會出現

        return state.abc.ccc
    })
    // dispath
    const dispatch = useDispatch()

    return (<>
        <h2>元件內容 {aaa}</h2>
        {// 數值加1的按鈕，不回傳值}
        <button type="button" onClick={()=> {
            dispatch(addCount())
        }}>加1</button>
        {// 數值加上輸入的參數，會接收參數數值來做加法(這邊設定的數值是5)}
        <button type="button" onClick={()=> {
            dispatch(addCountByPayload(5))
        }}>增加數值</button>
    </>);
}

```

### 說明

- 原本 Slice 檔案 reducers 要執行的程式碼參數要多加一個`action`，變成`(state,action)`
- 接收回傳的值要用`action.payload`來接收，
