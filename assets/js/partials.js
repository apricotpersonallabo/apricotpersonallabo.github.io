import { getLocale, setLocale, t, KEYS } from "./i18n.js";
import { setYear } from "./accessibility.js";

const computeRoot = () => {
  const p = location.pathname;
  const ix = p.indexOf("/projects/");
  if (ix >= 0) return p.slice(0, ix + 1);
  return p.endsWith("/") ? p : p.replace(/[^/]*$/, "");
};
const ROOT = computeRoot();
const isTopPage = !!document.getElementById("app");

const loadText = async (url) => {
  const res = await fetch(url, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
};
const ensureHeader = async () => {
  if (document.querySelector(".site-header")) return;
  const html = await loadText(`${ROOT}partials/header.html`);
  document.body.insertAdjacentHTML("afterbegin", html);
};
const ensureFooter = async () => {
  if (document.querySelector(".site-footer")) return;
  const html = await loadText(`${ROOT}partials/footer.html`);
  document.body.insertAdjacentHTML("beforeend", html);
};
const wireLangToggle = () => {
  const btn = document.getElementById("lang-toggle");
  const titleNode = document.getElementById("site-title");
  if (!btn || !titleNode) return;
  const updateTexts = () => {
    const loc = getLocale();
    titleNode.textContent = t(loc, KEYS.title);
    btn.textContent = t(loc, KEYS.lang_toggle);
    setHomeHref();
  };
  updateTexts();
  btn.addEventListener("click", () => {
    const current = getLocale();
    const next = current === "ja" ? "en" : "ja";
    setLocale(next);
    updateTexts();
  });
};

const setHomeHref = () => {
  const home = document.getElementById("home-link");
  if (!home) return;
  try {
    const u = new URL(location.origin + ROOT);
    u.searchParams.set("lang", getLocale());
    home.setAttribute("href", u.pathname + u.search);
  } catch {
    home.setAttribute("href", ROOT + "?lang=" + encodeURIComponent(getLocale()));
  }
};


const run = async () => {
  try{
    await ensureHeader();
    await ensureFooter();
    setYear(document.getElementById("year"));
    setHomeHref();
    if (!isTopPage) wireLangToggle();
  }catch(err){
    console.error("[partials]", err);
  }
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}
