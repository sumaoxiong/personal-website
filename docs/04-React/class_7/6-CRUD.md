---
title: CRUD 實作練習
sidebar_label: "7.6 - CRUD 實作練習"
keywords:
  - React
tags:
  - React
---

## CRUD 實作練習

> `map()` + API + react-hook-form 綜合應用

CRUD（Create、Read、Update、Delete）是前端最核心的資料操作模式。

### 資料結構範例（Todo List）

```jsx
// 假設後端 API：
// GET    /api/todos          → 取得所有
// POST   /api/todos          → 新增
// PUT    /api/todos/:id      → 更新
// DELETE /api/todos/:id      → 刪除
```

### 完整 CRUD 元件

```jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  // READ
  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  // CREATE
  const onCreate = async (data) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    reset();
  };

  // UPDATE
  const onUpdate = async (data) => {
    const res = await fetch(`/api/todos/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
    setEditingId(null);
    reset();
  };

  // DELETE
  const onDelete = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 點擊編輯：預填表單
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setValue("title", todo.title);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(editingId ? onUpdate : onCreate)}>
        <input
          {...register("title", { required: true })}
          placeholder="Todo 標題"
        />
        <button type="submit">{editingId ? "更新" : "新增"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              reset();
            }}
          >
            取消
          </button>
        )}
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => startEdit(todo)}>編輯</button>
            <button onClick={() => onDelete(todo.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 樂觀更新（Optimistic Update）

先更新畫面，再等待 API 回應，失敗時還原，讓使用體驗更順暢：

```jsx
const onDelete = async (id) => {
  // 1. 先更新 UI
  const backup = todos;
  setTodos((prev) => prev.filter((t) => t.id !== id));

  try {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
  } catch {
    // 2. 失敗時還原
    setTodos(backup);
  }
};
```
