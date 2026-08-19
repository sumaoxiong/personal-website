# 阿蘇的個人網站

這是一個使用 [Docusaurus 3](https://docusaurus.io/) 建立的個人技術筆記網站，主要用來整理與記錄 Git、JavaScript、TypeScript、React、Vue 3 等前端開發相關內容。

網站連結：[https://sumaoxiong.github.io/personal-website/](https://sumaoxiong.github.io/personal-website/)

## 使用技術

- [Docusaurus 3](https://docusaurus.io/)
- [React 19](https://react.dev/)
- [MDX](https://mdxjs.com/)
- [Sass](https://sass-lang.com/)

## 環境需求

- Node.js 20.0 以上
- npm（安裝 Node.js 時會一併安裝）

可以使用以下指令確認目前版本：

```bash
node --version
npm --version
```

## 開始使用

下載專案並安裝相依套件：

```bash
git clone https://github.com/sumaoxiong/personal-website.git
cd personal-website
npm install
```

啟動本機開發伺服器：

```bash
npm start
```

啟動後可在 [http://localhost:3000/personal-website/](http://localhost:3000/personal-website/) 查看網站。開發期間修改內容後，頁面通常會自動更新。

## 常用 npm 指令

| 指令                         | 用途                                       |
| ---------------------------- | ------------------------------------------ |
| `npm start`                  | 啟動本機開發伺服器                         |
| `npm run build`              | 建立正式版網站，輸出至 `build/`            |
| `npm run serve`              | 在本機預覽已建立的正式版網站               |
| `npm run clear`              | 清除 Docusaurus 快取與暫存檔               |
| `npm run deploy`             | 建置並部署網站至 GitHub Pages              |
| `npm run swizzle`            | 取出或包裝 Docusaurus 主題元件以進行客製化 |
| `npm run write-translations` | 產生多語系翻譯檔案                         |
| `npm run write-heading-ids`  | 將標題 ID 寫入 Markdown 文件               |

## 編輯內容

### 技術筆記

技術筆記存放在 `docs/` 目錄。新增 Markdown 或 MDX 文件後，側邊欄會依照目錄結構自動產生。

### 部落格文章

部落格文章存放在 `blog/` 目錄，可使用 `.md` 或 `.mdx` 格式撰寫。

### 首頁與樣式

- `src/pages/`：首頁及其他自訂頁面
- `src/components/`：React 元件
- `src/css/custom.css`：全站自訂樣式
- `static/`：圖片、圖示等靜態資源
- `docusaurus.config.js`：網站名稱、導覽列、頁尾與部署設定
- `sidebars.js`：技術筆記側邊欄設定

## 建置與預覽

建立正式版網站：

```bash
npm run build
```

建置成功後，靜態檔案會輸出到 `build/` 目錄。可以接著在本機預覽：

```bash
npm run serve
```

## 部署到 GitHub Pages

目前網站設定部署至 `sumaoxiong/personal-website` 的 `gh-pages` 分支。

使用 HTTPS 部署：

```bash
GIT_USER=sumaoxiong npm run deploy
```

或使用 SSH 部署：

```bash
USE_SSH=true npm run deploy
```

部署前建議先執行 `npm run build`，確認網站可以正常完成建置。

## 授權

此專案主要作為個人學習與筆記用途。
