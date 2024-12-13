// tailwind.config.js

const { nextui } = require('@nextui-org/theme')
const colors = require('tailwindcss/colors')
const { creamsicleColors } = require('./config/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        background: creamsicleColors.cream,
        foreground: creamsicleColors.textColor,
        primary: creamsicleColors.orange,
        secondary: creamsicleColors.lightOrange,
        // Add more custom colors as needed
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        'custom-small':
          '0px 0px 5px 0px rgba(0, 0, 0, 0.02), 0px 2px 10px 0px rgba(0, 0, 0, 0.06), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)',
        'custom-medium':
          '0px 0px 15px 0px rgba(0, 0, 0, 0.03), 0px 2px 30px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)',
        'custom-large':
          '0px 0px 30px 0px rgba(0, 0, 0, 0.04), 0px 30px 60px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)',
        // Add more custom shadows if needed
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      layout: {}, // Customize layout tokens if needed
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8,
            boxShadow: {
              small: 'var(--tw-shadow-custom-small)',
              medium: 'var(--tw-shadow-custom-medium)',
              large: 'var(--tw-shadow-custom-large)',
            },
          },
          colors: {
            background: creamsicleColors.cream,
            foreground: creamsicleColors.textColor,
            primary: {
              50: '#FBFAF8',
              100: '#FEF3EB',
              200: '#FFE9D6',
              300: '#FFD6AC',
              400: '#FFC790',
              500: '#FFBC82',
              600: '#F1AB70',
              700: '#E5944B',
              800: '#E07900',
              900: '#D36D00',
              foreground: '#FFFFFF',
              DEFAULT: '#111827',
            },
          },
        },
        dark: {
          layout: {
            hoverOpacity: 0.9,
            boxShadow: {
              small: 'var(--tw-shadow-custom-small)',
              medium: 'var(--tw-shadow-custom-medium)',
              large: 'var(--tw-shadow-custom-large)',
            },
          },
          colors: {
            background: '#111827',
            foreground: '#FF977D',
          },
        },
        // Add more custom themes if needed
      },
    }),
  ],
}
