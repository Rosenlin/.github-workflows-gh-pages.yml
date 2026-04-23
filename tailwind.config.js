/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b7d6ff',
          300: '#86b8ff',
          400: '#4e91ff',
          500: '#2a6df5',
          600: '#1a54db',
          700: '#1742ad',
          800: '#153987',
          900: '#13306a',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans TC"',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
