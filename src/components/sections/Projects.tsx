"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  CreditCard,
  BarChart3,
  Building2,
  Gift,
  Truck,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Database,
  Globe,
} from "lucide-react";

const MODULES = [
  { icon: ShoppingCart, label: "POS Billing", desc: "Touch-optimized POS with multi-payment support" },
  { icon: Package, label: "Inventory", desc: "Real-time stock tracking across branches" },
  { icon: Truck, label: "Purchase Mgmt", desc: "Supplier orders, GRN, and cost tracking" },
  { icon: TrendingUp, label: "Sales Mgmt", desc: "Sales orders, dispatch, and returns" },
  { icon: Users, label: "Customer CRM", desc: "Customer profiles, history, and segmentation" },
  { icon: Building2, label: "Branch Mgmt", desc: "Multi-location with branch-level reporting" },
  { icon: Gift, label: "Loyalty Program", desc: "Points, tiers, rewards, and redemptions" },
  { icon: CreditCard, label: "Payments", desc: "Razorpay, UPI, card, cash, and split payments" },
  { icon: BarChart3, label: "Analytics", desc: "Custom reports, dashboards, and exports" },
  { icon: Shield, label: "RBAC Auth", desc: "Role-based permissions at module level" },
];

const TECH_HIGHLIGHTS = [
  { icon: Layers, label: "Multi-Tenant Architecture", desc: "Isolated per-tenant databases with shared API layer" },
  { icon: Database, label: "50+ Database Models", desc: "Normalized relational schema with complex joins" },
  { icon: Globe, label: "Dynamic DB Routing", desc: "LRU-cached connection pooling per tenant" },
  { icon: Shield, label: "Secure Auth", desc: "JWT + RBAC with module-level access control" },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/20" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
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
          <div className="section-label mb-3">Flagship Project</div>
          <h2 className="text-display font-black text-white mb-4">
            AksharPOS{" "}
            <span className="gradient-text">ERP Platform</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Enterprise-grade Multi-Tenant ERP Platform for retail, wholesale, and POS
            businesses. Designed, built, and deployed from the ground up.
          </p>
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-10"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.4), 0 0 80px rgba(99,102,241,0.08)",
          }}
        >
          {/* Top gradient bar */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
            }}
          />

          <div className="p-8 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                    }}
                  >
                    A
                  </div>
                  <div>
                    <div className="text-lg font-black text-white">AksharPOS ERP</div>
                    <div className="text-xs text-white/40">
                      Multi-Tenant SaaS · Production · 2022–Present
                    </div>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  A complete business management platform that handles everything from
                  touchscreen POS billing to complex inventory management, multi-branch
                  operations, supplier management, and financial reporting — all within a
                  secure multi-tenant architecture that isolates each business&apos;s data.
                </p>

                <div className="space-y-3">
                  {TECH_HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
                      >
                        <Icon size={12} className="text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{label}</div>
                        <div className="text-xs text-white/40">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-6">
                  {["Node.js", "Express.js", "MySQL", "Sequelize", "React.js", "Redux", "Razorpay", "JWT", "RBAC", "NGINX", "PM2"].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Right — Module grid */}
              <div>
                <div className="text-xs font-semibold text-white/40 mb-4 uppercase tracking-widest">
                  10 Integrated Modules
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {MODULES.map(({ icon: Icon, label, desc }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="p-3 rounded-xl group hover:bg-white/5 transition-all cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon size={14} className="text-indigo-400 mb-1.5" />
                      <div className="text-xs font-semibold text-white mb-0.5">{label}</div>
                      <div className="text-[10px] text-white/35 leading-relaxed">{desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom metrics */}
            <div
              className="mt-8 pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-4"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {[
                { value: "50+", label: "Database Models" },
                { value: "10+", label: "ERP Modules" },
                { value: "100%", label: "Multi-Tenant" },
                { value: "3+", label: "Years in Production" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-black gradient-text">{value}</div>
                  <div className="text-xs text-white/35 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Beam effect */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute top-0 left-0 w-[120px] h-full opacity-10"
              style={{
                background:
                  "linear-gradient(105deg, transparent, rgba(99,102,241,0.8), transparent)",
                animation: "beam 5s ease-in-out infinite 2s",
              }}
            />
          </div>
        </motion.div>

        {/* Architecture visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="section-label mb-4">System Architecture</div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {[
              { label: "Client Browser", sublabel: "React + Redux", color: "#06b6d4" },
              { label: "Next.js Frontend", sublabel: "SSR + SPA", color: "#6366f1" },
              { label: "Express.js API", sublabel: "REST + JWT", color: "#8b5cf6" },
              { label: "Tenant Router", sublabel: "Dynamic DB", color: "#a78bfa" },
              { label: "MySQL Cluster", sublabel: "Per-Tenant DB", color: "#10b981" },
            ].map(({ label, sublabel, color }, i) => (
              <div key={label} className="flex flex-col md:flex-row items-center gap-2 md:gap-2">
                <div
                  className="px-3 py-2.5 rounded-xl text-center min-w-[120px]"
                  style={{
                    background: `${color}10`,
                    border: `1px solid ${color}30`,
                    boxShadow: `0 0 16px ${color}10`,
                  }}
                >
                  <div className="text-xs font-semibold text-white">{label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color }}>
                    {sublabel}
                  </div>
                </div>
                {i < 4 && (
                  <ArrowRight
                    size={14}
                    className="text-white/20 rotate-90 md:rotate-0 flex-shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
