"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TechIcon } from "@/lib/tech-icons";
import { useMagnetic, CardSpotlight } from "@/components/ui/useMagnetic";
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
  Github,
  HeartPulse,
  Factory,
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

const MORE_PROJECTS = [
  {
    icon: HeartPulse,
    company: "Codebrain Infotech",
    title: "HRMS Platform",
    color: "#06b6d4",
    challenge:
      "Centralize attendance, leave, and employee operations with real-time notifications.",
    solution:
      "Built an HRMS with attendance and leave workflows, role-aware dashboards, exportable reports, and Firebase Cloud Messaging for live updates.",
    impact: "Adopted internally for day-to-day workforce management.",
    tech: ["Node.js", "Express.js", "React.js", "Firebase", "MongoDB", "JWT"],
  },
  {
    icon: Factory,
    company: "DI Solutions",
    title: "Medical & Manufacturing ERP",
    color: "#8b5cf6",
    challenge:
      "Run multiple business domains â€” medical, manufacturing, ecommerce, and POS â€” on one stack.",
    solution:
      "Delivered purchase, inventory, and shipment modules with real-time flows via Socket.IO, Redis caching, and multi-gateway checkout.",
    impact: "Multi-region payments through Razorpay, Stripe, and PayPal.",
    tech: ["Node.js", "Sequelize", "MySQL", "Redis", "Socket.IO", "Stripe", "PayPal"],
  },
  {
    icon: Globe,
    company: "DI Solutions",
    title: "Ecommerce & POS Suite",
    color: "#10b981",
    challenge:
      "Unify online storefront and in-store point-of-sale under shared inventory.",
    solution:
      "Built ecommerce checkout and a POS billing flow on a shared catalog and inventory engine with an admin dashboard for operations.",
    impact: "Consistent stock and pricing across online and offline sales.",
    tech: ["React.js", "Node.js", "MySQL", "Razorpay", "JWT", "REST APIs"],
  },
];

const ARCH_FLOW = [
  { label: "Client Browser", sublabel: "React + Redux", color: "#06b6d4" },
  { label: "Next.js Frontend", sublabel: "SSR + SPA", color: "#6366f1" },
  { label: "Express.js API", sublabel: "REST + JWT", color: "#8b5cf6" },
  { label: "Tenant Router", sublabel: "Dynamic DB", color: "#fb7185" },
  { label: "MySQL Cluster", sublabel: "Per-Tenant DB", color: "#10b981" },
];

const FLAGSHIP_METRICS = [
  { value: "50+", label: "Database Models" },
  { value: "10+", label: "ERP Modules" },
  { value: "100%", label: "Multi-Tenant" },
  { value: "RBAC", label: "Module-Level Auth" },
];

