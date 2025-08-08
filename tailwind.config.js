/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Spotify-inspired color palette
          spotify: {
            green: '#1DB954',
            black: '#191414',
            white: '#FFFFFF',
            gray: {
              light: '#B3B3B3',
              dark: '#535353',
            }
          },
          // Dark theme colors
          dark: {
            bg: '#0D1117',
            surface: '#161B22',
            border: '#30363D',
            text: {
              primary: '#F0F6FC',
              secondary: '#8B949E',
              muted: '#656D76'
            }
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.3s ease-out',
          'pulse-slow': 'pulse 3s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
    darkMode: 'class',
}