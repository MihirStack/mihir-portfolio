"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Download,
  Server,
  Database,
  Globe,
  Zap,
  ShieldCheck,
  BarChart3,
  Package,
  CreditCard,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Database Models" },
  { value: 10, suffix: "+", label: "ERP Modules" },
  { value: 100, suffix: "%", label: "Production Grade" },
];

const FLOATING_CARDS = [
  {
    icon: Server,
    title: "Multi-Tenant API",
    subtitle: "Dynamic DB Routing",
    color: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.15)",
    delay: 0,
    position: "top-8 right-4 md:right-8",
  },
  {
    icon: Database,
    title: "50+ DB Models",
    subtitle: "Sequelize ORM",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.15)",
    delay: 0.3,
    position: "top-48 right-0 md:right-2",
  },
  {
    icon: CreditCard,
    title: "Razorpay",
    subtitle: "Payment Processing",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
    delay: 0.6,
    position: "bottom-32 right-4 md:right-12",
  },
  {
    icon: ShieldCheck,
    title: "JWT + RBAC",
    subtitle: "Auth & Permissions",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    glow: "rgba(139,92,246,0.15)",
    delay: 0.9,
    position: "bottom-8 right-2 md:right-20",
  },
];

const TECH_STACK = [
  "Node.js", "TypeScript", "React", "Next.js",
  "MySQL", "MongoDB", "Redis", "Socket.IO",
  "Razorpay", "Stripe",
];

const MODULE_BADGES = [
  { icon: Package, label: "POS Billing" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Globe, label: "Multi-Tenant" },
  { icon: Zap, label: "Real-time" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Aurora blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(50%, 50%)",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)] py-12">
          {/* Left — Content */}
          <div ref={ref}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-indigo-300">
                  Available for New Opportunities
                </span>
              </div>
            </motion.div>

            {/* Name headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-display font-black text-white mb-4"
            >
              Mihir
              <br />
              <span className="gradient-text">Borsaniya</span>
            </motion.h1>

            {/* Role + value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg sm:text-xl font-semibold text-white/85 mb-3"
            >
              Full Stack Engineer building{" "}
              <span className="text-indigo-300">enterprise SaaS systems that scale.</span>
            </motion.p>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/55 leading-relaxed mb-8 max-w-xl"
            >
              I design and develop enterprise ERP platforms, multi-tenant SaaS systems,
              payment infrastructures, backend architectures, and production-ready business
              software that powers real businesses.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-1.5 mb-8"
            >
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="tech-tag"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <motion.button
                onClick={() => scrollTo("#projects")}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 6px 28px rgba(99,102,241,0.55)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                View Projects
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white/80 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={14} />
                Download Resume
              </motion.a>

              <motion.button
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black gradient-text">
                    {inView ? (
                      <CountUp end={value} duration={2} suffix={suffix} />
                    ) : (
                      "0" + suffix
                    )}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:flex items-center justify-center h-[580px]">
            {/* Central dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-[320px] h-[420px] rounded-2xl glass shimmer-card overflow-hidden"
              style={{
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow:
                  "0 8px 48px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.1)",
              }}
            >
              {/* Dashboard header */}
              <div
                className="px-4 py-3 flex items-center justify-between border-b"
                style={{ borderColor: "rgba(99,102,241,0.15)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <div className="text-xs text-white/40 font-mono">AksharPOS ERP</div>
                <div className="w-4 h-4 rounded bg-indigo-500/20 border border-indigo-500/30" />
              </div>

              {/* Dashboard content */}
              <div className="p-4 space-y-3">
                {/* Metric cards row */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Revenue", value: "₹2.4L", up: true },
                    { label: "Orders", value: "1,247", up: true },
                    { label: "Inventory", value: "99.2%", up: false },
                    { label: "Tenants", value: "38", up: true },
                  ].map(({ label, value, up }) => (
                    <div
                      key={label}
                      className="p-2 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="text-xs text-white/40">{label}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{value}</div>
                      <div
                        className={`text-xs mt-0.5 ${up ? "text-emerald-400" : "text-orange-400"}`}
                      >
                        {up ? "↑ 12.4%" : "↓ 2.1%"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart bars */}
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="text-xs text-white/40 mb-2">Sales Overview</div>
                  <div className="flex items-end gap-1 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t"
                          initial={{ height: 0 }}
                          animate={inView ? { height: `${h}%` } : {}}
                          transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                          style={{
                            background:
                              i === 11
                                ? "linear-gradient(180deg, #6366f1, #8b5cf6)"
                                : `rgba(99,102,241,${0.2 + (i / 11) * 0.3})`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Module badges */}
                <div className="flex flex-wrap gap-1.5">
                  {MODULE_BADGES.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg"
                      style={{
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.18)",
                      }}
                    >
                      <Icon size={9} className="text-indigo-400" />
                      <span className="text-xs text-indigo-300">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Recent transactions */}
                <div className="space-y-1.5">
                  <div className="text-xs text-white/40">Recent Transactions</div>
                  {[
                    { id: "TXN-2481", amount: "₹4,250", status: "success" },
                    { id: "TXN-2480", amount: "₹1,800", status: "success" },
                    { id: "TXN-2479", amount: "₹9,600", status: "pending" },
                  ].map(({ id, amount, status }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span className="text-xs font-mono text-white/50">{id}</span>
                      <span className="text-xs font-semibold text-white">{amount}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          status === "success"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-yellow-500/15 text-yellow-400"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(99,102,241,0.04) 50%, transparent 60%)",
                  animation: "shimmer 4s ease-in-out infinite",
                }}
              />
            </motion.div>

            {/* Floating info cards */}
            {FLOATING_CARDS.map(({ icon: Icon, title, subtitle, color, border, glow, delay, position }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + delay }}
                className={`absolute ${position} flex items-center gap-2.5 px-3 py-2.5 rounded-xl glass`}
                style={{
                  border: `1px solid ${border.replace("border-", "").replace("/20", "")}33`,
                  boxShadow: `0 4px 20px ${glow}, 0 0 0 1px rgba(255,255,255,0.04)`,
                  animation: `float ${5 + delay}s ease-in-out ${delay}s infinite`,
                }}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
                  style={{ border: `1px solid ${border.replace("border-", "").replace("/20", "")}40` }}
                >
                  <Icon size={14} className="text-white/80" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/90">{title}</div>
                  <div className="text-[10px] text-white/40">{subtitle}</div>
                </div>
              </motion.div>
            ))}

            {/* Orbit ring */}
            <div
              className="absolute inset-0 m-auto w-[480px] h-[480px] rounded-full pointer-events-none"
              style={{
                border: "1px dashed rgba(99,102,241,0.1)",
                animation: "spin 30s linear infinite",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
      >
        <span className="text-xs text-white/30">Scroll to explore</span>
        <motion.div
          className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center p-1"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
