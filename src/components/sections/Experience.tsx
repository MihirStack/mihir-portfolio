"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  MapPin,
  ChevronRight,
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";

export default function Experience() {
  const [active, setActive] = useState(EXPERIENCES[0].id);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeExp = EXPERIENCES.find((e) => e.id === active)!;

  return (
    <section id="experience" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/20" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="section-label mb-3">Career Journey</div>
          <h2 className="text-display font-black text-white mb-3">
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-white/50 max-w-xl">
            Three years of shipping production software across ERP, SaaS, HRMS,
            ecommerce, and POS — from API design to deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8">
          {/* Timeline rail */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[19px] top-2 bottom-2 w-px hidden lg:block"
              style={{
                background:
                  "linear-gradient(180deg, #6366f1, #06b6d4, #8b5cf6, transparent)",
              }}
            />

            <div className="space-y-3">
              {EXPERIENCES.map((exp, i) => {
                const isActive = exp.id === active;
                return (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActive(exp.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    className="relative w-full text-left lg:pl-14 group cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    {/* Node */}
                    <div
                      className="absolute left-[11px] top-5 w-4 h-4 rounded-full border-2 border-background hidden lg:flex items-center justify-center z-10 transition-all"
                      style={{
                        background: isActive ? exp.color : "#1e1e38",
                        boxShadow: isActive ? `0 0 14px ${exp.color}` : "none",
                      }}
                    >
                      {exp.current && (
                        <span
                          className="absolute inline-flex w-full h-full rounded-full animate-ping"
                          style={{ background: `${exp.color}80` }}
                        />
                      )}
                      <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                    </div>

                    <div
                      className="p-4 rounded-xl transition-all"
                      style={
                        isActive
                          ? {
                              background: `${exp.color}12`,
                              border: `1px solid ${exp.color}40`,
                              boxShadow: `0 0 22px ${exp.color}15`,
                            }
                          : {
                              background: "rgba(255,255,255,0.025)",
                              border: "1px solid rgba(255,255,255,0.07)",
                            }
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${exp.color}, ${exp.color}99)`
                              : "rgba(255,255,255,0.05)",
                            color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                            boxShadow: isActive ? `0 4px 14px ${exp.color}55` : "none",
                          }}
                        >
                          {exp.monogram}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-bold truncate"
                              style={{
                                color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                              }}
                            >
                              {exp.company}
                            </span>
                            {exp.current && (
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex-shrink-0">
                                NOW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/45 truncate">
                            {exp.role}
                          </div>
                          <div className="text-[10px] text-white/30 mt-0.5 font-mono">
                            {exp.period}
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className="flex-shrink-0 transition-transform"
                          style={{
                            color: isActive ? exp.color : "rgba(255,255,255,0.2)",
                            transform: isActive ? "rotate(90deg)" : "none",
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${activeExp.color}0d 0%, rgba(0,0,0,0.25) 60%)`,
                border: `1px solid ${activeExp.color}25`,
                boxShadow: `0 8px 40px rgba(0,0,0,0.35)`,
              }}
            >
              {/* Accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${activeExp.color}, transparent)`,
                }}
              />

              <div className="p-6 md:p-8">
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${activeExp.color}, ${activeExp.color}99)`,
                        boxShadow: `0 6px 22px ${activeExp.color}55`,
                      }}
                    >
                      {activeExp.monogram}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white leading-tight">
                        {activeExp.role}
                      </h3>
                      <div className="text-sm" style={{ color: activeExp.color }}>
                        {activeExp.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1.5">
                    <span
                      className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg"
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

                {/* Focus + summary */}
                <div
                  className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    background: `${activeExp.color}10`,
                    border: `1px solid ${activeExp.color}25`,
                    color: `${activeExp.color}`,
                  }}
                >
                  <Sparkles size={11} />
                  {activeExp.focus}
                </div>
                <p className="text-sm text-white/55 leading-relaxed mb-7 max-w-2xl">
                  {activeExp.summary}
                </p>

                <div className="grid md:grid-cols-2 gap-7">
                  {/* Responsibilities */}
                  <div>
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                      Responsibilities
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeExp.responsibilities.map((r, i) => (
                        <motion.span
                          key={r}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="text-[11px] px-2.5 py-1 rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {r}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Trophy size={12} style={{ color: activeExp.color }} />
                      Key Achievements
                    </div>
                    <ul className="space-y-2.5">
                      {activeExp.achievements.map((a, i) => (
                        <motion.li
                          key={a}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-start gap-2.5 text-sm text-white/60 leading-relaxed"
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
                  className="mt-7 flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    background: `${activeExp.color}0d`,
                    border: `1px solid ${activeExp.color}22`,
                  }}
                >
                  <TrendingUp
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: activeExp.color }}
                  />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-0.5">
                      Business Impact
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {activeExp.businessImpact}
                    </p>
                  </div>
                </div>

                {/* Tech */}
                <div className="mt-7 pt-6 border-t border-white/5">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
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
