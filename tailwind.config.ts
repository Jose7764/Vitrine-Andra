import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F7EEDC",
        ivory: "#FFF8EC",
        cream: "#FBF2E3",
        gold: "#B98522",
        "gold-soft": "#D9B56A",
        coffee: "#2F2118",
        walnut: "#6F4D35",
        clay: "#9C7654"
      },
      boxShadow: {
        book: "0 22px 45px rgba(47, 33, 24, 0.18)",
        soft: "0 18px 40px rgba(111, 77, 53, 0.13)"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
        signature: ["var(--font-signature)", "cursive"]
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at top left, rgba(217,181,106,0.25), transparent 32rem), linear-gradient(135deg, #FFF8EC 0%, #F7EEDC 48%, #EFE0C8 100%)"
      }
    }
  },
  plugins: []
};

export default config;
