---
title: 登入頁面與表單驗證
sidebar_label: "7.1 - 登入頁面與表單驗證"
keywords:
  - React
tags:
  - React
---

## 登入頁面與表單驗證

> react-hook-form 與 API 串接的應用

表單處理是前端最常見的任務之一。原生 React 的受控元件（controlled component）在欄位數量多時，會造成大量 `useState` 及重複渲染。**react-hook-form** 以非受控元件為基礎，只在需要時讀取 DOM 值，效能顯著更佳。

### 安裝

```bash
npm install react-hook-form
```

### 核心三要素

| 工具             | 說明                                    |
| ---------------- | --------------------------------------- |
| `useForm()`      | 初始化表單，回傳所有控制工具            |
| `register()`     | 將 input 與表單系統連結，並宣告驗證規則 |
| `handleSubmit()` | 包裝提交事件，驗證通過後才呼叫 callback |

### 基本範例

```jsx
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // data = { email: '...', password: '...' }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("登入失敗");
    // 登入成功 → 導頁或存 token
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        {...register("email", {
          required: "Email 為必填",
          pattern: { value: /^\S+@\S+$/i, message: "格式不正確" },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", {
          required: "密碼為必填",
          minLength: { value: 6, message: "最少 6 個字元" },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "登入中..." : "登入"}
      </button>
    </form>
  );
}
```

> 💡 **小技巧：** `isSubmitting` 在 API 請求期間會自動為 `true`，可直接用來 disable 按鈕，防止重複提交，不需要額外的 loading state。

### 搭配 Zod 做 Schema 驗證（進階）

當驗證規則複雜時，可搭配 `zod` + `@hookform/resolvers` 集中管理。

```bash
npm install zod @hookform/resolvers
```

```jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email 格式不正確"),
  password: z.string().min(6, "密碼至少 6 碼"),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});
```
