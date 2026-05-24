export function initCursorGlow(): void {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const glow = document.querySelector(".cursor-glow") as HTMLElement | null;
  if (!glow) {
    return;
  }

  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  let currentX = targetX;
  let currentY = targetY;
  let raf = 0;

  function tick(): void {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;
    glow.style.transform = `translate3d(${currentX - 180}px, ${currentY - 180}px, 0)`;
    raf = window.requestAnimationFrame(tick);
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true },
  );

  tick();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(raf);
    } else {
      tick();
    }
  });
}
