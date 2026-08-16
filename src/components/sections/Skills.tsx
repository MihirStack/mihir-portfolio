"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Server,
  Globe,
  Database,
  LayoutGrid,
  CreditCard,
  Cloud,
  GitBranch,
  Cpu,
} from "lucide-react";

const SKILL_CATEGORIES = [
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "#6366f1",
    skills: [
      { name: "Node.js", level: 95 },
      { name: "Express.js", level: 95 },
      { name: "REST APIs", level: 92 },
      { name: "JWT Authentication", level: 90 },
      { name: "OAuth 2.0", level: 85 },
      { name: "RBAC Systems", level: 88 },
      { name: "Socket.IO (Real-time)", level: 85 },
      { name: "Swagger / OpenAPI", level: 84 },
      { name: "Middleware Architecture", level: 90 },
      { name: "Transaction Management", level: 85 },
      { name: "Async Processing", level: 88 },
      { name: "API Security", level: 87 },
      { name: "System Design", level: 82 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "#06b6d4",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "Redux Toolkit", level: 88 },
      { name: "React Query", level: 82 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Bootstrap", level: 85 },
      { name: "Responsive Design", level: 90 },
      { name: "Performance Optimization", level: 80 },
      { name: "JavaScript (ES2022+)", level: 92 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    color: "#8b5cf6",
    skills: [
      { name: "MySQL", level: 92 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 82 },
      { name: "Sequelize ORM", level: 90 },
      { name: "Firebase", level: 84 },
      { name: "Database Design", level: 88 },
      { name: "Query Optimization", level: 85 },
      { name: "Data Modeling", level: 88 },
      { name: "Transactions & ACID", level: 85 },
      { name: "Multi-Tenant Databases", level: 85 },
    ],
  },
  {
    id: "erp",
    label: "ERP & Business",
    icon: LayoutGrid,
    color: "#10b981",
    skills: [
      { name: "POS Systems", level: 95 },
      { name: "Inventory Management", level: 92 },
      { name: "Purchase Management", level: 90 },
      { name: "Sales Management", level: 90 },
      { name: "Billing Systems", level: 92 },
      { name: "Customer Management", level: 88 },
      { name: "Loyalty Programs", level: 85 },
      { name: "Branch Management", level: 87 },
      { name: "Reporting & Analytics", level: 82 },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    color: "#f59e0b",
    skills: [
      { name: "Razorpay Integration", level: 90 },
      { name: "Stripe Integration", level: 86 },
      { name: "PayPal Integration", level: 84 },
      { name: "UPI Payments", level: 88 },
      { name: "Card Payments", level: 85 },
      { name: "Webhook Handling", level: 88 },
      { name: "Payment Reconciliation", level: 82 },
      { name: "Transaction Flows", level: 87 },
      { name: "Multi-Gateway Processing", level: 85 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Cloud,
    color: "#ef4444",
    skills: [
      { name: "Linux / Ubuntu", level: 85 },
      { name: "NGINX", level: 87 },
      { name: "PM2", level: 90 },
      { name: "GitHub Actions", level: 82 },
      { name: "SSL Configuration", level: 85 },
      { name: "VPS Hosting", level: 83 },
      { name: "Server Management", level: 82 },
      { name: "Production Deployment", level: 85 },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: Cpu,
    color: "#a78bfa",
    skills: [
      { name: "SaaS Architecture", level: 88 },
      { name: "Multi-Tenant Systems", level: 87 },
      { name: "Tenant Isolation", level: 85 },
      { name: "Dynamic DB Connections", level: 85 },
      { name: "LRU Caching", level: 80 },
      { name: "Scalability Patterns", level: 82 },
      { name: "Performance Optimization", level: 83 },
    ],
  },
  {
    id: "git",
    label: "Version Control",
    icon: GitBranch,
    color: "#fb923c",
    skills: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 92 },
      { name: "Pull Request Workflow", level: 90 },
      { name: "Branch Strategy", level: 88 },
      { name: "Code Reviews", level: 85 },
      { name: "Conflict Resolution", level: 85 },
    ],
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const [active, setActive] = useState("backend");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === active)!;
  const average = Math.round(
    activeCategory.skills.reduce((sum, s) => sum + s.level, 0) /
      activeCategory.skills.length
  );

  return (
    <section id="skills" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="section-hairline" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-label mb-4">Technical Skills</div>
          <h2 className="text-display text-white mb-4 text-balance">
            Engineering <span className="gradient-text">capabilities</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            A comprehensive skill set built through 3 years of shipping production
            systems, not tutorials.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[248px_1fr] gap-6 lg:gap-8 items-start">
          {/* Vertical category rail */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-24"
          >
            {SKILL_CATEGORIES.map(({ id, label, icon: Icon, color }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer shrink-0 lg:w-full ${
                    isActive ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `${color}16`,
                        border: `1px solid ${color}40`,
                        boxShadow: `0 6px 20px ${color}1f`,
                      }}
                      transition={{ type: "spring", bounce: 0.16, duration: 0.5 }}
                    />
                  )}
                  <Icon
                    size={14}
                    className="relative z-10 shrink-0"
                    style={{ color: isActive ? color : undefined }}
                  />
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Skills panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              {/* Category summary — asymmetric lead-in above the grid */}
              <div
                className="relative overflow-hidden rounded-2xl p-6 mb-3 flex flex-wrap items-center justify-between gap-6"
                style={{
                  background: `linear-gradient(135deg, ${activeCategory.color}12, rgba(0,0,0,0.25))`,
                  border: `1px solid ${activeCategory.color}28`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${activeCategory.color}1c`,
                      border: `1px solid ${activeCategory.color}38`,
                    }}
                  >
                    <activeCategory.icon
                      size={20}
                      style={{ color: activeCategory.color }}
                    />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white tracking-tight">
                      {activeCategory.label}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {activeCategory.skills.length} tracked competencies
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-black tracking-tight tabular-nums"
                    style={{ color: activeCategory.color }}
                  >
                    {average}
                  </span>
                  <span className="text-sm text-white/35">
                    % avg proficiency
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 w-56 h-56 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${activeCategory.color}22 0%, transparent 70%)`,
                    filter: "blur(30px)",
                  }}
                />
              </div>

              {/* Bento skill grid — the two strongest skills get wide cells */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activeCategory.skills.map(({ name, level }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.45, ease: EASE_OUT }}
                    className={`surface-card p-4 ${
                      i < 2 ? "sm:col-span-2 lg:col-span-3" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5 gap-3">
                      <span
                        className={`font-medium text-white/85 ${
                          i < 2 ? "text-[15px]" : "text-[13px]"
                        }`}
                      >
                        {name}
                      </span>
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: activeCategory.color }}
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
                        animate={{ width: `${level}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.15 + i * 0.035,
                          ease: EASE_OUT,
                        }}
                        style={{
                          background: `linear-gradient(90deg, ${activeCategory.color}88, ${activeCategory.color})`,
                          boxShadow: `0 0 10px ${activeCategory.color}55`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Complete stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
          className="mt-14 pt-10 border-t border-white/[0.06]"
        >
          <div className="section-label mb-5">Complete Technology Stack</div>
          <div className="flex flex-wrap gap-2">
            {[
              "Node.js", "Express.js", "TypeScript", "JavaScript", "React.js", "Next.js",
              "Redux Toolkit", "React Query", "Tailwind CSS", "Bootstrap",
              "MySQL", "MongoDB", "Redis", "Sequelize ORM", "Firebase",
              "Razorpay", "Stripe", "PayPal", "Socket.IO", "JWT", "OAuth", "RBAC",
              "REST APIs", "Swagger", "Webhooks", "Postman", "Git", "GitHub",
              "NGINX", "PM2", "Linux", "GitHub Actions", "Multi-Tenant", "SaaS",
              "ERP", "POS",
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.02 }}
                className="tech-tag text-[11px] py-1"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
