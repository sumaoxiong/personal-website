---
title: npm 與檔案上傳
sidebar_label: "npm 與檔案上傳"
keywords:
  - node
  - npm
  - package.json
  - formidable
  - file upload
tags:
  - node
---

> 本章為課程學習後的個人觀念筆記，不包含課程原始圖片、作業與課堂紀錄。

本章從 npm 套件管理開始，最後使用 Node.js 內建的 `http` 與第三方套件 `formidable` 建立一個簡單的檔案上傳 API。

## npm 與 `package.json`

npm 是 Node.js 的套件管理工具。`package.json` 記錄專案資訊、可執行指令與依賴套件。

建立 `package.json`：

```sh
npm init -y
```

精簡範例：

```json title="package.json"
{
  "name": "upload-api",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "start": "node app.js",
    "dev": "node --watch app.js",
    "test": "jest"
  },
  "dependencies": {
    "dotenv": "^16.0.0",
    "formidable": "^3.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

### `dependencies` 與 `devDependencies`

| 類型 | 用途 | 安裝方式 |
| --- | --- | --- |
| `dependencies` | 程式正式執行時需要 | `npm install formidable` |
| `devDependencies` | 只在開發、測試或格式化時需要 | `npm install --save-dev jest` |

### 常用指令

```sh
npm install                    # 依 package.json 安裝依賴
npm install dotenv formidable # 安裝正式依賴
npm install --save-dev jest   # 安裝開發依賴
npm run dev                   # 執行 scripts.dev
npm start                     # 執行 scripts.start
npm test                      # 執行 scripts.test
```

`start` 與 `test` 可省略 `run`；其他自訂 script 需使用 `npm run script-name`。

## 套件相關檔案

| 檔案 | 是否 commit | 用途 |
| --- | --- | --- |
| `package.json` | 是 | 宣告專案指令與依賴版本範圍 |
| `package-lock.json` | 是 | 記錄實際安裝版本，讓團隊與 CI 保持一致 |
| `node_modules/` | 否 | 安裝後的套件內容，可依前兩個檔案重建 |

`.gitignore` 至少應包含：

```gitignore title=".gitignore"
node_modules/
.env
uploads/
```

clone 專案後若出現 `MODULE_NOT_FOUND`，先確認是否已執行 `npm install`。CI 或需要嚴格依照 lock file 安裝時，可改用：

```sh
npm ci
```

## `require()` 從哪裡找模組

```js
const fs = require('node:fs');       // Node.js 內建模組
const utils = require('./utils');    // 專案內的相對路徑
const { formidable } = require('formidable'); // node_modules 的套件
```

套件名前面不要加 `./`；`require('./formidable')` 代表要找專案內的檔案。

## 使用 `dotenv` 載入設定

程式通常會有一些「不同環境需要不同值」的設定，例如：

- 開發機使用 `PORT=3000`，部署環境使用平台指定的 port。
- 每個環境的資料庫 URL 不同。
- API key、token 等敏感資料不應寫死在程式碼中。

`dotenv` 是一個第三方 npm 套件，負責將 `.env` 檔案載入 Node.js 的 `process.env`。它執行的流程可以簡化為：

```text
.env 檔案
    ↓ 讀取
KEY=value 文字
    ↓ 解析
process.env.KEY
```

`dotenv` 解決的是「將設定與程式碼分開」，不是加密工具。`.env` 仍是一般文字檔，不可上傳到公開倉庫。

### 安裝與載入

安裝：

```sh
npm install dotenv
```

在程式入口的最前面呼叫 `config()`，讓其他模組開始執行前就可以取得設定：

```js title="app.js"
require('dotenv').config();

const uploadDir = process.env.UPLOAD_DIR ?? './uploads';
const maxFileSizeMB = Number(process.env.MAX_FILE_SIZE_MB ?? 5);
const port = Number(process.env.PORT ?? 3000);
```

```env title=".env"
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=5
PORT=3000
```

執行 `require('dotenv').config()` 後，程式可透過對應的 key 取值：

```js
console.log(process.env.UPLOAD_DIR); // './uploads'
console.log(process.env.PORT);       // '3000'
```

### 使用時要注意的事

#### 1. 取出來的值都是字串

`.env` 中的 `PORT=3000` 不會自動變成數字：

```js
console.log(typeof process.env.PORT); // 'string'

