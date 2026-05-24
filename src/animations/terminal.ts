function startTerminalTypewriter(terminal: HTMLElement): void {
  const lines = [...terminal.querySelectorAll<HTMLElement>("p")];
  terminal.classList.add("is-typing");

  let lineIndex = 0;

  function typeLine(line: HTMLElement): void {
    const full = line.textContent ?? "";
    line.textContent = "";
    let charIndex = 0;

    const timer = window.setInterval(() => {
      line.textContent = full.slice(0, charIndex);
      charIndex += 1;
      if (charIndex > full.length) {
        window.clearInterval(timer);
        lineIndex += 1;
        if (lineIndex < lines.length) {
          window.setTimeout(() => typeLine(lines[lineIndex]), 180);
        } else {
          terminal.classList.remove("is-typing");
          terminal.classList.add("is-complete");
        }
      }
    }, 16);
  }

  window.setTimeout(() => typeLine(lines[0]), 500);
}

export function initTerminalTypewriter(): void {
  const terminalElement = document.querySelector("[data-terminal]");
  if (!(terminalElement instanceof HTMLElement)) {
    return;
  }

  startTerminalTypewriter(terminalElement);
}
