import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/global.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",  // Light background color
        foreground: "#171717",  // Dark foreground/text color
        primary: "#3b82f6",     // Tailwind blue
        secondary: "#9333ea",   // Tailwind purple
        accent: "#ec4899",      // Tailwind pink
      },
    },
  },
  plugins: [],
} satisfies Config;
