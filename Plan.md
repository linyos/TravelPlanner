# 德國、瑞士 絕美14日 — 旅遊規劃網站 程式架構

> **專案名稱**：Travel Planner — 德瑞14日旅遊規劃互動網站  
> **技術目標**：打造一個視覺精美、互動流暢的單頁式 (SPA) 旅遊行程展示網站  
> **設計理念**：手繪插畫風暖系介面 + 貓咪旅伴吉祥物，拒絕冰冷 AI 模板感

---

## 一、技術棧 (Tech Stack)

| 層級 | 技術 | 說明 |
|------|------|------|
| 前端框架 | HTML5 + CSS3 + Vanilla JS | 零依賴、輕量快速、易於部署 |
| 樣式系統 | CSS Custom Properties + Flexbox/Grid | 響應式設計、主題色管理 |
| 地圖服務 | Leaflet.js + OpenStreetMap | 免費開源互動地圖，標記景點與路線 |
| 動畫效果 | CSS Animations + Intersection Observer | 滾動時觸發進場動畫 |
| 圖示 | Font Awesome 6 (CDN) | 交通、住宿、景點圖示 |
| 天氣服務 | Open-Meteo API (免費) | 即時天氣查詢，無需 API Key |
| 插畫素材 | CSS 手繪風 + SVG 貓咪 | 自製吉祥物與裝飾元素 |
| 部署 | 靜態檔案 (GitHub Pages / Netlify) | 無需後端伺服器 |

---

## 二、專案目錄結構

```
travel/
├── Plan.md                    # 本文件 — 程式架構與行程資料
├── index.html                 # 主頁面 (單頁式入口)
├── css/
│   ├── style.css              # 全域樣式、CSS 變數、響應式佈局
│   ├── hero.css               # 首屏大圖區塊樣式
│   ├── timeline.css           # 行程時間軸樣式
│   ├── cards.css              # 景點卡片樣式
│   ├── map.css                # 地圖區塊樣式
│   └── modal.css              # 彈窗/燈箱樣式
├── js/
│   ├── app.js                 # 主程式入口、初始化邏輯
│   ├── data.js                # 行程資料 (JSON 結構)
│   ├── timeline.js            # 時間軸渲染與互動
│   ├── map.js                 # 地圖初始化、標記、路線繪製
│   ├── weather.js             # 天氣 API 查詢與渲染
│   ├── cat.js                 # 貓咪吉祥物互動邏輯
│   ├── modal.js               # 彈窗元件邏輯
│   ├── gallery.js             # 圖片畫廊/燈箱
│   ├── animation.js           # 滾動動畫控制器
│   └── utils.js               # 共用工具函式
├── css/
│   └── ... (同上)
│   └── weather.css            # 天氣卡片樣式
│   └── cat.css                # 貓咪吉祥物樣式與動畫
├── images/
│   ├── hero/                  # 首屏背景大圖
│   ├── days/                  # 各天行程景點照片 (day01/ ~ day14/)
│   ├── cat/                   # 貓咪吉祥物 SVG 素材
│   │   ├── neko-wave.svg      # 揮手打招呼
│   │   ├── neko-walk.svg      # 走路姿態 (時間軸裝飾)
│   │   ├── neko-sleep.svg     # 睡覺 (住宿區塊)
│   │   ├── neko-umbrella.svg  # 撐傘 (下雨天氣)
│   │   ├── neko-sun.svg       # 曬太陽 (晴天天氣)
│   │   ├── neko-snow.svg      # 玩雪 (雪天/高山)
│   │   ├── neko-train.svg     # 搭火車 (鐵道行程)
│   │   ├── neko-boat.svg      # 搭船 (遊船行程)
│   │   └── neko-camera.svg    # 拍照 (景點照片區)
│   ├── icons/                 # 自訂圖示 (交通工具、星級等)
│   ├── textures/              # 紙張紋理、水彩渲染背景
│   │   ├── paper-light.webp   # 淺色紙張紋理背景
│   │   ├── paper-dark.webp    # 深色紙張紋理 (深色模式)
│   │   └── watercolor-divider.svg  # 水彩分隔線
│   └── og-image.jpg           # 社群分享預覽圖
└── favicon.ico                # 網站圖示 (貓咪爪印)
```

---

## 三、頁面區塊架構 (Single Page Sections)

### 3.1 整體佈局

