"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const LINKS = [
  { icon: Github, href: "https://github.com/mihirborsaniya", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/mihirborsaniya",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:logicodesoftwarellp@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-surface/50">
      {/* Oversized wordmark bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-22%] select-none text-center font-black leading-none tracking-tighter"
        style={{
          fontSize: "clamp(5rem, 20vw, 17rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.045)",
        }}
      >
        BORSANIYA
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(251,113,133,0.16) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-[13px]"
                style={{
                  background: "linear-gradient(140deg, #12121f, #1b1b30)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                MB
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Mihir Borsaniya
                </div>
                <div className="text-xs text-white/40">
                  Full Stack ERP Engineer
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/40">
              Enterprise ERP platforms, multi-tenant SaaS, and production
              backends — designed, built, and deployed end to end.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-2">
              {LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative w-10 h-10 rounded-xl border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-white transition-colors overflow-hidden"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "var(--sig-gradient)", filter: "saturate(0.9)" }}
                  />
                  <Icon
                    size={16}
                    className="relative z-10 group-hover:text-[#1a0f13] transition-colors"
                  />
                </motion.a>
              ))}
              <motion.button
                onClick={scrollTop}
                className="w-10 h-10 rounded-xl border border-white/[0.09] flex items-center justify-center text-white/45 hover:text-white hover:border-indigo-400/40 hover:bg-indigo-500/10 transition-all cursor-pointer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={15} />
              </motion.button>
            </div>
            <p className="text-xs text-white/30 md:text-right">
              © {new Date().getFullYear()} Mihir Borsaniya. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
            Built with Next.js · Tailwind · Framer Motion
          </span>
          <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </span>
        </div>
      </div>
    </footer>
  );
}
