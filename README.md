# 技能複習筆記（Skill Review）

履歷上提到的技能整理，方便面試前快速複習。每個技能包含：

- 一句話說明
- 核心觀念
- 我在哪裡用過
- 面試常見問題（點開看答案）
- 範例程式碼

功能：搜尋、分類篩選、只看核心技能、標記已複習（進度存在瀏覽器）、隨機抽題。

純 HTML / CSS / JavaScript，不需要安裝任何套件或建置。

## 檔案結構

```
index.html   頁面結構
style.css    樣式
app.js       互動邏輯
data.js      技能內容（要新增或修改技能，只要改這個檔案）
.nojekyll    告訴 GitHub Pages 不要用 Jekyll 處理
```

## 本機預覽

直接用瀏覽器打開 `index.html`，或在資料夾內執行：

```bash
python3 -m http.server 8000
# 打開 http://localhost:8000
```

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，例如 `skill-review`（設為 Public）
2. 在這個資料夾執行：

   ```bash
   git init
   git add .
   git commit -m "Add skill review site"
   git branch -M main
   git remote add origin https://github.com/t105590005/skill-review.git
   git push -u origin main
   ```

3. 到 repository 的 **Settings → Pages**
4. **Source** 選 **Deploy from a branch**，Branch 選 **main**、資料夾選 **/ (root)**，按 **Save**
5. 等 1～2 分鐘，網站會出現在：`https://t105590005.github.io/skill-review/`

之後修改內容，只要 `git add`、`git commit`、`git push`，網站就會自動更新。

## 新增技能

在 `data.js` 的 `window.SKILLS` 陣列裡加一個物件：

```js
{
  id: "kotlin", name: "Kotlin", cat: "lang", core: false,
  summary: "一句話說明",
  points: ["觀念 1", "觀念 2"],
  used: "我在哪裡用過",
  qa: [{ q: "問題", a: "答案" }],
  code: `範例程式碼（選填）`,
},
```

`cat` 可用的分類：`lang`、`web`、`data`、`devops`、`quality`、`ml`、`design`、`other`。
