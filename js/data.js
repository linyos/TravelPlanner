/* ═══════ Trip Data ═══════ */
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
    { code: "BR-71", airline: "長榮航空", from: "桃園 TPE", to: "慕尼黑 MUC", departure: "2026-04-06T23:25:00+08:00", arrival: "2026-04-07T07:35:00+02:00" },
    { code: "BR-72", airline: "長榮航空", from: "慕尼黑 MUC", to: "桃園 TPE", departure: "2026-04-18T12:00:00+02:00", arrival: "2026-04-19T06:20:00+08:00" },
  ],

  days: [
    { day: 1, date: "2026-04-06", weekday: "一", title: "台灣 ✈ 慕尼黑【德國】", route: ["台灣","慕尼黑"], country: "德國", transport: "flight", summary: "搭乘長榮航空 BR-71 班機（23:25起飛，隔日07:35抵達）直飛慕尼黑。", highlights: [], hotel: { name: "夜宿機上", stars: 0 }, coordinates: { lat: 48.3537, lng: 11.7750 }, images: [] },
    { day: 2, date: "2026-04-07", weekday: "二", title: "慕尼黑機場－國王湖－德奧周邊度假小鎮", route: ["慕尼黑","國王湖","德奧周邊度假小鎮"], country: "德國", transport: "bus", summary: "抵達後前往位於貝希特斯加登國家公園內的國王湖，搭乘遊船深入湖區，欣賞聖巴特羅梅修道院與絕美景緻。", highlights: ["國王湖","聖巴特羅梅修道院","貝希特斯加登國家公園"], hotel: { name: "Hotel Hubertushof", stars: 4 }, coordinates: { lat: 47.5530, lng: 12.9863 }, images: [] },
    { day: 3, date: "2026-04-08", weekday: "三", title: "德奧周邊度假小鎮－威斯教堂－新天鵝堡－福森", route: ["德奧周邊","威斯教堂","新天鵝堡","福森"], country: "德國", transport: "bus", summary: "參觀巴伐利亞洛可可建築代表作「威斯教堂」，隨後前往夢幻童話城堡「新天鵝堡」參觀內部並享受森林浴。", highlights: ["威斯教堂","新天鵝堡"], hotel: { name: "Hotel Schlosskrone Füssen", stars: 4 }, coordinates: { lat: 47.5576, lng: 10.7498 }, images: [] },
    { day: 4, date: "2026-04-09", weekday: "四", title: "福森－瓦度士【列支敦斯登】－琉森－琉森湖遊船", route: ["福森","瓦度士","琉森"], country: "列支敦斯登/瑞士", transport: "bus", summary: "拜訪世界第六小國列支敦斯登首都「瓦度士」及其郵政博物館，接著前往瑞士蜜月之境「琉森」，搭乘琉森湖遊船從不同角度欣賞湖光山色。", highlights: ["瓦度士","郵政博物館","琉森","琉森湖遊船"], hotel: { name: "Radisson Blu Hotel, Lucerne", stars: 4 }, coordinates: { lat: 47.0502, lng: 8.3093 }, images: [] },
    { day: 5, date: "2026-04-10", weekday: "五", title: "琉森－安德馬特－冰河列車－策馬特", route: ["琉森","安德馬特","策馬特"], country: "瑞士", transport: "train", summary: "參訪琉森地標卡貝爾木橋與獅子紀念碑，前往安德馬特搭乘瑞士最受歡迎的觀景火車「冰河列車」前往無煙小鎮策馬特。", highlights: ["卡貝爾木橋","獅子紀念碑","冰河列車","策馬特"], hotel: { name: "Ambassador Zermatt / Le Mirabeau Resort & Spa", stars: 4 }, coordinates: { lat: 46.0207, lng: 7.7491 }, images: [] },
    { day: 6, date: "2026-04-11", weekday: "六", title: "策馬特 一日慢遊", route: ["策馬特"], country: "瑞士", transport: "train", summary: "搭乘高納葛拉特登山鐵道抵達冰河觀景台，近距離欣賞七條冰河與馬特洪峰美景，體驗Zooom the Matterhorn觀景台的多媒體展覽，並於小鎮自由慢遊。", highlights: ["高納葛拉特登山鐵道","馬特洪峰","Zooom the Matterhorn"], hotel: { name: "3100 Kulmhotel Gornergrat", stars: 4 }, coordinates: { lat: 46.0207, lng: 7.7491 }, images: [] },
    { day: 7, date: "2026-04-12", weekday: "日", title: "策馬特－西墉古堡－蒙投－黃金景觀列車－少女峰地區", route: ["策馬特","蒙投","少女峰地區"], country: "瑞士", transport: "train", summary: "前往爵士樂故鄉蒙投欣賞日內瓦湖畔的西墉古堡，隨後搭乘瑞士三大景觀列車之一的「黃金景觀列車」前往少女峰地區。", highlights: ["西墉古堡","蒙投","黃金景觀列車"], hotel: { name: "Romantik Hotel Schweizerhof Grindelwald", stars: 5 }, coordinates: { lat: 46.6244, lng: 8.0413 }, images: [] },
    { day: 8, date: "2026-04-13", weekday: "一", title: "少女峰地區 一日慢遊", route: ["少女峰","茵特拉根"], country: "瑞士", transport: "train", summary: "搭乘少女峰登山鐵道登上少女峰景觀台，並前往位於圖恩湖與布里恩茲湖之間的城鎮「茵特拉根」遠眺山景。", highlights: ["少女峰登山鐵道","少女峰景觀台","茵特拉根"], hotel: { name: "Romantik Hotel Schweizerhof Grindelwald", stars: 5 }, coordinates: { lat: 46.5474, lng: 7.9857 }, images: [] },
    { day: 9, date: "2026-04-14", weekday: "二", title: "少女峰地區－伯恩－柯瑪【法國】", route: ["少女峰地區","伯恩","柯瑪"], country: "瑞士/法國", transport: "bus", summary: "參觀瑞士首都伯恩舊城區（天文鐘、伯恩大教堂、熊公園），隨後越境前往法國亞爾薩斯絕美小鎮柯瑪（小威尼斯區、海關大樓、普菲斯特屋）。", highlights: ["伯恩舊城區","天文鐘","伯恩大教堂","柯瑪","小威尼斯區"], hotel: { name: "柯瑪區四星飯店", stars: 4 }, coordinates: { lat: 48.0794, lng: 7.3558 }, images: [] },
    { day: 10, date: "2026-04-15", weekday: "三", title: "柯瑪－史特拉斯堡－海德堡【德國】", route: ["柯瑪","史特拉斯堡","海德堡"], country: "法國/德國", transport: "bus", summary: "參觀有歐洲十字路口之稱的史特拉斯堡（古騰堡廣場、聖母院、小法蘭西區），隨後前往德國大學城海德堡，搭乘軌道纜車參觀舊城堡及世界最大葡萄酒桶，並漫步舊城區。", highlights: ["史特拉斯堡","古騰堡廣場","小法蘭西區","海德堡城堡"], hotel: { name: "海德堡區四星飯店", stars: 4 }, coordinates: { lat: 49.4094, lng: 8.6942 }, images: [] },
    { day: 11, date: "2026-04-16", weekday: "四", title: "海德堡－羅騰堡－慕尼黑", route: ["海德堡","羅騰堡","慕尼黑"], country: "德國", transport: "bus", summary: "走訪羅曼蒂克大道上的童話小鎮羅騰堡（馬克廣場、市政廳、聖喬治噴泉、城堡花園），之後前往巴伐利亞州首府慕尼黑。", highlights: ["羅騰堡","馬克廣場","城堡花園"], hotel: { name: "Hotel Bayerischer Hof", stars: 5 }, coordinates: { lat: 48.1351, lng: 11.5820 }, images: [] },
    { day: 12, date: "2026-04-17", weekday: "五", title: "慕尼黑（市區觀光、王宮博物館）", route: ["慕尼黑"], country: "德國", transport: "walk", summary: "慕尼黑舊城區觀光（瑪麗亞廣場、新市政廳、聖母教堂），並安排中文導遊解說導覽德國最大的市區內宮殿「王宮博物館」，午後保留彈性自由活動時間。", highlights: ["瑪麗亞廣場","新市政廳","聖母教堂","王宮博物館"], hotel: { name: "Hotel Bayerischer Hof", stars: 5 }, coordinates: { lat: 48.1371, lng: 11.5754 }, images: [] },
    { day: 13, date: "2026-04-18", weekday: "六", title: "慕尼黑 ✈ 台灣", route: ["慕尼黑","台灣"], country: "德國", transport: "flight", summary: "早餐後前往慕尼黑機場，搭乘長榮航空 BR-72 班機（12:00起飛，隔日06:20抵達）返回台灣。", highlights: [], hotel: { name: "夜宿機上", stars: 0 }, coordinates: { lat: 48.3537, lng: 11.7750 }, images: [] },
    { day: 14, date: "2026-04-19", weekday: "日", title: "抵達台灣", route: ["台灣"], country: "台灣", transport: "flight", summary: "清晨抵達桃園國際機場，結束14日的回憶滿載旅程。", highlights: [], hotel: { name: null, stars: 0 }, coordinates: { lat: 25.0797, lng: 121.2342 }, images: [] },
  ],
};

