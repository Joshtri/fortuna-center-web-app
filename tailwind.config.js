import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
            colors: {
                primary: {
                    DEFAULT: "#06b6d4", // Cyan 500 (Blue-Green)
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#3b82f6", // Blue 500
                    foreground: "#ffffff",
                },
            },


        },
    },
    darkMode: "class",
    plugins: [heroui()],
};

module.exports = config;
