"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Layers,
  CreditCard,
  GitBranch,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Code2,
  Server,
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
          "We needed a single platform that could serve dozens of retail businesses simultaneously, with each business having completely isolated data, custom configurations, and independent subscription features — without running a separate server per client.",
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
          "Zero cross-tenant data leakage. 40ms average additional latency for tenant resolution. Onboarding a new tenant takes under 30 seconds — automated database creation, seed data injection, and admin user provisioning via a single API call.",
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
          "Retail businesses needed to accept payments via multiple channels — UPI, cards, cash, and split payments — with every transaction logged, reconciled, and tied to an invoice. Payment failures needed graceful handling without data corruption.",
      },
      {
        icon: Lightbulb,
        title: "Payment Flow Design",
        content:
          "Designed a two-phase payment flow: Order creation generates a Razorpay order ID and locks inventory. Payment completion triggers a webhook that verifies HMAC signature before updating order status — ensuring no order is marked paid without cryptographic verification.",
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
      'Signature mismatch — possible tampering'
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
          "CI pipeline runs on every PR: linting → unit tests → build verification → staging deploy. CD pipeline triggers on `main` merge: SSH into VPS → pull latest → npm install → run migrations → PM2 reload. PM2 cluster mode ensures zero-downtime via graceful restarts.",
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

export default function CaseStudies() {
  const [active, setActive] = useState("architecture");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeStudy = CASE_STUDIES.find((s) => s.id === active)!;

  return (
    <section id="case-studies" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/30" />
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
          className="mb-12"
        >
          <div className="section-label mb-3">Case Studies</div>
          <h2 className="text-display font-black text-white mb-3">
            Engineering{" "}
            <span className="gradient-text">Deep Dives</span>
          </h2>
          <p className="text-white/50 max-w-xl">
            Real problems, real solutions. How I approached the hardest engineering
            challenges in production.
          </p>
        </motion.div>

        {/* Tab selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-2 mb-8"
        >
          {CASE_STUDIES.map(({ id, icon: Icon, label, title, color }) => (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              className="flex-1 flex items-center gap-3 p-4 rounded-xl text-left transition-all cursor-pointer"
              style={
                active === id
                  ? {
                      background: `${color}10`,
                      border: `1px solid ${color}35`,
                      boxShadow: `0 0 20px ${color}12`,
                    }
                  : {
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: active === id ? `${color}20` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${active === id ? color + "40" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <Icon size={14} style={{ color: active === id ? color : "rgba(255,255,255,0.4)" }} />
              </div>
              <div>
                <div className="text-[10px] text-white/35">{label}</div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: active === id ? "white" : "rgba(255,255,255,0.6)" }}
                >
                  {title}
                </div>
              </div>
              {active === id && (
                <ChevronRight size={14} className="ml-auto flex-shrink-0" style={{ color }} />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Case study content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Details */}
            <div className="space-y-4">
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: `${activeStudy.color}08`,
                  border: `1px solid ${activeStudy.color}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${activeStudy.color}15`,
                      border: `1px solid ${activeStudy.color}30`,
                    }}
                  >
                    <activeStudy.icon size={18} style={{ color: activeStudy.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-white/35">{activeStudy.label}</div>
                    <div className="text-base font-bold text-white">{activeStudy.title}</div>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {activeStudy.subtitle}
                </p>
              </div>

              {activeStudy.sections.map(({ icon: Icon, title, content }) => (
                <div
                  key={title}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} className="text-white/40" />
                    <span className="text-xs font-semibold text-white">{title}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{content}</p>
                </div>
              ))}
            </div>

            {/* Code snippet */}
            <div>
              <div
                className="rounded-2xl overflow-hidden h-full"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: `1px solid ${activeStudy.color}20`,
                }}
              >
                {/* Code header */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Code2 size={11} className="text-white/30" />
                    <span className="text-xs text-white/30 font-mono">
                      {active === "cicd" ? "deploy.yml" : "implementation.ts"}
                    </span>
                  </div>
                  <div
                    className="text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: `${activeStudy.color}15`,
                      color: activeStudy.color,
                      border: `1px solid ${activeStudy.color}25`,
                    }}
                  >
                    Production
                  </div>
                </div>

                {/* Code body */}
                <pre
                  className="p-5 text-xs leading-relaxed overflow-x-auto text-white/70 font-mono"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <code>{activeStudy.codeSnippet}</code>
                </pre>

                {/* Bottom CTA */}
                <div
                  className="px-5 py-4 border-t flex items-center justify-between"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-400" />
                    <span className="text-xs text-white/40">Deployed in production</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: activeStudy.color }}>
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