/* ═══════ Gallery Data (placeholder) ═══════ */
const GALLERY_DATA = [
  { id: 1, title: "國王湖", subtitle: "DAY 2 · 德國", tag: "lake", emoji: "🏞️", bgClass: "lake", day: 2 },
  { id: 2, title: "新天鵝堡", subtitle: "DAY 3 · 德國", tag: "castle", emoji: "🏰", bgClass: "castle", day: 3 },
  { id: 3, title: "琉森湖遊船", subtitle: "DAY 4 · 瑞士", tag: "lake", emoji: "⛵", bgClass: "lake", day: 4 },
  { id: 4, title: "冰河列車", subtitle: "DAY 5 · 瑞士", tag: "train", emoji: "🚂", bgClass: "train", day: 5 },
  { id: 5, title: "馬特洪峰", subtitle: "DAY 6 · 策馬特", tag: "nature", emoji: "🏔️", bgClass: "mountain", day: 6 },
  { id: 6, title: "3100 高山飯店", subtitle: "DAY 6 · 策馬特", tag: "nature", emoji: "⛰️", bgClass: "mountain", day: 6 },
  { id: 7, title: "西墉古堡", subtitle: "DAY 7 · 蒙投", tag: "castle", emoji: "🏯", bgClass: "castle", day: 7 },
  { id: 8, title: "黃金景觀列車", subtitle: "DAY 7 · 瑞士", tag: "train", emoji: "🚃", bgClass: "train", day: 7 },
  { id: 9, title: "少女峰", subtitle: "DAY 8 · 瑞士", tag: "nature", emoji: "❄️", bgClass: "mountain", day: 8 },
  { id: 10, title: "伯恩舊城區", subtitle: "DAY 9 · 瑞士", tag: "town", emoji: "🏛️", bgClass: "town", day: 9 },
  { id: 11, title: "柯瑪小威尼斯", subtitle: "DAY 9 · 法國", tag: "town", emoji: "🎨", bgClass: "town", day: 9 },
  { id: 12, title: "史特拉斯堡", subtitle: "DAY 10 · 法國", tag: "town", emoji: "⛪", bgClass: "town", day: 10 },
  { id: 13, title: "海德堡城堡", subtitle: "DAY 10 · 德國", tag: "castle", emoji: "🏰", bgClass: "castle", day: 10 },
  { id: 14, title: "羅騰堡", subtitle: "DAY 11 · 德國", tag: "town", emoji: "🏘️", bgClass: "town", day: 11 },
  { id: 15, title: "慕尼黑新市政廳", subtitle: "DAY 12 · 德國", tag: "town", emoji: "🕰️", bgClass: "town", day: 12 },
  { id: 16, title: "威斯教堂", subtitle: "DAY 3 · 德國", tag: "castle", emoji: "⛪", bgClass: "castle", day: 3 },
];