const FLAGSHIP_TECH = [
  "Node.js", "Express.js", "MySQL", "Sequelize", "React.js",
  "Redux", "Razorpay", "JWT", "RBAC", "NGINX", "PM2",
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // The flagship card is large enough that tilting it would read as wobble --
  // it gets the cursor spotlight only.
  const flagship = useMagnetic({ spotlightOnly: true });

  return (
    <section id="projects" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/20" />
      <div className="section-hairline" />

      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-label mb-4">Flagship Project</div>
          <h2 className="text-display text-white mb-4 text-balance">
            AksharPOS{" "}
            <span className="gradient-text-signature">ERP Platform</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Enterprise-grade Multi-Tenant ERP Platform for retail, wholesale, and POS
            businesses. Designed, built, and deployed from the ground up.
          </p>
        </motion.div>

        {/* Flagship card */}
        <motion.div
          {...flagship.bind}
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
          className="magnetic relative rounded-3xl overflow-hidden mb-4"
          style={{
            background:
              "linear-gradient(150deg, rgba(99,102,241,0.09) 0%, rgba(139,92,246,0.06) 45%, rgba(251,113,133,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
          }}
        >
          <CardSpotlight size={520} color="rgba(251, 113, 133, 0.10)" />
          <div
            aria-hidden="true"
            className="relative h-1 w-full"
            style={{ background: "var(--sig-gradient)" }}
          />

          <div className="relative p-7 md:p-10">
            {/* Asymmetric split: 5/7 rather than an even 50/50 */}
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3.5 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg"
                    style={{
                      background: "linear-gradient(140deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 8px 26px rgba(99,102,241,0.4)",
                    }}
                  >
                    A
                  </div>
                  <div>
                    <div className="text-lg font-black text-white tracking-tight">
                      AksharPOS ERP
                    </div>
                    <div className="text-[11px] font-mono text-white/40 mt-0.5">
                      Multi-Tenant SaaS Â· Production Â· @ Logicode
                    </div>
                  </div>
                </div>

                <p className="text-white/60 text-[15px] leading-relaxed mb-7">
                  A complete business management platform that handles everything from
                  touchscreen POS billing to complex inventory management, multi-branch
                  operations, supplier management, and financial reporting â€” all within a
                  secure multi-tenant architecture that isolates each business&apos;s data.
                </p>

                <div className="space-y-2.5 mb-7">
                  {TECH_HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                      className="flex items-start gap-3 rounded-xl px-3.5 py-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(99,102,241,0.15)",
                          border: "1px solid rgba(99,102,241,0.25)",
                        }}
                      >
                        <Icon size={12} className="text-indigo-300" />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-white">
                          {label}
                        </div>
                        <div className="text-xs text-white/40 mt-0.5">{desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {FLAGSHIP_TECH.map((tech) => (
                    <span key={tech} className="tech-tag">
                      <TechIcon name={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div className="lg:col-span-7">
                <div className="section-label mb-5">10 Integrated Modules</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {MODULES.map(({ icon: Icon, label, desc }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.045, duration: 0.5, ease: EASE_OUT }}
                      whileHover={{ y: -4 }}
                      className={`surface-card p-4 cursor-default ${
                        i === 0 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <Icon size={15} className="text-indigo-300 mb-2" />
                      <div className="text-[13px] font-semibold text-white mb-1">
                        {label}
                      </div>
                      <div className="text-[11px] text-white/35 leading-relaxed">
                        {desc}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-9 pt-7 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
              {FLAGSHIP_METRICS.map(({ value, label }) => (
                <div key={label} className="px-4 first:pl-0 py-1">
                  <div className="text-2xl font-black text-white tracking-tight">
                    {value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-white/35 mt-1.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beam sweep */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute top-0 left-0 w-[140px] h-full opacity-[0.07]"
              style={{
                background:
                  "linear-gradient(105deg, transparent, rgba(251,191,36,0.9), transparent)",
                animation: "beam 7s ease-in-out infinite 2s",
              }}
            />
          </div>
        </motion.div>

        {/* Architecture flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          className="surface-inset p-6 md:p-8"
        >
          <div className="section-label mb-6">System Architecture</div>
          <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-3 md:gap-0">
            {ARCH_FLOW.map(({ label, sublabel, color }, i) => (
              <div
                key={label}
                className="flex flex-col md:flex-row items-center gap-3 md:flex-1"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.09, duration: 0.5, ease: EASE_OUT }}
                  whileHover={{ y: -3 }}
                  className="flex-1 w-full px-3.5 py-3.5 rounded-2xl text-center"
                  style={{
                    background: `${color}0f`,
                    border: `1px solid ${color}33`,
                    boxShadow: `0 6px 22px ${color}12`,
                  }}
                >
                  <div className="text-[13px] font-semibold text-white">{label}</div>
                  <div className="text-[10px] font-mono mt-1" style={{ color }}>
                    {sublabel}
                  </div>
                </motion.div>
                {i < ARCH_FLOW.length - 1 && (
                  <ArrowRight
                    size={14}
                    className="text-white/20 rotate-90 md:rotate-0 flex-shrink-0 md:mx-2"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
          className="mt-20"
        >
          <div className="section-label mb-3">Selected Work</div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-9 tracking-tight">
            More things I&apos;ve <span className="gradient-text">shipped</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MORE_PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * A single "selected work" card. Extracted into its own component so each
 * instance can own its magnetic-tilt + spotlight state -- hooks can't be
 * called inside a `.map`.
 */
function ProjectCard({
  project,
  index: i,
  inView,
}: {
  project: (typeof MORE_PROJECTS)[number];
  index: number;
  inView: boolean;
}) {
  const {
    icon: Icon, company, title, color, challenge, solution, impact, tech,
  } = project;
  const { bind, motionStyle } = useMagnetic({ tilt: 5 });

  return (
    <motion.article
      {...bind}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: EASE_OUT }}
      whileHover={{ y: -6 }}
      className={`magnetic group relative flex flex-col rounded-2xl p-6 overflow-hidden ${
        i === 0 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
      style={{
        ...motionStyle,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <CardSpotlight size={300} color={`${color}20`} />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      <div className="relative flex items-center justify-between mb-5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: `${color}16`,
            border: `1px solid ${color}30`,
            boxShadow: `0 0 20px ${color}15`,
          }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex items-center gap-2 text-white/20">
          <Github size={14} />
          <ExternalLink size={14} />
        </div>
      </div>

      <div className="relative text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">
        {company}
      </div>
      <h4 className="relative text-lg font-bold text-white mb-5 tracking-tight">
        {title}
      </h4>

      <div className="relative space-y-3.5 flex-1">
        {[
          { k: "Challenge", v: challenge },
          { k: "Solution", v: solution },
          { k: "Impact", v: impact },
        ].map(({ k, v }) => (
          <div key={k} className="flex gap-3">
            <span
              className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <div>
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.16em] mb-1"
                style={{ color: `${color}dd` }}
              >
                {k}
              </div>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {v}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-white/[0.06]">
        {tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <TechIcon name={t} size={10} />
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
