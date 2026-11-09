// 技能資料：每個技能包含一句話說明、核心觀念、我的使用經驗、面試常見問題與範例程式碼。
// 新增技能時，照同樣的格式加一個物件即可。
window.CATEGORIES = [
  { id: "lang", name: "程式語言" },
  { id: "web", name: "後端與網頁" },
  { id: "data", name: "資料庫與搜尋" },
  { id: "devops", name: "DevOps 與工具" },
  { id: "quality", name: "自動化與除錯" },
  { id: "ml", name: "AI 與資訊安全" },
  { id: "design", name: "系統設計基礎" },
  { id: "other", name: "其他" },
];

window.SKILLS = [
  // ───────────── 程式語言 ─────────────
  {
    id: "python", name: "Python", cat: "lang", core: true,
    summary: "語法簡潔的直譯式語言，廣泛用於自動化腳本、後端開發、資料分析與機器學習。",
    points: [
      "動態型別、直譯執行；用縮排表示程式區塊。",
      "常用資料結構：list（可變）、tuple（不可變）、dict（雜湊表）、set（不重複集合）。",
      "生態系豐富：pip 安裝套件，用 venv 建立獨立的虛擬環境。",
      "GIL（全域直譯器鎖）讓同一時間只有一個執行緒執行 Python bytecode：I/O 密集用 threading / asyncio，CPU 密集用 multiprocessing。",
      "常用語法：list comprehension、generator（yield）、decorator、context manager（with）。",
    ],
    used: "Wipro：撰寫與維護智慧家庭裝置的自動化程式。碩士論文：用 Python + PyTorch 實作 Transformer + XGBoost 模型，以及 SUMO 模擬串接（TraCI）。",
    qa: [
      { q: "list 和 tuple 差在哪？", a: "list 可變（可新增、刪除元素），tuple 不可變。tuple 可以當 dict 的 key，也比較省記憶體，適合表示固定不變的資料。" },
      { q: "什麼是 decorator？", a: "接收一個函式並回傳新函式的函式，用 @ 語法套用。常用來加上 log、計時、權限檢查等共同邏輯，不必修改原本的函式。" },
      { q: "generator 有什麼好處？", a: "用 yield 一次產生一個值（惰性求值），不必一次把所有資料載入記憶體，適合處理大檔案或資料串流。" },
      { q: "什麼是 GIL？對多執行緒有什麼影響？", a: "CPython 的全域直譯器鎖，同一時間只允許一個執行緒執行 Python bytecode。所以多執行緒對 CPU 密集工作幫助不大，要改用 multiprocessing；I/O 密集工作仍可用 threading 或 asyncio。" },
    ],
    code: `# list comprehension + generator
squares = [x * x for x in range(10) if x % 2 == 0]

def read_lines(path):
    with open(path) as f:          # context manager 自動關檔
        for line in f:
            yield line.strip()     # generator：一次一行

# decorator
import time
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(func.__name__, "took", time.time() - start, "s")
        return result
    return wrapper`,
  },
  {
    id: "php", name: "PHP", cat: "lang", core: true,
    summary: "專為網頁後端設計的伺服器端語言，搭配 Laravel 等框架可以快速開發 Web 系統。",
    points: [
      "每個 HTTP 請求執行一次腳本，處理完就釋放資源（share-nothing 架構）。",
      "PHP 7 以後效能大幅提升，PHP 8 加入 JIT、named arguments、match 運算式、nullsafe 運算子（?->）。",
      "Composer 是套件管理工具，搭配 PSR-4 自動載入類別。",
      "支援物件導向：class、interface、trait、namespace。",
    ],
    used: "和碩：用 Laravel (PHP) 開發盤點及耗材管理系統的後端與內部 API。",
    qa: [
      { q: "== 和 === 差在哪？", a: "== 比較前會先做型別轉換（例如 '1' == 1 為 true）；=== 要值和型別都相同才為 true。實務上建議用 ===，避免意外的轉換。" },
      { q: "什麼是 trait？", a: "可以被多個 class 重複使用的方法集合，用來解決 PHP 單一繼承的限制，用 use 關鍵字引入。" },
      { q: "Composer 的 autoload 做什麼？", a: "依照 PSR-4 規範把 namespace 對應到資料夾，使用類別時自動 require 對應的檔案，不用手動 include。" },
    ],
    code: `<?php
// PHP 8 語法範例
$status = match ($code) {
    200 => 'OK',
    404 => 'Not Found',
    default => 'Error',
};

$city = $user?->profile?->city;   // nullsafe：任何一層是 null 就回傳 null`,
  },
  {
    id: "javascript", name: "JavaScript", cat: "lang", core: true,
    summary: "瀏覽器唯一原生支援的程式語言，負責網頁互動；也能透過 Node.js 在伺服器端執行。",
    points: [
      "單執行緒 + Event Loop：非同步工作（計時器、網路請求）完成後，callback 會被排進佇列等待執行。",
      "非同步寫法演進：callback → Promise → async/await。",
      "變數宣告：let / const 是區塊作用域，var 是函式作用域且會 hoisting，建議不要再用 var。",
      "this 的值取決於函式怎麼被呼叫；箭頭函式沒有自己的 this。",
      "閉包（closure）：函式可以記住並存取它被建立時所在作用域的變數。",
    ],
    used: "和碩：用 Vue 3、jQuery、AJAX 開發系統前端，與後端 API 串接。",
    qa: [
      { q: "什麼是 Event Loop？", a: "JS 是單執行緒，同步程式先在 call stack 執行；非同步工作完成後，callback 會放進佇列。call stack 清空時，Event Loop 會先執行所有 microtask（例如 Promise），再取一個 macrotask（例如 setTimeout）來執行。" },
      { q: "== 和 === 的差別？", a: "== 會先做型別轉換再比較，=== 不轉換，要型別和值都相同才為 true，建議一律用 ===。" },
      { q: "什麼是閉包？有什麼用途？", a: "內部函式可以存取外部函式的變數，即使外部函式已經執行完畢。常用來封裝私有變數、建立工廠函式或做函式柯里化（currying）。" },
    ],
    code: `// async/await 呼叫 API
async function loadItems() {
  try {
    const res = await fetch('/api/items?page=1');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

// 閉包
function counter() {
  let n = 0;
  return () => ++n;
}
const next = counter();
next(); // 1
next(); // 2`,
  },
  {
    id: "c-cpp", name: "C / C++", cat: "lang",
    summary: "編譯式系統程式語言。C 貼近硬體，C++ 在 C 的基礎上加入物件導向與泛型程式設計。",
    points: [
      "指標（pointer）存放記憶體位址；陣列名稱在多數情況下會轉成指向第一個元素的指標。",
      "記憶體管理：stack 由系統自動配置與釋放；heap 要自己 malloc/free（C）或 new/delete（C++）。",
      "C++ 的 RAII 與 smart pointer（unique_ptr、shared_ptr）可以自動釋放資源，避免記憶體洩漏。",
      "STL：vector、map、unordered_map、set、queue 等容器，以及 sort 等演算法。",
      "OOP 三大特性：封裝、繼承、多型（virtual function）。",
    ],
    used: "大學課程：資料結構、演算法、作業系統實作（GitHub 上的 DP、OS 等 repo）。",
    qa: [
      { q: "stack 和 heap 的差異？", a: "stack 存放區域變數與函式呼叫，由系統自動配置與釋放，速度快但空間小；heap 用來動態配置記憶體，空間大，但要手動釋放（或靠 smart pointer），否則會造成記憶體洩漏。" },
      { q: "指標和參考（reference）的差別？", a: "指標可以是 null、可以改指向別的位址，需要用 * 取值；reference 是變數的別名，必須在宣告時初始化，之後不能再改綁別的變數。" },
      { q: "virtual function 的用途？", a: "實現執行期多型：用基底類別的指標或參考呼叫時，會依物件的實際型別呼叫子類別覆寫的版本（透過 vtable 實作）。" },
    ],
    code: `#include <memory>
#include <vector>
#include <algorithm>

std::vector<int> v = {5, 2, 8, 1};
std::sort(v.begin(), v.end());              // STL 排序

auto p = std::make_unique<int>(42);         // 離開作用域自動釋放`,
  },
  {
    id: "csharp", name: "C#", cat: "lang",
    summary: "微軟開發的物件導向語言，常用於 Windows 桌面程式、.NET 後端，以及 Unity 遊戲開發。",
    points: [
      "強型別，執行在 .NET 執行環境上，記憶體由垃圾回收（GC）自動管理。",
      "常用語法：property、LINQ、async/await、泛型。",
      "Unity 的遊戲腳本以 C# 撰寫，繼承 MonoBehaviour，透過 Start()、Update() 等生命週期函式運作。",
    ],
    used: "大學專題：用 Unity (C#) 開發 AR 遊戲。和碩：把原本的 C# Windows 桌面程式改寫成網頁版。",
    qa: [
      { q: "值型別和參考型別的差別？", a: "值型別（int、struct）存放值本身，指定給另一個變數時會複製；參考型別（class、string）存放物件的參考，多個變數可以指向同一個物件。" },
      { q: "Unity 的 Update() 和 FixedUpdate() 差在哪？", a: "Update() 每一幀呼叫一次，頻率隨 FPS 變動，適合處理輸入；FixedUpdate() 以固定的時間間隔呼叫，適合處理物理運算。" },
    ],
  },
  {
    id: "sql", name: "SQL", cat: "lang", core: true,
    summary: "操作關聯式資料庫的標準查詢語言，用來新增、查詢、更新和刪除資料。",
    points: [
      "CRUD：INSERT、SELECT、UPDATE、DELETE。",
      "JOIN：INNER（兩邊都有）、LEFT（保留左表全部資料）、RIGHT、FULL OUTER。",
      "聚合：GROUP BY 搭配 COUNT、SUM、AVG；分組後的條件用 HAVING 過濾。",
      "WHERE 在分組前過濾資料列，HAVING 在分組後過濾群組。",
      "交易（Transaction）的 ACID：原子性、一致性、隔離性、持久性。",
    ],
    used: "和碩：盤點及耗材系統的資料存放在 MSSQL，用 SQL 和 Laravel 的 Eloquent ORM 存取。",
    qa: [
      { q: "INNER JOIN 和 LEFT JOIN 的差別？", a: "INNER JOIN 只回傳兩張表都對得上的資料；LEFT JOIN 會保留左表的所有資料，右表對不到的欄位補 NULL。" },
      { q: "WHERE 和 HAVING 的差別？", a: "WHERE 在 GROUP BY 之前過濾個別資料列，不能使用聚合函式；HAVING 在分組之後過濾群組，可以使用聚合函式。" },
      { q: "什麼是 SQL Injection？怎麼防範？", a: "攻擊者在輸入中夾帶 SQL 語法，改變原本的查詢。防範方式：使用參數化查詢或 prepared statement（Laravel 的 Eloquent 和 Query Builder 預設就會這麼做），不要直接拼接使用者輸入的字串。" },
    ],
    code: `-- 每個類別的耗材數量，只列出超過 10 筆的類別
SELECT c.name, COUNT(*) AS total
FROM materials m
INNER JOIN categories c ON c.id = m.category_id
WHERE m.deleted_at IS NULL
GROUP BY c.name
HAVING COUNT(*) > 10
ORDER BY total DESC;`,
  },
  {
    id: "html-css", name: "HTML / CSS", cat: "lang",
    summary: "HTML 定義網頁的結構與內容，CSS 負責樣式與版面配置。",
    points: [
      "語意化標籤：header、nav、main、section、article、footer，有助於 SEO 和無障礙。",
      "盒模型：content → padding → border → margin；box-sizing: border-box 讓寬度包含 padding 和 border。",
      "版面配置：Flexbox（一維）、Grid（二維）。",
      "選擇器權重：inline > id > class / 屬性 / 偽類 > 元素。",
      "RWD：用 media query 和相對單位（%、rem、vw）讓版面適應不同螢幕。",
    ],
    used: "和碩：系統前端頁面。這份履歷和這個複習網站也是用 HTML / CSS 寫的。",
    qa: [
      { q: "Flexbox 和 Grid 什麼時候用？", a: "Flexbox 適合一維排列（單一行或單一列），例如導覽列、按鈕群組；Grid 適合二維版面（同時控制行和列），例如整頁版型、卡片牆。" },
      { q: "position 的值有哪些？", a: "static（預設）、relative（相對自己原本的位置）、absolute（相對最近一個有定位的祖先元素）、fixed（相對視窗）、sticky（捲動到指定位置時固定）。" },
    ],
  },
  {
    id: "yaml", name: "YAML", cat: "lang",
    summary: "以縮排表示結構、方便人閱讀的資料格式，常用於設定檔、CI 流程和測試腳本。",
    points: [
      "用縮排表示層級（只能用空白，不能用 Tab）。",
      "基本結構：key: value（對應）、- item（清單）。",
      "常見用途：Docker Compose、GitHub Actions、Kubernetes 設定，以及以 YAML 描述的測試步驟。",
      "是 JSON 的超集合，多了註解（#）、錨點與參照（& / *）等功能。",
    ],
    used: "Wipro：撰寫與修正以 YAML 描述的自動化測試步驟。",
    qa: [
      { q: "YAML 和 JSON 的差別？", a: "YAML 用縮排表示結構、可以寫註解，比較適合人閱讀和撰寫；JSON 語法嚴格、解析快，比較適合程式之間交換資料。YAML 是 JSON 的超集合。" },
    ],
    code: `# docker-compose.yml 範例
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  redis:
    image: redis:7`,
  },

  // ───────────── 後端與網頁 ─────────────
  {
    id: "laravel", name: "Laravel", cat: "web", core: true,
    summary: "最受歡迎的 PHP Web 框架，採用 MVC 架構，內建路由、ORM、驗證、佇列等常用功能。",
    points: [
      "MVC：Model（資料與商業邏輯）、View（Blade 樣板）、Controller（處理請求）。",
      "Eloquent ORM：用物件操作資料表，支援 hasMany、belongsTo 等關聯。",
      "Migration：用程式碼管理資料表結構，方便版本控制和在不同環境重建。",
      "Middleware：在請求進入 Controller 前後執行，例如驗證登入、檢查權限。",
      "Artisan CLI：產生程式碼、執行 migration 等指令。",
      "Service Container：負責依賴注入（Dependency Injection）。",
    ],
    used: "和碩：用 Laravel 開發盤點及耗材管理系統，包括內部 RESTful API、多國語系、角色權限控管和 Excel 匯出。",
    qa: [
      { q: "什麼是 N+1 問題？Laravel 怎麼解決？", a: "先查出 N 筆資料，再對每一筆各查一次關聯資料，總共變成 N+1 次查詢。用 Eager Loading 解決：例如 Material::with('category')->get()，一次把關聯資料一起查出來。" },
      { q: "Middleware 的用途？", a: "在請求進入 Controller 之前或回應送出之後執行的過濾層，例如驗證登入（auth）、檢查權限、記錄 log、處理 CORS。" },
      { q: "Migration 有什麼好處？", a: "資料表結構的變更寫成程式碼，可以進版本控制、在任何環境用指令重建或回滾，團隊成員的資料庫結構也能保持一致。" },
      { q: "Laravel 怎麼防範 CSRF？", a: "表單會帶上一個 CSRF token（Blade 裡寫 @csrf），由 VerifyCsrfToken middleware 驗證，確認請求確實來自自己的網站。" },
    ],
    code: `// routes/api.php
Route::middleware('auth')->group(function () {
    Route::get('/materials', [MaterialController::class, 'index']);
});

// MaterialController.php
public function index(Request $request)
{
    return Material::with('category')        // 避免 N+1
        ->where('site', $request->site)
        ->paginate(20);                       // 分頁
}`,
  },
  {
    id: "vue", name: "Vue 3", cat: "web", core: true,
    summary: "漸進式前端框架，用元件化和響應式資料建立互動介面。",
    points: [
      "響應式：資料改變時，畫面自動更新（Vue 3 以 Proxy 實作）。",
      "Composition API：ref、reactive、computed、watch，搭配 <script setup> 撰寫。",
      "常用指令：v-if / v-show、v-for（要加 :key）、v-model（雙向綁定）、v-bind（:）、v-on（@）。",
      "元件溝通：父傳子用 props，子傳父用 emit；跨多層元件可以用 provide / inject 或 Pinia。",
      "生命週期：onMounted、onUpdated、onUnmounted 等。",
    ],
    used: "和碩：系統中的表格等前端元件以 Vue 3 開發。",
    qa: [
      { q: "v-if 和 v-show 的差別？", a: "v-if 會真的建立或移除 DOM，切換成本高；v-show 只切換 CSS 的 display，初始渲染成本高。需要頻繁切換用 v-show，很少切換用 v-if。" },
      { q: "computed 和 watch 的差別？", a: "computed 根據其他資料算出新的值，而且會快取，依賴的資料沒變就不會重算；watch 用來在資料改變時執行副作用，例如呼叫 API。" },
      { q: "v-for 為什麼要加 key？", a: "讓 Vue 能辨識每個節點，在清單變動時正確重用和排序 DOM，避免畫面錯亂，也提升效能。" },
    ],
    code: `<script setup>
import { ref, computed, onMounted } from 'vue'

const items = ref([])
const keyword = ref('')
const filtered = computed(() =>
  items.value.filter(i => i.name.includes(keyword.value)))

onMounted(async () => {
  items.value = await (await fetch('/api/materials')).json()
})
</script>

<template>
  <input v-model="keyword" placeholder="搜尋" />
  <tr v-for="item in filtered" :key="item.id">
    <td>{{ item.name }}</td>
  </tr>
</template>`,
  },
  {
    id: "rest", name: "RESTful API", cat: "web", core: true,
    summary: "以資源（URL）為中心、用 HTTP 方法表示操作的 API 設計風格，是前後端溝通最常見的方式。",
    points: [
      "資源用名詞表示：/materials、/materials/12。",
      "HTTP 方法：GET（查詢）、POST（新增）、PUT / PATCH（更新）、DELETE（刪除）。",
      "狀態碼：200 OK、201 Created、204 No Content、400 Bad Request、401 未登入、403 沒有權限、404 Not Found、500 伺服器錯誤。",
      "無狀態（stateless）：每個請求都要帶齊所需資訊，例如 token。",
      "冪等性（idempotent）：GET、PUT、DELETE 重複呼叫的結果相同，POST 則不一定。",
    ],
    used: "和碩：用 Laravel 開發內部 RESTful API，提供 Vue 3 / AJAX 前端查詢、新增和匯出資料。",
    qa: [
      { q: "PUT 和 PATCH 的差別？", a: "PUT 用完整的資料取代整個資源；PATCH 只更新部分欄位。" },
      { q: "401 和 403 的差別？", a: "401 Unauthorized 代表還沒驗證身分（沒登入或 token 無效）；403 Forbidden 代表已經知道你是誰，但你沒有權限做這件事。" },
      { q: "什麼是冪等性？", a: "同一個請求執行一次或多次，結果都一樣。GET、PUT、DELETE 是冪等的；POST 不是，重複送出可能新增多筆資料。" },
      { q: "API 怎麼做版本管理？", a: "常見做法是把版本放在 URL（/api/v1/...）或 header 中，讓新舊版本可以同時存在，舊的客戶端不會因為改版而壞掉。" },
    ],
    code: `GET    /api/materials?page=2   → 200 + 清單
GET    /api/materials/12        → 200 / 404
POST   /api/materials           → 201 Created
PATCH  /api/materials/12        → 200
DELETE /api/materials/12        → 204 No Content`,
  },
  {
    id: "ajax", name: "AJAX / jQuery", cat: "web",
    summary: "AJAX 讓網頁不用重新整理就能和伺服器交換資料；jQuery 是簡化 DOM 操作和 AJAX 的 JavaScript 函式庫。",
    points: [
      "AJAX = Asynchronous JavaScript and XML，現在傳輸的資料大多是 JSON。",
      "實作方式：XMLHttpRequest、jQuery 的 $.ajax、原生 fetch、axios。",
      "jQuery 的優點是寫法精簡、跨瀏覽器相容；新專案多半改用原生 API 或前端框架。",
      "跨網域請求會受同源政策（Same-Origin Policy）限制，需要伺服器設定 CORS。",
    ],
    used: "和碩：用 jQuery 和 AJAX 呼叫後端 API，更新表格與表單。",
    qa: [
      { q: "什麼是 CORS？", a: "跨來源資源共用。瀏覽器基於同源政策，預設會擋下跨網域的請求；伺服器要回傳 Access-Control-Allow-Origin 等 header，瀏覽器才會允許。" },
    ],
    code: `$.ajax({
  url: '/api/materials',
  method: 'GET',
  data: { page: 1 },
  success: function (res) { renderTable(res.data); },
  error: function (xhr) { alert('載入失敗：' + xhr.status); }
});`,
  },
  {
    id: "node", name: "Node.js", cat: "web",
    summary: "讓 JavaScript 在伺服器端執行的執行環境，以非阻塞 I/O 處理大量並發連線。",
    points: [
      "以 Chrome 的 V8 引擎為基礎，單執行緒 + Event Loop + 非阻塞 I/O。",
      "npm / yarn 管理套件，套件資訊記錄在 package.json。",
      "常用框架：Express、NestJS。",
      "適合 I/O 密集的應用（API、即時通訊），不適合 CPU 密集的運算。",
    ],
    used: "前端建置工具：Laravel Mix、yarn、npx 都在 Node.js 上執行。",
    qa: [
      { q: "Node.js 為什麼適合高併發？", a: "I/O 操作是非阻塞的，等待資料庫或網路回應時不會卡住執行緒，可以繼續處理其他請求，所以單執行緒也能同時服務大量連線。" },
    ],
  },
  {
    id: "rbac", name: "RBAC 權限控管", cat: "web",
    summary: "Role-Based Access Control：把權限指派給角色，再把角色指派給使用者，方便集中管理權限。",
    points: [
      "核心關係：使用者 ↔ 角色 ↔ 權限，通常是多對多。",
      "前端依權限隱藏按鈕只是為了使用者體驗，後端一定也要驗證權限，否則可以直接呼叫 API 繞過。",
      "Laravel 可以用 Gate、Policy，或 spatie/laravel-permission 套件實作。",
      "最小權限原則：只給使用者完成工作所需的最少權限。",
    ],
    used: "和碩：實作角色權限控管，沒有權限的使用者在頁面上看不到對應的操作按鈕。",
    qa: [
      { q: "前端隱藏按鈕就夠了嗎？", a: "不夠。前端隱藏只是改善使用者體驗，使用者仍然可以用工具直接呼叫 API，所以後端每個 API 都必須再檢查權限（例如用 middleware 或 Policy）。" },
      { q: "RBAC 和 ABAC 的差別？", a: "RBAC 依「角色」決定權限；ABAC 依「屬性」決定，例如部門、時間、資源擁有者，彈性比較高，但也比較複雜。" },
    ],
  },
  {
    id: "i18n", name: "i18n 多國語系", cat: "web",
    summary: "Internationalization：讓系統可以依使用者的語言顯示不同文字，而不用修改程式碼。",
    points: [
      "把文字抽成語系檔（key → 翻譯），畫面上用 key 取得文字。",
      "Laravel 的語系檔放在 resources/lang，用 __('key') 或 @lang 取得翻譯。",
      "除了文字，也要考慮日期、數字、貨幣格式（l10n，在地化）。",
    ],
    used: "和碩：系統支援繁體中文、簡體中文、英文，並用 lang:js 把語系檔同步給 Vue 前端使用。",
    qa: [
      { q: "i18n 和 l10n 的差別？", a: "i18n（國際化）是讓程式架構支援多語系；l10n（在地化）是針對特定地區提供翻譯、日期與貨幣格式等內容。" },
    ],
  },

  // ───────────── 資料庫與搜尋 ─────────────
  {
    id: "mssql", name: "MSSQL (SQL Server)", cat: "data", core: true,
    summary: "微軟的關聯式資料庫，企業內部系統很常使用。",
    points: [
      "SQL 方言是 T-SQL，例如分頁用 OFFSET ... FETCH 或 TOP，不用 LIMIT。",
      "索引：Clustered Index 決定資料實際的儲存順序，一張表只能有一個；Non-clustered Index 是另外建立的結構，可以有多個。",
      "支援 Stored Procedure、交易與多種隔離等級。",
      "可以用 Docker 執行（mcr.microsoft.com/mssql/server），方便建立開發環境。",
    ],
    used: "和碩：盤點及耗材系統的主要資料庫，在 Docker 環境中執行。",
    qa: [
      { q: "索引為什麼能加速查詢？有什麼缺點？", a: "索引通常是 B+ Tree 結構，查詢時不必掃描整張表。缺點是會佔用額外空間，而且每次新增、修改、刪除資料都要同步更新索引，寫入會變慢。" },
      { q: "Clustered 和 Non-clustered Index 的差別？", a: "Clustered Index 決定資料實際的排列順序，一張表只能有一個（通常是主鍵）；Non-clustered Index 是獨立的結構，存放索引值與指向資料的位置，可以建立多個。" },
    ],
    code: `-- T-SQL 分頁：第 3 頁，每頁 20 筆
SELECT id, name
FROM materials
ORDER BY id
OFFSET 40 ROWS FETCH NEXT 20 ROWS ONLY;`,
  },
  {
    id: "redis", name: "Redis", cat: "data",
    summary: "記憶體內的 key-value 資料庫，讀寫非常快，常用來做快取、Session 儲存和佇列。",
    points: [
      "資料型別：String、Hash、List、Set、Sorted Set。",
      "可以設定 TTL（過期時間），適合做快取。",
      "持久化方式：RDB（定期快照）、AOF（記錄每一筆寫入指令）。",
      "Laravel 可以把 Cache、Session、Queue 的 driver 設成 Redis。",
      "快取常見問題：快取穿透、快取擊穿、快取雪崩。",
    ],
    used: "和碩：系統的 Docker 環境中包含 Redis 服務。",
    qa: [
      { q: "Redis 為什麼這麼快？", a: "資料存放在記憶體；主要的指令處理是單執行緒，不需要處理鎖的競爭；並且使用 I/O 多工處理大量連線。" },
      { q: "什麼是快取雪崩？怎麼避免？", a: "大量快取在同一時間過期，所有請求一起打到資料庫，造成資料庫負載暴增。可以讓過期時間加上隨機值錯開，或使用多層快取。" },
      { q: "快取和資料庫的資料怎麼保持一致？", a: "常見做法是 Cache-Aside：讀取時先查快取，沒有再查資料庫並寫回快取；更新時先更新資料庫，再刪除快取。" },
    ],
    code: `// Laravel：快取 10 分鐘，沒有快取時才查資料庫
$categories = Cache::remember('categories', 600, function () {
    return Category::all();
});`,
  },
  {
    id: "meilisearch", name: "Meilisearch", cat: "data",
    summary: "開源的全文搜尋引擎，設定簡單、回應快，支援錯字容忍與即時搜尋。",
    points: [
      "以倒排索引（inverted index）實作全文搜尋：記錄每個詞出現在哪些文件。",
      "支援錯字容忍（typo tolerance）、篩選、排序和同義詞。",
      "Laravel 可以透過 Scout 套件整合，讓 Model 自動同步到搜尋索引。",
      "同類工具：Elasticsearch（功能更完整，但比較重）、Algolia（雲端服務）。",
    ],
    used: "和碩：用 Meilisearch 實作系統的關鍵字搜尋，並定期更新關鍵字清單。",
    qa: [
      { q: "為什麼不直接用 SQL 的 LIKE 搜尋？", a: "LIKE '%關鍵字%' 開頭是萬用字元時用不到索引，資料量大時會很慢，也不支援錯字容忍和相關性排序；搜尋引擎用倒排索引，速度快、搜尋體驗也比較好。" },
    ],
  },

  // ───────────── DevOps 與工具 ─────────────
  {
    id: "docker", name: "Docker", cat: "devops", core: true,
    summary: "容器化平台，把應用程式和它需要的執行環境打包在一起，在任何機器上都能用同樣的方式執行。",
    points: [
      "Image（映像檔）是唯讀的模板；Container（容器）是 image 執行起來的實體。",
      "Dockerfile 定義怎麼建立 image；docker compose 用 YAML 一次啟動多個服務。",
      "容器和虛擬機的差別：容器共用主機的 kernel，比 VM 輕量、啟動快。",
      "Volume 用來保存資料，容器刪除後資料仍然存在。",
      "常用指令：docker build、run、ps、logs、exec、compose up -d。",
    ],
    used: "和碩：用 Docker（Laradock）建立 Nginx、Redis、MSSQL、Meilisearch 的開發與部署環境。",
    qa: [
      { q: "容器和虛擬機的差別？", a: "VM 包含完整的作業系統，透過 Hypervisor 虛擬化硬體；容器共用主機的 kernel，只隔離 process 和檔案系統，所以更輕量、啟動更快，但隔離程度比 VM 低。" },
      { q: "Image 和 Container 的差別？", a: "Image 是唯讀的模板，類似 class；Container 是 image 執行起來的實體，類似 object，同一個 image 可以啟動多個 container。" },
      { q: "怎麼讓 image 變小？", a: "使用比較小的基底 image（例如 alpine）、用 multi-stage build 只保留執行需要的檔案、合併 RUN 指令並清除快取，以及用 .dockerignore 排除不需要的檔案。" },
    ],
    code: `# 啟動指定服務（背景執行）
docker compose up -d nginx workspace redis mssql meilisearch

# 進入容器執行指令
docker exec -it <container_id> /bin/bash
php artisan migrate`,
  },
  {
    id: "git", name: "Git", cat: "devops", core: true,
    summary: "分散式版本控制系統，用來追蹤程式碼的變更並支援多人協作。",
    points: [
      "三個區域：工作目錄 → 暫存區（git add）→ 儲存庫（git commit）。",
      "分支：git branch / git switch，用 merge 或 rebase 合併。",
      "遠端協作：clone、fetch、pull（= fetch + merge）、push。",
      "常見流程：Git Flow、GitHub Flow（feature branch + Pull Request + Code Review）。",
    ],
    used: "所有專案都用 Git 做版本控制，例如和碩的系統和碩士論文的程式。",
    qa: [
      { q: "merge 和 rebase 的差別？", a: "merge 會產生一個合併 commit，保留完整的分支歷史；rebase 把你的 commit 重新接到目標分支的最後面，歷史會變成一直線。已經推到共用分支的 commit 不要 rebase。" },
      { q: "git reset 和 git revert 的差別？", a: "reset 把分支指標移回之前的 commit，會改寫歷史；revert 新增一個反向的 commit 來抵銷變更，不改寫歷史，適合用在已經推上去的分支。" },
      { q: "遇到 merge conflict 怎麼處理？", a: "打開衝突的檔案，依照 <<<<<<< ======= >>>>>>> 標記決定要保留哪些內容，修改完後 git add，再 commit 或繼續 rebase。" },
    ],
    code: `git switch -c feature/excel-export   # 開新分支
git add .
git commit -m "Add Excel export"
git push -u origin feature/excel-export
# 到 GitHub 開 Pull Request`,
  },
  {
    id: "linux", name: "Linux", cat: "devops", core: true,
    summary: "伺服器最常用的作業系統，開發、部署和除錯都需要熟悉命令列操作。",
    points: [
      "檔案與目錄：ls、cd、cp、mv、rm、mkdir、find。",
      "查看與搜尋：cat、less、head、tail -f（即時看 log）、grep。",
      "權限：chmod（rwx = 4 / 2 / 1）、chown；sudo 以管理員身分執行。",
      "Process：ps、top / htop、kill；網路：curl、ss / netstat。",
      "管線與重新導向：|、>、>>，例如 cat app.log | grep ERROR | wc -l。",
    ],
    used: "Wipro：在 Linux 環境執行自動化程式並分析 log。和碩：在 Docker 容器內操作 Laravel。",
    qa: [
      { q: "chmod 755 代表什麼？", a: "擁有者有讀、寫、執行（7 = 4+2+1），群組和其他人只有讀和執行（5 = 4+1）。" },
      { q: "怎麼找出 log 裡的錯誤？", a: "用 grep 搜尋關鍵字，例如 grep -n ERROR app.log；即時監看用 tail -f app.log | grep ERROR。" },
    ],
    code: `tail -f /var/log/app.log | grep -i error   # 即時監看錯誤
grep -rn "TODO" ./src                      # 遞迴搜尋並顯示行號
ps aux | grep python                       # 找 process
chmod +x run.sh && ./run.sh`,
  },
  {
    id: "cicd", name: "CI/CD", cat: "devops", core: true,
    summary: "持續整合 / 持續交付：程式碼提交後，自動建置、測試，並部署到各個環境。",
    points: [
      "CI（Continuous Integration）：每次提交都自動建置並執行測試，及早發現問題。",
      "CD 有兩種意思：Continuous Delivery（隨時可以部署，需要人工按下部署）和 Continuous Deployment（通過測試後自動上線）。",
      "常見工具：GitHub Actions、GitLab CI、Jenkins。",
      "Pipeline 通常包含：安裝依賴 → lint → 測試 → 建置 → 部署。",
    ],
    used: "Wipro：在 CI 流程中維護自動化作業，並分析失敗的執行結果。",
    qa: [
      { q: "CI 的好處是什麼？", a: "每次提交都自動測試，問題能在變更還很小的時候被發現，修復成本低；也能避免「在我電腦上可以跑」的問題。" },
      { q: "Continuous Delivery 和 Continuous Deployment 的差別？", a: "Delivery 是讓程式隨時處於可以部署的狀態，但上線要人工決定；Deployment 是通過所有測試後就自動部署到正式環境。" },
    ],
    code: `# .github/workflows/test.yml（GitHub Actions）
name: test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest`,
  },
  {
    id: "nginx", name: "Nginx", cat: "devops",
    summary: "高效能的 Web 伺服器，常用來提供靜態檔案、當反向代理和做負載平衡。",
    points: [
      "事件驅動、非同步架構，可以用少量資源處理大量連線。",
      "反向代理：把客戶端的請求轉給後端服務（例如 PHP-FPM、Node.js）。",
      "負載平衡：把請求分散到多台後端伺服器（round robin、least_conn 等策略）。",
      "也常用來設定 HTTPS（SSL 終止）、gzip 壓縮和快取。",
    ],
    used: "和碩：Docker 環境中用 Nginx 搭配 PHP-FPM 提供 Laravel 網站服務。",
    qa: [
      { q: "正向代理和反向代理的差別？", a: "正向代理代替「客戶端」對外發出請求，例如公司的上網代理；反向代理代替「伺服器」接收請求，再轉給後端，客戶端不知道實際是哪台伺服器在處理。" },
    ],
    code: `server {
    listen 80;
    root /var/www/public;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ \\.php$ {
        fastcgi_pass php-fpm:9000;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}`,
  },

  // ───────────── 自動化與除錯 ─────────────
  {
    id: "automation", name: "自動化測試", cat: "quality",
    summary: "用程式自動執行測試步驟並比對結果，取代重複的手動操作，讓每次改版都能快速驗證。",
    points: [
      "測試金字塔：單元測試（最多、最快）→ 整合測試 → 端到端（E2E）測試（最少、最慢）。",
      "好的自動化測試要穩定、可重複，失敗訊息要清楚好懂。",
      "Flaky test：時好時壞的測試，常見原因是時序、等待時間、環境或外部依賴。",
      "Python 常用工具：pytest、unittest；行動裝置 UI 測試常用 Appium、UI Automator、XCUITest。",
    ],
    used: "Wipro：用 Python 和 YAML 開發與維護智慧家庭裝置、Android / iOS App 的裝置端自動化。",
    qa: [
      { q: "怎麼處理 flaky test？", a: "先重現並找出原因：寫死的 sleep 改成等待特定條件、隔離測試資料與環境、對外部依賴用 mock；修好之前可以先標記或隔離，避免影響整個 CI。" },
      { q: "單元測試和整合測試的差別？", a: "單元測試只測單一函式或類別，外部依賴用 mock 取代，速度快；整合測試驗證多個元件（例如 API + 資料庫）合在一起是否正常運作。" },
    ],
    code: `# pytest 範例
import pytest

def add(a, b):
    return a + b

@pytest.mark.parametrize("a,b,expected", [(1, 2, 3), (0, 0, 0), (-1, 1, 0)])
def test_add(a, b, expected):
    assert add(a, b) == expected`,
  },
  {
    id: "debugging", name: "除錯與 Log 分析", cat: "quality", core: true,
    summary: "從 log、畫面紀錄和錯誤訊息找出問題的根本原因（root cause），而不只是處理表面症狀。",
    points: [
      "步驟：重現問題 → 縮小範圍 → 提出假設 → 驗證 → 修正 → 確認沒有引入新問題。",
      "先看第一個出錯的地方，後面的錯誤常常只是連帶產生的結果。",
      "Log 等級：DEBUG、INFO、WARNING、ERROR、CRITICAL；好的 log 要包含時間、模組和上下文。",
      "區分問題來源：是產品本身的缺陷，還是測試程式、環境、資料造成的？",
      "工具：grep / tail、IDE 中斷點、瀏覽器 DevTools、UI layout dump、錄影畫面。",
    ],
    used: "Wipro：分析 log、UI 版面結構（layout dump）和錄影畫面，判斷失敗是產品缺陷還是自動化程式的問題，並回報追蹤。",
    qa: [
      { q: "遇到一個很難重現的 bug，你會怎麼做？", a: "先收集發生當下的 log、時間點和環境資訊，找出共同條件；加上更詳細的 log 或監控，嘗試在相同條件下重現；同時檢查最近的變更，用二分法（例如 git bisect）縮小範圍。" },
      { q: "分享一次你解決困難問題的經驗。", a: "用 STAR 回答：Situation（背景）、Task（你負責什麼）、Action（你怎麼分析：看 log、比對錄影、提出假設並驗證）、Result（結果與學到的事）。" },
    ],
  },
  {
    id: "mobile", name: "Android / iOS", cat: "quality",
    summary: "兩大行動作業系統。自動化測試時需要熟悉兩個平台的 App 架構、UI 結構和偵錯工具。",
    points: [
      "Android：adb（安裝 App、看 logcat、截圖）、UI Automator 取得畫面元素。",
      "iOS：Xcode、XCUITest；在實體裝置上執行測試需要簽章與佈建檔（provisioning profile）。",
      "UI layout dump：把畫面元素樹匯出成 XML，用來定位元素、分析為什麼找不到元素。",
      "跨平台差異：權限要求、背景執行限制、UI 元件與系統行為都不同。",
    ],
    used: "Wipro：在 Android 和 iOS 的 App 上執行與維護自動化，並分析失敗原因。大學專題：AR 遊戲部署到 Android 手機。",
    qa: [
      { q: "常用的 adb 指令有哪些？", a: "adb devices（列出裝置）、adb install app.apk（安裝 App）、adb logcat（看系統 log）、adb shell screencap（截圖）、adb shell uiautomator dump（匯出畫面結構）。" },
    ],
    code: `adb devices
adb install app.apk
adb logcat | grep MyApp
adb shell uiautomator dump /sdcard/window_dump.xml
adb pull /sdcard/window_dump.xml`,
  },

  // ───────────── AI 與資訊安全 ─────────────
  {
    id: "pytorch", name: "PyTorch", cat: "ml", core: true,
    summary: "主流的深度學習框架，用動態計算圖，方便建立、訓練和除錯神經網路。",
    points: [
      "Tensor：類似 NumPy 陣列，但可以在 GPU 上運算（.to('cuda')）。",
      "Autograd：自動計算梯度，呼叫 loss.backward() 即可。",
      "建立模型：繼承 nn.Module，實作 forward()。",
      "訓練迴圈：forward → 計算 loss → optimizer.zero_grad() → loss.backward() → optimizer.step()。",
      "Dataset / DataLoader：負責資料讀取、批次（batch）和打亂順序（shuffle）。",
    ],
    used: "碩士論文：用 PyTorch 實作 Transformer 特徵擷取器，學習車聯網訊息序列的時序特徵。",
    qa: [
      { q: "為什麼每個 batch 都要呼叫 zero_grad()？", a: "PyTorch 預設會累加梯度，不清掉的話，這次的梯度會和上一個 batch 的混在一起，導致更新方向錯誤。" },
      { q: "model.train() 和 model.eval() 的差別？", a: "會切換 Dropout 和 BatchNorm 的行為：訓練時 Dropout 會隨機關閉神經元；評估時關閉 Dropout，BatchNorm 改用訓練時累積的統計值。推論時通常還會搭配 torch.no_grad() 節省記憶體。" },
    ],
    code: `for x, y in loader:
    x, y = x.to(device), y.to(device)
    pred = model(x)                 # forward
    loss = criterion(pred, y)
    optimizer.zero_grad()
    loss.backward()                 # 計算梯度
    optimizer.step()                # 更新權重`,
  },
  {
    id: "transformer", name: "Transformer", cat: "ml", core: true,
    summary: "以自注意力機制（Self-Attention）為核心的深度學習架構，擅長處理序列資料，是 GPT、BERT 等模型的基礎。",
    points: [
      "Self-Attention：每個位置都能直接關注序列中的所有其他位置，捕捉長距離的關係。",
      "計算方式：Attention(Q, K, V) = softmax(QKᵀ / √d) · V。",
      "Multi-Head Attention：同時用多組注意力，學習不同面向的關係。",
      "Positional Encoding：補上序列的位置資訊，因為注意力本身不考慮順序。",
      "和 RNN / LSTM 相比，可以平行運算，也比較能處理長序列。",
    ],
    used: "碩士論文：以 Transformer Encoder 從車聯網訊息序列（BSM）中擷取時序特徵，再交給 XGBoost 分類。",
    qa: [
      { q: "Transformer 為什麼比 RNN 好？", a: "RNN 必須一步一步依序計算，無法平行處理，長序列也容易梯度消失；Transformer 用 Self-Attention 一次看完整個序列，可以平行運算，也能直接捕捉長距離的關係。" },
      { q: "為什麼要除以 √d？", a: "向量維度 d 很大時，Q 和 K 的內積數值會很大，讓 softmax 的輸出趨近 0 或 1，梯度變得很小；除以 √d 可以讓數值維持在穩定的範圍。" },
      { q: "你的論文為什麼結合 Transformer 和 XGBoost？", a: "Transformer 擅長從序列中學習時序特徵，XGBoost 擅長在表格型特徵上做準確且穩定的分類。兩者結合後，準確率（99.67%）優於單獨使用任一種 ML / DL 基準模型。" },
    ],
  },
  {
    id: "xgboost", name: "XGBoost", cat: "ml", core: true,
    summary: "以梯度提升（Gradient Boosting）為基礎的決策樹演算法，在表格型資料上表現非常好。",
    points: [
      "Boosting：依序訓練多棵弱學習器（決策樹），每一棵都在修正前面幾棵的誤差。",
      "Bagging vs Boosting：Random Forest 是平行訓練多棵樹再投票（Bagging）；XGBoost 是依序訓練（Boosting）。",
      "內建正規化（L1 / L2），可以降低過擬合。",
      "重要超參數：n_estimators、max_depth、learning_rate、subsample。",
      "可以輸出特徵重要性（feature importance），方便解釋模型。",
    ],
    used: "碩士論文：用 XGBoost 對 Transformer 擷取出的特徵進行分類，區分 5 種 DoS 攻擊與正常流量。",
    qa: [
      { q: "Bagging 和 Boosting 的差別？", a: "Bagging（例如 Random Forest）平行訓練多個模型再投票或平均，主要降低變異；Boosting（例如 XGBoost）依序訓練，每個模型修正前面的錯誤，主要降低偏差。" },
      { q: "怎麼避免 XGBoost 過擬合？", a: "限制樹的深度（max_depth）、降低 learning_rate 並增加樹的數量、使用 subsample 和 colsample_bytree 抽樣、加上正規化，以及用 early stopping。" },
    ],
    code: `from xgboost import XGBClassifier

clf = XGBClassifier(
    n_estimators=300, max_depth=6,
    learning_rate=0.1, subsample=0.8)
clf.fit(X_train, y_train)
pred = clf.predict(X_test)`,
  },
  {
    id: "ml-eval", name: "模型評估與 K-fold", cat: "ml",
    summary: "用正確的方法切分資料並選擇合適的指標，才能客觀判斷模型好不好。",
    points: [
      "混淆矩陣：TP、FP、TN、FN。",
      "Accuracy = 預測正確的比例；Precision = 預測為攻擊的資料中，真的是攻擊的比例；Recall = 真正的攻擊中，被抓出來的比例；F1 = Precision 和 Recall 的調和平均。",
      "資料不平衡時，只看 Accuracy 會被誤導，要搭配 Precision、Recall、F1。",
      "K-fold 交叉驗證：把資料分成 K 份，輪流用其中一份當驗證集，最後取平均，結果比較可靠。",
      "處理資料不平衡：重新取樣（undersampling / oversampling、SMOTE）或調整類別權重。",
    ],
    used: "碩士論文：先對 VeReMi 資料集做資料縮減與類別平衡，再用 5-fold 交叉驗證評估，Accuracy 達 99.67%。",
    qa: [
      { q: "入侵偵測比較重視 Precision 還是 Recall？", a: "通常比較重視 Recall，因為漏掉真正的攻擊（FN）代價很高；但 Precision 太低會產生大量誤報，讓維運人員疲於奔命，所以實務上會用 F1 或依需求調整門檻。" },
      { q: "什麼是過擬合？怎麼發現和處理？", a: "模型在訓練集表現很好，在驗證集卻很差。可以比較訓練和驗證的指標來發現；處理方式包括增加資料、正規化、Dropout、降低模型複雜度和 early stopping。" },
      { q: "為什麼要用 K-fold，而不是只切一次訓練集和測試集？", a: "只切一次的結果會受到切分方式的運氣影響；K-fold 讓每一筆資料都輪流當過驗證資料，取平均後的結果更穩定、更可信。" },
    ],
  },
  {
    id: "dos", name: "DoS 攻擊與入侵偵測", cat: "ml", core: true,
    summary: "DoS（阻斷服務攻擊）用大量或惡意的請求耗盡系統資源，讓正常使用者無法使用服務；入侵偵測系統（IDS）負責找出這類異常。",
    points: [
      "DoS 是單一來源；DDoS 是來自大量來源（例如殭屍網路）的分散式攻擊。",
      "IDS 的兩種偵測方式：特徵比對（signature-based，只能抓已知的攻擊）和異常偵測（anomaly-based，可以發現新型攻擊，但誤報較多）。",
      "IDS 只負責偵測和告警；IPS（入侵防禦系統）還會主動阻擋。",
      "車聯網（VANETs / V2X）：車輛之間會廣播 BSM（基本安全訊息），攻擊者可以用大量假訊息癱瘓通訊。",
      "常見防禦：流量限制（rate limiting）、流量清洗、CDN、異常偵測模型。",
    ],
    used: "碩士論文：提出 TransBoost-DoS，偵測車聯網中的 5 種 DoS 攻擊，論文發表於 Wireless Networks（Springer, 2026）。",
    qa: [
      { q: "DoS 和 DDoS 的差別？", a: "DoS 來自單一來源，比較容易用封鎖 IP 等方式阻擋；DDoS 來自大量分散的來源，流量更大，也很難和正常流量區分，防禦難度高很多。" },
      { q: "IDS 和 IPS 的差別？", a: "IDS 監控流量並在發現異常時告警，不會主動阻擋；IPS 部署在流量的路徑上，發現攻擊時可以直接阻擋。" },
      { q: "Web 系統可以怎麼防範 DoS？", a: "API 加上流量限制（Laravel 有 throttle middleware）、使用 CDN 和 WAF、設定連線逾時、做好快取以降低後端負載，並監控異常流量。" },
    ],
  },
  {
    id: "sumo", name: "SUMO / TraCI", cat: "ml",
    summary: "SUMO 是開源的交通模擬軟體；TraCI 是它的控制介面，可以用 Python 即時控制和讀取模擬中的車輛。",
    points: [
      "SUMO = Simulation of Urban MObility，可以模擬路網、車流和交通號誌。",
      "netedit 用來建立路網檔，route 檔定義車輛的行駛路線。",
      "TraCI 讓 Python 程式在模擬過程中逐步執行、讀取車輛的位置和速度，或修改車輛的行為。",
      "常用來產生車聯網研究的資料，或驗證偵測模型。",
    ],
    used: "碩士論文：用 SUMO + TraCI 建立車聯網交通與攻擊情境，產生訊息資料並驗證偵測模型。",
    qa: [
      { q: "為什麼需要模擬器？", a: "在真實道路上發動攻擊做實驗既危險又不合法，成本也很高；模擬器可以安全、低成本、可重複地產生各種交通和攻擊情境。" },
    ],
    code: `import traci

traci.start(["sumo", "-c", "scenario.sumocfg"])
while traci.simulation.getMinExpectedNumber() > 0:
    traci.simulationStep()
    for vid in traci.vehicle.getIDList():
        x, y = traci.vehicle.getPosition(vid)
        speed = traci.vehicle.getSpeed(vid)
traci.close()`,
  },

  // ───────────── 系統設計基礎 ─────────────
  {
    id: "scalability", name: "系統擴充性", cat: "design", core: true,
    summary: "使用者和資料量變多時，系統仍然能維持效能的能力。後端面試很常問。",
    points: [
      "資料庫：建立合適的索引、分頁查詢、避免 N+1、讀寫分離、分庫分表。",
      "快取：用 Redis 快取熱門資料，降低資料庫的負擔。",
      "垂直擴充（升級單台機器）vs 水平擴充（增加機器數量，搭配負載平衡）。",
      "非同步處理：耗時的工作（寄信、產生報表）丟到佇列（Queue），由背景程式處理。",
      "無狀態服務：Session 放在 Redis 等共用儲存，任何一台伺服器都能處理請求，方便水平擴充。",
    ],
    used: "和碩的系統是內網系統，使用者不多，但已經使用分頁、Redis 和 Docker。面試時可以說明：如果使用者變多，會怎麼優化。",
    qa: [
      { q: "你的系統是內網系統，如果使用者增加 100 倍，你會怎麼做？", a: "先誠實說明原本的規模。接著依序說明：1) 找出瓶頸：監控慢查詢與資源使用率；2) 資料庫：補索引、確認沒有 N+1、分頁；3) 快取：用 Redis 快取熱門和不常變動的資料；4) 匯出報表這類耗時工作改用 Queue 非同步處理；5) 服務改成無狀態，放到負載平衡後面水平擴充。" },
      { q: "垂直擴充和水平擴充的差別？", a: "垂直擴充是升級單台機器的 CPU、記憶體，簡單但有上限，而且有單點故障的風險；水平擴充是增加機器數量，搭配負載平衡，彈性大，但需要服務是無狀態的。" },
      { q: "產生 Excel 報表很慢怎麼辦？", a: "改成非同步：使用者送出請求後，丟到 Queue 由背景程式產生報表，完成後通知使用者下載；資料量大時用分批（chunk）讀取，避免一次載入太多資料造成記憶體不足。" },
    ],
  },

  // ───────────── 其他 ─────────────
  {
    id: "unity-ar", name: "Unity / Vuforia (AR)", cat: "other",
    summary: "Unity 是跨平台的遊戲引擎；Vuforia 是 AR SDK，可以辨識影像，並把虛擬物件疊加在真實畫面上。",
    points: [
      "Unity 的基本組成：Scene、GameObject、Component，用 C# 腳本控制行為。",
      "Vuforia 的 Image Target：辨識預先登錄的圖片，並追蹤它在空間中的位置。",
      "Region Capture：擷取辨識目標上特定區域的畫面，轉成貼圖（texture）使用。",
      "建置到 Android 需要設定 Android SDK，並開啟相機權限。",
    ],
    used: "大學專題：AR 擴增實境互動遊戲。使用者在紙上為模型上色，掃描後即時變成遊戲中的角色。",
    qa: [
      { q: "說明一下你的大學專題。", a: "兩人團隊開發的 Android AR 遊戲：使用者在紙本上為指定模型上色，用手機掃描後，Vuforia 辨識紙本並擷取上色的區域，轉成 3D 角色的貼圖，角色就出現在遊戲裡。遊戲玩法以 Unity 範例為基礎修改，重點在 AR 掃描和自訂貼圖。" },
    ],
  },
];
