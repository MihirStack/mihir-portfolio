"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "DevOps", href: "#devops" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const shellOpacity = useTransform(scrollY, [0, 90], [0, 1]);
  const shellScale = useTransform(scrollY, [0, 90], [1.02, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Backdrop shell — fades in only once the page has scrolled. */}
        <motion.div
          className="absolute inset-0 backdrop-blur-2xl border-b border-white/[0.06]"
          style={{
            opacity: shellOpacity,
            scaleY: shellScale,
            background:
              "linear-gradient(180deg, rgba(8,8,15,0.92) 0%, rgba(8,8,15,0.72) 100%)",
          }}
        />

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4">
            {/* Wordmark */}
            <motion.button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0"
              whileHover={{ x: 1 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Back to top"
            >
              <span className="relative flex items-center justify-center w-9 h-9">
                <span
                  className="absolute inset-0 rounded-xl opacity-70 blur-[10px] transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--sig-gradient)" }}
                />
                <span
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black tracking-tight"
                  style={{
                    background: "linear-gradient(140deg, #12121f, #1b1b30)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                  }}
                >
                  MB
                </span>
              </span>
              <span className="hidden sm:flex flex-col leading-none text-left">
                <span className="text-[13px] font-semibold text-white/90">
                  Mihir Borsaniya
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/35 mt-1">
                  Full Stack Engineer
                </span>
              </span>
            </motion.button>

            {/* Desktop nav — a single floating capsule instead of loose links */}
            <div className="hidden lg:flex items-center rounded-full p-1 border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <button
                    key={label}
                    onClick={() => scrollTo(href)}
                    className={`relative px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-300 cursor-pointer ${
                      isActive ? "text-[#1a0f13]" : "text-white/50 hover:text-white/90"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "var(--sig-gradient)",
                          boxShadow: "0 4px 18px rgba(251,113,133,0.35)",
                        }}
                        transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA cluster */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <motion.a
                href="/resume.pdf"
                download="Mihir_Borsaniya_Resume.pdf"
                className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-full"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={13} />
                Resume
              </motion.a>
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="group flex items-center gap-1 px-4 py-2 text-[13px] rounded-full cursor-pointer text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 18px rgba(99,102,241,0.35)",
                }}
                whileHover={{
                  y: -1,
                  boxShadow: "0 8px 26px rgba(99,102,241,0.5)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.button>
            </div>

            {/* Mobile trigger */}
            <motion.button
              className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white border border-white/[0.08] bg-white/[0.03] transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {isOpen ? <X size={19} /> : <Menu size={19} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[68px] left-0 right-0 z-40 lg:hidden"
            style={{
              background: "rgba(8,8,15,0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <motion.button
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    onClick={() => scrollTo(href)}
                    className={`flex items-center justify-between text-left px-3 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                      isActive
                        ? "text-white bg-white/[0.06]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="w-1 h-4 rounded-full transition-all"
                        style={{
                          background: isActive
                            ? "var(--sig-gradient)"
                            : "rgba(255,255,255,0.12)",
                        }}
                      />
                      {label}
                    </span>
                    <span className="text-[10px] font-mono text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}

              <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                <a
                  href="/resume.pdf"
                  download="Mihir_Borsaniya_Resume.pdf"
                  className="btn-ghost flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium rounded-xl"
                >
                  <Download size={14} />
                  Resume
                </a>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-signature flex-1 px-3 py-3 text-sm rounded-xl cursor-pointer"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
