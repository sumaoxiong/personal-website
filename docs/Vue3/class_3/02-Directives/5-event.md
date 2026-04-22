---
title: 事件綁定：v-on / @事件
sidebar_label: "事件綁定：v-on / @事件"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 模板中，可以使用 `v-on`（或縮寫 `@`）來監聽 DOM 事件，並執行對應的方法。

## 1. 基本用法

```vue
<script setup>
const sayHello = () => {
  alert("Hello Vue3!");
};
</script>

<template>
  <button v-on:click="sayHello">點我打招呼</button>
  <!-- 縮寫 -->
  <button @click="sayHello">縮寫形式</button>
</template>
```

📌 **重點**

- `v-on:事件` 可以縮寫成 `@事件`。
- 常見事件：`click`、`input`、`change`、`keyup` 等。

## 2. 傳遞參數

事件處理器可以傳參數。

```vue
<script setup>
const greet = (name) => {
  alert(`Hello, ${name}!`);
};
</script>

<template>
  <button @click="greet('Tom')">向 Tom 打招呼</button>
</template>
```

## 3. 使用事件物件 `$event`

Vue 會自動傳入事件物件，可以用 `$event` 取得。

```vue
<script setup>
const handleClick = (event) => {
  console.log("點擊位置：", event.clientX, event.clientY);
};
</script>

<template>
  <button @click="handleClick">點我看座標</button>
  <!-- 也可以顯式傳入 $event -->
  <button @click="handleClick($event)">顯式傳遞</button>
</template>
```

## 4. 事件修飾符

Vue 提供許多常用的修飾符，讓事件處理更簡潔。

```vue
<template>
  <!-- 阻止預設行為 -->
  <form @submit.prevent="submitForm">
    <button type="submit">送出</button>
  </form>

  <!-- 停止事件冒泡 -->
  <div @click="console.log('div 被點擊')">
    <button @click.stop="console.log('button 被點擊')">點我</button>
  </div>

  <!-- 只觸發一次 -->
  <button @click.once="console.log('只會觸發一次')">點一次</button>

  <!-- 鍵盤修飾符 -->
  <input @keyup.enter="console.log('按下 Enter')" />
</template>
```

常見修飾符：

- `.prevent` → 阻止預設行為（如表單送出）。
- `.stop` → 阻止事件冒泡。
- `.once` → 事件只會觸發一次。
- `.enter`、`.esc` 等 → 鍵盤事件的快捷修飾符。

## 5. 簡單比較

- `@click="method"` → 執行函式，不傳參數。
- `@click="method(param)"` → 執行函式並傳入參數。
- `@click="method($event)"` → 傳入事件物件。

## 6. 小結

- `v-on` / `@` → 綁定 DOM 事件。
- 可傳入參數，或使用 `$event`。
- 修飾符（`.prevent`、`.stop`、`.once`、`.enter`...）能簡化事件處理邏輯。
