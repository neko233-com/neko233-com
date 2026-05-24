export function initGridWarp(): void {
  const grid = document.querySelector<HTMLElement>("[data-grid-warp]");
  if (!grid || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * -12;
      grid.style.transform = `rotateX(${58 + y}deg) rotateZ(${-28 + x * 0.35}deg) translate3d(${x}px, ${y}px, 0)`;
    },
    { passive: true },
  );
}