```
┌─────────────────────────────────────────────┐
│  [Navigation Bar]  固定頂部導覽列            │
│   🐱Logo | 行程總覽 | 每日行程 | 地圖 | 資訊 │
├─────────────────────────────────────────────┤
│  [Hero Section]  首屏全幅大圖                │
│   標題動畫 + 倒數計時 + CTA 按鈕             │
│   🐾 貓咪揮手歡迎動畫                        │
├─────────────────────────────────────────────┤
│  [Weather Banner]  今日天氣橫幅 ☀️🌧️         │
│   自動偵測當天行程城市 → 即時天氣卡片          │
│   🐱 貓咪依天氣變換姿態 (曬太陽/撐傘/玩雪)   │
├─────────────────────────────────────────────┤
│  [Trip Overview]  行程概覽資訊卡             │
│   天數 | 國家 | 城市數 | 航班資訊             │
├─────────────────────────────────────────────┤
│  [Interactive Map]  互動地圖區               │
│   路線軌跡 + 城市標記 + 點擊展開詳情          │
│   🐾 貓咪爪印標記當天所在位置                 │
├─────────────────────────────────────────────┤
│  [Daily Timeline]  每日行程時間軸            │
│   垂直時間軸 + 展開式卡片 + 景點照片          │
│   每張卡片附帶該日天氣預報小組件              │
│   🐱 貓咪沿時間軸行走裝飾                    │
├─────────────────────────────────────────────┤
│  [Highlights Gallery]  精選亮點畫廊          │
│   橫向捲動照片牆 + 燈箱模式                  │
├─────────────────────────────────────────────┤
│  [Travel Info]  實用旅遊資訊                 │
│   航班 | 住宿一覽 | 注意事項 | 行李清單       │
├─────────────────────────────────────────────┤
│  [Footer]  頁尾                              │
│   版權 | 返回頂部 | 🐾                       │
├─────────────────────────────────────────────┤
│  [Cat Companion]  浮動貓咪小助手 (右下角)    │
│   隨頁面滾動切換姿態、可點擊互動              │
└─────────────────────────────────────────────┘
```

### 3.2 各區塊詳細規格

#### Navigation Bar (`<nav>`)
- 固定定位 (`position: sticky`)，滾動時背景模糊 (`backdrop-filter: blur`)
- 點擊平滑捲動至對應區塊 (`scroll-behavior: smooth`)
- 手機版漢堡選單 (hamburger menu)
- 當前區塊高亮指示

#### Hero Section (`#hero`)
- 全螢幕背景影像 (視差滾動效果)
- 行程標題動畫 (fade-in + slide-up)，使用手寫風字型
- 出發倒數計時器 (目標: 2026-04-06T20:25:00+08:00)
- 「開始探索」CTA 按鈕，點擊捲動至下一區塊
- 🐱 貓咪吉祥物「旅伴小橘」從畫面右側探頭揮手，CSS animation loop
- 背景疊加淡紙張紋理，避免純漸層的 AI 模板感

#### Weather Banner (`#weather`)
- **進入網站時自動觸發**：根據今天日期比對行程 → 取得當天目的地座標
- 呼叫 Open-Meteo API 查詢該城市即時天氣
- 天氣卡片顯示：城市名、氣溫、體感溫度、天氣描述、風速、降雨機率
- 未來 3 小時逐時預報 (mini hourly chart)
- 穿搭建議 (根據溫度自動產生文字提示)
- 旅程前 (出發前)：顯示「距離出發還有 X 天」+ 目的地天氣預覽
- 旅程中 (D1~D14)：顯示當天行程城市的即時天氣
- 旅程後 (回國後)：顯示「旅程回憶模式」+ 隱藏天氣
- 🐱 貓咪依天氣狀態切換 SVG：
  - ☀️ 晴天 → `neko-sun.svg` (貓咪曬太陽、瞇眼)
  - 🌧️ 雨天 → `neko-umbrella.svg` (貓咪撐小傘)
  - ❄️ 雪天 → `neko-snow.svg` (貓咪踩雪球)
  - ☁️ 陰天 → `neko-walk.svg` (貓咪悠閒散步)

#### Trip Overview (`#overview`)
- 四格統計卡片 (14天 / 4國 / 12城市 / 2段航班)
- 數字滾動動畫 (counter animation)
- 國旗圖示 (🇩🇪 🇨🇭 🇱🇮 🇫🇷)

#### Interactive Map (`#map`)
- Leaflet.js 互動地圖，涵蓋歐洲中部區域
- 城市標記 (custom marker icons)，依天數序號標示
- 路線連線 (polyline)，區分交通方式顏色 (飛機/火車/巴士)
- 點擊標記彈出摘要資訊 (popup)
- 地圖篩選器：可按國家、天數篩選

#### Daily Timeline (`#timeline`)
- **垂直時間軸**設計，左右交替排列 (桌面版)
- 時間軸線條使用手繪虛線風格，節點用貓咪爪印 🐾 取代圓點
- 每天為一張可展開的卡片，包含：
  - 日期徽章 (DAY 01 ~ DAY 14)，手寫風字型
  - 路線標題 (例: 台灣 ✈ 慕尼黑)
  - 行程摘要 (文字)
  - 景點照片 (縮圖，點擊放大，圓角 + 紙膠帶裝飾)
  - **該日天氣小組件** (溫度 + 天氣圖示，從 Open-Meteo 取得)
  - 住宿資訊標籤
  - 交通方式圖示 (✈ 🚂 🚌 🚢)
