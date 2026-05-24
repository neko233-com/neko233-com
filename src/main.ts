import { initLocaleSwitcher, markCurrentLocale } from "./i18n/locale-switcher";
import "./styles/main.css";
import { initAuroraCanvas } from "./animations/aurora-canvas";
import { initCursorGlow } from "./animations/cursor-glow";
import { initMagneticElements } from "./animations/magnetic";
import { initRevealObserver } from "./animations/reveal";
import { initTiltCards } from "./animations/tilt-cards";

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
  initMagneticElements();
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
