import { initLocaleSwitcher, markCurrentLocale } from "./i18n/locale-switcher";
import "./styles/main.css";
import { initAuroraCanvas } from "./animations/aurora-canvas";
import { initCursorGlow } from "./animations/cursor-glow";
import { initGridWarp } from "./animations/grid-warp";
import { initMagneticElements } from "./animations/magnetic";
import { initRevealObserver } from "./animations/reveal";
import { initTextScramble } from "./animations/text-scramble";
import { initTiltCards } from "./animations/tilt-cards";
import { initTerminalTypewriter } from "./animations/terminal";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function boot(): void {
  markCurrentLocale();
  initLocaleSwitcher();
  initRevealObserver();

  if (prefersReducedMotion()) {
    return;
  }

  initAuroraCanvas();
  initCursorGlow();
  initGridWarp();
  initMagneticElements();
  initTextScramble();
  initTiltCards();
  initTerminalTypewriter();

  if (document.getElementById("live2d-stage")) {
    void import("./animations/live2d-stage").then((module) => module.initLive2dStage());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
