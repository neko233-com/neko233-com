const MODEL_URL = "/live2d/haru/Haru.model3.json";
const CORE_SCRIPT = "/live2d/live2dcubismcore.min.js";

let corePromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function ensureCubismCore(): Promise<void> {
  if (window.Live2DCubismCore) {
    return;
  }

  if (!corePromise) {
    corePromise = loadScript(CORE_SCRIPT).then(() => {
      if (!window.Live2DCubismCore) {
        throw new Error("Live2D Cubism Core did not initialize");
      }
    });
  }

  await corePromise;
}

function layoutModel(
  model: { width: number; height: number; scale: { set: (value: number) => void }; anchor: { set: (x: number, y: number) => void }; position: { set: (x: number, y: number) => void } },
  app: { renderer: { resize: (width: number, height: number) => void } },
  host: HTMLElement,
): void {
  const bounds = host.getBoundingClientRect();
  const width = bounds.width || host.clientWidth || 420;
  const height = bounds.height || host.clientHeight || 560;

  app.renderer.resize(width, height);

  const scale = Math.min(width / model.width, height / model.height) * 0.92;
  model.scale.set(scale);
  model.anchor.set(0.5, 0.5);
  model.position.set(width * 0.5, height * 0.58);
}

export async function initLive2dStage(): Promise<void> {
  const host = document.getElementById("live2d-stage");
  if (!host || host.dataset.live2dReady === "true") {
    return;
  }

  host.dataset.live2dReady = "true";

  try {
    await ensureCubismCore();

    const [pixi, live2d] = await Promise.all([
      import("pixi.js"),
      import("pixi-live2d-display/cubism4"),
    ]);

    window.PIXI = pixi;

    const app = new pixi.Application({
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
    });

    host.appendChild(app.view as HTMLCanvasElement);
    (app.view as HTMLCanvasElement).style.touchAction = "none";

    const model = await live2d.Live2DModel.from(MODEL_URL, {
      autoInteract: true,
      autoUpdate: true,
    });

    app.stage.addChild(model as never);
    layoutModel(model, app, host);

    model.on("hit", (hitAreas: string[]) => {
      if (hitAreas.includes("Body")) {
        model.motion("TapBody");
        return;
      }
      if (hitAreas.includes("Head")) {
        model.expression("F02");
      }
    });

    const idleLoop = (): void => {
      if (!model.destroyed) {
        model.motion("Idle");
      }
    };

    idleLoop();
    window.setInterval(idleLoop, 18_000);

    const onResize = (): void => {
      layoutModel(model, app, host);
    };

    window.addEventListener("resize", onResize, { passive: true });

    host.addEventListener(
      "pointermove",
      (event) => {
        model.focus(event.clientX, event.clientY);
      },
      { passive: true },
    );
  } catch (error) {
    host.dataset.live2dReady = "false";
    host.classList.add("live2d-stage--fallback");
    console.warn("Live2D stage unavailable:", error);
  }
}

declare global {
  interface Window {
    Live2DCubismCore?: unknown;
    PIXI?: typeof import("pixi.js");
  }
}
