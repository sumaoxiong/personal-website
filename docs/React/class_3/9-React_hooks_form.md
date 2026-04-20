---
title: React Hooks Form
sidebar_label: "3.9 - React Hooks Form"
keywords:
  - React
  - hooks
tags:
  - React
---

## 9. React Hook Form

`React Hook Form`並非 react 原生的 hooks，所以要先透過 npm install 安裝

### 📌 安裝

```bash
npm install react-hook-form
```

### 📌 範例程式碼

```jsx
import { useForm } from "react-hook-form";

function Demo() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <button type="submit">送出</button>
    </form>
  );
}
```

### 📌 用途

1.  表單管理
2.  驗證輸入
3.  減少 useState 使用

### 📌 優點

- 效能好（不會一直 re-render）
- 寫法簡單
