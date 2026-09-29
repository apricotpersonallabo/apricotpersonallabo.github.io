const owner = 'apricotpersonallabo';
const siteOrigin = `https://${owner}.github.io`;
const grid = document.getElementById('project-grid');
const status = document.getElementById('projects-status');
const languageButtons = document.querySelectorAll('[data-language]');

const translations = {
  en: {
    pageTitle: 'apricot personal labo — Small ideas, made real.',
    metaDescription: 'Explore projects and GitHub Pages sites by apricot personal labo.',
    brandHome: 'Back to the top of apricot personal labo',
    mainNavigation: 'Main navigation',
    languageLabel: 'Language',
    navWorks: 'Works',
    navAbout: 'About',
    eyebrow: 'PERSONAL PROJECTS & EXPERIMENTS',
    heroTitleLead: 'Small ideas,',
    heroTitleAccent: 'made real.',
    heroDescriptionFirst: 'I turn everyday inconveniences into useful tools and web pages.',
    heroDescriptionSecond: "This is a place to explore what I've made.",
    viewProjects: 'Explore projects',
    worksLabel: 'PROJECTS',
    worksTitle: "Things I've made",
    worksIntro: 'A collection of my published GitHub Pages sites. Take a look around.',
    tabbyOpenSite: 'Open the Tabby Paste site',
    tabbyKind: 'BROWSER EXTENSION',
    tabbyDescription: 'A browser extension that pastes one spreadsheet row into multiple web form fields.',
    viewSite: 'Visit site',
    viewSource: 'View source on GitHub',
    aboutLabel: 'PROFILE',
    aboutTitleLead: "Hello, I'm",
    aboutTitleName: 'apricot personal labo.',
    aboutDescription: "I experiment with small ideas that make everyday tasks a little easier. If something I made for myself helps someone else, that's even better.",
    footerTagline: 'Making everyday life a little easier, one small idea at a time.',
    loading: 'Loading more published sites…',
    empty: 'There are no other published sites yet.',
    error: 'More sites could not be loaded. You can find them on my GitHub profile.',
    openGitHub: 'Open GitHub ↗',
    repoDescriptionFallback: 'A published GitHub Pages site.',
    openSite: name => `Open the ${name} site`,
  },
  ja: {
    pageTitle: 'apricot personal labo — 小さな工夫を、かたちに。',
    metaDescription: 'apricot personal labo の作品と GitHub Pages サイトをまとめたポートフォリオ。',
    brandHome: 'apricot personal labo トップへ',
    mainNavigation: 'メインナビゲーション',
    languageLabel: '言語',
    navWorks: '作品',
    navAbout: 'プロフィール',
    eyebrow: '個人制作と実験',
    heroTitleLead: '小さな工夫を、',
    heroTitleAccent: 'かたちに。',
    heroDescriptionFirst: '日々の「ちょっと不便」を出発点に、使いやすいツールや Web ページをつくっています。',
    heroDescriptionSecond: 'ここは、その制作物への入り口です。',
    viewProjects: '作品を見る',
    worksLabel: '作品',
    worksTitle: 'つくったもの',
    worksIntro: '公開中の GitHub Pages をまとめています。気になるものからのぞいてみてください。',
    tabbyOpenSite: 'Tabby Paste のサイトを開く',
    tabbyKind: 'ブラウザー拡張機能',
    tabbyDescription: '表計算シートの 1 行を、Web フォームの複数の入力欄へまとめて貼り付けられるブラウザー拡張機能。',
    viewSite: 'サイトを見る',
    viewSource: 'GitHub でソースを見る',
    aboutLabel: 'プロフィール',
    aboutTitleLead: 'こんにちは、',
    aboutTitleName: 'apricot personal labo です。',
    aboutDescription: '身近な作業を少し楽にするアイデアを、個人で試しながら形にしています。自分のためにつくったものが、誰かの役にも立てばうれしいです。',
    footerTagline: '小さな工夫から、毎日を少し使いやすく。',
    loading: 'ほかの公開サイトを読み込んでいます…',
    empty: '現在、ほかの公開サイトはありません。',
    error: 'ほかのサイトを表示できませんでした。GitHub のプロフィールからご覧ください。',
    openGitHub: 'GitHub を開く ↗',
    repoDescriptionFallback: '公開中の GitHub Pages サイトです。',
    openSite: name => `${name} のサイトを開く`,
  },
};

let currentLanguage = 'en';
let projectState = 'loading';
let publishedProjects = [];

