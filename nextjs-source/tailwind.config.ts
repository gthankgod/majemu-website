import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        blood: "#A81408",
        cream: "#F5F0E8",
        bone: "#FAF7F2",
        ash: "#8A8A85",
        smoke: "#1C1B1A",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        script: ["var(--font-ephesis)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        mega: "0.35em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