const port = Number(process.env.PORT ?? 3000);
```

Boolean 也需要自行轉換，不能使用 `Boolean(process.env.DEBUG)`，因為字串 `'false'` 仍是 truthy：

```js
const debug = process.env.DEBUG === 'true';
```

#### 2. 設定預設值

```js
const uploadDir = process.env.UPLOAD_DIR ?? './uploads';
```

`??` 只在值為 `undefined` 或 `null` 時使用預設值，不會把空字串、`0` 等其他 falsy 值一起取代。

#### 3. `.env` 與 `.env.example` 的分工

| 檔案 | 是否 commit | 內容 |
| --- | --- | --- |
| `.env` | 否 | 本機實際設定與敏感值 |
| `.env.example` | 是 | 需要的 key 與無敏感的範例值 |

```env title=".env.example"
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=5
PORT=3000
```

取得專案後，複製 `.env.example` 為 `.env`，再填入自己環境的值。

#### 4. `dotenv` 要儘早載入

如果其他模組在 `config()` 之前就讀取 `process.env`，可能取到 `undefined`：

```js
require('dotenv').config();
const server = require('./server');
```

預設情況下，`dotenv` 會從「啟動 Node.js 時的工作目錄」尋找 `.env`。如果檔案在其他位置，可明確指定路徑：

```js
require('dotenv').config({ path: './config/.env' });
```

已存在於作業系統的環境變數預設不會被 `.env` 覆寫，這能讓部署平台提供的設定優先於本機檔案。

> Node.js 也支援 `node --env-file=.env app.js`。本章使用 `dotenv`，是為了練習安裝與使用第三方套件。

## `Buffer` 與文字

### 什麼是 `Buffer`？

電腦傳送與儲存的底層資料是 bytes（位元組）。一個 byte 由 8 bits 組成，可表示 `0` 到 `255`。圖片、PDF、音訊與網路封包都不一定是可直接閱讀的文字，Node.js 因此提供 `Buffer` 來表示一段固定長度的 byte 資料。

```text
文字、圖片、PDF、網路資料
              ↓ 編碼或讀取
       Buffer [byte, byte, byte, ...]
```

`Buffer` 的每個位置都是數字，並且可以用 index 讀取：

```js
const buffer = Buffer.from('ABC', 'utf8');

console.log(buffer);      // <Buffer 41 42 43>
console.log(buffer[0]);   // 65，十進位的 byte 值
console.log(buffer.length); // 3 bytes
```

終端顯示的 `41 42 43` 是十六進位；它們分別是文字 `A`、`B`、`C` 的 UTF-8 bytes。

### 字元數不一定等於 byte 數

編碼（encoding）定義「文字如何轉成 bytes」。ASCII 字元通常佔 1 byte，常見中文字在 UTF-8 中通常佔 3 bytes：

```js
console.log('A'.length);                    // 1 個 JavaScript code unit
console.log(Buffer.byteLength('A', 'utf8')); // 1 byte

console.log('你'.length);                    // 1 個 JavaScript code unit
console.log(Buffer.byteLength('你', 'utf8')); // 3 bytes
```

因此，檢查網路傳輸或檔案大小時，不能把 `string.length` 直接當成 byte 數。

### 建立 `Buffer`

```js
const fromText = Buffer.from('hello', 'utf8');
const fromBytes = Buffer.from([72, 101, 108, 108, 111]);
const empty = Buffer.alloc(10); // 建立 10 bytes，預先填入 0

console.log(fromText.toString('utf8'));  // 'hello'
console.log(fromBytes.toString('utf8')); // 'Hello'
console.log(empty.length);               // 10
```

初學時優先使用 `Buffer.from()` 或 `Buffer.alloc()`。`Buffer.allocUnsafe()` 雖然可能較快，但配置的記憶體未預先清空，必須在讀取前完整覆寫，不適合在不熟悉時使用。

### 在字串與不同編碼之間轉換

```js
const buffer = Buffer.from('你好', 'utf8');

console.log(buffer.toString('utf8'));   // '你好'
console.log(buffer.toString('hex'));    // 'e4bda0e5a5bd'
console.log(buffer.toString('base64')); // '5L2g5aW9'
```

- `utf8`：最常見的文字編碼。
- `hex`：用兩個十六進位字元表示一個 byte，方便檢視底層值。
- `base64`：將 binary 資料編碼成文字，方便放入只能傳送文字的格式；它不是加密。

### 讀檔時為什麼有時是 `Buffer`、有時是字串？

`fs.readFile()` 未指定 encoding 時回傳 `Buffer`；指定 `'utf8'` 時，Node.js 會幫忙將 bytes 解碼成字串：

```js
const fs = require('node:fs/promises');

async function compareFileTypes() {
  const buffer = await fs.readFile('./avatar.png');
  const text = await fs.readFile('./members.json', 'utf8');

  console.log(Buffer.isBuffer(buffer)); // true
  console.log(typeof text);             // string
}