- 🐱 貓咪沿時間軸步行，每隔幾天出現不同姿態 (搭火車/拍照/睡覺)
- 當天行程卡片自動展開 + 邊框發光高亮
- 手機版：單欄垂直排列
- 滾動進場動畫 (Intersection Observer)
- 「展開詳情 / 收合」切換

#### Highlights Gallery (`#gallery`)
- 橫向捲動照片牆 (CSS `scroll-snap`)
- 照片分類標籤 (自然風光 / 城堡古堡 / 湖泊 / 鐵道)
- 點擊開啟全螢幕燈箱 (lightbox)
- 支援鍵盤左右鍵切換

#### Travel Info (`#info`)
- 摺疊面板 (Accordion) 設計
- **航班資訊**：去回程時間、航班編號、航廈
- **住宿一覽表**：表格列出 12 晚住宿飯店與星級
- **注意事項**：簽證、貨幣、時差、氣候、電壓
- **行李清單**：可勾選的打包清單 (localStorage 儲存)

#### Footer (`<footer>`)
- 版權資訊
- 回到頂部按鈕 (smooth scroll)

---

## 四、資料結構設計 (`js/data.js`)

```javascript
const TRIP_DATA = {
  meta: {
    title: "德國、瑞士 絕美14日",
    subtitle: "夢享雙峰、策馬特3100高山飯店、慕尼黑連泊",
    departureDate: "2026-04-06T20:25:00+08:00",
    returnDate: "2026-04-19T06:20:00+08:00",
    meetingPoint: "桃園國際機場第二航廈長榮航空櫃台",
    totalDays: 14,
    countries: ["德國", "瑞士", "列支敦斯登", "法國"],
  },

  flights: [
    {
      code: "BR-71",
      airline: "長榮航空",
      from: "桃園 TPE",
      to: "慕尼黑 MUC",
      departure: "2026-04-06T23:25:00+08:00",
      arrival: "2026-04-07T07:35:00+02:00",
    },
    {
      code: "BR-72",
      airline: "長榮航空",
      from: "慕尼黑 MUC",
      to: "桃園 TPE",
      departure: "2026-04-18T12:00:00+02:00",
      arrival: "2026-04-19T06:20:00+08:00",
    },
  ],

  days: [
    {
      day: 1,
      date: "2026-04-06",
      weekday: "一",
      title: "台灣 ✈ 慕尼黑【德國】",
      route: ["台灣", "慕尼黑"],
      country: "德國",
      transport: "flight",
      summary: "搭乘長榮航空 BR-71 班機（23:25起飛，隔日07:35抵達）直飛慕尼黑。",
      highlights: [],
      hotel: { name: "夜宿機上", stars: 0 },
      coordinates: { lat: 48.3537, lng: 11.7750 },
      images: [],
    },
    {
      day: 2,
      date: "2026-04-07",
      weekday: "二",
      title: "慕尼黑機場－國王湖－德奧周邊度假小鎮",
      route: ["慕尼黑", "國王湖", "德奧周邊度假小鎮"],
      country: "德國",
      transport: "bus",
      summary: "抵達後前往位於貝希特斯加登國家公園內的國王湖，搭乘遊船深入湖區，欣賞聖巴特羅梅修道院與絕美景緻。",
      highlights: ["國王湖", "聖巴特羅梅修道院", "貝希特斯加登國家公園"],
      hotel: { name: "Hotel Hubertushof", stars: 4 },
      coordinates: { lat: 47.5530, lng: 12.9863 },
      images: [],
    },
    {
      day: 3,
      date: "2026-04-08",
      weekday: "三",
      title: "德奧周邊度假小鎮－威斯教堂－新天鵝堡－福森",
      route: ["德奧周邊", "威斯教堂", "新天鵝堡", "福森"],
      country: "德國",
      transport: "bus",
      summary: "參觀巴伐利亞洛可可建築代表作「威斯教堂」，隨後前往夢幻童話城堡「新天鵝堡」參觀內部並享受森林浴。",
      highlights: ["威斯教堂", "新天鵝堡"],
      hotel: { name: "Hotel Schlosskrone Füssen", stars: 4 },
      coordinates: { lat: 47.5576, lng: 10.7498 },
      images: [],
    },
    {
      day: 4,
      date: "2026-04-09",
      weekday: "四",
      title: "福森－瓦度士【列支敦斯登】－琉森－琉森湖遊船",
      route: ["福森", "瓦度士", "琉森"],
      country: "列支敦斯登/瑞士",
      transport: "bus",
      summary: "拜訪世界第六小國列支敦斯登首都「瓦度士」及其郵政博物館，接著前往瑞士蜜月之境「琉森」，搭乘琉森湖遊船從不同角度欣賞湖光山色。",
      highlights: ["瓦度士", "郵政博物館", "琉森", "琉森湖遊船"],
      hotel: { name: "Radisson Blu Hotel, Lucerne", stars: 4 },
      coordinates: { lat: 47.0502, lng: 8.3093 },
      images: [],
    },
    {
      day: 5,
      date: "2026-04-10",
      weekday: "五",
      title: "琉森－安德馬特－冰河列車－策馬特",
      route: ["琉森", "安德馬特", "策馬特"],
      country: "瑞士",
      transport: "train",
      summary: "參訪琉森地標卡貝爾木橋與獅子紀念碑，前往安德馬特搭乘瑞士最受歡迎的觀景火車「冰河列車」前往無煙小鎮策馬特。",
      highlights: ["卡貝爾木橋", "獅子紀念碑", "冰河列車", "策馬特"],
      hotel: { name: "Ambassador Zermatt / Le Mirabeau Resort & Spa", stars: 4 },
      coordinates: { lat: 46.0207, lng: 7.7491 },
      images: [],
    },
    {
      day: 6,
      date: "2026-04-11",
      weekday: "六",
      title: "策馬特 一日慢遊",
      route: ["策馬特"],
      country: "瑞士",
      transport: "train",
      summary: "搭乘高納葛拉特登山鐵道抵達冰河觀景台，近距離欣賞七條冰河與馬特洪峰美景，體驗Zooom the Matterhorn觀景台的多媒體展覽，並於小鎮自由慢遊。",
      highlights: ["高納葛拉特登山鐵道", "馬特洪峰", "Zooom the Matterhorn"],
      hotel: { name: "3100 Kulmhotel Gornergrat", stars: 4 },
      coordinates: { lat: 46.0207, lng: 7.7491 },
      images: [],
    },
    {
      day: 7,
      date: "2026-04-12",
      weekday: "日",
      title: "策馬特－西墉古堡－蒙投－黃金景觀列車－少女峰地區",
      route: ["策馬特", "蒙投", "少女峰地區"],
      country: "瑞士",
      transport: "train",
      summary: "前往爵士樂故鄉蒙投欣賞日內瓦湖畔的西墉古堡，隨後搭乘瑞士三大景觀列車之一的「黃金景觀列車」前往少女峰地區。",
      highlights: ["西墉古堡", "蒙投", "黃金景觀列車"],
      hotel: { name: "Romantik Hotel Schweizerhof Grindelwald", stars: 5 },
      coordinates: { lat: 46.6244, lng: 8.0413 },
      images: [],
    },
    {
      day: 8,
      date: "2026-04-13",
      weekday: "一",
      title: "少女峰地區 一日慢遊",
      route: ["少女峰", "茵特拉根"],
      country: "瑞士",
      transport: "train",
      summary: "搭乘少女峰登山鐵道登上少女峰景觀台，並前往位於圖恩湖與布里恩茲湖之間的城鎮「茵特拉根」遠眺山景。",
      highlights: ["少女峰登山鐵道", "少女峰景觀台", "茵特拉根"],
      hotel: { name: "Romantik Hotel Schweizerhof Grindelwald", stars: 5 },
      coordinates: { lat: 46.5474, lng: 7.9857 },
      images: [],
    },
    {
      day: 9,
      date: "2026-04-14",
      weekday: "二",
      title: "少女峰地區－伯恩－柯瑪【法國】",
      route: ["少女峰地區", "伯恩", "柯瑪"],
      country: "瑞士/法國",
      transport: "bus",
      summary: "參觀瑞士首都伯恩舊城區（天文鐘、伯恩大教堂、熊公園），隨後越境前往法國亞爾薩斯絕美小鎮柯瑪（小威尼斯區、海關大樓、普菲斯特屋）。",
      highlights: ["伯恩舊城區", "天文鐘", "伯恩大教堂", "柯瑪", "小威尼斯區"],
      hotel: { name: "柯瑪區四星飯店", stars: 4 },
      coordinates: { lat: 48.0794, lng: 7.3558 },
      images: [],
    },
    {
      day: 10,
      date: "2026-04-15",
      weekday: "三",
      title: "柯瑪－史特拉斯堡－海德堡【德國】",
      route: ["柯瑪", "史特拉斯堡", "海德堡"],
      country: "法國/德國",
      transport: "bus",
      summary: "參觀有歐洲十字路口之稱的史特拉斯堡（古騰堡廣場、聖母院、小法蘭西區），隨後前往德國大學城海德堡，搭乘軌道纜車參觀舊城堡及世界最大葡萄酒桶，並漫步舊城區。",
      highlights: ["史特拉斯堡", "古騰堡廣場", "小法蘭西區", "海德堡城堡"],
      hotel: { name: "海德堡區四星飯店", stars: 4 },
      coordinates: { lat: 49.4094, lng: 8.6942 },
      images: [],
    },
    {
      day: 11,
      date: "2026-04-16",
      weekday: "四",
      title: "海德堡－羅騰堡－慕尼黑",
      route: ["海德堡", "羅騰堡", "慕尼黑"],
      country: "德國",
      transport: "bus",
      summary: "走訪羅曼蒂克大道上的童話小鎮羅騰堡（馬克廣場、市政廳、聖喬治噴泉、城堡花園），之後前往巴伐利亞州首府慕尼黑。",
      highlights: ["羅騰堡", "馬克廣場", "城堡花園"],
      hotel: { name: "Hotel Bayerischer Hof", stars: 5 },
      coordinates: { lat: 48.1351, lng: 11.5820 },
      images: [],
    },
    {
      day: 12,
      date: "2026-04-17",
      weekday: "五",
      title: "慕尼黑（市區觀光、王宮博物館）",
      route: ["慕尼黑"],
      country: "德國",
      transport: "walk",
      summary: "慕尼黑舊城區觀光（瑪麗亞廣場、新市政廳、聖母教堂），並安排中文導遊解說導覽德國最大的市區內宮殿「王宮博物館」，午後保留彈性自由活動時間。",
      highlights: ["瑪麗亞廣場", "新市政廳", "聖母教堂", "王宮博物館"],
      hotel: { name: "Hotel Bayerischer Hof", stars: 5 },
      coordinates: { lat: 48.1371, lng: 11.5754 },
      images: [],
    },
    {
      day: 13,
      date: "2026-04-18",
      weekday: "六",
      title: "慕尼黑 ✈ 台灣",
      route: ["慕尼黑", "台灣"],
      country: "德國",
      transport: "flight",
      summary: "早餐後前往慕尼黑機場，搭乘長榮航空 BR-72 班機（12:00起飛，隔日06:20抵達）返回台灣。",
      highlights: [],
      hotel: { name: "夜宿機上", stars: 0 },
      coordinates: { lat: 48.3537, lng: 11.7750 },
      images: [],
    },
    {
      day: 14,
      date: "2026-04-19",
      weekday: "日",
      title: "抵達台灣",
      route: ["台灣"],
      country: "台灣",
      transport: "flight",
      summary: "清晨抵達桃園國際機場，結束14日的回憶滿載旅程。",
      highlights: [],
      hotel: { name: null, stars: 0 },
      coordinates: { lat: 25.0797, lng: 121.2342 },
      images: [],
    },
  ],
};
```

