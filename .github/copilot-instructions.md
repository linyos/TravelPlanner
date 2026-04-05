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
| `data.js` | 中心數據（`TRIP_DATA`、`GALLERY_DATA`、`PACKING_LIST`、`CITY_DETAILS`、`CAT_FACTS`） |
| `utils.js` | 共用工具函式（`sanitizeHTML`、`getCountdown`、`catImgTag` 等） |
| `timeline.js` | 時間軸卡片渲染與展開/收合 |
| `map.js` | Leaflet 地圖初始化、標記、路線 |
| `weather.js` | Open-Meteo API 呼叫、天氣卡片渲染 |
| `gallery.js` | 橫捲相簿、標籤篩選、Lightbox |
| `modal.js` | 通用彈窗容器 |
| `cat.js` | 貓咪吉祥物互動動畫 |
| `animation.js` | Intersection Observer 滾動動畫 |

**載入順序**（index.html `<script>` 標籤，無 `defer`/`async`，需同步載入確保全域變數可用）：
`data.js` → `utils.js` → 各模組 → `app.js`（最後）

## CSS 設計系統
- 全域變數定義在 `css/style.css` 的 `:root`
- 色彩：暖系奶茶色（`--color-warm`、`--color-bg`）
- 字型：`--font-heading`（Noto Serif TC）、`--font-body`（Noto Sans TC）、`--font-handwrite`（Klee One）
- 間距：`--space-xs` ~ `--space-xl`
- Z-index 分層（定義於 `:root`，**勿直接使用數字**）：`--z-navbar: 100`、`--z-cat: 1500`、`--z-modal: 2000`
- 每個 section 有獨立 CSS 檔案（`hero.css`、`timeline.css` 等）
- 新增 lightbox 尺寸樣式請加到 `cards.css` 的 `.lightbox-media`

## 命名約定
- JS 函式：`camelCase`（英文）
- JS 常數：`UPPER_CASE`
- CSS 類名：`kebab-case`
- UI 文字：**繁體中文**（台灣用語）

## 重要 API 與跨模組協作

### ModalModule
```js
// 第三個參數 onClose 為可選回調，模組關閉時自動執行（如清除鍵盤監聽器）
ModalModule.openModal(htmlContent, isLightbox, onClose?)
ModalModule.closeModal()
```

### WeatherModule
```js
WeatherModule.renderWeatherBanner(containerEl)   // 主天氣橫幅
WeatherModule.renderDayWeatherWidget(dayEl, day) // 時間軸小天氣
WeatherModule.renderDayForecast(containerId, lat, lng, dateStr, cityName)
```
所有 `fetchWeather(...).then(...)` 必須接 `.catch(err => { /* 顯示錯誤 UI */ })`，不得讓 Promise 靜默失敗。天氣資料以 `sessionStorage` 快取 30 分鐘，key 格式：`weather_${lat}_${lng}`。

### CatModule — `data-pose` 系統
貓咪動畫狀態由 `companion.dataset.pose` 驅動（值：`'wave'`、`'sleep'`、`'idle'`），CSS 使用 `[data-pose="wave"]` 等屬性選擇器。`belly-up` 為彩蛋暫態，仍以 CSS class 管理。**勿恢復舊的 classList.remove/add 模式。**

### 跨模組事件
```js
// weather.js 載入完成後派發，cat.js 監聽以更新貓咪姿態
document.dispatchEvent(new CustomEvent('weatherLoaded', { detail: { catPose, weatherCode } }))
```

### CITY_DETAILS
全域物件，以天數數字（如 `CITY_DETAILS[6]`）為 key，供 `TimelineModule` 中的城市詳情 modal 使用。
結構：`{ city, cityEN, heroEmoji, intro, sections: [{ icon, title, items: [{ name, desc }] }] }`

## 安全規則

- **所有** 動態 `innerHTML` 輸出，字串內容必須通過 `sanitizeHTML()` 處理
- `catImgTag(name, cssClass, alt)` 內部已自行 sanitize，無需額外處理
- **嚴禁** 在 HTML 字串中拼接 inline 事件屬性（`onerror=`、`onclick=` 等）；改用 DOM 方法或事件委派
- 避免在 HTML 屬性中使用複雜跳脫引號（改用 JS 事件委派）

## 圖片 Fallback 機制

**注意 `data-fallback` vs `data-fallback-src` 的差異：**
- `data-fallback-src`：供 **貓咪圖片**（`catImgTag` 生成），值為 `.svg` URL。由 `utils.js` 的全域 capture error handler 攔截處理。
- `data-fallback`：供 **時間軸縮圖**，值為 emoji 文字（如 `✈️`）。由 `timeline.js` 內部的 error listener 處理。
- 兩者**不可混用**，否則全域 handler 會將 emoji 字串當作圖片 src 觸發。

## CSS 優先度規則

- 禁止使用 `!important` 覆蓋本專案自有的選擇器；提升選擇器特異性（如加上父層 `.timeline-item`）
- 在 RWD 媒體查詢中，用與桌面版相同特異性的選擇器（如 `:nth-child(odd), :nth-child(even)` 並列）來覆蓋桌面版規則
- Leaflet 相關的 `!important` 在 `map.css` 中為合理例外（覆蓋第三方樣式）

## 其他注意事項

- 無建置/測試指令，開發方式為直接編輯後瀏覽器刷新
- 圖片放在 `images/gallery/`，gallery 支援自動降級（無圖顯示 emoji 佔位符）
- 所有日期使用 `YYYY-MM-DD` 格式，時區為 ISO 8601
- `TRIP_DATA.days[]` 每天包含 `coordinates: { lat, lng }`，供地圖和天氣 API 使用
- 打包清單的 localStorage key 格式為 `${catIdx}_${itemIdx}`（索引式，非類別名稱）
- 倒數計時器 interval ID 儲存於 `countdownInterval`，旅程結束（`cd.expired`）時自動 `clearInterval`
- `AnimationModule.initObserver()` 必須在所有 DOM 渲染完成後**最後**呼叫
- 新增 `overview-number` 計數動畫，只需在元素加上 `data-target="數字"` 屬性

## 詳細規劃文件
完整架構說明見 [Plan.md](../Plan.md)
