"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Layers,
  CreditCard,
  GitBranch,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Code2,
  ArrowRight,
} from "lucide-react";

const CASE_STUDIES = [
  {
    id: "architecture",
    icon: Layers,
    label: "Case Study 01",
    title: "Multi-Tenant ERP Architecture",
    subtitle: "Designing isolated SaaS infrastructure for multiple business clients",
    color: "#6366f1",
    sections: [
      {
        icon: AlertTriangle,
        title: "The Problem",
        content:
          "We needed a single platform that could serve dozens of retail businesses simultaneously, with each business having completely isolated data, custom configurations, and independent subscription features â€” without running a separate server per client.",
      },
      {
        icon: Lightbulb,
        title: "Architecture Decision",
        content:
          "Adopted a hybrid multi-tenant model: a shared API layer with per-tenant MySQL databases. Each tenant gets their own database on the same server, routed dynamically via a middleware that reads the subdomain or tenant token from the JWT payload.",
      },
      {
        icon: Code2,
        title: "Technical Implementation",
        content:
          "Built a TenantResolver middleware that intercepts every request, extracts the tenant identifier, and establishes or retrieves a cached Sequelize connection from an LRU pool. Tenant DB configs are stored in a central master database. Migrations run per-tenant on subscription activation.",
      },
      {
        icon: TrendingUp,
        title: "Results",
        content:
          "Zero cross-tenant data leakage. 40ms average additional latency for tenant resolution. Onboarding a new tenant takes under 30 seconds â€” automated database creation, seed data injection, and admin user provisioning via a single API call.",
      },
    ],
    codeSnippet: `// Tenant resolution middleware
async function tenantResolver(req, res, next) {
  const tenantId = req.headers['x-tenant-id']
    || decodedJWT.tenantId;

  // LRU-cached Sequelize connection
  let connection = connectionPool.get(tenantId);

  if (!connection) {
    const tenantConfig = await masterDB.Tenant.findOne(
      { where: { id: tenantId } }
    );
    connection = new Sequelize(tenantConfig.dbName, ...);
    connectionPool.set(tenantId, connection);
  }

  req.db = connection;
  next();
}`,
  },
  {
    id: "payments",
    icon: CreditCard,
    label: "Case Study 02",
    title: "Payment Processing & Razorpay Integration",
    subtitle: "Handling financial transactions with reconciliation and webhook verification",
    color: "#10b981",
    sections: [
      {
        icon: AlertTriangle,
        title: "The Problem",
        content:
          "Retail businesses needed to accept payments via multiple channels â€” UPI, cards, cash, and split payments â€” with every transaction logged, reconciled, and tied to an invoice. Payment failures needed graceful handling without data corruption.",
      },
      {
        icon: Lightbulb,
        title: "Payment Flow Design",
        content:
          "Designed a two-phase payment flow: Order creation generates a Razorpay order ID and locks inventory. Payment completion triggers a webhook that verifies HMAC signature before updating order status â€” ensuring no order is marked paid without cryptographic verification.",
      },
      {
        icon: Code2,
        title: "Webhook Security",
        content:
          "All Razorpay webhooks are verified using the razorpay_payment_id + razorpay_order_id + razorpay_signature triple. The verification happens before any database write. Failed verifications are logged and flagged for manual review. Idempotency keys prevent duplicate processing.",
      },
      {
        icon: TrendingUp,
        title: "Results",
        content:
          "Zero payment reconciliation issues in production. Split-payment support allows customers to pay part cash and part UPI. Daily reconciliation reports auto-generate and flag any discrepancies between Razorpay dashboard totals and internal records.",
      },
    ],
    codeSnippet: `// Webhook signature verification
function verifyPaymentSignature(payload) {
  const { order_id, payment_id, signature } = payload;

  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(\`\${order_id}|\${payment_id}\`);
  const expectedSig = hmac.digest('hex');

  if (expectedSig !== signature) {
    throw new PaymentVerificationError(
      'Signature mismatch â€” possible tampering'
    );
  }

  // Idempotency check
  const existing = await Payment.findOne(
    { where: { razorpayPaymentId: payment_id } }
  );
  if (existing) return existing; // already processed

  return await createPaymentRecord(payload);
}`,
  },
  {
    id: "cicd",
    icon: GitBranch,
    label: "Case Study 03",
    title: "CI/CD & Production Deployment",
    subtitle: "Git flow, automated testing pipelines, and zero-downtime deployments",
    color: "#8b5cf6",
    sections: [
      {
        icon: AlertTriangle,
        title: "The Problem",
        content:
          "Manual deployments were error-prone and time-consuming. Hot patches in production caused inconsistencies between staging and live environments. We needed a reliable process that allowed fast iteration without risking system downtime for live businesses.",
      },
      {
        icon: Lightbulb,
        title: "Git Flow Strategy",
        content:
          "Implemented a structured branching model: `main` (production), `develop` (integration), `feature/*` (development), `bugfix/*` (hotfixes), `release/*` (pre-production). PRs require review and passing CI before merge. Hotfixes cherry-pick directly to main with immediate deploy.",
      },
      {
        icon: Code2,
        title: "GitHub Actions Pipeline",
        content:
          "CI pipeline runs on every PR: linting â†’ unit tests â†’ build verification â†’ staging deploy. CD pipeline triggers on `main` merge: SSH into VPS â†’ pull latest â†’ npm install â†’ run migrations â†’ PM2 reload. PM2 cluster mode ensures zero-downtime via graceful restarts.",
      },
      {
        icon: TrendingUp,
        title: "Results",
        content:
          "Deployment time reduced from 30 minutes manual to 4 minutes automated. Zero unplanned downtime incidents after implementing PM2 cluster + graceful reload. Staging environment always mirrors production, eliminating 'works on my machine' issues.",
      },
    ],
    codeSnippet: `# GitHub Actions deploy workflow
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.VPS_HOST }}
          script: |
            cd /var/www/aksharpos-api
            git pull origin main
            npm ci --production
            npx sequelize-cli db:migrate
            pm2 reload ecosystem.config.js \\
              --env production`,
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function CaseStudies() {
  const [active, setActive] = useState("architecture");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeStudy = CASE_STUDIES.find((s) => s.id === active)!;
  const activeIndex = CASE_STUDIES.findIndex((s) => s.id === active);

  return (
    <section id="case-studies" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/30" />
      <div className="section-hairline" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header â€” title left, selector count right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="section-label mb-4">Case Studies</div>
            <h2 className="text-display text-white mb-4 text-balance">
              Engineering <span className="gradient-text">deep dives</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Real problems, real solutions. How I approached the hardest engineering
              challenges in production.
            </p>
          </div>
          <div className="font-mono text-sm text-white/25 tabular-nums">
            <span className="text-white/70">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(CASE_STUDIES.length).padStart(2, "0")}
          </div>
        </motion.div>

        {/* Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
          className="grid sm:grid-cols-3 gap-2.5 mb-6"
        >
          {CASE_STUDIES.map(({ id, icon: Icon, label, title, color }) => {
            const isActive = active === id;
            return (
              <motion.button
                key={id}
                onClick={() => setActive(id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="relative flex items-start gap-3 p-4 rounded-2xl text-left cursor-pointer overflow-hidden transition-colors duration-300"
                style={
                  isActive
                    ? {
                        background: `${color}12`,
                        border: `1px solid ${color}40`,
                        boxShadow: `0 8px 28px ${color}16`,
                      }
                    : {
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                {isActive && (
                  <motion.span
                    layoutId="case-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px]"
                    style={{ background: color }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{
                    background: isActive ? `${color}20` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${
                      isActive ? color + "40" : "rgba(255,255,255,0.08)"
                    }`,
                  }}
                >
                  <Icon
                    size={15}
                    style={{
                      color: isActive ? color : "rgba(255,255,255,0.4)",
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
                    {label}
                  </div>
                  <div
                    className="text-[13px] font-semibold mt-1 leading-snug transition-colors duration-300"
                    style={{
                      color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {title}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content â€” narrative left, sticky code right */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="grid lg:grid-cols-12 gap-5"
          >
            {/* Narrative */}
            <div className="lg:col-span-7 space-y-3">
              <div
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg, ${activeStudy.color}10, rgba(0,0,0,0.25))`,
                  border: `1px solid ${activeStudy.color}26`,
                }}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${activeStudy.color}18`,
                      border: `1px solid ${activeStudy.color}33`,
                    }}
                  >
                    <activeStudy.icon size={19} style={{ color: activeStudy.color }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
                      {activeStudy.label}
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">
                      {activeStudy.title}
                    </div>
                  </div>
                </div>
                <p className="text-[15px] text-white/55 leading-relaxed">
                  {activeStudy.subtitle}
                </p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 w-56 h-56 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${activeStudy.color}20 0%, transparent 70%)`,
                    filter: "blur(30px)",
                  }}
                />
              </div>

              {activeStudy.sections.map(({ icon: Icon, title, content }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE_OUT }}
                  className="surface-card p-5"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${activeStudy.color}14`,
                        border: `1px solid ${activeStudy.color}26`,
                      }}
                    >
                      <Icon size={12} style={{ color: activeStudy.color }} />
                    </span>
                    <span className="text-[13px] font-semibold text-white">
                      {title}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-white/20 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[14px] text-white/50 leading-relaxed">{content}</p>
                </motion.div>
              ))}
            </div>

            {/* Code */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl overflow-hidden lg:sticky lg:top-24"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: `1px solid ${activeStudy.color}26`,
                  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Code2 size={11} className="text-white/30" />
                    <span className="text-[11px] text-white/35 font-mono">
                      {active === "cicd" ? "deploy.yml" : "implementation.ts"}
                    </span>
                  </div>
                  <div
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: `${activeStudy.color}15`,
                      color: activeStudy.color,
                      border: `1px solid ${activeStudy.color}28`,
                    }}
                  >
                    prod
                  </div>
                </div>

                <pre className="p-5 text-[12px] leading-relaxed overflow-x-auto text-white/70 font-mono">
                  <code>{activeStudy.codeSnippet}</code>
                </pre>

                <div
                  className="px-5 py-4 border-t flex items-center justify-between gap-3"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-emerald-400" />
                    <span className="text-xs text-white/45">
                      Deployed in production
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs"
                    style={{ color: activeStudy.color }}
                  >
                    <span>View full implementation</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}