"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Layers,
  TrendingUp,
  Users,
  ShieldCheck,
  Quote,
} from "lucide-react";

const PILLARS = [
  {
    icon: Layers,
    title: "Architecture First",
    desc: "Every system I build starts with architecture. Multi-tenant isolation, scalable schema design, and service boundaries are baked in from day one.",
    color: "indigo",
    /** Bento span — the two flagship pillars get the wide cells. */
    wide: true,
  },
  {
    icon: Server,
    title: "Production Ownership",
    desc: "I own features end-to-end — from schema design and API development to NGINX configuration, PM2 process management, and SSL deployment.",
    color: "violet",
  },
  {
    icon: Database,
    title: "Database Engineering",
    desc: "Designed 50+ relational models with proper normalization, indexing strategies, and transaction handling for complex business workflows.",
    color: "cyan",
  },
  {
    icon: TrendingUp,
    title: "Business Impact",
    desc: "Built software that processes real financial transactions, manages actual inventory, and runs day-to-day operations for retail businesses.",
    color: "signature",
    wide: true,
  },
  {
    icon: ShieldCheck,
    title: "Security Mindset",
    desc: "JWT-based authentication, RBAC permission systems, tenant data isolation, and secure payment webhook verification are defaults, not afterthoughts.",
    color: "violet",
  },
  {
    icon: Cloud,
    title: "DevOps Capable",
    desc: "Set up CI/CD pipelines, configured VPS environments, managed Linux servers, and established deployment workflows using GitHub Actions.",
    color: "cyan",
  },
];

const COLOR_MAP = {
  indigo: {
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.2)",
    icon: "text-indigo-300",
    glow: "rgba(99,102,241,0.12)",
  },
  violet: {
    bg: "rgba(139,92,246,0.07)",
    border: "rgba(139,92,246,0.2)",
    icon: "text-violet-300",
    glow: "rgba(139,92,246,0.12)",
  },
  cyan: {
    bg: "rgba(6,182,212,0.07)",
    border: "rgba(6,182,212,0.2)",
    icon: "text-cyan-300",
    glow: "rgba(6,182,212,0.12)",
  },
  signature: {
    bg: "rgba(251,113,133,0.08)",
    border: "rgba(251,113,133,0.25)",
    icon: "text-[#fda4af]",
    glow: "rgba(251,113,133,0.16)",
  },
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const QUICK_FACTS = [
  { icon: Code2, label: "Languages", value: "JS, TS, SQL" },
  { icon: Server, label: "Backend", value: "Node.js, Express" },
  { icon: Database, label: "Database", value: "MySQL, Sequelize" },
  { icon: Users, label: "Domain", value: "ERP, SaaS, POS" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="about" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/30" />
      <div className="section-hairline" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — asymmetric: title left, intro offset right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <div className="section-label mb-4">About Me</div>
            <h2 className="text-display text-white text-balance">
              Engineer who{" "}
              <span className="gradient-text-signature">builds for production</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
            className="lg:col-span-5 text-white/50 text-lg leading-relaxed lg:border-l lg:border-white/[0.08] lg:pl-8"
          >
            I&apos;m Mihir Borsaniya — a Full Stack Engineer with 3+ years building
            production ERP and multi-tenant SaaS platforms end to end, from REST API
            and database design through to deployment and monitoring.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <div className="space-y-5 text-[15px] text-white/55 leading-relaxed">
              <p className="text-white/70">
                <span className="float-left mr-3 mt-1 text-5xl font-black leading-[0.8] gradient-text-signature">
                  I
                </span>
                started as a Full Stack Developer, but what drew me was not just
                building UIs — it was understanding how systems work at a deeper level.
                How does a POS system handle concurrent transactions? How do you design
                a database that serves 50 different types of business data without
                degrading query performance?
              </p>
              <p>
                Over 3 years and three companies, I evolved from writing APIs to
                architecting entire platforms — shipping software across Medical and
                Manufacturing ERP, HRMS, ecommerce, and POS. My current flagship,{" "}
                <span className="text-indigo-300 font-medium">AksharPOS ERP</span>, is a
                multi-tenant SaaS platform serving retail, wholesale, and POS businesses
                with 10+ integrated modules — from billing and inventory to loyalty
                programs and financial reporting.
              </p>
              <p>
                I don&apos;t just write code. I design systems, own deployments,
                configure servers, and think about business workflows. When I ship a
                feature, it goes through code review, gets deployed to a VPS with NGINX
                and PM2, and I monitor it in production.
              </p>
            </div>

            {/* Philosophy pull-quote — a deliberate signature moment */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
              className="relative mt-8 rounded-2xl p-6 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.07), rgba(251,113,133,0.06), rgba(192,38,211,0.06))",
                border: "1px solid rgba(251,113,133,0.22)",
              }}
            >
              <Quote
                size={20}
                className="text-[#fda4af]/60 mb-3"
                aria-hidden="true"
              />
              <p className="text-lg font-semibold text-white leading-snug text-balance">
                Solve the real problem, not the surface problem.
              </p>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                Build for scale even when you&apos;re not there yet. Write code that a
                future engineer can understand and extend.
              </p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: "var(--sig-gradient)", opacity: 0.5 }}
              />
            </motion.blockquote>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {QUICK_FACTS.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.5 }}
                  className="surface-card flex items-center gap-3 px-3.5 py-3"
                >
                  <Icon size={15} className="text-indigo-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                      {label}
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pillars — bento, not a uniform grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 auto-rows-min">
            {PILLARS.map(({ icon: Icon, title, desc, color, wide }, i) => {
              const c = COLOR_MAP[color as keyof typeof COLOR_MAP];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.28 + i * 0.08, duration: 0.6, ease: EASE_OUT }}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden rounded-2xl p-5 cursor-default ${
                    wide ? "sm:col-span-2" : ""
                  }`}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    boxShadow: `0 6px 26px ${c.glow}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <Icon size={16} className={c.icon} />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-white mb-1.5">
                        {title}
                      </div>
                      <div className="text-[13px] text-white/45 leading-relaxed">
                        {desc}
                      </div>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 w-40 h-40 rounded-full opacity-60"
                    style={{
                      background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
