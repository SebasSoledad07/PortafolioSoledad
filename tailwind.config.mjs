/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        carbon: "#121212",
        cyanElectric: "#00E5FF",
        smoke: "#F5F5F5",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
