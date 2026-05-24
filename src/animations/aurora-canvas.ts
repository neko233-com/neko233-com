interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
}

const MAX_PARTICLES = 120;
const LINK_DISTANCE = 140;

export function initAuroraCanvas(): void {
  const canvas = document.getElementById("aurora-canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const subtle = canvas.hasAttribute("data-subtle");
  const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
  let width = 0;
  let height = 0;
  let frame = 0;
  let raf = 0;

  const particles: Particle[] = [];

  function resize(): void {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function seedParticles(): void {
    particles.length = 0;
    const count = subtle ? 48 : MAX_PARTICLES;
    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (subtle ? 0.25 : 0.55),
        vy: (Math.random() - 0.5) * (subtle ? 0.25 : 0.55),
        radius: Math.random() * 1.8 + 0.6,
        hue: 180 + Math.random() * 120,
      });
    }
  }

  function drawBackground(): void {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(5, 7, 13, 0.92)");
    gradient.addColorStop(0.45, "rgba(7, 16, 29, 0.88)");
    gradient.addColorStop(1, "rgba(15, 21, 32, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const pulse = 0.5 + Math.sin(frame * 0.008) * 0.5;
    const glow = ctx.createRadialGradient(
      pointer.x,
      pointer.y,
      0,
      pointer.x,
      pointer.y,
      width * 0.45,
    );
    glow.addColorStop(0, `rgba(0, 231, 255, ${subtle ? 0.04 : 0.08 + pulse * 0.04})`);
    glow.addColorStop(0.55, "rgba(255, 79, 216, 0.03)");
    glow.addColorStop(1, "rgba(5, 7, 13, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function step(): void {
    frame += 1;
    drawBackground();

    for (const particle of particles) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = subtle ? 0.0008 : 0.0016;
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
        const alpha = (1 - distance / LINK_DISTANCE) * (subtle ? 0.18 : 0.34);
        ctx.strokeStyle = `hsla(${(a.hue + b.hue) * 0.5}, 90%, 68%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const particle of particles) {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue + Math.sin(frame * 0.02 + particle.x) * 18}, 95%, 72%, 0.85)`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = window.requestAnimationFrame(step);
  }

  function onPointerMove(event: PointerEvent): void {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }

  resize();
  seedParticles();
  step();

  window.addEventListener("resize", () => {
    resize();
    seedParticles();
  });
  window.addEventListener("pointermove", onPointerMove);

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