---

## 五、核心模組說明

### 5.1 `js/app.js` — 主程式入口

```
職責：
├── DOMContentLoaded 事件監聽
├── 初始化各模組 (Timeline, Map, Gallery, Animation)
├── 導覽列互動 (smooth scroll, active section highlight)
├── 漢堡選單開關
├── 倒數計時器更新 (setInterval)
└── 貓咪吉祥物初始化 (Cat Module)
```

### 5.2 `js/weather.js` — 天氣模組 🌤️

```
職責：
├── getTodaySchedule()            → 根據今天日期取得當日行程 day 物件
├── fetchWeather(lat, lng)        → 呼叫 Open-Meteo API 取得天氣
│    API: https://api.open-meteo.com/v1/forecast
│    參數: latitude, longitude, current_weather, hourly (temperature, precipitation)
│    回傳: JSON (無需 API Key)
├── renderWeatherBanner(data)     → 渲染頂部天氣橫幅卡片
├── renderDayWeather(day, data)   → 渲染時間軸卡片內的天氣小組件
├── getWeatherIcon(code)          → WMO 天氣代碼 → 圖示對映
├── getClothingSuggestion(temp)   → 依溫度產生穿搭建議文字
├── getCatMood(weatherCode)       → 依天氣決定貓咪 SVG 姿態
├── getTripPhase(today)           → 判斷旅程階段 (出發前/旅途中/已回國)
└── cacheWeather(key, data, ttl)  → 快取天氣資料 (sessionStorage, 30分鐘)
```

