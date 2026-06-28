"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Download,
  Send,
  CheckCircle,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "developermihir13@gmail.com",
    href: "mailto:developermihir13@gmail.com",
    color: "#6366f1",
    desc: "Best for project inquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/mihirborsaniya",
    href: "https://linkedin.com/in/mihirborsaniya",
    color: "#0ea5e9",
    desc: "Connect professionally",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/MihirStack",
    href: "https://github.com/MihirStack",
    color: "#8b5cf6",
    desc: "See my code & contributions",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 7575896243",
    href: "https://wa.me/917575896243",
    color: "#10b981",
    desc: "Quick conversations",
  },
];

const AVAILABILITY = [
  { label: "Full-time roles", available: true },
  { label: "Freelance projects", available: true },
  { label: "Technical consulting", available: true },
  { label: "Open source collaboration", available: true },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  // Honeypot — hidden from real users, catches bots.
  const [company, setCompany] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setSent(true);
      toast.success("Message sent! I'll respond within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(
        `${msg} You can also email me directly at developermihir13@gmail.com.`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/40" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      {/* BG Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-3">Get In Touch</div>
          <h2 className="text-display font-black text-white mb-4">
            Let&apos;s Build{" "}
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Whether you&apos;re looking for an engineer to join your team, build your SaaS
            platform, or consult on system architecture — I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Availability */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.18)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">
                  Currently Available
                </span>
              </div>
              <div className="space-y-2">
                {AVAILABILITY.map(({ label, available }) => (
                  <div key={label} className="flex items-center gap-2">
                    <CheckCircle
                      size={13}
                      className={available ? "text-emerald-400" : "text-white/20"}
                    />
                    <span
                      className={`text-sm ${available ? "text-white/70" : "text-white/30"}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin size={13} className="text-indigo-400 flex-shrink-0" />
                Based in Gujarat, India · Open to Remote
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Clock size={13} className="text-cyan-400 flex-shrink-0" />
                Typically responds within 24 hours
              </div>
            </div>

            {/* Contact cards */}
            <div className="space-y-2">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color, desc }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl group transition-all"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: `${color}08`,
                    borderColor: `${color}30`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/35">{label}</div>
                    <div className="text-sm font-medium text-white/80 truncate">{value}</div>
                    <div className="text-[10px] text-white/30">{desc}</div>
                  </div>
                  <ArrowRight
                    size={13}
                    className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all"
                  />
                </motion.a>
              ))}
            </div>

            {/* Resume download */}
            <motion.a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full p-4 rounded-xl font-semibold text-sm text-white transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(99,102,241,0.35)",
              }}
              whileHover={{
                scale: 1.01,
                background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={15} />
              Download Full Resume (PDF)
            </motion.a>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl space-y-4"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-base font-bold text-white mb-2">Send a Message</div>

              {/* Honeypot — hidden from users, ignored by them, filled by bots */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 mb-1 block">
                    Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(99,102,241,0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">
                    Email <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(99,102,241,0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Full-time engineering role"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(99,102,241,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1 block">
                  Message <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(99,102,241,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-70 cursor-pointer"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: sent
                    ? "0 4px 16px rgba(16,185,129,0.4)"
                    : "0 4px 16px rgba(99,102,241,0.4)",
                }}
                whileHover={{ scale: sending || sent ? 1 : 1.02 }}
                whileTap={{ scale: sending || sent ? 1 : 0.98 }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={15} />
                    Message Sent!
                  </>
                ) : sending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-xs text-white/25 text-center">
                I typically respond within 24 hours. All inquiries are confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
