import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      trending: {
        "dark-green": "#264653",
        "light-green": "#2a9d8f",
        dirt: "#e9c46a",
        "light-orange": "#f4a261",
        "dark-orange": "#e76f51",
      },
    },
  },
  plugins: [],
};
export default config;
