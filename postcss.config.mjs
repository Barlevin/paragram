/**
 * Tailwind v4 moved its PostCSS integration into a separate package.
 * Using `tailwindcss` directly here generates zero utilities.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
