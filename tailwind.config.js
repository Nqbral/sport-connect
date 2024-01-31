/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            neutral: colors.neutral,
            primary: colors.blue,
            stone: colors.stone,
            transparent: colors.transparent,
            white: colors.white,
        },
        extend: {},
    },
    plugins: [],
};
