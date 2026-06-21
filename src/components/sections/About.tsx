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
} from "lucide-react";

const PILLARS = [
  {
    icon: Layers,
    title: "Architecture First",
    desc: "Every system I build starts with architecture. Multi-tenant isolation, scalable schema design, and service boundaries are baked in from day one.",
    color: "indigo",
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
    color: "emerald",
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
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    icon: "text-indigo-400",
    glow: "rgba(99,102,241,0.1)",
  },
  violet: {
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    icon: "text-violet-400",
    glow: "rgba(139,92,246,0.1)",
  },
  cyan: {
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
    icon: "text-cyan-400",
    glow: "rgba(6,182,212,0.1)",
  },
  emerald: {
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    icon: "text-emerald-400",
    glow: "rgba(16,185,129,0.1)",
  },
};

const TIMELINE = [
  {
    year: "2022",
    phase: "Year 1 — Foundation",
    items: [
      "Joined as Full Stack Developer",
      "Built REST APIs with Node.js & Express",
      "Developed React frontends with Redux Toolkit",
      "Integrated MySQL with Sequelize ORM",
    ],
    color: "#6366f1",
  },
  {
    year: "2023",
    phase: "Year 2 — ERP Specialist",
    items: [
      "Architected POS billing system from scratch",
      "Built inventory & purchase management modules",
      "Designed loyalty program and customer management",
      "Integrated Razorpay payment gateway",
    ],
    color: "#8b5cf6",
  },
  {
    year: "2024",
    phase: "Year 3 — SaaS Architect",
    items: [
      "Designed multi-tenant SaaS architecture",
      "Implemented dynamic database routing per tenant",
      "Set up NGINX, PM2, and VPS deployment pipelines",
      "Built subscription management and tenant isolation",
    ],
    color: "#06b6d4",
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
      {/* BG */}
      <div className="absolute inset-0 bg-surface/30" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-3">About Me</div>
          <h2 className="text-display font-black text-white mb-4">
            Engineer Who{" "}
            <span className="gradient-text">Builds for Production</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
            I&apos;m Mihir Borsaniya — a Full Stack ERP Engineer with 3+ years of experience
            designing and building enterprise-grade SaaS systems that solve real business
            problems at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                I started as a Full Stack Developer, but what drew me was not just building
                UIs — it was understanding how systems work at a deeper level. How does a
                POS system handle concurrent transactions? How do you design a database
                that serves 50 different types of business data without degrading query
                performance?
              </p>
              <p>
                Over 3 years, I evolved from writing APIs to architecting entire platforms.
                My flagship project,{" "}
                <span className="text-indigo-400 font-medium">AksharPOS ERP</span>, is a
                multi-tenant SaaS platform serving retail, wholesale, and POS businesses
                with 10+ integrated modules — from billing and inventory to loyalty
                programs and financial reporting.
              </p>
              <p>
                I don&apos;t just write code. I design systems, own deployments, configure
                servers, and think about business workflows. When I ship a feature, it goes
                through code review, gets deployed to a VPS with NGINX and PM2, and I
                monitor it in production.
              </p>
              <p>
                My engineering philosophy:{" "}
                <span className="text-white font-medium">
                  solve the real problem, not the surface problem.
                </span>{" "}
                Build for scale even when you&apos;re not there yet. Write code that a
                future engineer can understand and extend.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: Code2, label: "Languages", value: "JS, TS, SQL" },
                { icon: Server, label: "Backend", value: "Node.js, Express" },
                { icon: Database, label: "Database", value: "MySQL, Sequelize" },
                { icon: Users, label: "Domain", value: "ERP, SaaS, POS" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon size={14} className="text-indigo-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-white/40">{label}</div>
                    <div className="text-xs font-semibold text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {PILLARS.map(({ icon: Icon, title, desc, color }, i) => {
              const c = COLOR_MAP[color as keyof typeof COLOR_MAP];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="p-4 rounded-xl group hover:scale-[1.02] transition-transform cursor-default"
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    boxShadow: `0 4px 20px ${c.glow}`,
                  }}
                >
                  <Icon size={16} className={`${c.icon} mb-2`} />
                  <div className="text-sm font-semibold text-white mb-1">{title}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{desc}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-lg font-bold text-white mb-8">
            Professional Journey
          </h3>
          <div className="relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, #6366f1, #8b5cf6, #06b6d4, transparent)",
              }}
            />
            <div className="space-y-8">
              {TIMELINE.map(({ year, phase, items, color }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="relative pl-16"
                >
                  <div
                    className="absolute left-[18px] top-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center"
                    style={{ background: color, boxShadow: `0 0 12px ${color}60` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{
                        color,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {year}
                    </span>
                    <span className="text-sm font-semibold text-white">{phase}</span>
                  </div>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-white/50 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
