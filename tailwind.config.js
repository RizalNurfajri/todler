/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                todlerLight: {
                    'primary': '#FF8C42',
                    'primary-content': '#1B1B1B',
                    'secondary': '#0EA5E9',
                    'accent': '#22C55E',
                    'neutral': '#111827',
                    'base-100': '#FFFFFF',
                    'base-200': '#F5F7FA',
                    'base-300': '#E5E7EB',
                    'info': '#38BDF8',
                    'success': '#22C55E',
                    'warning': '#F59E0B',
                    'error': '#EF4444',
                },
            },
            {
                todlerDark: {
                    'primary': '#FF8C42',
                    'primary-content': '#0A0A0A',
                    'secondary': '#38BDF8',
                    'accent': '#10B981',
                    'neutral': '#0F172A',
                    'base-100': '#0B1220',
                    'base-200': '#111827',
                    'base-300': '#1F2937',
                    'info': '#38BDF8',
                    'success': '#10B981',
                    'warning': '#F59E0B',
                    'error': '#F87171',
                },
            },
        ],
    },
}
