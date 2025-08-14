export const qs = (sel, scope = document) => scope.querySelector(sel);
export const qsa = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
export const setHTML = (node, html) => { node.innerHTML = html; return node; };
export const listen = (node, type, handler, opts) => {
  node.addEventListener(type, handler, opts);
  return () => node.removeEventListener(type, handler, opts);
};
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};
export const observeSections = (sectionIds, onActiveId) => {
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) onActiveId(visible.target.id);
  }, { threshold: [0.5, 0.75] });
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
  return () => io.disconnect();
};
