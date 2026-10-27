/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b0b10",
          50: "#f6f6f7",
          100: "#e7e7ea",
          200: "#d0d0d6",
          300: "#aaaab4",
          400: "#7c7c89",
          500: "#60606d",
          600: "#4b4b56",
          700: "#3d3d46",
          800: "#27272e",
          900: "#17171c",
          950: "#0b0b10",
        },
        paper: "#f6f6f2",
        canvas: "#fbfbf8",
        line: "#e5e5df",
        muted: "#6b6b74",
        brand: {
          50: "#eef0ff",
          100: "#e0e3ff",
          200: "#c7cbff",
          300: "#a5a8ff",
          400: "#8581fc",
          500: "#6d5ef6",
          600: "#5b4ae8",
          700: "#4c3bcc",
          800: "#3f32a5",
          900: "#372f82",
          950: "#211b4b",
        },
        coral: {
          400: "#fb8f7d",
          500: "#f66f5a",
          600: "#e3543f",
        },
      },
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Manrope Variable",
          "Manrope",
          "Inter Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,16,20,0.03), 0 18px 50px -24px rgba(16,16,20,0.16)",
        float: "0 30px 90px -30px rgba(11,11,16,0.35)",
        glow: "0 0 0 1px rgba(109,94,246,0.15), 0 20px 80px -20px rgba(109,94,246,0.45)",
        "inset-line": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(11,11,16,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,16,0.055) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "dot-light":
          "radial-gradient(circle, rgba(11,11,16,0.13) 1px, transparent 1px)",
        "dot-dark":
          "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(120deg, #6d5ef6 0%, #8d7bff 45%, #38bdf8 100%)",
        "ink-gradient":
          "radial-gradient(ellipse at top, #24243a 0%, #0b0b10 58%)",
      },
      backgroundSize: {
        grid: "48px 48px",
        "grid-sm": "28px 28px",
        dot: "22px 22px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "border-spin": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-4%, 4%) scale(0.96)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "border-spin": "border-spin 5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
