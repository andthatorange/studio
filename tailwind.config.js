// Design tokens live in app/globals.css (CSS variables). Change them there.
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)", ink: "var(--ink)", muted: "var(--muted)",
        line: "var(--line)", accent: "var(--accent)", surface: "var(--surface)",
      },
      fontFamily: { display: "var(--font-display)", body: "var(--font-body)" },
    },
  },
  plugins: [],
};
