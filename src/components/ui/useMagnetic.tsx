"use client";

import { useRef, useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";

type MagneticOptions = {
  /** Max tilt in degrees on each axis. Deliberately small — a nudge, not a flip. */
  tilt?: number;
  /** Skip the tilt and keep only the cursor spotlight. */
  spotlightOnly?: boolean;
};

/**
 * Cursor-linked card interaction, split into two composable pieces so it can be
 * dropped onto existing `motion.*` elements without changing their markup:
 *
 *  1. **Magnetic tilt** — spring-damped `rotateX`/`rotateY` motion values driven
 *     by the pointer's position within the card. GPU transforms only.
 *  2. **Spotlight** — the pointer position is written to the `--x` / `--y` CSS
 *     custom properties on the element, which `<CardSpotlight />` reads.
 *
 * Pointer moves never trigger a React re-render: the tilt goes through motion
 * values and the spotlight through direct style writes.
 *
 * Honors `prefers-reduced-motion` (tilt disabled here; the spotlight is hidden
 * by the CSS guard in globals.css) and is inert on coarse pointers.
 */
export function useMagnetic({
  tilt = 4,
  spotlightOnly = false,
}: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Normalized pointer offset from the card center, range [-0.5, 0.5].
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-tilt, tilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [tilt, -tilt]);

  const tiltEnabled = !reduceMotion && !spotlightOnly;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);

      if (tiltEnabled) {
        px.set(x / rect.width - 0.5);
        py.set(y / rect.height - 0.5);
      }
    },
    [tiltEnabled, px, py],
  );

  const onMouseEnter = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    px.set(0);
    py.set(0);
    ref.current?.style.setProperty("--spot-opacity", "0");
  }, [px, py]);

  /** Spread onto the card element. */
  const bind = {
    // framer-motion's ref typing is per-element; the hook is element-agnostic.
    ref: ref as React.Ref<never>,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };

  /** Merge into the card element's `style`. */
  const motionStyle: MotionStyle = tiltEnabled
    ? { rotateX, rotateY, transformPerspective: 1000 }
    : {};

  return { bind, motionStyle, tiltEnabled };
}

/**
 * The radial spotlight overlay. Render as the first child of a magnetic card;
 * it reads the `--x` / `--y` vars the hook writes on the parent.
 */
export function CardSpotlight({
  size = 320,
  color = "rgba(251, 113, 133, 0.16)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`card-spotlight ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--x, 50%) var(--y, 50%), ${color}, transparent 70%)`,
      }}
    />
  );
}
