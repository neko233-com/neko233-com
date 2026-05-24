export const siteConfig = {
  name: "neko233",
  nameZh: "可乐鸡翅",
  tagline: "Edge Blog",
  description:
    "Code, automation, systems, and Cloudflare edge notes from neko233（可乐鸡翅）.",
  url: "https://neko233.com",
  author: "neko233",
  github: "https://github.com/neko233-com/neko233-com",
  themeColor: "#05070d",
} as const;

export function siteDisplayName(): string {
  return `${siteConfig.name} · ${siteConfig.nameZh}`;
}
