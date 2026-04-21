---
title: Provider
sidebar_label: "6.4 - Provider"
keywords:
  - React
  - Redux
  - RTK
tags:
  - React
---

## Provider

### 結構

```javascript=
//   ...src/main.jsx

import App from "./App.jsx";

import {store} from './store.js'
import {Provider} from 'react-redux'


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

```

### 說明

- `<Provider store={store}> ... </Provider>`請包在最外層
- Provider 通常都寫在 main.jsx，這樣整個專案才可以調用到 redux，因為 main.jsx 通常就是整個專案在執行的入口(最外層)
- Provider 通常設定好後就不會去變動到了，只會去動到 slice 而已
