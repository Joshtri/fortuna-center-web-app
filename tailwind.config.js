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
                    DEFAULT: "#D32F2F", // Red 700
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#FBC02D", // Yellow 700
                    foreground: "#171717", // Dark text for contrast on yellow
                },
            },


        },
    },
    darkMode: "class",
    plugins: [heroui()],
};

module.exports = config;