/* ═══════ Packing List ═══════ */
const PACKING_LIST = [
  { category: "📄 證件文件", items: ["護照（效期6個月以上）","身分證影本","電子機票","旅遊保險單","飯店訂房確認","團體行程表","信用卡 x2","歐元現金","瑞士法郎現金"] },
  { category: "👕 衣物穿搭", items: ["保暖外套/風衣","薄羽絨衣","長袖上衣 x4","長褲 x3","內衣褲 x5","厚襪子 x4","防水鞋/登山鞋","遮陽帽","圍巾","薄手套"] },
  { category: "🧴 盥洗用品", items: ["牙刷牙膏","洗面乳","防曬乳","保濕乳液","護唇膏","梳子","小毛巾"] },
  { category: "📱 電子設備", items: ["手機+充電線","行動電源","歐規轉接頭 x2","相機+記憶卡","耳機","eSIM 卡"] },
  { category: "💊 健康醫藥", items: ["個人藥品","暈車藥","胃腸藥","OK繃","口罩 x5"] },
  { category: "🎒 其他", items: ["摺疊雨傘","水壺","零食","頸枕","眼罩+耳塞","夾鏈袋","小背包"] },
];

/* ═══════ Cat Facts ═══════ */
const CAT_FACTS = [
  "🐱 喵～你知道嗎？瑞士的火車準時率高達 95% 呢！",
  "🧀 瑞士有超過 450 種起司！我最愛魚味的～",
  "🏰 新天鵝堡是迪士尼睡美人城堡的靈感來源喔！",
  "🚂 冰河列車全程約 8 小時，經過 291 座橋樑！",
  "🏔️ 馬特洪峰海拔 4,478 公尺，是阿爾卑斯山最著名的山峰！",
  "🍺 德國有超過 1,500 間啤酒釀造廠～",
  "🇱🇮 列支敦斯登面積只有 160 平方公里，比台北市還小！",
  "📮 瓦度士的郵票聞名全球，集郵迷必訪！",
  "🌊 國王湖是德國最乾淨的湖泊，只允許電動船航行！",
  "⏰ 伯恩的鐘塔從 1530 年就開始報時了！",
  "🎵 蒙投每年7月會舉辦世界知名的爵士音樂節！",
  "🏘️ 羅騰堡被稱為「中世紀寶石」，整座城保存完整！",
  "🦁 琉森的獅子紀念碑被馬克吐溫譽為「世界最悲傷的石雕」",
  "🍫 瑞士人平均每年吃掉 10 公斤巧克力！",
  "✈️ 慕尼黑機場有自己的啤酒花園呢！",
];
