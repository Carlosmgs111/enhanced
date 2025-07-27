/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      textSizes: {
        "2xs": "0.5rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      animation: {
        headShake: "headShake 0.5s ease-in-out",
      },
      keyframes: {
        headShake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-3px) rotateY(-9deg)",
          },
          "18.5%": {
            transform: "translateX(2px) rotateY(7deg)",
          },
          "31.5%": {
            transform: "translateX(-1px) rotateY(-5deg)",
          },
          "43.5%": {
            transform: "translateX(1px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
