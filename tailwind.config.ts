import type { Config } from 'tailwindcss'

const { nextui } = require('@nextui-org/react')
const typography = require('@tailwindcss/typography')
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './framework/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      textColor: {
        slate: {
          50: 'var(--ai-create-color-theme-50)',
          100: 'var(--ai-create-color-theme-100)',
          200: 'var(--ai-create-color-theme-200)',
          300: 'var(--ai-create-color-theme-300)',
          400: 'var(--ai-create-color-theme-400)',
          500: 'var(--ai-create-color-theme-500)',
          600: 'var(--ai-create-color-theme-600)',
          700: 'var(--ai-create-color-theme-700)',
          800: 'var(--ai-create-color-theme-800)',
          900: 'var(--ai-create-color-theme-900)',
          950: 'var(--ai-create-color-theme-950)'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      },
      colors: {
        primary: {
          DEFAULT: '#F43F5E', // red-700 作为主色调
          light: '#FB7185', // red-600
          dark: '#E11D48', // red-800
        },
        secondary: {
          DEFAULT: '#A855F7', // blue-700
          light: '#C084FC', // blue-600
          dark: '#9333EA', // blue-800
        },
        accent: {
          DEFAULT: '#F97316', // amber-600
          light: '#FB923C', // amber-500
          dark: '#EA580C', // amber-700
        },
        background: {
          DEFAULT: '#FFF1F2', // slate-900
          light: '#FCE7F3', // slate-800
          dark: '#FDF2F8', // slate-950
        },
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        slate: {
          50: 'var(--ai-create-color-theme-50)',
          100: 'var(--ai-create-color-theme-100)',
          200: 'var(--ai-create-color-theme-200)',
          300: 'var(--ai-create-color-theme-300)',
          400: 'var(--ai-create-color-theme-400)',
          500: 'var(--ai-create-color-theme-500)',
          600: 'var(--ai-create-color-theme-600)',
          700: 'var(--ai-create-color-theme-700)',
          800: 'var(--ai-create-color-theme-800)',
          900: 'var(--ai-create-color-theme-900)',
          950: 'var(--ai-create-color-theme-950)'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-romantic': 'linear-gradient(to right, #F43F5E, #A855F7)', 
        'gradient-soft': 'linear-gradient(135deg, #FDF2F8 0%, #FAF5FF 100%)', 
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#F4355E',
              200: '#FB7185',
              300: '#E11D48'
            },
            secondary: {
              DEFAULT: '#A855F7',
              200: '#C084FC',
              300: '#9333EA'
            },
            accent: {
              DEFAULT: '#F97316',
              200: '#FB923C',
              300: '#EA580C'
            },
            fuchsia: {
              '50': '#fdf4ff',
              '100': '#fae8ff',
              '200': '#f5d0fe',
              '300': '#f0abfc',
              '400': '#e879f9',
              '500': '#d946ef',
              '600': '#c026d3',
              '700': '#a21caf',
              '800': '#86198f',
              '900': '#701a75',
              '950': '#4a044e'
            },
            black: {
              DEFAULT: '#FFF1F2',
              300: '#FCE7F3'
            },
            gray: {
              DEFAULT: '#374151'
            }
          }
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#F43F5E',
              200: '#FB7185',
              300: '#E11D48'
            },
            secondary: {
              DEFAULT: '#A855F7',
              200: '#C084FC',
              300: '#9333EA'
            },
            accent: {
              DEFAULT: '#F97316',
              200: '#FB923C',
              300: '#EA580C'
            },
            background: {
              DEFAULT: '#1F2937',
              light: '#374151',
              dark: '#111827'
            }
          }
        }
      }
    }),
    typography()
  ]
}
export default config
