/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // Display: characterful serif (Fraunces). Body: highly readable serif (Newsreader).
        // No Inter / Roboto / Arial / system stacks; no Space Grotesk (spec §5).
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // ---- Dark editorial palette: warm deep-ink base + warm paper foreground ----
        ink: {
          950: "#0d0c0a", // page background (warm near-black)
          900: "#14120f",
          800: "#1c1916",
          700: "#272320",
          600: "#383229",
          500: "#4d463b",
        },
        paper: {
          DEFAULT: "#ece6da",
          50: "#f7f3ec",
          100: "#ece6da", // primary body text on ink
          200: "#d9d1c1",
          300: "#bcb2a0",
          400: "#968c7b", // muted captions / meta
          500: "#6f665a",
        },
        // ONE disciplined accent — Winterberry, in two tunings:
        //  - `accent` (deep) for fills/CTAs with white text
        //  - `accent-text` (lighter) for links on the dark ground (AA-safe)
        accent: {
          DEFAULT: "#c0445c",
          fill: "#c0445c",
          text: "#e68a9b",
          muted: "#8f4150",
        },

        // ---- Back-compat aliases (legacy class names still referenced in a few spots) ----
        winterberry: "#c0445c",
        roast: "#6B4C4A",
        vapor: "#B8B5AE",
        crown: "#3E4A5C",
        dark: {
          50: "#f7f3ec",
          100: "#ece6da",
          200: "#d9d1c1",
          300: "#bcb2a0",
          400: "#968c7b",
          500: "#6f665a",
          600: "#383229",
          700: "#272320",
          800: "#1c1916",
          900: "#14120f",
          950: "#0d0c0a",
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.4" }],
        base: ["1.0625rem", { lineHeight: "1.7" }],
        lg: ["1.1875rem", { lineHeight: "1.7" }],
        xl: ["1.375rem", { lineHeight: "1.6" }],
        "2xl": ["1.625rem", { lineHeight: "1.4" }],
        "3xl": ["2rem", { lineHeight: "1.25" }],
        "4xl": ["2.5rem", { lineHeight: "1.15" }],
        "5xl": ["3.25rem", { lineHeight: "1.08" }],
        "6xl": ["4rem", { lineHeight: "1.04" }],
        "7xl": ["5rem", { lineHeight: "1.0" }],
      },
      letterSpacing: {
        tightish: "-0.02em",
        tighter2: "-0.035em",
      },
      maxWidth: {
        // Reading measure for long-form prose.
        measure: "80ch",
        prose: "65ch",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.8s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