**Open-Meteo API 呼叫範例：**
```javascript
// 免費、無需 API Key、無流量限制
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode&timezone=auto&forecast_days=1`;
const res = await fetch(url);
const data = await res.json();
// data.current_weather → { temperature, windspeed, weathercode, ... }
```

**天氣代碼 → 貓咪姿態對照表：**
| WMO Code | 天氣 | 貓咪 SVG | 貓咪動作 |
|----------|------|----------|----------|
| 0, 1 | 晴朗 | neko-sun.svg | 趴著曬太陽、瞇眼微笑 |
| 2, 3 | 多雲 | neko-walk.svg | 悠閒散步、尾巴搖擺 |
| 45, 48 | 霧 | neko-walk.svg | 小心翼翼走路 |
| 51~67 | 雨/毛毛雨 | neko-umbrella.svg | 撐小花傘、嘟嘴 |
| 71~77 | 雪 | neko-snow.svg | 踩雪球、圍圍巾 |
| 80~99 | 大雨/雷雨 | neko-umbrella.svg | 抱緊傘、耳朵壓平 |

### 5.3 `js/timeline.js` — 時間軸模組

```
職責：
├── renderTimeline(days)          → 根據資料渲染時間軸 DOM
├── toggleDayDetail(dayIndex)     → 展開/收合單日詳情
├── filterByCountry(country)      → 依國家篩選天數
├── highlightCurrentDay()         → 根據今日日期高亮對應天 + 自動展開
└── 事件委派 (Event Delegation)   → 卡片點擊事件統一處理
```

### 5.4 `js/map.js` — 地圖模組

```
職責：
├── initMap()                     → 初始化 Leaflet 地圖實例
├── addMarkers(days)              → 為每天的座標新增標記
├── drawRoute(days)               → 繪製城市間的旅行路線
├── fitBounds()                   → 自動調整視角涵蓋所有標記
├── onMarkerClick(day)            → 標記點擊聯動時間軸
└── setTransportStyle(type)       → 依交通方式調整路線樣式
     ├── flight  → 虛線 + 飛機圖示
     ├── train   → 實線 + 鐵道色
     ├── bus     → 實線 + 巴士色
     └── boat    → 波浪線 + 藍色
