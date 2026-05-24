export function initTiltCards(): void {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
  for (const card of cards) {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateX(${x * 8}px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  }
}
