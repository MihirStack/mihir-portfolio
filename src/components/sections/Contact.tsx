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

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  // Honeypot â€” hidden from real users, catches bots.
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
    <section id="contact" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface/40" />
      <div className="section-hairline" />

      {/* Signature wash â€” the page closes on the accent it opened with */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[760px] h-[460px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,113,133,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-label mb-4">Get In Touch</div>
          <h2 className="text-display text-white mb-4 text-balance">
            Let&apos;s build{" "}
            <span className="gradient-text-signature">something great</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Whether you&apos;re looking for an engineer to join your team, build your
            SaaS platform, or consult on system architecture â€” I&apos;d love to hear
            about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left â€” availability, channels, resume */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            className="lg:col-span-5 space-y-4"
          >
            <div
              className="relative overflow-hidden rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.07), rgba(251,113,133,0.06), rgba(192,38,211,0.05))",
                border: "1px solid rgba(251,113,133,0.22)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[15px] font-semibold text-white">
                  Currently available
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {AVAILABILITY.map(({ label, available }) => (
                  <div key={label} className="flex items-center gap-2">
                    <CheckCircle
                      size={13}
                      className={`flex-shrink-0 ${
                        available ? "text-emerald-400" : "text-white/20"
                      }`}
                    />
                    <span
                      className={`text-[13px] ${
                        available ? "text-white/70" : "text-white/30"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-x-5 gap-y-2">
                <span className="flex items-center gap-2 text-[13px] text-white/50">
                  <MapPin size={13} className="text-[#fda4af] flex-shrink-0" />
                  Gujarat, India Â· Open to remote
                </span>
                <span className="flex items-center gap-2 text-[13px] text-white/50">
                  <Clock size={13} className="text-cyan-300 flex-shrink-0" />
                  Responds within 24 hours
                </span>
              </div>
            </div>

            {/* Channels */}
            <div className="space-y-2">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color, desc }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASE_OUT }}
                  className="surface-card group flex items-center gap-3.5 p-4"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${color}16`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                      {label}
                    </div>
                    <div className="text-[13px] font-medium text-white/85 truncate">
                      {value}
                    </div>
                    <div className="text-[11px] text-white/30 mt-0.5">{desc}</div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              download="Mihir_Borsaniya_Resume.pdf"
              className="btn-ghost flex items-center justify-center gap-2 w-full p-4 rounded-2xl font-semibold text-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={15} />
              Download Full Resume (PDF)
            </motion.a>
          </motion.div>

          {/* Right â€” form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="surface-inset p-6 md:p-8 space-y-5 lg:sticky lg:top-24"
            >
              <div>
                <div className="text-lg font-bold text-white tracking-tight">
                  Send a message
                </div>
                <p className="text-[13px] text-white/40 mt-1">
                  Straight to my inbox â€” no forms-to-nowhere.
                </p>
              </div>

              {/* Honeypot â€” hidden from users, ignored by them, filled by bots */}
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
                  <label className="text-[11px] uppercase tracking-[0.14em] text-white/35 mb-1.5 block">
                    Name <span className="text-[#fda4af]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="field"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.14em] text-white/35 mb-1.5 block">
                    Email <span className="text-[#fda4af]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-[0.14em] text-white/35 mb-1.5 block">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Full-time engineering role"
                  className="field"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-[0.14em] text-white/35 mb-1.5 block">
                  Message <span className="text-[#fda4af]">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  rows={7}
                  className="field resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm cursor-pointer disabled:opacity-70 ${
                  sent ? "font-semibold text-white" : "btn-signature"
                }`}
                style={
                  sent
                    ? {
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 8px 26px rgba(16,185,129,0.35)",
                      }
                    : undefined
                }
                whileHover={{ y: sending || sent ? 0 : -2 }}
                whileTap={{ scale: sending || sent ? 1 : 0.98 }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3.5 h-3.5 border-2 border-black/25 border-t-black/70 rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-[11px] text-white/25 text-center">
                I typically respond within 24 hours. All inquiries are confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}