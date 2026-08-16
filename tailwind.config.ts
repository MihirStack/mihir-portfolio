import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080f",
        surface: "#0d0d1a",
        card: "#111124",
        border: "rgba(255,255,255,0.07)",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
          glow: "rgba(99,102,241,0.3)",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139,92,246,0.3)",
        },
        accent: {
          DEFAULT: "#06b6d4",
          glow: "rgba(6,182,212,0.3)",
        },
        /**
         * Signature warm accent — reserved for focal "wow" moments only
         * (hero headline word, active nav pill, primary CTA, key highlights).
         * Never use as a general-purpose surface colour.
         */
        signature: {
          DEFAULT: "#fb7185",
          warm: "#fbbf24",
          mid: "#fb7185",
          deep: "#c026d3",
          glow: "rgba(251,113,133,0.35)",
        },
        emerald: {
          glow: "rgba(16,185,129,0.3)",
        },
        muted: "#475569",
        subtle: "#1e1e38",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "aurora-1": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
        "aurora-2": "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #ec4899 100%)",
        "aurora-3": "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)",
        signature: "linear-gradient(120deg, #fbbf24 0%, #fb7185 48%, #c026d3 100%)",
        "signature-soft":
          "linear-gradient(120deg, rgba(251,191,36,0.16) 0%, rgba(251,113,133,0.16) 48%, rgba(192,38,211,0.16) 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.05) 100%)",
        "glow-primary":
          "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
        "glow-signature":
          "radial-gradient(ellipse at center, rgba(251,113,133,0.18) 0%, transparent 70%)",
        "glow-accent":
          "radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 70%)",
        "hero-grid":
          "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid": "60px 60px",
      },
      animation: {
        "aurora-shift": "aurora-shift 8s ease infinite alternate",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-x": "gradient-x 4s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        beam: "beam 3s ease-in-out infinite",
        "drift-slow": "drift 18s ease-in-out infinite",
      },
      keyframes: {
        "aurora-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        beam: {
          "0%": { transform: "translateX(-100%) rotate(-45deg)" },
          "100%": { transform: "translateX(200%) rotate(-45deg)" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(99,102,241,0.1)",
        "glow-accent": "0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(6,182,212,0.1)",
        "glow-violet": "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)",
        "glow-signature":
          "0 0 32px rgba(251,113,133,0.35), 0 0 72px rgba(192,38,211,0.18)",
        card: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover":
          "0 8px 48px rgba(0,0,0,0.6), 0 0 32px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        button: "0 4px 20px rgba(99,102,241,0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
