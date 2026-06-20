---
title: Composition API 介紹
sidebar_label: "Composition API 介紹"
keywords:
  - Vue3
tags:
  - Vue3
---

> Vue 3 的最大特色就是引入了 **Composition API**，這是一個全新的程式撰寫方式，相較於 Vue 2 的 Options API 有著顯著的優勢。

## 為什麼需要 Composition API？

在 Vue 2 的 Options API 中，我們會將程式碼分散在不同的選項中（如 `data`、`methods`、`computed`、`watch` 等）。當組件變得複雜時，相關的邏輯會散落在各處，造成維護困難。

**Composition API 的核心優勢：**

### 1\. 更好的邏輯組織

- 可以將相關的邏輯集中在一起，而不是按照選項類型分散
- 同一個功能的狀態、計算屬性、方法可以寫在相鄰的地方

### 2\. 更好的程式碼重用性

- 可以輕鬆地將邏輯抽取成可重用的 Composition Functions
- 不再需要依賴 mixins，避免了命名衝突和來源不明的問題

### 3\. 更好的 TypeScript 支援

- 天然的類型推論支援，不需要複雜的類型定義
- IDE 能提供更準確的自動完成和錯誤檢查

### 4\. 更小的打包體積

- 可以更好地進行 Tree-shaking，未使用的功能會被自動移除
- 按需引入，只打包實際使用的功能

### 5\. 更靈活的組合方式

- 可以在組件之間共享邏輯，而不需要複雜的組件繼承
- 支援更複雜的邏輯組合模式
