export type Locale = "zh" | "en";

export const locales: Locale[] = ["zh", "en"];

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

export const localeOgLocale: Record<Locale, string> = {
  zh: "zh_CN",
  en: "en_US",
};

export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    return normalized === "/" ? "/en/" : `/en${normalized}`;
  }
  return normalized;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "zh" ? "en" : "zh";
}

export function postPath(locale: Locale, slug: string): string {
  return localePath(locale, `/posts/${slug}/`);
}

export function homePath(locale: Locale): string {
  return localePath(locale, "/");
}

export const autoLocaleRedirectScript = `(function(){try{var s=localStorage.getItem("locale");var p=location.pathname;var en=p==="/en"||p.indexOf("/en/")===0;if(s==="en"&&!en){location.replace("/en"+(p==="/"?"":p)+location.search+location.hash);return}if(s==="zh"&&en){var t=p.replace(/^\\/en/,"")||"/";location.replace(t+location.search+location.hash);return}if(!s){var l=(navigator.language||"").toLowerCase();if(!l.startsWith("zh")&&!en){location.replace("/en"+(p==="/"?"":p)+location.search+location.hash)}}}catch(e){}})();`;
