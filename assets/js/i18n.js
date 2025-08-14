const DICT = {
  en: {
    title: "Apricot personal labo",
    toc_title: "Contents",
    toc_about: "About me",
    about_heading: "About me",
    about_body: "A sandbox and a notebook. Storing code snippets, work notes, and reminders for my future self. I hope it can be useful for someone.",
    toc_social: "SNS",
    social_heading: "SNS",
    toc_works: "Samples",
    works_heading: "Samples",
    works_note: " ",
    project_open: "Open",
    updated: "Updated",
    technologies: "Technologies",
    lang_toggle: "EN / 日本語"
  },
  ja: {
    title: "Apricot personal labo",
    toc_title: "Contents",
    toc_about: "About me",
    about_heading: "About me",
    about_body: "主に備忘録・作業メモ・サンプルコードを置いています。自分用の記録が中心ですが、どなたかの参考になれば幸いです。",
    toc_social: "SNS",
    social_heading: "SNS",
    toc_works: "サンプル",
    works_heading: "サンプル",
    works_note: " ",
    project_open: "開く",
    updated: "更新日",
    technologies: "テクノロジー",
    lang_toggle: "EN / 日本語"
  }
};
export const getLocale = () => {
  const v = new URLSearchParams(location.search).get("lang");
  return v === "en" ? "en" : "ja";
};
export const setLocale = (locale, { replace = false } = {}) => {
  const url = new URL(location.href);
  url.searchParams.set("lang", locale);
  history[replace ? "replaceState" : "pushState"](null, "", url);
  return locale;
};
export const t = (locale, key) => (DICT[locale] && DICT[locale][key]) || key;
export const KEYS = Object.freeze({
  title: "title",
  toc_title: "toc_title",
  toc_about: "toc_about",
  toc_social: "toc_social",
  toc_works: "toc_works",
  about_heading: "about_heading",
  about_body: "about_body",
  social_heading: "social_heading",
  works_heading: "works_heading",
  works_note: "works_note",
  project_open: "project_open",
  updated: "updated",
  technologies: "technologies",
  lang_toggle: "lang_toggle"
});
