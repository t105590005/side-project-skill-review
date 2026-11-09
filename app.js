(function () {
  const CATS = window.CATEGORIES;
  const SKILLS = window.SKILLS;
  const STORE_KEY = "skill-review-done";

  const $ = (sel) => document.querySelector(sel);
  const state = {
    cat: "all",
    q: "",
    coreOnly: false,
    hideDone: false,
    done: new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]")),
    visible: [],
    current: null,
  };

  const catName = (id) => (CATS.find((c) => c.id === id) || {}).name || "";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const save = () => localStorage.setItem(STORE_KEY, JSON.stringify([...state.done]));

  function matches(s) {
    if (state.cat !== "all" && s.cat !== state.cat) return false;
    if (state.coreOnly && !s.core) return false;
    if (state.hideDone && state.done.has(s.id)) return false;
    if (!state.q) return true;
    const hay = [s.name, s.summary, s.used, ...(s.points || []), ...(s.qa || []).flatMap((x) => [x.q, x.a])].join(" ").toLowerCase();
    return state.q.split(/\s+/).every((w) => hay.includes(w));
  }

  function renderChips() {
    const all = [{ id: "all", name: "全部" }, ...CATS];
    $("#category-chips").innerHTML = all.map((c) => {
      const n = c.id === "all" ? SKILLS.length : SKILLS.filter((s) => s.cat === c.id).length;
      return `<button class="chip" role="tab" id="chip-${c.id}" data-cat="${c.id}" aria-selected="${state.cat === c.id}">${esc(c.name)}<span class="count">${n}</span></button>`;
    }).join("");
  }

  function renderProgress() {
    const total = SKILLS.length;
    const done = SKILLS.filter((s) => state.done.has(s.id)).length;
    $("#progress-fill").style.width = (done / total) * 100 + "%";
    $("#progress-text").textContent = `${done} / ${total} 已複習`;
  }

  function render() {
    state.visible = SKILLS.filter(matches);
    const html = CATS.map((c) => {
      const list = state.visible.filter((s) => s.cat === c.id);
      if (!list.length) return "";
      const cards = list.map((s, i) => `
        <button class="card ${state.done.has(s.id) ? "done" : ""}" data-id="${s.id}" id="card-${s.id}" style="animation-delay:${i * 25}ms">
          <div class="card-top"><h3>${esc(s.name)}</h3>${s.core ? '<span class="badge">核心</span>' : ""}</div>
          <p>${esc(s.summary)}</p>
          <div class="card-meta"><span>${(s.points || []).length} 個觀念</span><span>${(s.qa || []).length} 題面試題</span>${s.code ? "<span>範例程式</span>" : ""}</div>
        </button>`).join("");
      return `<section class="section" id="sec-${c.id}"><h2 class="section-title">${esc(c.name)}<small>${list.length} 項</small></h2><div class="grid">${cards}</div></section>`;
    }).join("");
    $("#sections").innerHTML = html;
    $("#empty-state").hidden = state.visible.length > 0;
    renderProgress();
  }

  // ── Detail dialog ──
  function openDetail(id) {
    const s = SKILLS.find((x) => x.id === id);
    if (!s) return;
    state.current = s;
    $("#detail-cat").textContent = catName(s.cat) + (s.core ? " · 核心技能" : "");
    $("#detail-title").textContent = s.name;
    const points = (s.points || []).map((p) => `<li>${esc(p)}</li>`).join("");
    const qa = (s.qa || []).map((x) => `<details class="qa"><summary>${esc(x.q)}</summary><div class="answer">${esc(x.a)}</div></details>`).join("");
    $("#detail-body").innerHTML = `
      <p class="summary">${esc(s.summary)}</p>
      ${points ? `<div class="block"><h4>核心觀念</h4><ul>${points}</ul></div>` : ""}
      ${s.used ? `<div class="block"><h4>我在哪裡用過</h4><p class="used">${esc(s.used)}</p></div>` : ""}
      ${qa ? `<div class="block"><h4>面試常見問題（點開看答案）</h4>${qa}</div>` : ""}
      ${s.code ? `<div class="block"><h4>範例</h4><pre><code>${esc(s.code)}</code></pre></div>` : ""}`;
    $("#detail-body").scrollTop = 0;
    updateDoneBtn();
    const dlg = $("#detail-dialog");
    if (!dlg.open) dlg.showModal();
  }

  function updateDoneBtn() {
    const done = state.done.has(state.current.id);
    const btn = $("#done-btn");
    btn.textContent = done ? "✓ 已複習" : "標記為已複習";
    btn.classList.toggle("is-done", done);
  }

  function step(dir) {
    const list = state.visible.length ? state.visible : SKILLS;
    const i = list.findIndex((s) => s.id === state.current.id);
    const next = list[(i + dir + list.length) % list.length];
    openDetail(next.id);
  }

  // ── Quiz ──
  let quizItem = null;
  function nextQuiz() {
    const pool = (state.visible.length ? state.visible : SKILLS).flatMap((s) => (s.qa || []).map((x) => ({ ...x, skill: s.name })));
    if (!pool.length) return;
    let pick;
    do { pick = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && quizItem && pick.q === quizItem.q);
    quizItem = pick;
    $("#quiz-skill").textContent = pick.skill;
    $("#quiz-q").textContent = pick.q;
    $("#quiz-answer").textContent = pick.a;
    $("#quiz-answer").hidden = true;
    $("#quiz-hint").hidden = false;
    $("#quiz-reveal").disabled = false;
  }

  // ── Events ──
  $("#category-chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    state.cat = b.dataset.cat;
    renderChips();
    render();
  });
  $("#search-input").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); render(); });
  $("#core-only").addEventListener("change", (e) => { state.coreOnly = e.target.checked; render(); });
  $("#hide-done").addEventListener("change", (e) => { state.hideDone = e.target.checked; render(); });
  $("#sections").addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openDetail(c.dataset.id); });

  $("#detail-close").addEventListener("click", () => $("#detail-dialog").close());
  $("#prev-btn").addEventListener("click", () => step(-1));
  $("#next-btn").addEventListener("click", () => step(1));
  $("#done-btn").addEventListener("click", () => {
    const id = state.current.id;
    state.done.has(id) ? state.done.delete(id) : state.done.add(id);
    save();
    updateDoneBtn();
    render();
  });

  $("#quiz-btn").addEventListener("click", () => { nextQuiz(); $("#quiz-dialog").showModal(); });
  $("#quiz-close").addEventListener("click", () => $("#quiz-dialog").close());
  $("#quiz-next").addEventListener("click", nextQuiz);
  $("#quiz-reveal").addEventListener("click", () => {
    $("#quiz-answer").hidden = false;
    $("#quiz-hint").hidden = true;
    $("#quiz-reveal").disabled = true;
  });

  // 點背景關閉 dialog
  document.querySelectorAll("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

  // 鍵盤：在詳細內容中用左右鍵切換，按 / 聚焦搜尋
  document.addEventListener("keydown", (e) => {
    if ($("#detail-dialog").open) {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    } else if (e.key === "/" && document.activeElement !== $("#search-input")) {
      e.preventDefault();
      $("#search-input").focus();
    }
  });

  // 網址 hash 可以直接開啟某個技能，例如 index.html#laravel，方便分享或加書籤
  $("#detail-dialog").addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));
  const _open = openDetail;
  openDetail = function (id) { _open(id); history.replaceState(null, "", "#" + id); };

  renderChips();
  render();
  const initial = decodeURIComponent(location.hash.slice(1));
  if (initial === "quiz") { nextQuiz(); $("#quiz-dialog").showModal(); }
  else if (initial && SKILLS.some((s) => s.id === initial)) openDetail(initial);
})();
