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
  ArrowDown,
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
    sublabel: "SSL Termination · Load Balancing",
    color: "#f59e0b",
    detail: "Handles HTTPS, routes /api/* to Node.js, serves static assets directly",
  },
  {
    icon: Server,
    label: "Node.js / Express API",
    sublabel: "REST APIs · JWT Auth · Middleware",
    color: "#6366f1",
    detail: "Multi-tenant middleware, RBAC, rate limiting, request validation",
  },
  {
    icon: Cpu,
    label: "PM2 Cluster Mode",
    sublabel: "Process Manager · Zero-Downtime",
    color: "#8b5cf6",
    detail: "Cluster mode with N-1 CPU workers, graceful reloads, log rotation",
  },
  {
    icon: Database,
    label: "MySQL Databases",
    sublabel: "Per-Tenant Isolated · Connection Pool",
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

export default function DevOps() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="devops" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/20" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-3">Infrastructure & DevOps</div>
          <h2 className="text-display font-black text-white mb-3">
            Production{" "}
            <span className="gradient-text">Infrastructure</span>
          </h2>
          <p className="text-white/50 max-w-xl">
            End-to-end ownership from code to deployment. I configure the server,
            manage the process, and monitor the production environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Infrastructure diagram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="text-xs text-white/35 font-semibold uppercase tracking-widest mb-6">
              Infrastructure Stack
            </div>
            <div className="space-y-2">
              {INFRA_LAYERS.map(({ icon: Icon, label, sublabel, color, detail }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {/* Layer card */}
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl group hover:scale-[1.01] transition-all cursor-default"
                    style={{
                      background: `${color}08`,
                      border: `1px solid ${color}25`,
                      boxShadow: `0 2px 12px ${color}08`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        boxShadow: `0 0 16px ${color}20`,
                      }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{label}</span>
                        <span
                          className="text-[10px] font-mono"
                          style={{ color: `${color}aa` }}
                        >
                          Layer {i + 1}
                        </span>
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">{sublabel}</div>
                      <div className="text-[10px] text-white/25 mt-1 leading-relaxed">{detail}</div>
                    </div>
                  </div>

                  {/* Connector */}
                  {i < INFRA_LAYERS.length - 1 && (
                    <div className="flex justify-center py-1">
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <ArrowDown size={14} className="text-white/20" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Deployment pipeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-xs text-white/35 font-semibold uppercase tracking-widest mb-5">
                CI/CD Pipeline
              </div>
              <div className="space-y-2">
                {DEPLOYMENT_STEPS.map(({ step, label, icon: Icon, color }, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        color,
                      }}
                    >
                      {step}
                    </div>
                    <div
                      className="flex-1 flex items-center justify-between p-2.5 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="text-xs text-white/70">{label}</span>
                      <Icon size={11} style={{ color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DevOps skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-xs text-white/35 font-semibold uppercase tracking-widest mb-5">
                DevOps Proficiency
              </div>
              <div className="space-y-3">
                {DEVOPS_SKILLS.map(({ label, level, color }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-white/60">{label}</span>
                      <span className="text-xs font-bold" style={{ color }}>
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
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                          background: `linear-gradient(90deg, ${color}88, ${color})`,
                          boxShadow: `0 0 8px ${color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Environment card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.07)",
                fontFamily: "monospace",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-mono">Production Server Active</span>
              </div>
              <div className="space-y-1">
                {[
                  ["OS", "Ubuntu 22.04 LTS"],
                  ["Web Server", "NGINX 1.24.0"],
                  ["Runtime", "Node.js 20 LTS"],
                  ["Process Mgr", "PM2 5.x (cluster)"],
                  ["Database", "MySQL 8.0"],
                  ["SSL", "Let's Encrypt"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 text-xs">
                    <span className="text-white/30 w-24">{k}</span>
                    <span className="text-white/60">{v}</span>
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
