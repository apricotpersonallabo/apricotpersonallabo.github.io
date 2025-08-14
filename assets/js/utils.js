export const id = x => x;
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
export const merge = (a, b) => ({ ...a, ...b });
export const assoc = (key, value, obj) => ({ ...obj, [key]: value });
export const pick = (keys, obj) => keys.reduce((acc, k) => (k in obj ? (acc[k] = obj[k], acc) : acc), {});
export const mapObj = (fn, obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
export const el = (tag, props = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  [].concat(children).forEach(c => {
    if (c == null) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
};
export const escapeHtml = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
export const a = (href, text, attrs={}) => {
  const attrStr = Object.entries(attrs).map(([k,v]) => `${k}="${escapeHtml(v)}"`).join(" ");
  return `<a href="${escapeHtml(href)}"${attrStr ? " " + attrStr : ""}>${escapeHtml(text)}</a>`;
};
