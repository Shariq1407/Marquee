import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./admin/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        secondary: "#111111",
        accent: {
          DEFAULT: "#f19c29",
          foreground: "#0f0f0f",
        },
        muted: {
          DEFAULT: "#171717",
          foreground: "#a1a1aa",
        },
        border: "rgba(255,255,255,0.1)",
      },
      borderRadius: {
        DEFAULT: "0.625rem",
        sm: "calc(0.625rem * 0.8)",
        md: "calc(0.625rem * 1.1)",
        lg: "calc(0.625rem * 1.4)",
        xl: "calc(0.625rem * 1.8)",
        "2xl": "calc(0.625rem * 2.2)",
        "3xl": "3rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        /* A family of distinct device floats — each with its own motion signature */
        "float-1": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-2": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(-1.4deg)" },
        },
        "float-3": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        "float-4": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(8px, -10px)" },
        },
        "float-5": {
          "0%, 100%": { transform: "rotate(-1.6deg)" },
          "50%": { transform: "rotate(1.6deg)" },
        },
        "float-6": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.02)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "float-1": "float-1 6s ease-in-out infinite",
        "float-2": "float-2 8s ease-in-out infinite",
        "float-3": "float-3 10s ease-in-out infinite",
        "float-4": "float-4 9s ease-in-out infinite",
        "float-5": "float-5 5.5s ease-in-out infinite",
        "float-6": "float-6 12s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
