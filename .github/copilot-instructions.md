# 德瑞14日旅遊網站 — 專案指引

## 概述
靜態 SPA 旅遊規劃網站（德國、瑞士 絕美14日），無建置步驟，直接用瀏覽器開啟 `index.html`。

## 技術棧
- 純 HTML / CSS / JS（無框架、無 npm）
- 外部 CDN：Leaflet.js 1.9.4、Font Awesome 6.5.1、Google Fonts
- 天氣 API：Open-Meteo（免費、無需 API Key）

## 架構
JS 模組使用 **IIFE 模式**，透過 `const XxxModule = (() => { ... return { publicAPI }; })()` 封裝。

| 模組 | 職責 |
|------|------|
| `app.js` | 主入口，DOMContentLoaded 初始化所有模組 |
| `data.js` | 中心數據（`TRIP_DATA`、`GALLERY_DATA`、`PACKING_LIST`） |
| `utils.js` | 共用工具函式（`sanitizeHTML`、`getCountdown` 等） |
| `timeline.js` | 時間軸卡片渲染與展開/收合 |
| `map.js` | Leaflet 地圖初始化、標記、路線 |
| `weather.js` | Open-Meteo API 呼叫、天氣卡片渲染 |
| `gallery.js` | 橫捲相簿、標籤篩選、Lightbox |
| `modal.js` | 通用彈窗容器 |
| `cat.js` | 貓咪吉祥物互動動畫 |
| `animation.js` | Intersection Observer 滾動動畫 |

**載入順序**（index.html `<script>` 標籤）：`data.js` → `utils.js` → 各模組 → `app.js`（最後）

## CSS 設計系統
- 全域變數定義在 `css/style.css` 的 `:root`
- 色彩：暖系奶茶色（`--color-warm`、`--color-bg`）
- 字型：`--font-heading`（Noto Serif TC）、`--font-body`（Noto Sans TC）、`--font-handwrite`（Klee One）
- 間距：`--space-xs` ~ `--space-xl`
- 每個 section 有獨立 CSS 檔案（`hero.css`、`timeline.css` 等）

## 命名約定
- JS 函式：`camelCase`（英文）
- JS 常數：`UPPER_CASE`
- CSS 類名：`kebab-case`
- UI 文字：**繁體中文**（台灣用語）

## 注意事項
- 無建置/測試指令，開發方式為直接編輯後瀏覽器刷新
- `sanitizeHTML()` 用於所有動態內容輸出，防止 XSS
- 圖片放在 `images/gallery/`，gallery 支援自動降級（無圖顯示 emoji 佔位符）
- 所有日期使用 `YYYY-MM-DD` 格式，時區為 ISO 8601
- 避免在 HTML 屬性中使用複雜跳脫引號（改用 JS 事件委派）
- `data.js` 的 `TRIP_DATA.days[]` 每天包含 `coordinates`，供地圖和天氣 API 使用

## 詳細規劃文件
完整架構說明見 [Plan.md](../Plan.md)
