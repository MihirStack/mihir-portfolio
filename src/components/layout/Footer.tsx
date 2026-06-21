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
    <footer className="relative border-t border-white/5 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
              MB
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Mihir Borsaniya</div>
              <div className="text-xs text-white/40">Full Stack ERP Engineer</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {LINKS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Mihir Borsaniya. All rights reserved.
            </p>
            <motion.button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
