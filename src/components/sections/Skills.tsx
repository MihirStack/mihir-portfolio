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

export default function Skills() {
  const [active, setActive] = useState("backend");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="skills" className="relative py-24 overflow-hidden" ref={ref}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="section-label mb-3">Technical Skills</div>
          <h2 className="text-display font-black text-white mb-3">
            Engineering{" "}
            <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-white/50 max-w-xl">
            A comprehensive skill set built through 3 years of shipping production systems,
            not tutorials.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {SKILL_CATEGORIES.map(({ id, label, icon: Icon, color }) => (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
              style={
                active === id
                  ? {
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      color: color,
                      boxShadow: `0 0 16px ${color}20`,
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.5)",
                    }
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={12} />
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {activeCategory.skills.map(({ name, level }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="p-4 rounded-xl group"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/80">{name}</span>
                  <span
                    className="text-xs font-bold"
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
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, ${activeCategory.color}aa, ${activeCategory.color})`,
                      boxShadow: `0 0 8px ${activeCategory.color}60`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All tech tags at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <div className="text-xs text-white/30 mb-4 font-medium">Complete Technology Stack</div>
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
