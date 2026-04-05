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
  { id: 1, title: "國王湖", subtitle: "DAY 2 · 德國", tag: "lake", emoji: "🏞️", bgClass: "lake", day: 2, image: "images/gallery/koenigssee.jpg" },
  { id: 2, title: "新天鵝堡", subtitle: "DAY 3 · 德國", tag: "castle", emoji: "🏰", bgClass: "castle", day: 3, image: "images/gallery/neuschwanstein.jpg" },
  { id: 3, title: "琉森湖遊船", subtitle: "DAY 4 · 瑞士", tag: "lake", emoji: "⛵", bgClass: "lake", day: 4, image: "images/gallery/lucerne-lake.jpg" },
  { id: 4, title: "冰河列車", subtitle: "DAY 5 · 瑞士", tag: "train", emoji: "🚂", bgClass: "train", day: 5, image: "images/gallery/glacier-express.jpg" },
  { id: 5, title: "馬特洪峰", subtitle: "DAY 6 · 策馬特", tag: "nature", emoji: "🏔️", bgClass: "mountain", day: 6, image: "images/gallery/matterhorn.jpg" },
  { id: 6, title: "3100 高山飯店", subtitle: "DAY 6 · 策馬特", tag: "nature", emoji: "⛰️", bgClass: "mountain", day: 6, image: "images/gallery/kulmhotel-3100.jpg" },
  { id: 7, title: "西墉古堡", subtitle: "DAY 7 · 蒙投", tag: "castle", emoji: "🏯", bgClass: "castle", day: 7, image: "images/gallery/chillon-castle.jpg" },
  { id: 8, title: "黃金景觀列車", subtitle: "DAY 7 · 瑞士", tag: "train", emoji: "🚃", bgClass: "train", day: 7, image: "images/gallery/golden-pass.jpg" },
  { id: 9, title: "少女峰", subtitle: "DAY 8 · 瑞士", tag: "nature", emoji: "❄️", bgClass: "mountain", day: 8, image: "images/gallery/jungfrau.jpg" },
  { id: 10, title: "伯恩舊城區", subtitle: "DAY 9 · 瑞士", tag: "town", emoji: "🏛️", bgClass: "town", day: 9, image: "images/gallery/bern-old-town.jpg" },
  { id: 11, title: "柯瑪小威尼斯", subtitle: "DAY 9 · 法國", tag: "town", emoji: "🎨", bgClass: "town", day: 9, image: "images/gallery/colmar.jpg" },
  { id: 12, title: "史特拉斯堡", subtitle: "DAY 10 · 法國", tag: "town", emoji: "⛪", bgClass: "town", day: 10, image: "images/gallery/strasbourg.jpg" },
  { id: 13, title: "海德堡城堡", subtitle: "DAY 10 · 德國", tag: "castle", emoji: "🏰", bgClass: "castle", day: 10, image: "images/gallery/heidelberg.jpg" },
  { id: 14, title: "羅騰堡", subtitle: "DAY 11 · 德國", tag: "town", emoji: "🏘️", bgClass: "town", day: 11, image: "images/gallery/rothenburg.jpg" },
  { id: 15, title: "慕尼黑新市政廳", subtitle: "DAY 12 · 德國", tag: "town", emoji: "🕰️", bgClass: "town", day: 12, image: "images/gallery/munich-rathaus.jpg" },
  { id: 16, title: "威斯教堂", subtitle: "DAY 3 · 德國", tag: "castle", emoji: "⛪", bgClass: "castle", day: 3, image: "images/gallery/wieskirche.jpg" },
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

