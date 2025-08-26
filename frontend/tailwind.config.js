/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#06B6D4",
        dark: "#111827",
        light: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      lineHeight: {
        tight: '1.2',
        snug: '1.4',
        normal: '1.5',
        relaxed: '1.6',
        loose: '2',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
      },
      borderRadius: {
        xl2: "16px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
        lift: "0 16px 40px rgba(0,0,0,0.12)",
      },
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      scrollMargin: {
        20: '80px', // Matches navbar height
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.transition-smooth': {
          transitionProperty: 'all',
          transitionDuration: '200ms',
          transitionTimingFunction: 'ease-in-out',
        },
      });
    },
  ],
};