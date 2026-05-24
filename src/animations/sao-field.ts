interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface DataStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
}

const PARTICLE_COUNT = 180;
const STREAM_COUNT = 36;
const LINK_DISTANCE = 120;

function startSaoField(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
  const subtle = canvas.hasAttribute("data-subtle");
  const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
  let width = 0;
  let height = 0;
  let frame = 0;
  let raf = 0;

  const particles: Particle[] = [];
  const streams: DataStream[] = [];

  function resize(): void {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function seed(): void {
    particles.length = 0;
    streams.length = 0;

    const count = subtle ? 64 : PARTICLE_COUNT;
    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (subtle ? 0.35 : 0.75),
        vy: (Math.random() - 0.5) * (subtle ? 0.35 : 0.75),
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    const streamCount = subtle ? 12 : STREAM_COUNT;
    for (let index = 0; index < streamCount; index += 1) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1.2 + Math.random() * 2.4,
        length: 40 + Math.random() * 120,
        alpha: 0.08 + Math.random() * 0.18,
      });
    }
  }

  function drawBackground(): void {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(4, 12, 28, 0.96)");
    gradient.addColorStop(0.55, "rgba(6, 18, 38, 0.94)");
    gradient.addColorStop(1, "rgba(2, 8, 20, 0.98)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    const pulse = 0.5 + Math.sin(frame * 0.01) * 0.5;
    const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, width * 0.42);
    glow.addColorStop(0, `rgba(0, 212, 255, ${subtle ? 0.05 : 0.1 + pulse * 0.05})`);
    glow.addColorStop(0.45, "rgba(77, 166, 255, 0.04)");
    glow.addColorStop(1, "rgba(2, 8, 20, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  }

  function drawGrid(): void {
    if (subtle) {
      return;
    }

    context.save();
    context.strokeStyle = "rgba(0, 212, 255, 0.06)";
    context.lineWidth = 1;

    const spacing = 48;
    for (let x = 0; x < width; x += spacing) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += spacing) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.restore();
  }

  function step(): void {
    frame += 1;
    drawBackground();
    drawGrid();

    for (const stream of streams) {
      stream.y -= stream.speed;
      if (stream.y + stream.length < 0) {
        stream.y = height + Math.random() * 120;
        stream.x = Math.random() * width;
      }

      const gradient = context.createLinearGradient(stream.x, stream.y, stream.x, stream.y + stream.length);
      gradient.addColorStop(0, `rgba(0, 212, 255, 0)`);
      gradient.addColorStop(0.5, `rgba(0, 212, 255, ${stream.alpha})`);
      gradient.addColorStop(1, `rgba(77, 166, 255, 0)`);
      context.strokeStyle = gradient;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(stream.x, stream.y);
      context.lineTo(stream.x, stream.y + stream.length);
      context.stroke();
    }

    for (const particle of particles) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = subtle ? 0.001 : 0.002;
      particle.vx += (dx / dist) * force;
      particle.vy += (dy / dist) * force;
      particle.vx *= 0.985;
      particle.vy *= 0.985;
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;
    }

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance > LINK_DISTANCE) {
          continue;
        }
        const alpha = (1 - distance / LINK_DISTANCE) * (subtle ? 0.14 : 0.38);
        context.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }

    for (const particle of particles) {
      context.beginPath();
      context.fillStyle = `rgba(125, 220, 255, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }

    raf = window.requestAnimationFrame(step);
  }

  resize();
  seed();
  step();

  window.addEventListener("resize", () => {
    resize();
    seed();
  });
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
      } else {
        step();
      }
    },
    { passive: true },
  );
}

export function initSaoField(): void {
  const canvasElement = document.getElementById("sao-field");
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvasElement.getContext("2d");
  if (!context) {
    return;
  }

  startSaoField(canvasElement, context);
}
