export function initMagneticElements(): void {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>(".magnetic");
  for (const element of elements) {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate3d(${x * 0.12}px, ${y * 0.18}px, 0)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  }
}
