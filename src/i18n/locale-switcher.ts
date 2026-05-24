import { alternateLocale, localePath, type Locale } from "../i18n/locale";

function currentPathForSwitch(locale: Locale): string {
  const pathname = window.location.pathname;
  if (locale === "en") {
    if (pathname === "/" || pathname === "/index.html") {
      return "/en/";
    }
    if (pathname.startsWith("/posts/")) {
      return `/en${pathname}`;
    }
    return "/en/";
  }

  if (pathname === "/en" || pathname === "/en/") {
    return "/";
  }
  if (pathname.startsWith("/en/posts/")) {
    return pathname.replace(/^\/en/, "") || "/";
  }
  return pathname || "/";
}

export function initLocaleSwitcher(): void {
  const button = document.querySelector<HTMLButtonElement>(".lang-switch");
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const current = (document.body.dataset.locale as Locale | undefined) ?? "zh";
    const target = alternateLocale(current);
    localStorage.setItem("locale", target);
    const nextPath = localePath(target, currentPathForSwitch(current));
    window.location.href = `${nextPath}${window.location.hash}`;
  });
}

export function markCurrentLocale(): void {
  const locale = (document.body.dataset.locale as Locale | undefined) ?? "zh";
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
}
