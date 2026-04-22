---
title: 1.1 - 安裝 Vite & Vue3
sidebar_label: "1.1 - 安裝 Vite & Vue3"
keywords:
  - Vue3
tags:
  - Vue3
---

## 1 Vite 與 Vue3 的關係

- **Vite**：新一代前端構建工具，速度快、配置簡單
- **Vue3**：前端框架，負責建立 UI 與應用邏輯
- 與 **Vue CLI** 相比：
  - 啟動速度更快（即時編譯）
  - 支援 ES Module
  - 更容易設定

## 2. 安裝環境

1.  確認 Node.js 版本
    ```bash
    node -v
    ```
    建議 **\>= 18**
2.  建立專案

    ```bash
    npm create vite@latest
    ```

    - 選擇框架：vue
    - 選擇語言：JavaScript / TypeScript / Official Vue Starter
      > 這裡請選擇 `Official Vue Starter` ，因為這是 vue 官分維護的版本，如果選擇 `JavaScript` 會造成下方套件要使用時必須額外手動安裝
    - 選擇要使用的套件(依專案的情況決定)
      ```
      ✔ 是否使用 TypeScript？ … 否
      ✔ 是否啟用 JSX 支援？ … 否
      ✔ 是否引入 Vue Router 進行單頁應用程式開發？ … 是
      ✔ 是否引入 Pinia 用於狀態管理？ … 是
      ✔ 是否引入 Vitest 用於單元測試 … 否
      ✔ 是否要引入一款端對端（End to End）測試工具？ › 不需要
      ✔ 是否引入 ESLint 用於程式碼品質檢測？ … 是
      ✔ 是否引入 Prettier 用於程式碼格式化？ … 是
      ✔ 是否引入 Vue DevTools 7 擴充元件以協助偵錯？（試驗性功能） … 皆可(可直接 Enter 跳過)
      ```

3.  安裝依賴並啟動
    ```bash
    cd 專案名稱
    npm install
    npm run dev
    ```
    執行`npm run dev`後會出現一串 `http://localhost:...` 開頭的網址，點擊這個網址就會進入到我們的網頁了
4.  停止`vite+vue3`的運行
    在透過`npm run dev`運行專案後如果想要繼續輸入指令或是單純的想要終止運行請透過鍵盤按鍵的 `ctrl + C`，如果是 MAC 作業系統請按下 `control + C`