```

### 5.5 `js/modal.js` — 彈窗模組

```
職責：
├── openModal(content)            → 開啟彈窗並注入內容
├── closeModal()                  → 關閉彈窗 (點擊遮罩/ESC鍵/關閉鈕)
├── 防止背景滾動 (body scroll lock)
└── 無障礙焦點陷阱 (focus trap)
```

### 5.6 `js/gallery.js` — 圖片畫廊模組

```
職責：
├── renderGallery(images)         → 渲染橫向捲動照片牆
├── openLightbox(index)           → 全螢幕燈箱模式
├── navigate(direction)           → 左右切換 (鍵盤 + 手勢)
├── filterByTag(tag)              → 依分類標籤篩選照片
└── lazyLoad()                    → 圖片懶載入 (Intersection Observer)
```

### 5.7 `js/animation.js` — 動畫控制器

```
職責：
├── initObserver()                → 建立 Intersection Observer
├── onIntersect(entries)          → 元素進入視口時加入動畫 class
├── counterAnimation(el, target)  → 數字滾動動畫
└── parallaxScroll(el, speed)     → 視差滾動效果
```

### 5.8 `js/utils.js` — 工具函式

```
職責：
├── formatDate(dateStr)           → 日期格式化
├── getCountdown(targetDate)      → 計算倒數時間
├── debounce(fn, delay)           → 防抖函式
├── throttle(fn, limit)           → 節流函式
├── sanitizeHTML(str)             → HTML 特殊字元轉義 (XSS 防護)
└── saveToLocal(key, value)       → localStorage 封裝
```

### 5.9 `js/cat.js` — 貓咪吉祥物模組 🐱

```
職責：
├── initCatCompanion()            → 建立右下角浮動貓咪元素
├── updateCatPose(section)        → 依當前可視區塊切換貓咪姿態
│    ├── hero     → 揮手 (neko-wave.svg)
│    ├── weather  → 依天氣 (neko-sun/umbrella/snow.svg)
│    ├── map      → 走路 (neko-walk.svg)
│    ├── timeline → 拍照 (neko-camera.svg)
│    ├── gallery  → 拍照 (neko-camera.svg)
│    ├── info     → 睡覺 (neko-sleep.svg)
│    └── footer   → 揮手道別
├── onCatClick()                  → 點擊貓咪彈出隨機旅遊小知識氣泡
├── idleAnimation()               → 閒置時貓咪打盹、甩尾微動畫
└── catTrail()                    → 時間軸上的貓咪行走裝飾定位
```

**貓咪互動彩蛋：**
- 連點 5 次 → 貓咪翻肚子露肚皮
- 閒置 30 秒 → 貓咪開始打呼 zzZ (微動畫)
- 滑鼠靠近 → 貓咪眼睛追蹤游標

---

## 六、CSS 設計系統

### 6.1 色彩變數 (`css/style.css`)

```css
:root {
  /* ─── 暖系色調 ─── 奶茶色基底 + 自然大地色，溫暖不冰冷 */
  --color-primary:     #5B7B5A;   /* 苔蘚綠 — 柔和的自然綠 */
  --color-secondary:   #A0785A;   /* 奶茶棕 — 溫暖舒適 */
  --color-accent:      #6B9BC3;   /* 天空藍 — 清新不刺眼 */
  --color-warm:        #F5E6D3;   /* 奶油底色 — 紙張感暖白 */
  --color-bg:          #FDF8F0;   /* 米白背景 — 避免純白的冷硬感 */
  --color-dark:        #3D3229;   /* 深咖啡 — 替代純黑 */
  --color-gold:        #D4A843;   /* 金色點綴 */
  --color-rose:        #C97B7B;   /* 乾燥玫瑰 — 溫柔點綴 */
  --color-cat-orange:  #E8A87C;   /* 小橘色 — 吉祥物主色 */

  /* 交通方式色彩 (柔和版) */
  --color-flight:      #D4726A;   /* 柔紅 */
  --color-train:       #D4A843;   /* 暖金 */
  --color-bus:         #7BAE7F;   /* 草綠 */
  --color-boat:        #6B9BC3;   /* 水藍 */

  /* 天氣卡片色彩 */
  --color-weather-sunny:  #FFE8A3;
  --color-weather-cloudy: #D5DCE6;
  --color-weather-rainy:  #B8D4E3;
  --color-weather-snowy:  #E8EEF5;

  /* 間距系統 */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* 字型 — 加入手寫風字型增添溫度 */
  --font-heading:  'Noto Serif TC', serif;
  --font-body:     'Noto Sans TC', sans-serif;
  --font-handwrite: 'Klee One', 'Zen Maru Gothic', cursive;  /* 手寫風 */

  /* 圓角 — 偏大圓角營造柔軟感 */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 999px;  /* 膠囊型 */

  /* 陰影 — 暖色調陰影 */
  --shadow-card: 0 2px 12px rgba(160, 120, 90, 0.10);
  --shadow-hover: 0 8px 28px rgba(160, 120, 90, 0.18);
  --shadow-cat: 0 4px 16px rgba(232, 168, 124, 0.25);  /* 貓咪浮動陰影 */
}
```

### 6.2 設計風格指南 — 拒絕 AI 模板感

```
✅ DO (要做的)：
├── 使用紙張紋理背景 (paper-light.webp)，不要純色漸層
├── 卡片邊角微微歪斜 (transform: rotate(-0.5deg~0.8deg))，手作感
├── 照片用「紙膠帶 + 圖釘」裝飾，不要完美網格
├── 分隔線用水彩渲染 SVG (watercolor-divider.svg)
├── 按鈕使用圓角膠囊型，hover 微微浮起 + 歪斜
├── 字體混搭：標題用手寫風 (Klee One)、內文用 Noto Sans
├── 顏色偏暖奶茶色系，避免冷灰 / 純白 / 寶藍
├── 加入隨機微旋轉 (CSS custom property + nth-child)
├── 貓咪插畫點綴在空白處，增添生活感
└── 載入動畫用手繪風格 (貓咪爪印逐步出現)

