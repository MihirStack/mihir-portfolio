"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  MapPin,
  Sparkles,
  Trophy,
  TrendingUp,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const [active, setActive] = useState(EXPERIENCES[0].id);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeExp = EXPERIENCES.find((e) => e.id === active)!;

  return (
    <section id="experience" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/20" />
      <div className="section-hairline" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-label mb-4">Career Journey</div>
          <h2 className="text-display text-white mb-4 text-balance">
            Professional{" "}
            <span className="gradient-text">experience</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Three years of shipping production software across ERP, SaaS, HRMS,
            ecommerce, and POS — from API design to deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Timeline rail */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-[7px] top-4 bottom-4 w-px hidden lg:block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(251,113,133,0.6), rgba(99,102,241,0.5), rgba(139,92,246,0.3), transparent)",
              }}
            />

            <div className="space-y-2.5">
              {EXPERIENCES.map((exp, i) => {
                const isActive = exp.id === active;
                return (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActive(exp.id)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: EASE_OUT }}
                    className="relative w-full text-left lg:pl-9 group cursor-pointer"
                  >
                    {/* Rail node */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-6 w-[15px] h-[15px] rounded-full hidden lg:flex items-center justify-center z-10 transition-all duration-300"
                      style={{
                        background: isActive ? exp.color : "#14142a",
                        border: `2px solid ${isActive ? exp.color : "rgba(255,255,255,0.14)"}`,
                        boxShadow: isActive ? `0 0 16px ${exp.color}` : "none",
                      }}
                    >
                      {exp.current && (
                        <span
                          className="absolute inline-flex w-full h-full rounded-full animate-ping"
                          style={{ background: `${exp.color}70` }}
                        />
                      )}
                    </span>

                    <div
                      className="relative overflow-hidden rounded-2xl p-4 transition-all duration-300"
                      style={
                        isActive
                          ? {
                              background: `${exp.color}12`,
                              border: `1px solid ${exp.color}45`,
                              boxShadow: `0 8px 30px ${exp.color}18`,
                            }
                          : {
                              background: "rgba(255,255,255,0.025)",
                              border: "1px solid rgba(255,255,255,0.07)",
                            }
                      }
                    >
                      {isActive && (
                        <motion.span
                          layoutId="exp-accent"
                          className="absolute left-0 inset-y-0 w-[3px]"
                          style={{ background: exp.color }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}

                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-all"
                          style={{
                            background: isActive
                              ? `linear-gradient(140deg, ${exp.color}, ${exp.color}88)`
                              : "rgba(255,255,255,0.05)",
                            color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                            boxShadow: isActive ? `0 6px 18px ${exp.color}55` : "none",
                          }}
                        >
                          {exp.monogram}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[13px] font-bold truncate transition-colors"
                              style={{
                                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                              }}
                            >
                              {exp.companyShort}
                            </span>
                            {exp.current && (
                              <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/25 flex-shrink-0">
                                NOW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/45 truncate mt-0.5">
                            {exp.role}
                          </div>
                          <div className="text-[10px] font-mono text-white/30 mt-1.5">
                            {exp.period}
                          </div>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="flex-shrink-0 mt-1 transition-all duration-300"
                          style={{
                            color: isActive ? exp.color : "rgba(255,255,255,0.18)",
                            transform: isActive
                              ? "translate(2px,-2px)"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(150deg, ${activeExp.color}10 0%, rgba(0,0,0,0.3) 55%)`,
                border: `1px solid ${activeExp.color}28`,
                boxShadow: "0 16px 60px rgba(0,0,0,0.4)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${activeExp.color}22 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <div className="relative p-6 md:p-9">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-5 mb-7">
                  <div className="flex items-center gap-4">
                    <a
                      href={activeExp.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${activeExp.company} website`}
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 p-2.5 transition-transform duration-300 hover:scale-105"
                      style={{
                        background:
                          activeExp.companyLogoBg === "dark"
                            ? "linear-gradient(140deg, #14142a, #1e1e38)"
                            : "#ffffff",
                        border:
                          activeExp.companyLogoBg === "dark"
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "none",
                        boxShadow: `0 10px 30px ${activeExp.color}50`,
                      }}
                    >
                      <Image
                        src={activeExp.companyLogo}
                        alt={`${activeExp.company} logo`}
                        fill
                        sizes="56px"
                        className="object-contain p-2.5"
                      />
                    </a>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
                        {activeExp.role}
                      </h3>
                      <a
                        href={activeExp.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm mt-0.5 hover:underline underline-offset-2"
                        style={{ color: activeExp.color }}
                      >
                        {activeExp.company}
                        <Globe size={11} className="opacity-60" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: `${activeExp.color}15`,
                        border: `1px solid ${activeExp.color}30`,
                        color: activeExp.color,
                      }}
                    >
                      {activeExp.period}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-white/40">
                      <span className="flex items-center gap-1">
                        <Briefcase size={11} /> {activeExp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {activeExp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full text-[11px] font-medium"
                  style={{
                    background: `${activeExp.color}12`,
                    border: `1px solid ${activeExp.color}28`,
                    color: activeExp.color,
                  }}
                >
                  <Sparkles size={11} />
                  {activeExp.focus}
                </div>

                <p className="text-[15px] text-white/60 leading-relaxed mb-8 max-w-2xl">
                  {activeExp.summary}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Responsibilities — numbered list reads better than chips */}
                  <div>
                    <div className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-4">
                      Responsibilities
                    </div>
                    <ol className="space-y-2.5">
                      {activeExp.responsibilities.map((r, i) => (
                        <motion.li
                          key={r}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          className="flex items-start gap-3 text-[13px] text-white/55 leading-relaxed"
                        >
                          <span className="font-mono text-[10px] text-white/25 mt-0.5 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {r}
                        </motion.li>
                      ))}
                    </ol>
                  </div>

                  {/* Achievements */}
                  <div>
                    <div className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-4 flex items-center gap-1.5">
                      <Trophy size={12} style={{ color: activeExp.color }} />
                      Key Achievements
                    </div>
                    <ul className="space-y-3">
                      {activeExp.achievements.map((a, i) => (
                        <motion.li
                          key={a}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                          className="flex items-start gap-3 text-[13px] text-white/65 leading-relaxed rounded-xl px-3.5 py-3"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: activeExp.color }}
                          />
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Business impact */}
                <div
                  className="mt-8 flex items-start gap-3.5 p-5 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251,191,36,0.06), rgba(251,113,133,0.05), rgba(192,38,211,0.05))",
                    border: "1px solid rgba(251,113,133,0.2)",
                  }}
                >
                  <TrendingUp
                    size={17}
                    className="flex-shrink-0 mt-0.5 text-[#fda4af]"
                  />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
                      Business Impact
                    </div>
                    <p className="text-[15px] text-white/75 leading-relaxed">
                      {activeExp.businessImpact}
                    </p>
                  </div>
                </div>

                {/* Tech */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <div className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-3.5">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
