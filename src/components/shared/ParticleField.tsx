"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient depth field.
 *
 * Three parallax layers of slow-drifting motes rather than a flat starfield —
 * far motes are small, dim and barely move; near motes are larger and respond
 * to the pointer. A handful of "signature" warm motes are seeded in for accent.
 * Constellation lines are drawn only within the nearest layer, so the effect
 * reads as atmosphere instead of a generic connected-dots template.
 */

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // 0 = far, 1 = near
  alpha: number;
  hue: [number, number, number];
  twinkle: number;
  twinkleSpeed: number;
  /** Last painted position, including pointer displacement. */
  screenX?: number;
  screenY?: number;
};

const INDIGO: [number, number, number] = [129, 140, 248];
const VIOLET: [number, number, number] = [167, 139, 250];
const CYAN: [number, number, number] = [56, 189, 248];
const SIGNATURE: [number, number, number] = [251, 146, 133];

function pickHue(i: number): [number, number, number] {
  // Signature motes are rare and deliberate — roughly 1 in 12.
  if (i % 12 === 5) return SIGNATURE;
  if (i % 3 === 0) return VIOLET;
  if (i % 5 === 0) return CYAN;
  return INDIGO;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const motesRef = useRef<Mote[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const seed = () => {
      const density = Math.min(Math.floor(width / 26), 62);
      motesRef.current = Array.from({ length: density }, (_, i) => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.08 + depth * 0.16),
          vy: (Math.random() - 0.5) * (0.08 + depth * 0.16),
          r: 0.5 + depth * 1.5,
          depth,
          alpha: 0.1 + depth * 0.32,
          hue: pickHue(i),
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.004 + Math.random() * 0.008,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    resize();

    const onPointer = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const motes = motesRef.current;
      const pointer = pointerRef.current;

      for (const m of motes) {
        if (!reduced) {
          m.x += m.vx;
          m.y += m.vy;
          m.twinkle += m.twinkleSpeed;
        }

        // Wrap rather than bounce — bouncing makes the edges feel like walls.
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;
        if (m.y < -20) m.y = height + 20;
        if (m.y > height + 20) m.y = -20;

        // Near-layer motes drift gently away from the cursor.
        let px = m.x;
        let py = m.y;
        if (pointer.active && m.depth > 0.5) {
          const dx = m.x - pointer.x;
          const dy = m.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000 && d2 > 1) {
            const push = (1 - d2 / 26000) * 18 * m.depth;
            const d = Math.sqrt(d2);
            px += (dx / d) * push;
            py += (dy / d) * push;
          }
        }

        const a = m.alpha * (0.72 + Math.sin(m.twinkle) * 0.28);
        const [r, g, b] = m.hue;

        // Soft halo on the nearest motes only — keeps the fill rate sane.
        if (m.depth > 0.72) {
          const halo = ctx.createRadialGradient(px, py, 0, px, py, m.r * 7);
          halo.addColorStop(0, `rgba(${r},${g},${b},${a * 0.4})`);
          halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(px, py, m.r * 7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();

        m.screenX = px;
        m.screenY = py;
      }

      // Constellation lines within the near layer only.
      const near = motes.filter((m) => m.depth > 0.6);
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i];
          const b = near[j];
          const dx = (a.screenX ?? a.x) - (b.screenX ?? b.x);
          const dy = (a.screenY ?? a.y) - (b.screenY ?? b.y);
          const d2 = dx * dx + dy * dy;
          if (d2 > 21000) continue;
          const alpha = (1 - Math.sqrt(d2) / 145) * 0.055;
          ctx.beginPath();
          ctx.moveTo(a.screenX ?? a.x, a.screenY ?? a.y);
          ctx.lineTo(b.screenX ?? b.x, b.screenY ?? b.y);
          ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onPointer, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointer);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
