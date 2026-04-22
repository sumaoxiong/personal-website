---
title: 生命週期說明(Lifecycle Hooks)
sidebar_label: "生命週期說明"
keywords:
  - Vue3
tags:
  - Vue3
---

Vue 元件在建立、渲染、更新、銷毀的過程中，會觸發一系列的 **生命週期函式 (Lifecycle Hooks)**。  
透過這些 Hook，我們可以在不同階段插入程式邏輯。

生命週期詳細資訊：https://cn.vuejs.org/guide/essentials/lifecycle

## 1. 生命週期流程概觀

一個元件從「建立 → 渲染 → 更新 → 銷毀」大致流程如下：

1. **建立 (Create)**：元件初始化，變數與監聽設定好。
2. **掛載 (Mount)**：元件渲染到畫面上。
3. **更新 (Update)**：當響應式資料改變時，觸發重新渲染。
4. **卸載 (Unmount)**：元件被移除，不再存在於畫面中。

![生命週期圖](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)

## 2. Vue3 常用的生命週期 Hook

Vue3 使用 Composition API 提供對應的 Hook，全部都需要在 `setup()` 或 `<script setup>` 中呼叫。

- **建立階段**

  - `onBeforeMount` → 元件準備掛載到 DOM 前。
  - `onMounted` → 元件已經掛載完成，DOM 可存取。

- **更新階段**

  - `onBeforeUpdate` → 更新前觸發。
  - `onUpdated` → 更新完成後觸發。

- **卸載階段**

  - `onBeforeUnmount` → 元件被卸載前。
  - `onUnmounted` → 元件已經卸載。

- **進階 Hook**
  - `onErrorCaptured` → 捕捉子元件錯誤。
  - `onRenderTracked`、`onRenderTriggered` → 偵測響應式依賴變化（除錯用）。

## 3. 簡單範例

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from "vue";

onMounted(() => {
  console.log("元件已經掛載到 DOM");
});

onUpdated(() => {
  console.log("元件因資料變更而更新");
});

onUnmounted(() => {
  console.log("元件已經被卸載");
});
</script>

<template>
  <p>這是一個生命週期範例</p>
</template>
```

## 4. 小結

- 生命週期 Hook 幫助我們在不同階段插入程式邏輯。
- **最常用的 Hook**：
  - `onMounted` → 初始化，例如呼叫 API。
  - `onUpdated` → 資料更新後操作、畫面重新渲染完成後處理。
  - `onUnmounted` → 清理資源，例如：移除事件監聽器、計時器、socket。
- `before`系列大部分場景都能被 `Mounted` / `Updated` / `Unmounted` 取代。
- 其他 Hook 多數用於進階或除錯需求。
