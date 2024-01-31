/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: colors.white,
            stone: colors.stone,
            primary: colors.blue,
        },
        extend: {},
    },
    plugins: [],
};
