const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function initTextScramble(): void {
  const elements = document.querySelectorAll<HTMLElement>("[data-scramble]");
  for (const element of elements) {
    const finalText = element.dataset.scramble ?? element.textContent ?? "";
    scramble(element, finalText);
  }
}

function scramble(element: HTMLElement, finalText: string): void {
  let frame = 0;
  const length = finalText.length;
  const totalFrames = Math.max(28, length * 3);

  const timer = window.setInterval(() => {
    frame += 1;
    const progress = frame / totalFrames;
    const revealed = Math.floor(progress * length);

    let output = "";
    for (let index = 0; index < length; index += 1) {
      if (finalText[index] === " ") {
        output += " ";
        continue;
      }
      if (index < revealed) {
        output += finalText[index];
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }

    element.textContent = output;

    if (frame >= totalFrames) {
      window.clearInterval(timer);
      element.textContent = finalText;
    }
  }, 28);
}