/* ═══════ City Details (景點詳情 Modal) ═══════ */
const CITY_DETAILS = {
  6: {
    city: "策馬特",
    cityEN: "Zermatt",
    heroEmoji: "⛰️",
    intro: "阿爾卑斯山腳下的無車小鎮，以馬特洪峰聞名於世。",
    sections: [
      {
        icon: "⛰️",
        title: "高山與自然景觀",
        items: [
          { name: "馬特洪峰（Matterhorn）", desc: "策馬特最具代表性的地標，也是瑞士三角巧克力（TOBLERONE）的商標原型。來到這裡絕對不能錯過清晨的「黃金日出」，當陽光灑落在山頭將其染成金黃色時，景色無比壯麗。" },
          { name: "高納葛拉特觀景台（Gornergrat）", desc: "搭乘著名的齒軌列車約30分鐘即可抵達海拔3089公尺的觀景台。360度近距離欣賞馬特洪峰與戈爾納冰川，還能參觀免門票的「ZOOOM the Matterhorn」多媒體體驗館。" },
          { name: "五湖健行（5-Seenweg）", desc: "全長約11公里的經典健行路線，沿途可集滿五座風貌各異的高山湖泊：Stellisee（最容易拍到馬特洪峰倒影）、Grindjisee（美麗綠色湖水）、Grünsee（寧靜野餐點）、Moosjisee（夢幻乳白色湖水）、Leisee（適合家庭遊玩）。" },
          { name: "利菲爾湖（Riffelsee）", desc: "位於 Rotenboden 車站附近，在夏季無風時，湖面如鏡子般完美映出馬特洪峰的倒影，是極受歡迎的攝影勝地。" },
          { name: "馬特洪峰冰川天堂（Glacier Paradise）", desc: "歐洲知名的滑雪勝地，擁有冰宮及高山滑雪場，頂部觀景台可眺望14條冰川及38座海拔超過4000公尺的高峰。" },
        ]
      },
      {
        icon: "🏘️",
        title: "小鎮與人文景點",
        items: [
          { name: "班霍夫大街（Bahnhofstrasse）", desc: "策馬特最熱鬧的商業街，街道兩旁林立著餐廳、咖啡館、戶外用品店與紀念品店。還能找到知名老店福克斯烘焙坊，品嚐核桃派、蘋果派，或購買馬特洪峰造型的巧克力。" },
          { name: "策馬特蘑菇屋（Hinterdorfstrasse）", desc: "位於舊城區，擁有400多年歷史的古老木造建築群。底層用石板撐高並加上圓盤設計，外型猶如蘑菇，是前人為了防止老鼠攀爬入侵儲糧區的防鼠智慧。" },
          { name: "馬特洪峰博物館（Matterhorn Museum）", desc: "位於市區地下的展覽廳，透過模型展示了19世紀策馬特的生活情景，以及早期登山者攀登馬特洪峰的歷史故事與裝備。" },
          { name: "天主教堂與教堂橋", desc: "位於鎮中心的天主教堂是當地地標與文化交流地。旁邊的教堂橋是全鎮最熱門的「黃金日出」拍攝點。" },
          { name: "Getwingbrücke 橋", desc: "更推薦的日出拍攝秘境。可以用蜿蜒的河流與阿爾卑斯木屋當作前景，拍出極具視覺延伸感的日出美景。" },
          { name: "馬特洪峰觀景台", desc: "位於小鎮北邊高處，需爬一小段上坡，是俯瞰整個策馬特村莊與馬特洪峰合影的最佳地點，非常適合在日落時分拍攝浪漫藍調夜景。" },
        ]
      },
      {
        icon: "✨",
        title: "特色體驗",
        items: [
          { name: "尋找黑面羊（Valais Blacknose Sheep）", desc: "策馬特獨有的瓦萊黑鼻羊，外觀像極了戴著黑面罩的絨毛娃娃。夏季時可透過GPS尋找蹤跡，或在 Riffelberg 站參加「Meet the Sheep」見面會。" },
          { name: "搭乘直升機（Heliport Zermatt）", desc: "預算充足的話，可前往專屬停機坪搭乘直升機，以超近的空中視角欣賞馬特洪峰的壯麗雄偉。" },
        ]
      }
    ]
  },
  2: {
    city: "國王湖",
    cityEN: "Königssee",
    heroEmoji: "🏞️",
    intro: "位於貝希特斯加登國家公園內，以翡翠綠湖水與壯麗山景聞名，是德國最乾淨的湖泊。",
    sections: [
      {
        icon: "⛰️",
        title: "國王湖區 (Königssee)",
        items: [
          { name: "聖巴特羅梅修道院（St. Bartholomä）", desc: "又稱紅蔥頭教堂，是國王湖最具代表性的地標，需搭乘遊船前往。遊船途中船長會吹奏喇叭，讓遊客聆聽山壁傳來的著名「回音壁」奇景。" },
          { name: "上湖（Obersee）", desc: "被稱為人間仙境的隱藏版秘境，湖面如玻璃鏡面般完美倒映著群山。上湖僅在夏季（約4月底至10月中）船班營運時開放。" },
          { name: "Röthbachfall 瀑布", desc: "位於上湖健行路線的盡頭，是德國落差最高（超過450公尺）的天然瀑布，景色壯麗。" },
          { name: "畫家之角（Malerwinkel）", desc: "位於國王湖入口附近，是一條相對簡短的步道，此處是俯瞰國王湖面與周圍山勢的絕佳觀景台。" },
          { name: "冰教堂（Eiskapelle）", desc: "從聖巴特羅梅修道院出發的健行秘境，終點為終年不融冰的小山洞。" },
        ]
      },
      {
        icon: "🏔️",
        title: "貝希特斯加登周邊 (Berchtesgaden)",
        items: [
          { name: "貝希特斯加登鹽礦（Salzbergwerk）", desc: "擁有500年歷史的古老鹽礦，遊客可換上傳統礦工服，搭乘小火車深入地底，體驗刺激的木滑梯，並搭乘木筏穿越夢幻的地下鹽湖。" },
          { name: "鷹巢（Kehlsteinhaus）", desc: "建於海拔1,834公尺山頂的希特勒昔日別墅，擁有居高臨下的極佳視野，可將阿爾卑斯山脈與國王湖的美景盡收眼底。僅於夏季（約5月至10月）開放。" },
          { name: "耶拿峰纜車（Jennerbahn）", desc: "纜車站距離國王湖碼頭步行僅約10分鐘，搭乘纜車登頂可以360度俯瞰國王湖全景及德國第二高峰瓦茨曼山。" },
        ]
      },
      {
        icon: "🌲",
        title: "藍紹與辛特湖地區 (Ramsau & Hintersee)",
        items: [
          { name: "藍紹教堂（Ramsau Church）", desc: "擁有可愛的洋蔥頭尖塔，搭配前方的流水與木橋，是明信片等級的經典童話風景。" },
          { name: "魔法森林（Zauberwald）", desc: "從藍紹教堂出發的熱門散步路線，林間小徑伴隨著潺潺溪流，充滿童話氛圍。" },
          { name: "辛特湖（Hintersee）", desc: "魔法森林步道的終點，湖水呈現深藍與綠色交織的奇幻色彩，環境清幽寧靜。" },
        ]
      },
      {
        icon: "🎁",
        title: "必買紀念品與必吃美食",
        items: [
          { name: "鹽礦相關伴手禮", desc: "在貝希特斯加登鹽礦的禮品店，可以買到各式特色鹽製品，例如鹽燈、香料鹽，以及特殊的鹽製酒。" },
          { name: "當地限定琴酒（Gin）", desc: "同樣可以在鹽礦的禮品店中找到，非常適合收藏或送禮。" },
          { name: "木頭杯墊與木雕", desc: "在國王湖碼頭區，可以找到紀念木雕，或是透過自動販賣機購買便宜可愛的木頭杯墊。" },
          { name: "鮮嫩鱒魚料理", desc: "國王湖以水質清澈純淨聞名，盛產鱒魚。一定要品嚐新鮮的烤鱒魚或煙燻鱒魚（還有較平價的鱒魚麵包可選擇）。" },
          { name: "牛奶小屋的鮮乳（Fischunkelalm）", desc: "健行至上湖區對岸時必訪的補給站，販售新鮮的牛奶、起司與火腿小食，搭配湖畔美景野餐是一大享受。" },
          { name: "巴伐利亞烤豬腳（Schweinshaxe）", desc: "德國南部的經典美食，外皮烤得金黃酥脆，肉質紮實多汁，在國王湖周邊的傳統德式餐廳即可享用。" },
        ]
      }
    ]
  },
  3: {
    city: "威斯教堂－新天鵝堡－福森",
    cityEN: "Wieskirche · Neuschwanstein · Füssen",
    heroEmoji: "🏰",
    intro: "從巴伐利亞草原上的洛可可奇蹟，到迪士尼夢幻城堡原型，再到浪漫之路終點站。",
    sections: [
      {
        icon: "⛪",
        title: "威斯教堂 (Wieskirche)",
        items: [
          { name: "威斯朝聖教堂", desc: "被譽為「巴伐利亞草原奇蹟」，是18世紀德國宗教與洛可可式建築的巔峰代表作。教堂內部裝飾極度華麗，天花板的濕壁畫登峰造極。" },
          { name: "落淚救世主神蹟", desc: "教堂中心供奉著「受鞭打的救世主」雕像，相傳在1738年有農婦看見雕像落淚，從此引發朝聖熱潮。該教堂也於1983年被聯合國教科文組織列為世界文化遺產。" },
        ]
      },
      {
        icon: "🏰",
        title: "新天鵝堡與霍恩施萬高",
        items: [
          { name: "新天鵝堡（Schloss Neuschwanstein）", desc: "由「夢幻國王」路德維希二世所建，這座優雅的白色城堡是迪士尼睡美人城堡的原型。城堡內部裝飾極其奢華，包含拜占庭風格的王座廳與歌手廳，但內部嚴禁拍照。" },
          { name: "瑪麗亞橋（Marienbrücke）", desc: "橫跨波拉赫峽谷，是欣賞與拍攝新天鵝堡全景的最佳地點。清晨或黃昏時分光線最佳，但冬季下雪時可能會為了安全而關閉。" },
          { name: "高天鵝堡（Schloss Hohenschwangau）", desc: "又稱舊天鵝堡，擁有鮮豔的黃色外牆。這裡是路德維希二世度過童年時光的地方，內部裝飾華麗，與新天鵝堡的風格截然不同。" },
          { name: "阿爾卑斯湖（Alpsee）", desc: "位於雙堡山腳下，湖水清澈見底，可以欣賞到壯麗的山谷與森林，夏季時能見到許多小鴨甚至可以坐船，在此漫步還有機會拍到美麗的城堡倒影。" },
        ]
      },
      {
        icon: "🏘️",
        title: "福森小鎮 (Füssen)",
        items: [
          { name: "福森老城區", desc: "被譽為德國「浪漫之路」的終點站，坐落在阿爾卑斯山腳下。小鎮擁有迷人的中世紀老城區、蜿蜒的石板小巷與彩色房屋，同時也是以「小提琴製作」聞名的歷史重鎮。" },
        ]
      },
      {
        icon: "🎁",
        title: "推薦紀念品與特色美食",
        items: [
          { name: "新天鵝堡紀念咖啡杯", desc: "在從城堡步行下山的路上，有咖啡店提供購買拿鐵即贈送專屬「新天鵝堡咖啡杯」的活動，極具紀念價值。" },
          { name: "微縮陶瓷德國小房子", desc: "在新天鵝堡山腳下的紀念品專賣店，可以買到做工極為細緻的德國傳統半木結構小房子模型，非常適合帶回家收藏。" },
          { name: "德國脆皮烤豬腳（Schweinshaxe）", desc: "在福森小鎮大街上極受歡迎的傳統餐廳「Gasthof Krone」，可以品嚐到外皮金黃酥脆、肉質鮮嫩多汁的超大份量豬腳，該餐廳還貼心提供中文菜單。" },
          { name: "QQ馬鈴薯球", desc: "口感類似芋圓、帶有Ｑ彈嚼勁的整顆馬鈴薯球，經常作為德式肉類主餐的配菜。" },
          { name: "蘋果卷與德國香腸", desc: "蘋果切塊加入香料與糖，包在薄麵皮中烤至外皮酥脆，搭配冰淇淋享用是當地特色甜點；各式德國香腸搭配在地啤酒也是不容錯過的傳統滋味。" },
        ]
      }
    ]
  },
  4: {
    city: "福森－瓦度士－琉森",
    cityEN: "Füssen · Vaduz · Lucerne",
    heroEmoji: "⛵",
    intro: "從浪漫之路終點站出發，途經世界第六小國列支敦斯登，抵達瑞士蜜月之境琉森。",
    sections: [
      {
        icon: "🇩🇪",
        title: "福森 (Füssen)",
        items: [
          { name: "福森老城區", desc: "位於德國浪漫大道的終點，這座城鎮擁有迷人的中世紀老城區，並以「小提琴製作」聞名，融合了阿爾卑斯山風光與巴伐利亞傳統文化。" },
          { name: "福森城堡（Hohes Schloss Füssen）", desc: "緊鄰老城區，旁邊有美麗的樹林與萊希河瀑布景觀，非常適合散步。" },
          { name: "Gasthof Krone 餐廳", desc: "位於福森大街巷弄內的人氣傳統餐廳，必點平價且份量巨大的「德國烤豬腳」以及口感Ｑ彈特別的「馬鈴薯球」，店內更貼心提供中文菜單。" },
        ]
      },
      {
        icon: "🇱🇮",
        title: "瓦度士 (Vaduz, 列支敦斯登)",
        items: [
          { name: "Städtle 步行街", desc: "列支敦斯登是世界第六小的雙重內陸國，首都瓦度士的主要景點都集中在這條街上，沿途有許多裝置藝術（如非洲國王雕塑、大手雕塑等）。" },
          { name: "瓦度士城堡（Schloss Vaduz）", desc: "建於12世紀，目前為親王與王室的官方居所。城堡內部不對外開放，但可以從市區抬頭仰望，或沿著森林步道步行上山，近距離拍攝城堡外觀並俯瞰萊茵河與市區壯麗全景。" },
          { name: "郵政博物館（Postmuseum Vaduz）", desc: "免費入場。列支敦斯登以郵票產業聞名，館內展示了1912年發行的第一套郵票及世界各地的珍貴郵票與首日封。" },
          { name: "老萊茵橋（Alte Rheinbrücke）", desc: "建於1901年的傳統木造橋樑，只允許行人和自行車通行。橋的中央設有兩國邊界標誌，能讓您「一腳踩在列支敦斯登，一腳踩在瑞士」。" },
        ]
      },
      {
        icon: "🇨🇭",
        title: "琉森 (Lucerne)",
        items: [
          { name: "卡貝爾木橋與水塔（Kapellbrücke）", desc: "建於1333年，是歐洲現存最古老的木造廊橋。橋內懸掛著描繪琉森歷史的精美三角畫作，搭配旁邊的水塔，是琉森最具代表性的地標，夜間點燈後倒映在羅伊斯河上極具浪漫風情。" },
          { name: "獅子紀念碑（Löwendenkmal）", desc: "紀念法國大革命中犧牲的瑞士衛兵，雕刻細膩生動，被馬克吐溫譽為「世界上最哀傷、最動人心弦的石雕」。" },
        ]
      },
      {
        icon: "⛴️",
        title: "琉森湖遊船",
        items: [
          { name: "琉森湖（Vierwaldstättersee）", desc: "瑞士境內第五大湖，湖泊形狀獨特，夾在阿爾卑斯山群峰之間。清澈的冰河湖水倒映著皮拉圖斯山、瑞吉山等壯麗的雪峰，宛如一幅會呼吸的明信片。" },
          { name: "沿岸童話小鎮與風光", desc: "遊船路線會途經多個優美的湖畔城鎮（如 Weggis、Brunnen），沿途可欣賞山林、古典建築、以及隱身湖畔的私人城堡，感受絕佳的視野與寧靜氛圍。" },
        ]
      },
      {
        icon: "🎁",
        title: "必買紀念品",
        items: [
          { name: "列支敦斯登入境海關章", desc: "前往列支敦斯登遊客中心，支付3歐元或3瑞士法郎，即可在護照上蓋上一枚帶有皇冠圖案的專屬海關戳章，是到此一遊的最佳實體證明。" },
          { name: "郵票與明信片", desc: "身為「郵票小王國」，這裡發行的郵票極具藝術價值，購買獨特郵票並寄張明信片回家是非常經典的紀念方式。" },
          { name: "Bachmann 點心坊巧克力", desc: "創立於1897年的琉森百年在地限定老店，必買以琉森地標「水塔」和「卡貝爾橋」造型製作的特色巧克力，馬卡龍與手工冰淇淋也是明星商品。" },
          { name: "琉森限定版瑞士刀", desc: "可以找到印有「卡貝爾木橋」或「悲傷的獅子」圖案的限定版 Victorinox 瑞士刀，極具紀念價值。" },
          { name: "Coop 超市平價伴手禮", desc: "琉森車站內有營業至晚上的 Coop 超市，推薦購買 Kambly 馬特洪峰造型餅乾、Cailler 氣泡巧克力、Halba 開心果巧克力，以及 Zweifel 洋芋片等。" },
          { name: "星巴克城市杯", desc: "卡貝爾木橋旁及車站附近皆有星巴克，販售的價格相對機場更便宜，可收集專屬的 Lucerne 城市杯。" },
        ]
      }
    ]
  },
  5: {
    city: "琉森－安德馬特－冰河列車－策馬特",
    cityEN: "Lucerne · Andermatt · Glacier Express · Zermatt",
    heroEmoji: "🚂",
    intro: "從琉森出發，途經安德馬特搭乘全球最慢的特快車「冰河列車」，抵達無煙山城策馬特。",
    sections: [
      {
        icon: "🇨🇭",
        title: "琉森 (Lucerne)",
        items: [
          { name: "卡貝爾木橋與八角水塔（Kapellbrücke）", desc: "建於1333年，是歐洲現存最古老的木質廊橋。橋內懸掛著描繪琉森歷史的精美三角畫作，夜間點燈後倒映在羅伊斯河上極具浪漫風情。" },
          { name: "獅子紀念碑（Lion Monument）", desc: "為了紀念法國大革命中犧牲的瑞士衛兵所雕刻，被馬克吐溫譽為「世界上最悲傷、最動人心弦的石頭」。" },
          { name: "穆塞格城牆（Museggmauer）", desc: "保留了中世紀風格的歷史地標，可登高俯瞰琉森城市美景。" },
        ]
      },
      {
        icon: "⛰️",
        title: "安德馬特 (Andermatt)",
        items: [
          { name: "安德馬特小鎮", desc: "位於瑞士中部聖哥達山隘區的山中小鎮，處於東西向與南北向山脈的匯合處，不僅是冰河列車轉乘點，更是冬季知名的滑雪勝地。大文豪歌德曾三度造訪並讚譽此地。" },
          { name: "舍倫峽谷（Schöllenen Gorge）", desc: "著名的峽谷景觀與橫跨羅伊斯河的「惡魔橋」，充滿歷史與神話色彩。" },
        ]
      },
      {
        icon: "🚂",
        title: "冰河列車 (Glacier Express)",
        items: [
          { name: "全球最慢的特快車", desc: "以時速不到40公里的速度行駛，車廂擁有全景透明天窗設計。從聖莫里茲至策馬特全程約需8小時，途經291座橋樑與91條隧道。" },
          { name: "絕美路段", desc: "列車會通過海拔2033公尺的最高點「奧伯阿爾卑山口」，並穿越有「瑞士大峽谷」之稱的萊茵河峽谷及知名的蘭德瓦瑟高架橋。" },
        ]
      },
      {
        icon: "🏔️",
        title: "策馬特 (Zermatt)",
        items: [
          { name: "馬特洪峰黃金日出", desc: "清晨陽光將山峰染成金黃色的「黃金日出」是必看奇景，最佳拍攝點推薦 Getwingbrücke 橋或熱門的教堂橋。" },
          { name: "高納葛拉特觀景台（Gornergrat）", desc: "搭乘歐洲最高的露天齒軌火車約30～35分鐘即可登頂，能360度無死角欣賞馬特洪峰與戈爾納冰川。" },
          { name: "策馬特蘑菇屋", desc: "位於 Hinterdorf 舊城區，擁有400多年歷史的古老木造建築。底層用石板與圓盤架高，用以防止老鼠入侵儲糧。" },
        ]
      },
      {
        icon: "🎁",
        title: "推薦紀念品與美食",
        items: [
          { name: "Bachmann 百年點心坊", desc: "位於天鵝廣場等地，必買以琉森地標「六角水塔」和「卡貝爾橋」造型製作的特色巧克力，馬卡龍與手工冰淇淋也是明星商品。" },
          { name: "免費帽子", desc: "若有下載使用「Grand Train Tour Switzerland」官方 APP，可以在皮拉圖斯山憑券免費兌換一頂棒球帽。" },
          { name: "傾斜玻璃杯（Slanted Glass）", desc: "冰河列車為配合列車行駛於陡峭山坡不讓酒水灑出而設計的傾斜造型玻璃杯。在車站購買通常為22 CHF，比列車上的25 CHF更便宜。" },
          { name: "福克斯烘焙坊（Bäckerei Fuchs）", desc: "策馬特人氣名店，必買獨家的「馬特洪峰造型巧克力」，手工蘋果派與核桃派也極具盛名。" },
          { name: "三大名峰馬克杯", desc: "在高納葛拉特觀景台的商店，可以購買到標示著高度與馬特洪峰圖案的「深藍色馬克杯」作為紀念。" },
          { name: "免費馬特洪峰環保杯", desc: "若有下載「Grand Train Tour Switzerland」官方 APP，可憑券在策馬特免費兌換一個印有馬特洪峰圖案的環保杯。" },
        ]
      }
    ]
  },
  7: {
    city: "策馬特－西墉古堡－蒙投－黃金景觀列車",
    cityEN: "Zermatt · Chillon · Montreux · GoldenPass",
    heroEmoji: "🏰",
    intro: "從馬特洪峰山腳出發，沿日內瓦湖畔探訪水上古堡，再搭乘黃金景觀列車前往少女峰地區。",
    sections: [
      {
        icon: "🏔️",
        title: "策馬特 (Zermatt)",
        items: [
          { name: "馬特洪峰黃金日出", desc: "來到策馬特必看的奇景，當清晨陽光灑落，馬特洪峰會由深紫變化成粉紅，最後呈現迷人的金黃色。最佳拍攝地點包含教堂橋、Getwingbrücke 橋，或策馬特馬特洪峰觀景台。" },
          { name: "高納葛拉特觀景台（Gornergrat）", desc: "搭乘瑞士第一條電氣化齒軌列車，約30分鐘即可抵達海拔3089公尺的觀景台，能360度欣賞馬特洪峰與戈爾納冰川。" },
          { name: "五湖健行（5-Seenweg）", desc: "全長約11公里，沿途可收集五座風貌各異的湖泊，其中 Stellisee 是拍攝馬特洪峰倒影的最佳地點。" },
          { name: "策馬特蘑菇屋", desc: "擁有400多年歷史的古老木造建築群，底層用石板與圓盤架高，是前人為了防止老鼠入侵儲糧的智慧設計。" },
          { name: "馬特洪峰博物館", desc: "位於地下室的展覽廳，展示了19世紀的策馬特生活情景以及早期的登山工具。" },
        ]
      },
      {
        icon: "🏰",
        title: "西墉古堡 (Château de Chillon)",
        items: [
          { name: "水上童話古堡", desc: "建於日內瓦湖畔的巨大岩石上，過去是薩伏依家族用來收取過路費的軍事要塞。從車站通往城堡的湖畔步道，是拍出「明信片視角」全景的最佳取景地。" },
          { name: "博尼瓦爾監獄與拜倫簽名", desc: "因英國詩人拜倫的《西庸的囚徒》而聲名大噪的地牢，在第三根石柱上還留有傳說中拜倫親手刻下的「BYRON」簽名。" },
          { name: "公爵臥室與無底洞公廁", desc: "可參觀中世紀大公「坐著睡」的超短木床，以及直通13米深湖面的奇葩「社交公廁」。" },
          { name: "巡邏道與防禦塔樓", desc: "登上木造巡邏道可以看見過去士兵站崗的視角，並在塔樓內近距離觀看重裝火砲。" },
        ]
      },
      {
        icon: "🎵",
        title: "蒙投 (Montreux)",
        items: [
          { name: "日內瓦湖畔散策", desc: "蒙投座落在日內瓦湖東岸的法語區城市，擁有宜人的氣候，自古就是度假天堂，喜劇大師卓別林也選擇在此度過晚年。" },
          { name: "The Fork（大叉子）", desc: "位於湖畔的巨大裝置藝術，是世界上相當有特色的金氏世界紀錄地標。" },
        ]
      },
      {
        icon: "🚂",
        title: "黃金景觀列車 (GoldenPass Line)",
        items: [
          { name: "絕美景觀視角", desc: "為瑞士三大景觀列車之一，列車設有特殊設計的全景觀大車窗。" },
          { name: "穿梭阿爾卑斯風光", desc: "從蒙投出發前往少女峰地區，沿路穿梭於湖泊、高山隘口、綠意盎然的草地及美麗的小鎮，猶如流動的天然大銀幕。" },
          { name: "VIP 座位區", desc: "第一節車廂內設有VIP座位，部分班次一等艙可享受極佳的車頭視野。" },
        ]
      },
      {
        icon: "❄️",
        title: "少女峰地區 & 茵特拉根",
        items: [
          { name: "少女峰車站（Jungfraujoch）", desc: "海拔3454公尺，是全歐洲最高的火車站。可搭乘電梯至史芬克斯觀景台，遠眺三大名峰與阿萊奇冰川（世界自然遺產）。" },
          { name: "冰宮與冰河高原", desc: "深入冰河底下欣賞精美的冰雕作品，也可以走到戶外高原平台親臨白雪世界。" },
          { name: "艾格快線纜車（Eiger Express）", desc: "2020年啟用的超現代纜車，從格林德瓦出發僅需15分鐘即可抵達艾格冰海站，能從空中俯瞰壯麗山谷。" },
          { name: "茵特拉根（Interlaken）", desc: "位於圖恩湖與布里恩茲湖之間的熱鬧城鎮，是前往少女峰必經的門戶。" },
        ]
      },
      {
        icon: "🎁",
        title: "推薦紀念品與美食",
        items: [
          { name: "福克斯烘焙坊（Bäckerei Fuchs）", desc: "策馬特人氣名店，必買獨家的「馬特洪峰造型巧克力」，蘋果派與核桃派也極具盛名。" },
          { name: "黑面羊料理", desc: "策馬特特有的「瓦萊州黑面綿羊」，鎮上餐廳如 Restaurant Schäferstube 提供美味的傳統黑面羊排料理。" },
          { name: "古堡限定版葡萄酒", desc: "西庸堡擁有專屬的葡萄園，在城堡的地下酒窖與紀念品店可以買到外面超市絕對買不到的獨家葡萄酒。" },
          { name: "世界最高的瑞士蓮巧克力店（Lindt）", desc: "位於少女峰頂，販售多種巧克力與山頂限定商品，還能透過互動設施觀看巧克力製作過程。" },
          { name: "歐洲最高郵局", desc: "可在少女峰頂的郵局，買張明信片寄給自己或親友作為登頂紀念。" },
          { name: "少女峰護照", desc: "購買少女峰車票時可向櫃檯索取一本紅色的「少女峰護照」，可以在山頂上蓋章留念。" },
          { name: "少女峰限定款瑞士刀", desc: "全金屬製、極具質感的限定款 Victorinox 瑞士刀，背後可免費刻字。" },
          { name: "Rolex 小湯匙", desc: "若有在茵特拉根住宿，可憑旅館提供的當地交通卡，前往市中心的 Rolex Bucherer 免費兌換一支精美紀念小湯匙。" },
        ]
      }
    ]
  }
};

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