❌ DON'T (不要做的)：
├── 完美對稱的幾何漸層 Hero
├── 冰冷的深藍/純白配色
├── 千篇一律的 Material Design 卡片陰影
├── AI 生成感的 blob 形狀裝飾
├── 毫無個性的 stock photo 英文標語
├── 過度使用 glassmorphism (磨砂玻璃)
└── 完美圓角 + 完美間距 = 看起來像模板
```

### 6.3 響應式斷點

```css
/* 手機 */      @media (max-width: 576px)  { ... }
/* 平板 */      @media (max-width: 768px)  { ... }
/* 小桌面 */    @media (max-width: 1024px) { ... }
/* 大桌面 */    @media (min-width: 1025px) { ... }
```

---

## 七、互動功能清單

| # | 功能 | 技術實現 | 優先級 |
|---|------|----------|--------|
| 1 | 出發倒數計時器 | `setInterval` + DOM 更新 | P0 |
| 2 | 當日天氣自動查詢 | Open-Meteo API + fetch | **P0** |
| 3 | 天氣橫幅 + 貓咪天氣姿態 | weather.js + cat SVG 切換 | **P0** |
| 4 | 平滑捲動導覽 | `scrollIntoView({ behavior: 'smooth' })` | P0 |
| 5 | 時間軸卡片展開/收合 | CSS `max-height` 過渡 + JS toggle | P0 |
| 6 | 互動地圖 (標記+路線) | Leaflet.js | P0 |
| 7 | 時間軸每日天氣小組件 | weather.js 批次查詢 | **P1** |
| 8 | 貓咪浮動小助手 | cat.js + Intersection Observer | **P1** |
| 9 | 地圖←→時間軸聯動 | 自訂事件 (CustomEvent) | P1 |
| 10 | 滾動觸發進場動畫 | Intersection Observer API | P1 |
| 11 | 圖片燈箱 (lightbox) | 自製 Modal + 鍵盤導航 | P1 |
| 12 | 行李打包清單 (可勾選) | Checkbox + localStorage | P2 |
| 13 | 貓咪互動彩蛋 | cat.js 連點/閒置偵測 | P2 |
| 14 | 深色模式切換 | CSS 變數切換 + `prefers-color-scheme` | P2 |
| 15 | 列印友善版面 | `@media print` 樣式 | P2 |

---

## 八、效能與安全考量

### 效能優化
- 圖片懶載入 (`loading="lazy"` + Intersection Observer)
- 圖片使用 WebP 格式 + `<picture>` 標籤 fallback
- CSS/JS 最小化 (部署前)
- 字型使用 `font-display: swap` 避免 FOIT

### 安全措施
- 所有使用者輸入經過 `sanitizeHTML()` 轉義 (XSS 防護)
- 外部連結加上 `rel="noopener noreferrer"`
- CSP (Content Security Policy) header 設定
- 不使用 `innerHTML` 直接插入未消毒的內容

### 無障礙 (Accessibility)
- 語意化 HTML 標籤 (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA 標籤 (`aria-label`, `aria-expanded`, `aria-hidden`)
- 鍵盤完整可操作 (Tab/Enter/Escape)
- 色彩對比度符合 WCAG 2.1 AA 標準
- 圖片皆有 `alt` 描述文字

---

## 九、開發順序 (Implementation Roadmap)

```
Phase 1 — 基礎結構 + 暖系設計底層
  ├── index.html 骨架 + 語意化標籤
  ├── css/style.css 暖色系 CSS 變數 + 紙張紋理背景
  ├── js/data.js 行程資料
  ├── js/app.js 基礎初始化
  ├── Hero 區塊 + 手寫風標題 + Navigation Bar
  └── 貓咪 SVG 素材製作 (9 種姿態)