function t(key) {
  return translations[currentLanguage][key];
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function pagesUrl(repo, pages) {
  if (pages?.html_url) {
    try {
      const publishedUrl = new URL(pages.html_url);
      if (publishedUrl.protocol === 'https:') return publishedUrl.href;
    } catch { /* Fall back to the repository URL. */ }
  }
  if (repo.homepage) {
    try {
      const homepage = new URL(repo.homepage);
      if (homepage.protocol === 'https:' && homepage.hostname === `${owner}.github.io`) {
        return homepage.href;
      }
    } catch { /* Fall back to the standard Pages URL. */ }
  }
  return `${siteOrigin}/${encodeURIComponent(repo.name)}/`;
}

function makeCard(repo, pages) {
  const card = element('article', 'project-card generated-card');
  const siteLink = element('a', 'card-site-link');
  siteLink.href = pagesUrl(repo, pages);
  siteLink.target = '_blank';
  siteLink.rel = 'noopener noreferrer';
  siteLink.setAttribute('aria-label', t('openSite')(repo.name));

  siteLink.append(element('div', 'card-visual generated'));
  const content = element('div', 'card-content');
  const topline = element('div', 'card-topline');
  topline.append(element('span', 'card-kind', 'GITHUB PAGES'), element('span', 'card-arrow', '↗'));
  topline.lastChild.setAttribute('aria-hidden', 'true');
  content.append(topline, element('h3', '', repo.name));
  content.append(element('p', '', repo.description || t('repoDescriptionFallback')));
  const cta = element('span', 'card-cta', `${t('viewSite')} `);
  const arrow = element('span', '', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  cta.append(arrow);
  content.append(cta);
  siteLink.append(content);

  const source = element('a', 'card-source', `${t('viewSource')} `);
  source.href = repo.html_url;
  source.target = '_blank';
  source.rel = 'noopener noreferrer';
  const sourceArrow = element('span', '', '↗');
  sourceArrow.setAttribute('aria-hidden', 'true');
  source.append(sourceArrow);
  card.append(siteLink, source);
  return card;
}

function renderProjects() {
  grid.querySelectorAll('.generated-card').forEach(card => card.remove());
  grid.append(...publishedProjects.map(({ repo, pages }) => makeCard(repo, pages)));
}

function renderStatus() {
  if (projectState === 'loading') {
    status.textContent = t('loading');
  } else if (projectState === 'ready') {
    status.textContent = publishedProjects.length ? '' : t('empty');
  } else {
    status.textContent = `${t('error')} `;
    const link = element('a', '', t('openGitHub'));
    link.href = `https://github.com/${owner}?tab=repositories`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    status.append(link);
  }
}

function setLanguage(language, persist = false) {
  currentLanguage = language === 'ja' ? 'ja' : 'en';
  document.documentElement.lang = currentLanguage;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]').content = t('metaDescription');
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(node => {
    node.setAttribute('aria-label', t(node.dataset.i18nAria));
  });
  languageButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage));
  });
  renderProjects();
  renderStatus();
  if (persist) {
    try { localStorage.setItem('language', currentLanguage); } catch { /* Storage may be unavailable. */ }
  }
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language, true));
});

let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('language') || 'en'; } catch { /* Use English by default. */ }
setLanguage(savedLanguage);
document.getElementById('year').textContent = new Date().getFullYear();

async function loadProjects() {
  try {
    const repos = [];
    for (let page = 1; page <= 10; page += 1) {
      const response = await fetch(`https://api.github.com/users/${owner}/repos?type=owner&per_page=100&page=${page}`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      const batch = await response.json();
      if (!Array.isArray(batch)) throw new Error('Unexpected API response');
      repos.push(...batch);
      if (batch.length < 100) break;
    }

    const pages = repos
      .filter(repo => repo.has_pages)
      .filter(repo => repo.name.toLowerCase() !== `${owner}.github.io` && repo.name.toLowerCase() !== 'tabbypaste')
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const siteDetails = await Promise.all(pages.map(async repo => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${encodeURIComponent(repo.name)}/pages`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        return response.ok ? await response.json() : null;
      } catch {
        return null;
      }
    }));

    publishedProjects = pages.map((repo, index) => ({ repo, pages: siteDetails[index] }));
    projectState = 'ready';
    renderProjects();
    renderStatus();
  } catch (error) {
    console.error('Could not load published sites:', error);
    projectState = 'error';
    renderStatus();
  }
}

loadProjects();
