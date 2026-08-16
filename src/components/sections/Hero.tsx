"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Database,
  ShieldCheck,
  Zap,
  MapPin,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { TechIcon } from "@/lib/tech-icons";
import { useMagnetic, CardSpotlight } from "@/components/ui/useMagnetic";

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Database Models" },
  { value: 10, suffix: "+", label: "ERP Modules" },
  { value: 100, suffix: "%", label: "Production Grade" },
];

const TECH_STACK = [
  "Node.js", "TypeScript", "React", "Next.js",
  "MySQL", "MongoDB", "Redis", "Socket.IO",
  "Razorpay", "Stripe",
];

/** Per-tenant databases rendered as the fan-out of the routing visual. */
const TENANT_NODES = [
  { id: "db_retail", label: "retail_co" },
  { id: "db_whole", label: "wholesale" },
  { id: "db_pos", label: "pos_chain" },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 110]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0]);
  const visualY = useTransform(scrollY, [0, 600], [0, -60]);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // The router panel already has its own entry animation, so it takes the
  // spotlight without the tilt.
  const panel = useMagnetic({ spotlightOnly: true });

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-[68px]"
    >
      {/* Masked grid — fades out instead of tiling to the edges */}
      <div className="absolute inset-0 grid-bg grid-mask opacity-70" aria-hidden="true" />

      {/* Two ambient washes only: one cool anchor, one warm signature */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -left-24 w-[720px] h-[720px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 68%)",
          filter: "blur(70px)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-18%] right-[-8%] w-[620px] h-[620px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.18, 1], opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          background:
            "radial-gradient(circle, rgba(251,113,133,0.22) 0%, transparent 68%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center py-16 lg:py-20">
          {/* ---------------- Left: the statement ---------------- */}
          <div ref={ref} className="lg:col-span-7">
            <motion.div
              {...rise(0)}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium tracking-wide text-emerald-300">
                  Available for new opportunities
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/35">
                <MapPin size={11} />
                Surat, India · Open to remote
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...rise(0.08)} className="text-hero text-white mb-7">
              <span className="block">Mihir</span>
              <span className="block gradient-text-signature">Borsaniya</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="text-xl sm:text-2xl font-semibold text-white/90 mb-4 max-w-2xl text-balance"
            >
              Full Stack Engineer building{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">enterprise SaaS systems</span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-0.5 h-[0.42em] -z-0 rounded-sm opacity-40"
                  style={{ background: "var(--sig-gradient)" }}
                />
              </span>{" "}
              that scale.
            </motion.p>

            <motion.p
              {...rise(0.22)}
              className="text-base sm:text-lg text-white/50 leading-relaxed mb-9 max-w-xl"
            >
              I design and develop enterprise ERP platforms, multi-tenant SaaS
              systems, payment infrastructures, backend architectures, and
              production-ready business software that powers real businesses.
            </motion.p>

            {/* CTAs — one signature primary, two quiet secondaries */}
            <motion.div {...rise(0.3)} className="flex flex-wrap gap-3 mb-10">
              <motion.button
                onClick={() => scrollTo("#projects")}
                className="btn-signature group flex items-center gap-2 px-6 py-3 rounded-full text-sm cursor-pointer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Mihir_Borsaniya_Resume.pdf"
                className="btn-ghost flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={15} />
                Download Resume
              </motion.a>

              <motion.button
                onClick={() => scrollTo("#contact")}
                className="btn-ghost px-5 py-3 rounded-full font-semibold text-sm cursor-pointer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Tech stack */}
            <motion.div {...rise(0.38)} className="flex flex-wrap gap-1.5">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.42 + i * 0.035, duration: 0.4 }}
                  className="tech-tag"
                >
                  <TechIcon name={tech} />
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ---------------- Right: one confident visual ---------------- */}
          <motion.div
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
            style={{ y: visualY }}
          >
            {/* Single slow orbit ring behind the card */}
            <motion.div
              aria-hidden="true"
              className="absolute w-[440px] h-[440px] rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.22) 70deg, rgba(251,113,133,0.22) 140deg, transparent 210deg)",
                maskImage:
                  "radial-gradient(circle, transparent 63%, #000 64%, #000 66%, transparent 67%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 63%, #000 64%, #000 66%, transparent 67%)",
              }}
            />

            <motion.div
              {...panel.bind}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1, delay: 0.35, ease: EASE_OUT }}
              className="magnetic relative w-full max-w-[380px] rounded-3xl glass overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.55), 0 0 90px rgba(99,102,241,0.10)",
              }}
            >
              <CardSpotlight size={360} color="rgba(251, 113, 133, 0.13)" />

              {/* Header */}
              <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]">
                <span className="font-mono text-[11px] text-white/45">
                  <DecodeText text="tenant-router.ts" start={inView} />
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  live
                </span>
              </div>

              <div className="relative px-5 py-6">
                {/* Node 1 — request */}
                <Node
                  inView={inView}
                  delay={0.55}
                  icon={<Zap size={13} className="text-indigo-300" />}
                  title="Incoming request"
                  meta="x-tenant-id"
                  tint="rgba(99,102,241,0.35)"
                />

                <Beam inView={inView} delay={0.7} />

                {/* Node 2 — the resolver, the focal element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.85, ease: EASE_OUT }}
                  className="relative rounded-2xl px-4 py-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(251,113,133,0.09), rgba(192,38,211,0.09))",
                    border: "1px solid rgba(251,113,133,0.28)",
                    boxShadow: "0 8px 32px rgba(251,113,133,0.14)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(251,113,133,0.16)",
                        border: "1px solid rgba(251,113,133,0.3)",
                      }}
                    >
                      <ShieldCheck size={14} className="text-[#fda4af]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-white">
                        TenantResolver
                      </div>
                      <div className="font-mono text-[10px] text-white/40">
                        JWT → LRU pool → Sequelize
                      </div>
                    </div>
                    <span className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded-full text-[#fcd34d] border border-amber-300/25 bg-amber-300/[0.08]">
                      cache hit
                    </span>
                  </div>

                  {/* Sweep highlight — the one shimmer in the hero */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-y-0 w-24 pointer-events-none"
                    initial={{ x: "-120%" }}
                    animate={{ x: ["-120%", "420%"] }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      repeatDelay: 2.6,
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "linear-gradient(105deg, transparent, rgba(255,255,255,0.10), transparent)",
                    }}
                  />
                </motion.div>

                <Beam inView={inView} delay={1} />

                {/* Fan-out — isolated tenant databases */}
                <div className="grid grid-cols-3 gap-2">
                  {TENANT_NODES.map((node, i) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.55,
                        delay: 1.1 + i * 0.1,
                        ease: EASE_OUT,
                      }}
                      className="rounded-xl px-2.5 py-3 text-center"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <Database
                        size={13}
                        className="mx-auto mb-1.5 text-indigo-300/80"
                      />
                      <div className="font-mono text-[9.5px] text-white/50 truncate">
                        {node.label}
                      </div>
                      <motion.div
                        className="mx-auto mt-2 h-0.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: "70%" } : {}}
                        transition={{ duration: 0.7, delay: 1.3 + i * 0.1 }}
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(99,102,241,0.7), rgba(139,92,246,0.4))",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Footer readout */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="mt-5 pt-4 border-t border-white/[0.07] grid grid-cols-3 gap-2 text-center"
                >
                  {[
                    ["~40ms", "resolve"],
                    ["<30s", "onboard"],
                    ["0", "leaks"],
                  ].map(([v, k]) => (
                    <div key={k}>
                      <div className="font-mono text-sm font-bold text-white">
                        {v}
                      </div>
                      <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/30 mt-0.5">
                        {k}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ---------------- Stat strip ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07] border-t border-white/[0.07] pt-8 pb-4"
        >
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className="px-4 first:pl-0 py-2">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {inView ? (
                  <CountUp end={value} duration={2.2} suffix={suffix} />
                ) : (
                  `${value}${suffix}`
                )}
              </div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/35 mt-1.5">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.24em] text-white/25">
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden bg-white/10">
          <motion.div
            className="w-px h-4"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "var(--sig-gradient)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Node({
  inView,
  delay,
  icon,
  title,
  meta,
  tint,
}: {
  inView: boolean;
  delay: number;
  icon: React.ReactNode;
  title: string;
  meta: string;
  tint: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
      className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${tint}`,
      }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.05] border border-white/[0.08]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-white/90">{title}</div>
        <div className="font-mono text-[10px] text-white/40">{meta}</div>
      </div>
    </motion.div>
  );
}

function Beam({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="relative mx-auto my-2.5 h-7 w-px overflow-hidden bg-white/[0.08]">
      <motion.div
        className="absolute inset-x-0 h-3"
        initial={{ y: -14, opacity: 0 }}
        animate={inView ? { y: [-14, 28], opacity: [0, 1, 0] } : {}}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 0.9,
          delay,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(251,113,133,0.95), transparent)",
        }}
      />
    </div>
  );
}

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789-_./";

/**
 * Resolves `text` character-by-character out of a scramble of random glyphs —
 * a small "decode" beat for the router panel's filename when it scrolls into
 * view. Runs once, on a single interval, and is skipped entirely under
 * `prefers-reduced-motion` (the final text renders immediately instead).
 */
function DecodeText({ text, start }: { text: string; start: boolean }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const framesPerChar = 3;
    const id = window.setInterval(() => {
      frame += 1;
      const resolved = Math.floor(frame / framesPerChar);

      if (resolved >= text.length) {
        setDisplay(text);
        window.clearInterval(id);
        return;
      }

      const scrambled = text
        .slice(resolved)
        .split("")
        .map((c) =>
          c === " "
            ? " "
            : SCRAMBLE_CHARS[
                Math.floor(Math.random() * SCRAMBLE_CHARS.length)
              ]
        )
        .join("");

      setDisplay(text.slice(0, resolved) + scrambled);
    }, 34);

    return () => window.clearInterval(id);
  }, [start, text, reduceMotion]);

  // Reserve the final width so the header never reflows mid-decode.
  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span className="absolute inset-0">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
