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
        "starfield-pulse": "starfield-pulse .3s ease-in-out",
        flash: "flash .3s ease-in-out",
      },
      keyframes: {
        "starfield-pulse": {
          "0%": {
            "border-color": "#00ff88",
            "text-shadow": "0 0 10px #00ff88",
          },
          "50%": {
            "border-color": "#66ffaa",
            "text-shadow": "0 0 20px #66ffaa",
          },
          "100%": {
            "border-color": "#00ff88",
            "text-shadow": "0 0 15px #00ff88",
          },
        },
        flash: {
          "0%, 50%, 100%": {
            opacity: 1,
          },
          "25%, 75%": {
            opacity: 0,
          },
        },
        headShake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-5px) rotateY(-9deg)",
          },
          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },
          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },
          "43.5%": {
            transform: "translateX(3px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
      },
      backgroundImage: {
        "dotted-pattern": `radial-gradient(circle 2px at top left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 50%)`,
        "squared-dotted-pattern": `linear-gradient(90deg, #fff 50%, transparent 50%), linear-gradient(#fff 50%, transparent 50%);`,
        blueprint:
          "linear-gradient(rgba(224,224,224,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(224,224,224,0.3) 1px, transparent 1px);",
        "grid-pattern": `linear-gradient(rgba(224,224,224,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(224,224,224,0.3) 1px, transparent 1px);`,
      },
      backgroundSize: {
        "dotted-pattern": "11px 11px",
        "squared-dotted-pattern": "2px 2px",
        "grid-pattern": "18px 18px",
      },
      backgroundPosition: {
        "dotted-pattern": "0 0, 2px 2px",
        "squared-dotted-pattern": "0 0, 2px 2px",
      },
      backgroundColor: {
        "dotted-pattern": "#000",
        "squared-dotted-pattern": "#000",
      },
    },
  },
  plugins: [],
};
