"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 40, stiffness: 150, mass: 1 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handlePointerDetect = () => {
      const target = document.querySelector(":hover");
      if (target) {
        const style = window.getComputedStyle(target);
        setIsPointer(style.cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handlePointerDetect);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handlePointerDetect);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Glow trail */}
      <motion.div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 60 : 40,
          height: isPointer ? 60 : 40,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
        }}
      />
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          background: isPointer
            ? "rgba(99,102,241,0.9)"
            : "rgba(255,255,255,0.9)",
          boxShadow: isPointer
            ? "0 0 12px rgba(99,102,241,0.8)"
            : "0 0 6px rgba(255,255,255,0.4)",
          transition:
            "width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
