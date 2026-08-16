"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Star, GitFork, ExternalLink, Code2, GitCommit } from "lucide-react";

const REPOS = [
  {
    name: "aksharpos-api",
    desc: "Multi-tenant ERP backend API with Node.js, Express.js, MySQL, and Sequelize. Features JWT auth, RBAC, and dynamic tenant routing.",
    stars: 12,
    forks: 3,
    lang: "TypeScript",
    langColor: "#3178c6",
    tags: ["ERP", "Multi-Tenant", "REST API"],
    private: false,
  },
  {
    name: "aksharpos-web",
    desc: "Enterprise ERP frontend built with React.js, Redux Toolkit, and React Query. Touch-optimized POS billing interface.",
    stars: 8,
    forks: 1,
    lang: "JavaScript",
    langColor: "#f1e05a",
    tags: ["React", "Redux", "POS"],
    private: false,
  },
  {
    name: "tenant-db-router",
    desc: "LRU-cached dynamic database connection manager for multi-tenant SaaS applications with Sequelize ORM.",
    stars: 5,
    forks: 2,
    lang: "TypeScript",
    langColor: "#3178c6",
    tags: ["SaaS", "Database", "Caching"],
    private: false,
  },
  {
    name: "razorpay-webhook-handler",
    desc: "Production-ready Razorpay webhook verification, idempotency handling, and payment reconciliation module.",
    stars: 7,
    forks: 4,
    lang: "JavaScript",
    langColor: "#f1e05a",
    tags: ["Payments", "Webhooks", "Razorpay"],
    private: false,
  },
];

// Deterministic pseudo-random so server and client render identically (no hydration mismatch).
function seeded(wi: number, di: number) {
  const x = Math.sin(wi * 374.761 + di * 91.337 + 1) * 43758.5453;
  return x - Math.floor(x);
}

const CONTRIBUTION_WEEKS = Array.from({ length: 53 }, (_, wi) =>
  Array.from({ length: 7 }, (_, di) => {
    const rand = seeded(wi, di);
    const isWeekend = di === 0 || di === 6;
    const recentBoost = wi > 40 ? 1.3 : 1;
    const activity =
      rand < (isWeekend ? 0.3 : 0.55) * recentBoost
        ? rand < 0.1
          ? 4
          : rand < 0.25
          ? 3
          : rand < 0.45
          ? 2
          : 1
        : 0;
    return activity;
  })
);

// Ramp runs indigo -> violet and tops out on the signature accent, so the
// busiest days pop instead of all reading as the same blue.
const LEVEL_COLORS = [
  "rgba(255,255,255,0.045)",
  "rgba(99,102,241,0.3)",
  "rgba(124,110,244,0.55)",
  "rgba(167,110,220,0.8)",
  "rgba(251,113,133,0.95)",
];

const TECH_BREAKDOWN = [
  { lang: "TypeScript", pct: 42, color: "#3178c6" },
  { lang: "JavaScript", pct: 35, color: "#f1e05a" },
  { lang: "SQL", pct: 12, color: "#e38c00" },
  { lang: "Shell", pct: 7, color: "#89e051" },
  { lang: "YAML", pct: 4, color: "#cb171e" },
];

