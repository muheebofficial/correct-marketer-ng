import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#0B4D2C",
        gold: "#C8850A",
        obsidian: "#0D0D10",
        ivory: "#F7F4EC",
        sage: "#4A7A5A",
        stone: "#8A8A80",
        "stone-light": "#D8D4C8",
        // Darker neutral for muted body text: Stone Gray itself fails AA on Ivory.
        mute: "#55554E",
        // Gold that passes AA for small text on Ivory.
        "gold-ink": "#8A5A05",
        // Lighter gold for small text on Forest (Lagos Gold itself is 3.2:1 there; this is 4.8:1).
        "gold-soft": "#E5A93B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sub: ["var(--font-sub)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      maxWidth: { page: "1180px" },
    },
  },
  plugins: [],
};

export default config;