compareFileTypes();
```

讀取 JSON、HTML 或文字檔時應指定 `'utf8'`；圖片、PDF 與音訊則應保留為 `Buffer`，不要任意當成 UTF-8 文字解碼。

### 常用操作

| 目的 | 寫法 |
| --- | --- |
| 判斷是否為 Buffer | `Buffer.isBuffer(value)` |
| 從字串建立 | `Buffer.from(text, 'utf8')` |
| 建立指定大小 | `Buffer.alloc(size)` |
| 轉回字串 | `buffer.toString('utf8')` |
| 取得 byte 數 | `buffer.length` 或 `Buffer.byteLength(text, 'utf8')` |
| 合併多個 Buffer | `Buffer.concat([bufferA, bufferB])` |
| 取出一段資料 | `buffer.subarray(start, end)` |

`subarray()` 通常與原 Buffer 共用記憶體，修改其中一個可能影響另一個。需要完全獨立的複本時可使用：

```js
const copy = Buffer.from(original);
```

### `Buffer` 、Stream 與檔案上傳

- `Buffer` 是記憶體中的一段 bytes。
- Stream 是資料逐塊到達的流程，每一塊常以 `Buffer` 表示。
- 大檔案不宜一次全部讀進記憶體，應使用 Stream 或交由上傳套件處理。

HTTP 檔案上傳的 request body 會以 Stream 形式進入 Node.js。`formidable` 會讀取這些 binary chunks、解析 multipart 邊界與欄位，再將檔案寫入磁碟，因此一般不需要自己拼接所有 `Buffer`。

## 用內建 `http` 建立 API

```js title="app.js"
const http = require('node:http');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(data));
}

function router(req, res) {
  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
}

const server = http.createServer(router);
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

測試 API：

```sh
curl http://localhost:3000/health
```

`req.method` 和 `req.url` 用來判斷路由；`res.writeHead()` 設定狀態碼與 header，`res.end()` 送出內容並結束 response。

## 用 `formidable` 處理檔案上傳

瀏覽器上傳檔案時常使用 `multipart/form-data`。`formidable` 負責解析 HTTP request 中的欄位與檔案，`fs` 則負責建立目錄與後續檔案操作。

```sh
npm install formidable
```

### 完整精簡範例

```js title="app.js"
require('dotenv').config();

const fs = require('node:fs');
const http = require('node:http');
const { formidable } = require('formidable');

const uploadDir = process.env.UPLOAD_DIR ?? './uploads';
const maxFileSizeMB = Number(process.env.MAX_FILE_SIZE_MB ?? 5);
const port = Number(process.env.PORT ?? 3000);

fs.mkdirSync(uploadDir, { recursive: true });

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(data));
}

function handleUpload(req, res) {
  const form = formidable({
    uploadDir,
    maxFileSize: maxFileSizeMB * 1024 * 1024,
    keepExtensions: true,
  });

  form.parse(req, (error, fields, files) => {
    if (error) {
      sendJson(res, error.httpCode ?? 400, { error: error.message });
      return;
    }

    const file = files.file?.[0];

    if (!file) {
      sendJson(res, 400, { error: 'No file uploaded' });
      return;
    }

    sendJson(res, 201, {
      filename: file.originalFilename,
      storedFilename: file.newFilename,
      mimetype: file.mimetype,
      size: file.size,
    });
  });
}

function router(req, res) {
  if (req.method === 'POST' && req.url === '/coaches/avatar') {
    handleUpload(req, res);
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
}

http.createServer(router).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

啟動並上傳檔案：

```sh
npm start
curl -X POST -F "file=@./avatar.jpg" http://localhost:3000/coaches/avatar
```

`file` 必須與 `files.file` 的欄位名一致。`formidable` v3 會將同名檔案欄位表示為陳列，所以單檔上傳取第一個值：

```js
const file = files.file?.[0];
```

## 檔案上傳注意事項

教學範例只完成最小上傳流程。正式專案還需要：

- 驗證使用者權限。
- 限制檔案大小、數量與允許類型。
- 不信任 `originalFilename` 與客戶端提供的 MIME type。
- 使用伺服器產生的檔名，避免路徑穿越與同名覆寫。
- 根據需求使用物件儲存，不依賴應用伺服器的暫存磁碟。

## 常見問題

| 現象 | 檢查方向 |
| --- | --- |
| `MODULE_NOT_FOUND` | 確認已 `npm install`，套件名前沒有 `./` |
| `.env` 沒有載入 | 確認入口最前面已執行 `require('dotenv').config()` |
| 上傳後找不到檔案 | 確認 `uploadDir` 已建立且可寫入 |
| `No file uploaded` | 確認 multipart 欄位名與 `files.file` 一致 |
| 重複回應錯誤 | 在 `res.end()` 或 `sendJson()` 後立即 `return` |
| 檔案太大 | 確認 `maxFileSize` 使用 bytes，MB 需乘上 `1024 * 1024` |

## 快速複習

```text
package.json
    ↓ npm install
node_modules + package-lock.json
    ↓ require('formidable')
HTTP multipart request
    ↓ formidable 解析
fields + files
    ↓ fs 處理
儲存的檔案
```

| 目的 | 重點 |
| --- | --- |
| 安裝套件 | `npm install package-name` |
| 重現安裝版本 | commit `package-lock.json`，CI 使用 `npm ci` |
| 排除產生物與秘密 | `.gitignore` 加入 `node_modules/`、`.env`、`uploads/` |
| 讀取環境變數 | `process.env.VARIABLE_NAME` |
| 建立 HTTP server | `http.createServer(router)` |
| 解析檔案上傳 | `formidable(options).parse(req, callback)` |
