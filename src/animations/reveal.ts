export function initRevealObserver(): void {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.16 },
  );

  for (const item of items) {
    observer.observe(item);
  }
}
