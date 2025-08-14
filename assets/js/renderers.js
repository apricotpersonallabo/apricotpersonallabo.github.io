import { escapeHtml, a } from "./utils.js";
import { t, KEYS } from "./i18n.js";
const withLang = (href, locale) => {
  try {
    const u = new URL(href, location.href);
    u.searchParams.set("lang", locale);
    return u.pathname + u.search + u.hash;
  } catch {
    const hasQuery = href.includes("?");
    return `${href}${hasQuery ? "&" : "?"}lang=${encodeURIComponent(locale)}`;
  }
};
export const renderTOC = (locale) => {
  const items = [
    { id: "about", label: t(locale, KEYS.toc_about) },
    { id: "social", label: t(locale, KEYS.toc_social) },
    { id: "works", label: t(locale, KEYS.toc_works) }
  ];
  return items.map(it => `<a href="#${it.id}" data-toc="${it.id}">${escapeHtml(it.label)}</a>`).join("");
};
export const renderAbout = (locale) => `
  <section id="about" aria-labelledby="about-h">
    <h2 id="about-h">${escapeHtml(t(locale, KEYS.about_heading))}</h2>
    <p>${escapeHtml(t(locale, KEYS.about_body))}</p>
    <div class="row">
      <span class="badge">HTML</span>
      <span class="badge">CSS</span>
      <span class="badge">JavaScript</span>
    </div>
  </section>
`;
export const renderSocials = (locale, socials) => `
  <section id="social" aria-labelledby="social-h">
    <h2 id="social-h">${escapeHtml(t(locale, KEYS.social_heading))}</h2>
    <ul class="link-list">
      ${socials.map(s => `
        <li>
          ${a(s.url, s.label[locale] || s.label.en, {"target":"_blank","rel":"noopener noreferrer"})}
        </li>
      `).join("")}
    </ul>
  </section>
`;
export const renderProjects = (locale, projects) => `
  <section id="works" aria-labelledby="works-h">
    <h2 id="works-h">${escapeHtml(t(locale, KEYS.works_heading))}</h2>
    <p class="muted">${escapeHtml(t(locale, KEYS.works_note))}</p>
    <div class="grid cols-6">
      ${projects.map(p => {
        const href = withLang(p.url, locale);
        return `
        <article class="card project-card" id="proj-${escapeHtml(p.id)}">
          <header>
            <!-- removed: updated -->
            <h3>
              <a class="project-title-link" href="${escapeHtml(href)}">
                ${escapeHtml(p.title[locale] || p.title.en)}
              </a>
            </h3>
            <div class="meta">${escapeHtml(p.summary[locale] || p.summary.en)}</div>
            <div class="stack">
              <span class="muted">${escapeHtml(t(locale, KEYS.technologies))}:</span>
              ${p.tech.map(tk => `<span class="badge">${escapeHtml(tk)}</span>`).join("")}
            </div>
          </header>
          <!-- removed: .actions (Open button) -->
        </article>`;
      }).join("")}
    </div>
  </section>
`;
export const renderApp = (state) => [
  renderAbout(state.locale),
  renderSocials(state.locale, state.socials),
  renderProjects(state.locale, state.projects)
].join("\n");
