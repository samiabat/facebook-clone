import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                facebook: {
                    blue: '#1877F2',
                    'blue-hover': '#166FE5',
                    bg: '#F0F2F5',
                    green: '#42B72A',
                    'green-hover': '#36A420',
                    text: '#050505',
                    'text-secondary': '#65676B',
                    border: '#CED0D4',
                    'hover-bg': '#F2F2F2',
                },
            },
        },
    },

    plugins: [forms],
};
