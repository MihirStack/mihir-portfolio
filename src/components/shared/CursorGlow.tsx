"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-part cursor: a crisp dot that tracks tightly, and a soft aurora halo
 * that lags behind it. Over interactive elements the dot hollows out into a
 * ring and the halo warms to the signature accent.
 *
 * Hidden entirely on coarse pointers (touch), where a fake cursor is noise.
 */
export default function CursorGlow() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 28, stiffness: 900, mass: 0.28 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 900, mass: 0.28 });

  const haloX = useSpring(mouseX, { damping: 34, stiffness: 130, mass: 1.1 });
  const haloY = useSpring(mouseY, { damping: 34, stiffness: 130, mass: 1.1 });

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Hit-test at most once per frame — querying computed styles on every
      // mousemove was the expensive part of the old implementation.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) return;
        const interactive = el.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]'
        );
        setIsPointer(
          Boolean(interactive) ||
            window.getComputedStyle(el).cursor === "pointer"
        );
      });
    };

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);
    const down = () => setIsDown(true);
    const up = () => setIsDown(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Aurora halo */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 240 : 170,
          height: isPointer ? 240 : 170,
          opacity: isVisible ? (isPointer ? 1 : 0.75) : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 26 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isPointer
              ? "radial-gradient(circle, rgba(251,113,133,0.16) 0%, rgba(192,38,211,0.07) 45%, transparent 72%)"
              : "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.06) 45%, transparent 72%)",
            transition: "background 0.4s ease",
            filter: "blur(4px)",
          }}
        />
      </motion.div>

      {/* Precision dot / ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 34 : 7,
          height: isPointer ? 34 : 7,
          opacity: isVisible ? 1 : 0,
          scale: isDown ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isPointer ? "transparent" : "rgba(255,255,255,0.92)",
            border: isPointer ? "1.5px solid rgba(251,146,133,0.9)" : "none",
            boxShadow: isPointer
              ? "0 0 18px rgba(251,113,133,0.5)"
              : "0 0 10px rgba(255,255,255,0.35)",
            transition: "background 0.2s ease, border 0.2s ease, box-shadow 0.3s ease",
          }}
        />
      </motion.div>
    </>
  );
}
