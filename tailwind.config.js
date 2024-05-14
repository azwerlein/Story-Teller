/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js}'
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    primary: "#4444bb",
                },
            },
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    primary: "#3366cc",
                },
            },
        ]
    },
}

