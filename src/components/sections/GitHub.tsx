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

const LEVEL_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(99,102,241,0.25)",
  "rgba(99,102,241,0.5)",
  "rgba(99,102,241,0.75)",
  "rgba(99,102,241,1)",
];

const TECH_BREAKDOWN = [
  { lang: "TypeScript", pct: 42, color: "#3178c6" },
  { lang: "JavaScript", pct: 35, color: "#f1e05a" },
  { lang: "SQL", pct: 12, color: "#e38c00" },
  { lang: "Shell", pct: 7, color: "#89e051" },
  { lang: "YAML", pct: 4, color: "#cb171e" },
];

export default function GitHub() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="github" className="relative py-24 overflow-hidden" ref={ref}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="section-label">Open Source & Activity</div>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-display font-black text-white mb-3">
                GitHub <span className="gradient-text">Activity</span>
              </h2>
              <p className="text-white/50 max-w-xl">
                Consistent contributor with a focus on production-grade backend
                systems, ERP architecture, and DevOps tooling.
              </p>
            </div>
            <motion.a
              href="https://github.com/MihirStack"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <Github size={14} />
              View Profile
              <ExternalLink size={11} />
            </motion.a>
          </div>
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 p-6 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitCommit size={13} className="text-indigo-400" />
              <span className="text-xs text-white/50">
                Contribution Activity
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/25">Less</span>
              {LEVEL_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: color }}
                />
              ))}
              <span className="text-[10px] text-white/25">More</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-0.5 min-w-max">
              {CONTRIBUTION_WEEKS.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((level, di) => (
                    <motion.div
                      key={di}
                      className="w-2.5 h-2.5 rounded-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: (wi * 7 + di) * 0.001,
                        duration: 0.2,
                      }}
                      style={{ background: LEVEL_COLORS[level] }}
                      title={`Week ${wi + 1}, Day ${di + 1}: ${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats + Tech breakdown */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: GitCommit,
              label: "Total Commits",
              value: "847+",
              color: "#6366f1",
            },
            {
              icon: Code2,
              label: "Repositories",
              value: "24+",
              color: "#8b5cf6",
            },
            {
              icon: Star,
              label: "Stars Earned",
              value: "32+",
              color: "#f59e0b",
            },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-5 rounded-xl text-center"
              style={{
                background: `${color}08`,
                border: `1px solid ${color}20`,
              }}
            >
              <Icon size={18} className="mx-auto mb-2" style={{ color }} />
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-white/40 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Repos */}
          <div className="space-y-3">
            <div className="text-xs text-white/35 font-semibold uppercase tracking-widest mb-4">
              Featured Repositories
            </div>
            {REPOS.map(
              ({ name, desc, stars, forks, lang, langColor, tags }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="p-4 rounded-xl group hover:border-indigo-500/30 transition-all cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Github size={13} className="text-white/50" />
                      <span className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        {name}
                      </span>
                    </div>
                    <ExternalLink
                      size={11}
                      className="text-white/20 group-hover:text-white/50 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-white/45 leading-relaxed mb-3">
                    {desc}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: langColor }}
                      />
                      <span className="text-[10px] text-white/40">{lang}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/35">
                      <Star size={9} />
                      {stars}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/35">
                      <GitFork size={9} />
                      {forks}
                    </div>
                    <div className="flex gap-1 ml-auto">
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
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>

          {/* Tech breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-xs text-white/35 font-semibold uppercase tracking-widest mb-6">
              Language Breakdown
            </div>
            <div className="space-y-4">
              {TECH_BREAKDOWN.map(({ lang, pct, color }) => (
                <div key={lang}>
                  <div className="flex justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: color }}
                      />
                      <span className="text-xs text-white/70">{lang}</span>
                    </div>
                    <span className="text-xs font-bold text-white/50">
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
                      transition={{ duration: 0.8, delay: 0.5 }}
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Combined bar */}
            <div className="mt-8">
              <div className="text-xs text-white/30 mb-2">
                Overall distribution
              </div>
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                {TECH_BREAKDOWN.map(({ lang, pct, color }) => (
                  <motion.div
                    key={lang}
                    initial={{ flex: 0 }}
                    animate={inView ? { flex: pct } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="h-full"
                    style={{ background: color }}
                    title={`${lang}: ${pct}%`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
