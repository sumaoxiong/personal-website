---
title: Node.js 基礎
sidebar_label: "Node.js 基礎"
keywords:
  - node
  - commonjs
  - fs
  - async await
tags:
  - node
---

Node.js 讓 JavaScript 可以離開瀏覽器執行，常用來建立 API、操作檔案與連接資料庫。

## 執行 Node.js 程式

確認 Node.js 版本：

```sh
node --version
npm --version
```

在專案目錄建立 `package.json`：

```sh
npm init -y
```

執行 JavaScript 檔案：

```sh
node app.js
```

## Node.js 與瀏覽器的差別

| 項目 | 瀏覽器 | Node.js |
| --- | --- | --- |
| 用途 | 網頁介面與互動 | 伺服器、CLI 與開發工具 |
| 常見 API | `window`、`document` | `process`、`Buffer`、檔案系統 |
| 輸出位置 | Browser Console | Terminal |

Node.js 沒有 DOM，因此下列程式不能直接在 Node.js 執行：

```js
document.querySelector('body');
```

## CommonJS 模組

Node.js 同時支援 CommonJS 與 ES Modules。本節使用 CommonJS：

- `module.exports` 匯出功能。
- `require()` 匯入模組。

### 匯出函式

```js title="utils.js"
function sayHello(name) {
  return `嗨，${name}`;
}

function calculateBMI(weight, height) {
  return weight / height ** 2;
}

module.exports = {
  sayHello,
  calculateBMI,
};
```

### 匯入並使用

```js title="app.js"
const { sayHello, calculateBMI } = require('./utils');

console.log(sayHello('小華'));
console.log(calculateBMI(70, 1.75));
```

匯入 Node.js 內建模組時，建議加上 `node:` 前綴，可以明確表示它不是 npm 套件：

```js
const fs = require('node:fs/promises');
```

## 環境變數

密碼、API key 與不同環境的設定不應寫死在程式中，可改從 `process.env` 取得：

```js
const gymName = process.env.GYM_NAME ?? '未命名健身房';
const apiKey = process.env.API_KEY;
```

`.env` 內容範例：

```env title=".env"
GYM_NAME=FitClub
API_KEY=replace-with-real-key
```

Node.js 不會因為專案中存在 `.env` 就自動載入。可用 `--env-file` 執行：

```sh
node --env-file=.env app.js
```

並將 `.env` 加入 `.gitignore`：

```gitignore title=".gitignore"
.env
```

> 即使 `.env` 沒有上傳，前端 JavaScript 仍不應放置需要保密的金鑰，因為程式會被下載到使用者的瀏覽器。

## 非同步檔案操作

Node.js 透過 event loop 處理大量非同步工作。在伺服器中使用 `readFileSync()` 等同步 API，會在操作完成前阻擋其他 JavaScript；一般請求處理流程應優先使用 Promise 版 API。

### 讀取 JSON 檔案

```js
const fs = require('node:fs/promises');

async function readMembers(filePath) {
  const text = await fs.readFile(filePath, 'utf8');
  return JSON.parse(text);
}
```

重點：

- `fs.readFile()` 會回傳 Promise，因此要搭配 `await`。
- 使用 `await` 的 CommonJS 函式需要加上 `async`。
- 傳入 `'utf8'` 會取得字串；否則預設取得 `Buffer`。
- `JSON.parse()` 將 JSON 字串轉成 JavaScript 陳列或物件。
- `async` 函式一定會回傳 Promise。

使用時也要等待結果：

```js
async function main() {
  const members = await readMembers('./members.json');
  console.log(members);
}

main();
```

## 錯誤處理

讀檔與 `JSON.parse()` 都可能失敗。只處理程式能明確回復的錯誤，其他錯誤繼續向外拋出：

```js
async function readMembers(filePath) {
  try {
    const text = await fs.readFile(filePath, 'utf8');
    return JSON.parse(text);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}
```

這個範例將 `ENOENT`（檔案不存在）視為沒有資料，回傳空陳列。JSON 格式錯誤等其他問題會繼續拋出，不會被誤當成沒有資料。

## 精簡綜合範例

```js title="memberService.js"
const fs = require('node:fs/promises');

async function readMembers(filePath) {
  const text = await fs.readFile(filePath, 'utf8');
  return JSON.parse(text);
}

async function getVIPSummary(filePath) {
  const members = await readMembers(filePath);
  const vipMembers = members.filter((member) => member.level === 'VIP');

  return {
    count: vipMembers.length,
    names: vipMembers.map((member) => member.name),
    totalCredits: vipMembers.reduce(
      (total, member) => total + member.credits,
      0,
    ),
  };
}

module.exports = {
  readMembers,
  getVIPSummary,
};
```

這裡的 `filter()`、`map()` 與 `reduce()` 是 JavaScript 陳列方法，不是 Node.js 特有功能。

## 快速複習

| 目的 | 寫法 |
| --- | --- |
| 執行程式 | `node app.js` |
| 匯入 CommonJS 模組 | `require('./utils')` |
| 匯出 CommonJS 模組 | `module.exports = { ... }` |
| 取得環境變數 | `process.env.API_KEY` |
| 載入 `.env` 後執行 | `node --env-file=.env app.js` |
| 非同步讀取文字 | `await fs.readFile(path, 'utf8')` |
| 解析 JSON 字串 | `JSON.parse(text)` |
