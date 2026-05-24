export function initHudClock(): void {
  const nodes = document.querySelectorAll<HTMLElement>("[data-hud-clock]");
  if (nodes.length === 0) {
    return;
  }

  const tick = (): void => {
    const now = new Date();
    const stamp = now.toISOString().replace("T", " ").slice(0, 19);
    for (const node of nodes) {
      node.textContent = stamp;
    }
  };

  tick();
  window.setInterval(tick, 1000);
}
