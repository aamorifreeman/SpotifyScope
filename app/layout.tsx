import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SpotifyScope - Personal Music Analytics',
  description: 'Transform your Spotify listening data into beautiful insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-bg text-dark-text-primary min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
          {children}
        </div>
      </body>
    </html>
  )
}
