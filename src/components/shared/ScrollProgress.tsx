"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  // The travelling glow head fades in once the user has actually started reading.
  const headOpacity = useTransform(scrollYProgress, [0, 0.02, 0.99, 1], [0, 1, 1, 0]);
  const headLeft = useTransform(scaleX, (v) => `${v * 100}%`);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9997] pointer-events-none">
      <div className="absolute inset-0 bg-white/[0.04]" />
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, #6366f1 0%, #8b5cf6 45%, #fb7185 78%, #fbbf24 100%)",
        }}
      />
      <motion.div
        className="absolute top-0 h-full w-28 -translate-x-full"
        style={{
          left: headLeft,
          opacity: headOpacity,
          background:
            "linear-gradient(90deg, transparent, rgba(251,191,36,0.6))",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
