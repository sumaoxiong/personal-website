---
title: 進階實作：將非同步取得的資料(API)儲存至 Store 狀態
sidebar_label: "6.8 - 進階實作：將非同步取得的資料(API)儲存至 Store 狀態"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## 進階實作：將非同步取得的資料(API)儲存至 Store 狀態

### 結構

#### Slice

```javascript=
//   ...src/slices/productSlice.js

import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
    name:'product',
    initialState:{
        products: [] // 資料是矩陣型態所以要用`[]`
    },
    // 更新state的值
    reducers:{
        //
        setProducts:(state,action) => {
            state.products = action.payload;
        },
        //

    }
})

export const { setProducts } = productSlice.actions //解構

export default productSlice.reducer
```

#### component

```javascript=
//   ...src/components/xxxComponent.jsx

import {useSelector, useDispatch} from "react-redux";
import {setProducts} from './slice/productSlice'

const API_url = 'https://domainname.xxx'

const productsComponent = () =>{
    const products = useSelector(state => {
        console.log(state.products.products); //

        return state.products.products
    })
    // dispath
    const dispatch = useDispatch()

    useEffect (()=> {

        // 立即函式寫法
        (async () => {
            const res = await axios.get(`${API_url}`)
            console.log(res);
            dispath(setProducts(res.data.products))
        })()

        // 常規寫法
        const getProducts = async () => {
            const res = await axios.get(API_url);
            console.log(res);
            dispatch(setProducts(res.data.products));
        };
        getProducts();
        },[])

    return (<>

    </>);
}
```

:::warning

1. 此處`async await`未加上`try...catch`是為了方便理解，實務上請記得加上
2. 盡量不要在 Slice 中寫 async...await 語法，可以使用，但容易出錯，因為 reducers 本身僅能處理同步的狀態
   :::
