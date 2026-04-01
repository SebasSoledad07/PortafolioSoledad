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
        // Montserrat para títulos y cuerpo base
        sans: ["Montserrat", "sans-serif"],
        // Fira Code para detalles técnicos y tags
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