Phase 2 — 天氣系統 + 核心內容
  ├── js/weather.js — Open-Meteo API 串接
  ├── css/weather.css — 天氣橫幅卡片
  ├── 天氣 → 貓咪姿態連動
  ├── css/timeline.css + js/timeline.js
  ├── 時間軸渲染 + 每日天氣小組件
  ├── css/cards.css 手作風景點卡片 (紙膠帶裝飾)
  └── Trip Overview 統計卡片

Phase 3 — 地圖整合
  ├── Leaflet.js CDN 引入
  ├── css/map.css + js/map.js
  ├── 貓咪爪印 custom marker
  ├── 標記 + 路線 + Popup
  └── 地圖↔時間軸聯動

Phase 4 — 貓咪吉祥物 + 視覺增強
  ├── js/cat.js 浮動貓咪小助手
  ├── css/cat.css 貓咪動畫
  ├── 區塊感知姿態切換
  ├── js/animation.js 滾動動畫
  ├── css/hero.css 視差效果
  ├── js/gallery.js 照片畫廊
  └── css/modal.css + js/modal.js 燈箱

Phase 5 — 附加功能 + 彩蛋
  ├── Travel Info 摺疊面板
  ├── 行李清單 (localStorage)
  ├── 貓咪互動彩蛋 (連點/閒置/追游標)
  ├── 深色模式 (紙張紋理 dark 版)
  ├── 列印樣式
  └── 效能優化 + 最終測試
```

---

## 十、原始行程資料 (Reference)

> 以下為原始行程總覽，作為網站內容的參考資料來源。

| 天 | 日期 | 路線 | 住宿 |
|----|------|------|------|
| D01 | 04/06 (一) | 台灣 ✈ 慕尼黑 | 夜宿機上 |
| D02 | 04/07 (二) | 慕尼黑→國王湖→德奧小鎮 | Hotel Hubertushof |
| D03 | 04/08 (三) | 威斯教堂→新天鵝堡→福森 | Hotel Schlosskrone Füssen |
| D04 | 04/09 (四) | 福森→瓦度士→琉森→遊船 | Radisson Blu, Lucerne |
| D05 | 04/10 (五) | 琉森→安德馬特→冰河列車→策馬特 | Ambassador Zermatt |
| D06 | 04/11 (六) | 策馬特一日慢遊 | 3100 Kulmhotel Gornergrat |
| D07 | 04/12 (日) | 西墉古堡→蒙投→黃金列車→少女峰 | Schweizerhof Grindelwald ★★★★★ |
| D08 | 04/13 (一) | 少女峰一日慢遊 | Schweizerhof Grindelwald ★★★★★ |
| D09 | 04/14 (二) | 伯恩→柯瑪【法國】 | 柯瑪區四星飯店 |
| D10 | 04/15 (三) | 柯瑪→史特拉斯堡→海德堡 | 海德堡區四星飯店 |
| D11 | 04/16 (四) | 海德堡→羅騰堡→慕尼黑 | Hotel Bayerischer Hof ★★★★★ |
| D12 | 04/17 (五) | 慕尼黑市區觀光 | Hotel Bayerischer Hof ★★★★★ |
| D13 | 04/18 (六) | 慕尼黑 ✈ 台灣 | 夜宿機上 |
| D14 | 04/19 (日) | 抵達台灣 | — |