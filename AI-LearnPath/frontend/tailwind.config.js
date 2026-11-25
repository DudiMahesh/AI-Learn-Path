/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#10b981',
          crimson: '#059669',
          gold: '#10b981',
          amber: '#10b981',
          reactor: '#10b981',
          cyan: '#10b981',
          titanium: '#09090b',
          blue: '#10b981',
          purple: '#10b981',
          indigo: '#059669'
        },
        surface: {
          0: '#09090b',
          1: '#111113',
          2: '#19191d',
          3: '#232329',
          4: '#2e2e36',
        }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] }
    }
  },
  plugins: []
}
