import { getPostContent, getSortedPosts, type Post } from "../data/posts";
import { getProfile } from "../data/profile";
import { repoDescription, repos } from "../data/repos";
import { siteConfig, siteDescription, siteDisplayName } from "../data/site";
import { localeHtmlLang, postPath, type Locale } from "../i18n/locale";
import { escapeHtml } from "./html";

function json(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function renderPersonJsonLd(locale: Locale): string {
  const profile = getProfile(locale);
  return json({
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteDisplayName(locale),
    alternateName: [siteConfig.name, siteConfig.nameZh, "Ke Le Ji Chi"],
    url: siteConfig.url,
    jobTitle: `${profile.role} / ${profile.title}`,
    description: profile.summary,
    email: siteConfig.email,
    sameAs: [siteConfig.github],
    knowsAbout: profile.expertise,
  });
}

export function renderWebsiteJsonLd(locale: Locale): string {
  return json({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteDisplayName(locale),
    url: siteConfig.url,
    description: siteDescription(locale),
    inLanguage: localeHtmlLang[locale],
    author: {
      "@type": "Person",
      name: siteDisplayName(locale),
      url: siteConfig.github,
    },
  });
}

export function renderBlogJsonLd(locale: Locale): string {
  return json({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteDisplayName(locale)} Blog`,
    url: locale === "en" ? `${siteConfig.url}/en/` : `${siteConfig.url}/`,
    description: siteDescription(locale),
    inLanguage: localeHtmlLang[locale],
    author: {
      "@type": "Person",
      name: siteDisplayName(locale),
    },
    blogPost: getSortedPosts().map((post) => {
      const content = getPostContent(post, locale);
      return {
        "@type": "BlogPosting",
        headline: content.title,
        url: `${siteConfig.url}${postPath(locale, post.slug)}`,
        datePublished: post.date,
        description: content.description,
        inLanguage: localeHtmlLang[locale],
      };
    }),
  });
}

export function renderBlogPostingJsonLd(post: Post, locale: Locale): string {
  const content = getPostContent(post, locale);
  return json({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.description,
    datePublished: post.date,
    inLanguage: localeHtmlLang[locale],
    author: {
      "@type": "Person",
      name: siteDisplayName(locale),
      url: siteConfig.github,
    },
    publisher: {
      "@type": "Person",
      name: siteDisplayName(locale),
    },
    mainEntityOfPage: `${siteConfig.url}${postPath(locale, post.slug)}`,
    url: `${siteConfig.url}${postPath(locale, post.slug)}`,
  });
}

export function renderRepoListJsonLd(locale: Locale): string {
  return json({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} GitHub repositories`,
    itemListElement: repos.map((repo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: repo.name,
      url: repo.url,
      description: repoDescription(repo, locale),
    })),
  });
}

export function renderFaqJsonLd(locale: Locale): string {
  const profile = getProfile(locale);
  const questions =
    locale === "zh"
      ? [
          { q: "neko233（可乐鸡翅）是谁？", a: profile.summary },
          { q: "neko233 现在在做什么？", a: profile.doingNow },
          { q: "neko233 的业务方向是什么？", a: profile.businessDirection },
          { q: "neko233 的技术方向是什么？", a: profile.techDirection },
          { q: "如何联系 neko233？", a: siteConfig.email },
        ]
      : [
          { q: "Who is neko233 (Ke Le Ji Chi)?", a: profile.summary },
          { q: "What is neko233 working on?", a: profile.doingNow },
          { q: "What is neko233's business focus?", a: profile.businessDirection },
          { q: "What is neko233's technical focus?", a: profile.techDirection },
          { q: "How to contact neko233?", a: siteConfig.email },
        ];

  return json({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });
}

export function renderLlmsTxt(): string {
  const profile = getProfile("zh");
  const profileEn = getProfile("en");

  const repoLines = repos
    .map((repo) => `- ${repo.name}: ${repo.description.zh} / ${repo.description.en} (${repo.url})`)
    .join("\n");

  const postLines = getSortedPosts()
    .map((post) => {
      const zh = getPostContent(post, "zh");
      const en = getPostContent(post, "en");
      return `- ${zh.title} / ${en.title}\n  zh: ${siteConfig.url}${postPath("zh", post.slug)}\n  en: ${siteConfig.url}${postPath("en", post.slug)}`;
    })
    .join("\n");

  return `# ${siteDisplayName("zh")} / ${siteDisplayName("en")}

> ${profile.summary}

> EN: ${profileEn.summary}

## Identity / 身份
- Name: neko233 / 可乐鸡翅 / Ke Le Ji Chi
- Role: ${profile.role} / ${profileEn.role}
- Title: ${profile.title} / ${profileEn.title}
- Business: ${profile.businessDirection}
- Tech: ${profile.techDirection}
- Contact: ${siteConfig.email}
- Background: ${profile.previousExperience}

> EN business: ${profileEn.businessDirection}
> EN tech: ${profileEn.techDirection}

## Languages / 语言
- Chinese: ${siteConfig.url}/
- English: ${siteConfig.url}/en/
- Auto locale: browser language + localStorage override

## Site / 网站
- RSS: ${siteConfig.url}/feed.xml
- Sitemap: ${siteConfig.url}/sitemap.xml
- GitHub: ${siteConfig.github}

## GitHub Repositories
${repoLines}

## Posts / 文章
${postLines}
`;
}

export function renderSeoKeywords(locale: Locale): string {
  return escapeHtml(getProfile(locale).keywords.join(", "));
}
