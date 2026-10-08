/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light-first palette
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00d4ff',  // Primary cyan
          600: '#00b8e0',
          700: '#0096b8',
          800: '#007491',
          900: '#005870',
        },
        accent: {
          warm: '#ff6b35',    // Amber
          warmSoft: 'rgba(255, 107, 53, 0.12)',
          warmBorder: 'rgba(255, 107, 53, 0.25)',
          warmGlow: 'rgba(255, 107, 53, 0.35)',
          emerald: '#00d97e',  // Emerald
          emeraldSoft: 'rgba(0, 217, 126, 0.12)',
          emeraldBorder: 'rgba(0, 217, 126, 0.25)',
          emeraldGlow: 'rgba(0, 217, 126, 0.35)',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        ui: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(2, 6, 23, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 50px rgba(2, 6, 23, 0.1), 0 8px 20px rgba(0, 0, 0, 0.06)',
        'tilt': '0 30px 60px rgba(2, 6, 23, 0.12), 0 12px 24px rgba(0, 0, 0, 0.08)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.35)',
        'glow-amber': '0 0 30px rgba(255, 107, 53, 0.35)',
        'glow-emerald': '0 0 30px rgba(0, 217, 126, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
}