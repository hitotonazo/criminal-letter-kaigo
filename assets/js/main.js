async function loadJSON(path){
  const res = await fetch(path, {cache:"no-store"});
  if(!res.ok) throw new Error("Failed to load "+path);
  return await res.json();
}

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return [...root.querySelectorAll(sel)]; }

function setText(el, text){
  if(!el) return;
  el.textContent = text;
}

function formatDate(iso){
  // YYYY-MM-DD -> YYYY年MM月DD日
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m) return iso;
  return `${m[1]}年${m[2]}月${m[3]}日`;
}

function buildNews(cardsRoot, items){
  if(!cardsRoot) return;
  cardsRoot.innerHTML = "";
  items.forEach(item=>{
    const a = document.createElement("a");
    a.className = "newsCard";
    a.href = item.url;
    a.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="newsBody">
        <span class="pill">${item.category}</span>
        <div class="newsTitle">${item.title}</div>
        <div class="newsMeta"><span>${formatDate(item.date)}</span><span>｜</span><span>${item.category}</span></div>
        <div class="newsExcerpt">${item.excerpt}</div>
      </div>
    `;
    cardsRoot.appendChild(a);
  });
}

async function init(){
  // Mobile menu toggle
  const burger = $("#burger");
  const mobile = $("#mobileMenu");
  if(burger && mobile){
    burger.addEventListener("click", ()=>{
      mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", mobile.classList.contains("open") ? "true" : "false");
    });
  }

  // Set active nav by path
  const path = location.pathname.replace(/\/$/, "") || "/";
  $all("[data-nav]").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });

  // Load site config
  const site = await loadJSON("/data/site.json");
  setText($("#siteName"), site.siteName);
  setText($("#siteName2"), site.siteName);
  setText($("#tagline"), site.tagline);
  setText($("#orgLine"), site.orgLine);
  setText($("#addr"), site.address);
  setText($("#tel"), site.tel);
  setText($("#fax"), site.fax);
  setText($("#access1"), site.access1);
  setText($("#access2"), site.access2);
  setText($("#updated"), site.updated);

  const logo = $("#logo");
  if(logo) logo.src = site.logoImage;

  const hero = $("#heroImg");
  if(hero) hero.src = site.heroImage;

  // Load news
  const news = await loadJSON("/data/news.json");
  const top3 = news.slice(0,3);
  buildNews($("#newsCards"), top3);
}

document.addEventListener("DOMContentLoaded", ()=>{
  init().catch(err=>{
    console.error(err);
  });
});
