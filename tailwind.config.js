/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Spotify colors
          'spotify-green': '#1DB954',
          'spotify-green-dark': '#1ed760',
          
          // Dark theme colors
          'dark-bg': '#0a0a0a',
          'dark-surface': '#1a1a1a',
          'dark-border': '#333333',
          'dark-text-primary': '#ffffff',
          'dark-text-secondary': '#b3b3b3',
          'dark-text-muted': '#6b7280',
          
          // Accent colors
          'accent-blue': '#1e40af',
          'accent-purple': '#7c3aed',
          'accent-pink': '#ec4899',
          'accent-orange': '#ea580c',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'gradient-spotify': 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.3s ease-out',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
}