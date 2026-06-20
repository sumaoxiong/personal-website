---
title: 4.4 - Emit 事件傳遞
sidebar_label: "4.4 - Emit 事件傳遞"
keywords:
  - Vue3
tags:
  - Vue3
---

> 在 Vue 中，**Emit** 是子元件向父元件傳遞事件的方式。  
> 當父元件透過 Props 把資料傳給子元件後，子元件若有狀態改變或操作結果，需要「通知父元件」，就會使用 **Emit**。

## 1. 基本用法

### 子元件：發出事件

```vue
<!-- src/components/CounterButton.vue -->
<template>
  <button @click="$emit('increment')">+1</button>
</template>

<script setup>
defineEmits(["increment"]);
</script>
```

### 父元件：監聽事件

```vue
<!-- src/App.vue -->
<script setup>
import CounterButton from "./components/CounterButton.vue";
import { ref } from "vue";

const count = ref(0);
const addCount = () => {
  count.value++;
};
</script>

<template>
  <p>目前數字：{{ count }}</p>
  <CounterButton @increment="addCount" />
</template>
```

📌 **流程**

1.  子元件定義事件 → `defineEmits(['increment'])`。
2.  子元件透過 `$emit('increment')` 觸發事件。
3.  父元件用 `@increment="方法"` 監聽並處理。

## 2. 傳遞參數

Emit 事件可以攜帶資料，一併傳給父元件。

### 子元件

```vue
<!-- Child.vue -->
<template>
  <button @click="$emit('send-message', 'Hello Parent!')">送出訊息</button>
</template>

<script setup>
defineEmits(["send-message"]);
</script>
```

父元件

```vue
<!-- Parent.vue -->
<script setup>
import Child from "./Child.vue";

const handleMessage = (msg) => {
  alert(`子元件傳來的訊息：${msg}`);
};
</script>

<template>
  <Child @send-message="handleMessage" />
</template>
```

## 3. 定義事件型別（進階）

可以用物件寫法，限制事件的參數型別與驗證。

```vue
<script setup>
const emit = defineEmits({
  submit: (payload) => {
    if (typeof payload === "string") return true;
    console.warn("submit 事件必須傳入字串");
    return false;
  },
});

// 呼叫方式
emit("submit", "表單資料");
</script>
```

## 4. 注意事項

- **事件名稱建議使用 kebab-case**（例如 `send-message`）。
- 父元件監聽時也要保持一致：`@send-message`。
- 子元件只負責「通知」，不應該修改父元件的狀態。

## 5. 小結

- **Props**：父 → 子（傳資料）。
- **Emit**：子 → 父（傳事件）。
- `defineEmits` 宣告事件，`$emit` 發送事件。
- 可以攜帶參數，讓父元件獲取更多資訊。