const HEADLINE_STATS = [
  { icon: GitCommit, label: "Total Commits", value: "847+", color: "#6366f1" },
  { icon: Code2, label: "Repositories", value: "24+", color: "#8b5cf6" },
  { icon: Star, label: "Stars Earned", value: "32+", color: "#fb7185" },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function GitHub() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="github" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="section-hairline" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="section-label mb-4">Open Source &amp; Activity</div>
            <h2 className="text-display text-white mb-4 text-balance">
              GitHub <span className="gradient-text">activity</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Consistent contributor with a focus on production-grade backend
              systems, ERP architecture, and DevOps tooling.
            </p>
          </div>
          <motion.a
            href="https://github.com/MihirStack"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={15} />
            View Profile
            <ExternalLink size={11} />
          </motion.a>
        </motion.div>

        {/* Contribution heatmap + stat rail */}
        <div className="grid lg:grid-cols-12 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            className="lg:col-span-8 surface-inset p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5 gap-4">
              <div className="flex items-center gap-2">
                <GitCommit size={13} className="text-indigo-300" />
                <span className="text-xs text-white/50">Contribution Activity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/25">Less</span>
                {LEVEL_COLORS.map((color, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-[3px]"
                    style={{ background: color }}
                  />
                ))}
                <span className="text-[10px] text-white/25">More</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-[3px] min-w-max">
                {CONTRIBUTION_WEEKS.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <motion.span
                        key={di}
                        className="w-2.5 h-2.5 rounded-[3px] block"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.2 + (wi * 7 + di) * 0.0012,
                          duration: 0.25,
                        }}
                        style={{
                          background: LEVEL_COLORS[level],
                          boxShadow:
                            level === 4 ? "0 0 8px rgba(251,113,133,0.5)" : undefined,
                        }}
                        title={`Week ${wi + 1}, Day ${di + 1}: ${level} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vertical stat rail instead of three identical tiles */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-4">
            {HEADLINE_STATS.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.55, ease: EASE_OUT }}
                whileHover={{ y: -3 }}
                className="relative overflow-hidden rounded-2xl p-5 flex lg:flex-1 flex-col lg:flex-row lg:items-center gap-3"
                style={{
                  background: `${color}0c`,
                  border: `1px solid ${color}26`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}33`,
                  }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white tracking-tight tabular-nums">
                    {value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-white/35 mt-0.5">
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          {/* Repos */}
          <div className="lg:col-span-7">
            <div className="section-label mb-5">Featured Repositories</div>
            <div className="space-y-2.5">
              {REPOS.map(
                ({ name, desc, stars, forks, lang, langColor, tags }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.55, ease: EASE_OUT }}
                    whileHover={{ x: 4 }}
                    className="surface-card group p-4 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Github size={14} className="text-white/40 flex-shrink-0" />
                        <span className="text-sm font-mono font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors truncate">
                          {name}
                        </span>
                      </div>
                      <ExternalLink
                        size={12}
                        className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0"
                      />
                    </div>
                    <p className="text-[13px] text-white/45 leading-relaxed mb-3.5">
                      {desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: langColor }}
                        />
                        <span className="text-[11px] text-white/40">{lang}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/35">
                        <Star size={10} />
                        {stars}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/35">
                        <GitFork size={10} />
                        {forks}
                      </span>
                      <span className="flex gap-1 ml-auto">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-1.5 py-0.5 rounded"
                            style={{
                              background: "rgba(99,102,241,0.1)",
                              border: "1px solid rgba(99,102,241,0.2)",
                              color: "#a5b4fc",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Language breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <div className="section-label mb-5">Language Breakdown</div>
            <div className="surface-card p-6">
              {/* Combined bar leads, detail follows */}
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-6">
                {TECH_BREAKDOWN.map(({ lang, pct, color }) => (
                  <motion.div
                    key={lang}
                    initial={{ flex: 0 }}
                    animate={inView ? { flex: pct } : {}}
                    transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
                    className="h-full"
                    style={{ background: color }}
                    title={`${lang}: ${pct}%`}
                  />
                ))}
              </div>

              <div className="space-y-4">
                {TECH_BREAKDOWN.map(({ lang, pct, color }, i) => (
                  <div key={lang}>
                    <div className="flex justify-between mb-1.5">
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: color }}
                        />
                        <span className="text-[13px] text-white/70">{lang}</span>
                      </span>
                      <span className="text-xs font-bold text-white/50 tabular-nums">
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${pct}%` } : {}}
                        transition={{
                          duration: 0.9,
                          delay: 0.55 + i * 0.07,
                          ease: EASE_OUT,
                        }}
                        style={{
                          background: color,
                          boxShadow: `0 0 10px ${color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://github.com/MihirStack"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost md:hidden mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium"
              >
                <Github size={15} />
                View Profile
                <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}