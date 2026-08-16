"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Globe,
  Shield,
  Server,
  Cpu,
  Database,
  GitBranch,
  CheckCircle,
  Activity,
} from "lucide-react";

const INFRA_LAYERS = [
  {
    icon: Globe,
    label: "Client / Browser",
    sublabel: "React.js SPA + Next.js SSR",
    color: "#06b6d4",
    detail: "React with Redux for state management, optimistic UI updates",
  },
  {
    icon: Shield,
    label: "NGINX Reverse Proxy",
    sublabel: "SSL Termination Â· Load Balancing",
    color: "#f59e0b",
    detail: "Handles HTTPS, routes /api/* to Node.js, serves static assets directly",
  },
  {
    icon: Server,
    label: "Node.js / Express API",
    sublabel: "REST APIs Â· JWT Auth Â· Middleware",
    color: "#6366f1",
    detail: "Multi-tenant middleware, RBAC, rate limiting, request validation",
  },
  {
    icon: Cpu,
    label: "PM2 Cluster Mode",
    sublabel: "Process Manager Â· Zero-Downtime",
    color: "#8b5cf6",
    detail: "Cluster mode with N-1 CPU workers, graceful reloads, log rotation",
  },
  {
    icon: Database,
    label: "MySQL Databases",
    sublabel: "Per-Tenant Isolated Â· Connection Pool",
    color: "#10b981",
    detail: "Master DB for tenant registry, individual DBs per tenant with LRU pooling",
  },
];

const DEVOPS_SKILLS = [
  { label: "Linux / Ubuntu", level: 85, color: "#ef4444" },
  { label: "NGINX Configuration", level: 87, color: "#f59e0b" },
  { label: "PM2 Management", level: 90, color: "#8b5cf6" },
  { label: "GitHub Actions CI/CD", level: 82, color: "#6366f1" },
  { label: "SSL / TLS Setup", level: 85, color: "#06b6d4" },
  { label: "VPS Server Management", level: 83, color: "#10b981" },
];

const DEPLOYMENT_STEPS = [
  { step: "01", label: "Push to main branch", icon: GitBranch, color: "#6366f1" },
  { step: "02", label: "GitHub Actions triggers", icon: Activity, color: "#8b5cf6" },
  { step: "03", label: "SSH into VPS", icon: Server, color: "#06b6d4" },
  { step: "04", label: "Pull & install deps", icon: Cpu, color: "#f59e0b" },
  { step: "05", label: "Run DB migrations", icon: Database, color: "#10b981" },
  { step: "06", label: "PM2 graceful reload", icon: CheckCircle, color: "#34d399" },
];

const ENVIRONMENT = [
  ["OS", "Ubuntu 22.04 LTS"],
  ["Web Server", "NGINX 1.24.0"],
  ["Runtime", "Node.js 20 LTS"],
  ["Process Mgr", "PM2 5.x (cluster)"],
  ["Database", "MySQL 8.0"],
  ["SSL", "Let's Encrypt"],
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function DevOps() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="devops" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/20" />
      <div className="section-hairline" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-label mb-4">Infrastructure &amp; DevOps</div>
          <h2 className="text-display text-white mb-4 text-balance">
            Production <span className="gradient-text">infrastructure</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            End-to-end ownership from code to deployment. I configure the server,
            manage the process, and monitor the production environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Infrastructure rack */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <div className="section-label mb-6">Infrastructure Stack</div>

            <div className="relative">
              {/* Spine connecting every layer */}
              <span
                aria-hidden="true"
                className="absolute left-[27px] top-8 bottom-8 w-px hidden sm:block"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,182,212,0.5), rgba(245,158,11,0.4), rgba(99,102,241,0.4), rgba(139,92,246,0.4), rgba(16,185,129,0.4))",
                }}
              />

              <div className="space-y-2.5">
                {INFRA_LAYERS.map(({ icon: Icon, label, sublabel, color, detail }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -18 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.09, duration: 0.55, ease: EASE_OUT }}
                    whileHover={{ x: 4 }}
                    className="relative flex items-start gap-4 p-4 rounded-2xl cursor-default"
                    style={{
                      background: `${color}0a`,
                      border: `1px solid ${color}26`,
                      boxShadow: `0 6px 22px ${color}0c`,
                    }}
                  >
                    <div
                      className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "#0c0c18",
                        border: `1px solid ${color}45`,
                        boxShadow: `0 0 20px ${color}25`,
                      }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[15px] font-semibold text-white">
                          {label}
                        </span>
                        <span
                          className="text-[10px] font-mono uppercase tracking-[0.16em] flex-shrink-0"
                          style={{ color: `${color}bb` }}
                        >
                          L{i + 1}
                        </span>
                      </div>
                      <div className="text-[13px] text-white/45 mt-0.5">{sublabel}</div>
                      <div className="text-[11px] text-white/28 mt-1.5 leading-relaxed">
                        {detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live environment readout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT }}
              className="surface-inset mt-6 p-5 font-mono"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-300 uppercase tracking-[0.16em]">
                  Production server active
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
                {ENVIRONMENT.map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 text-xs">
                    <span className="text-white/28 w-24 flex-shrink-0">{k}</span>
                    <span className="text-white/60 truncate">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-5 space-y-5">
            {/* CI/CD pipeline */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
              className="surface-inset p-6"
            >
              <div className="section-label mb-5">CI/CD Pipeline</div>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute left-[13px] top-4 bottom-4 w-px bg-white/[0.08]"
                />
                <div className="space-y-2">
                  {DEPLOYMENT_STEPS.map(({ step, label, icon: Icon, color }, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.08, duration: 0.45 }}
                      className="relative flex items-center gap-3"
                    >
                      <div
                        className="relative z-10 w-[27px] h-[27px] rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold"
                        style={{
                          background: "#0c0c18",
                          border: `1px solid ${color}45`,
                          color,
                        }}
                      >
                        {step}
                      </div>
                      <div
                        className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span className="text-[13px] text-white/70">{label}</span>
                        <Icon size={12} style={{ color }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                className="mt-5 flex items-center gap-2.5 px-4 py-3 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251,191,36,0.07), rgba(251,113,133,0.06))",
                  border: "1px solid rgba(251,113,133,0.2)",
                }}
              >
                <CheckCircle size={14} className="text-[#fda4af] flex-shrink-0" />
                <span className="text-[13px] text-white/70">
                  30 min manual â†’ <span className="font-semibold text-white">4 min</span>{" "}
                  automated, zero downtime
                </span>
              </div>
            </motion.div>

            {/* Proficiency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
              className="surface-card p-6"
            >
              <div className="section-label mb-5">DevOps Proficiency</div>
              <div className="space-y-3.5">
                {DEVOPS_SKILLS.map(({ label, level, color }, i) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-white/60">{label}</span>
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color }}
                      >
                        {level}%
                      </span>
                    </div>
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${level}%` } : {}}
                        transition={{
                          duration: 0.9,
                          delay: 0.55 + i * 0.06,
                          ease: EASE_OUT,
                        }}
                        style={{
                          background: `linear-gradient(90deg, ${color}88, ${color})`,
                          boxShadow: `0 0 10px ${color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}