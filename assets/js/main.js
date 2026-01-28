const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

function openDrawer(){
  const drawer = $("#mobileDrawer");
  drawer.style.display = "block";
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  const drawer = $("#mobileDrawer");
  drawer.style.display = "none";
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setupDrawer(){
  const btn = $("#menuBtn");
  const closeBtn = $("#drawerClose");
  const backdrop = $("#mobileDrawer");
  if(!btn || !backdrop) return;
  btn.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", (e)=>{
    if(e.target === backdrop) closeDrawer();
  });
  $$("#mobileDrawer a").forEach(a=>a.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && backdrop.style.display === "block") closeDrawer();
  });
}

async function loadJSON(path){
  const res = await fetch(path, { cache: "no-store" });
  if(!res.ok) throw new Error(`Failed to load ${path}`);
  return await res.json();
}

function fmtDate(iso){
  const [y,m,d] = iso.split("-");
  return `${y}年${m}月${d}日`;
}

function renderNews(items){
  const grid = $("#newsGrid");
  if(!grid) return;
  grid.innerHTML = "";
  items.forEach(n=>{
    const card = document.createElement("a");
    card.className = "card news-card";
    card.href = n.url;
    card.innerHTML = `
      <img src="${n.image}" alt="">
      <div class="pad">
        <div class="meta">
          <span class="pill orange">${n.category}</span>
          <span class="pill">${fmtDate(n.date)}</span>
        </div>
        <div class="title">${escapeHTML(n.title)}</div>
        <p class="excerpt">${escapeHTML(n.excerpt)}</p>
        <div class="bottom">
          <span class="pill">続きを読む</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderEvents(items){
  const wrap = $("#eventsGrid");
  if(!wrap) return;
  wrap.innerHTML = "";
  items.forEach(e=>{
    const div = document.createElement("div");
    div.className = "event";
    div.innerHTML = `
      <div class="m">${escapeHTML(e.month)}</div>
      <div class="t">${escapeHTML(e.title)}</div>
      <div class="d">${escapeHTML(e.desc)}</div>
    `;
    wrap.appendChild(div);
  });
}

function escapeHTML(str=""){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

async function boot(){
  setupDrawer();

  // Index only: render data-driven sections if containers exist
  try{
    const [news, events] = await Promise.all([
      loadJSON("/data/news.json"),
      loadJSON("/data/events.json"),
    ]);
    renderNews(news);
    renderEvents(events);
  }catch(err){
    // fail silently (still usable as static site)
    console.warn(err);
  }
}

document.addEventListener("DOMContentLoaded", boot);
