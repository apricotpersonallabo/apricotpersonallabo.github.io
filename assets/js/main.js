import { qs, qsa, setHTML, listen, scrollToId, observeSections } from "./dom.js";
import { initStore } from "./state.js";
import { getLocale, setLocale, t, KEYS } from "./i18n.js";
import { SOCIALS } from "./data/socials.js";
import { PROJECTS } from "./data/projects.js";
import { renderApp, renderTOC } from "./renderers.js";
import { setYear } from "./accessibility.js";

const app = qs("#app");
const tocNav = qs("#toc-nav");
const yearNode = qs("#year");

setYear(yearNode);

const initial = { locale: getLocale(), socials: SOCIALS, projects: PROJECTS };
const store = initStore(initial);

const draw = () => {
  const state = store.get();
  const siteTitle = qs("#site-title");
  const langBtnNode = qs("#lang-toggle");
  const tocTitle = qs("#toc-title");

  if (siteTitle) {siteTitle.textContent = t(state.locale, KEYS.title);document.title = t(state.locale, KEYS.title);};
  if (langBtnNode) langBtnNode.textContent = t(state.locale, KEYS.lang_toggle);
  if (tocTitle) tocTitle.textContent = t(state.locale, KEYS.toc_title);

  setHTML(tocNav, renderTOC(state.locale));
  setHTML(app, renderApp(state));
};
store.subscribe(draw);
draw();

const toggleLocale = () => {
  const current = store.get().locale;
  const next = current === "ja" ? "en" : "ja";
  setLocale(next);
  store.dispatch({ type: "SET_LOCALE", locale: next });
};
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#lang-toggle");
  if (btn) toggleLocale();
});

listen(tocNav, "click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;
  e.preventDefault();
  const id = a.getAttribute("href").substring(1);
  scrollToId(id);
  const url = new URL(location.href);
  url.hash = id;
  history.replaceState(null, "", url);
});

const sectionIds = ["about", "social", "works"];
observeSections(sectionIds, (activeId) => {
  qsa("[data-toc]").forEach(a => a.setAttribute("aria-current", String(a.getAttribute("data-toc") === activeId)));
});

if (location.hash) {
  const id = location.hash.substring(1);
  setTimeout(() => scrollToId(id), 50);
}
