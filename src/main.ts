import { initLocaleSwitcher, markCurrentLocale } from "./i18n/locale-switcher";
import "./styles/main.css";
import { initCursorGlow } from "./animations/cursor-glow";
import { initHudClock } from "./animations/hud-clock";
import { initMagneticElements } from "./animations/magnetic";
import { initRevealObserver } from "./animations/reveal";
import { initSaoField } from "./animations/sao-field";
import { initTextScramble } from "./animations/text-scramble";
import { initTiltCards } from "./animations/tilt-cards";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function boot(): void {
  markCurrentLocale();
  initLocaleSwitcher();
  initRevealObserver();
  initHudClock();

  if (prefersReducedMotion()) {
    return;
  }

  initSaoField();
  initCursorGlow();
  initMagneticElements();
  initTextScramble();
  initTiltCards();

  if (document.getElementById("live2d-stage")) {
    void import("./animations/live2d-stage").then((module) => module.initLive2dStage());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
