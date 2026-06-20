---
title: Action & useDispath
sidebar_label: "6.6 - Action & useDispath"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## Action & useDispatch 更新 slice 的值

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
    // 更新state的值，原值加1
    reducers:{
        addCount:(state) => {
            console.log('state',state.ccc);
            state.ccc += 1;
        }
    }
})

export const { addCount } = xxxSlice.actions //解構

export default xxxSlice.reducer
```

#### component

```javascript=
//   ...src/components/xxxComponent.jsx

import {useSelector, useDispatch} from "react-redux";
import {addCount} from './slice/xxxSlice'

const xxxComponent = () =>{
    const aaa = useSelector(state => {
        console.log(state.abc); //顯示slice中initialState的資料，ccc和asu的資料都會出現

        return state.abc.ccc
    })
    // dispath
    const dispatch = useDispatch()

    return (<>
        <h2>元件內容 {aaa}</h2>
        <button type="button" onClick={()=> {
            dispatch(addCount())
        }}>加1</button>
    </>);
}

```

### 說明

- 在 Slice 檔案的 createSlice 中增加 reducers 項目
- 在 Slice 檔案中匯出要執行的程式(reducers)，請記住匯出時的名稱是`自己定義的Slice名稱 . action`
- 在元件中 import 對應的 Slice 檔案
- 在元件中增加`const dispatch = useDispatch()`，名稱可隨意定義，這邊是示範所以取名為`dispatch`，以方便理解
