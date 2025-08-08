# SpotifyScope

**SpotifyScope** is a personal music analytics platform that transforms your Spotify listening data into interactive visualizations and insights. Built with Next.js and TypeScript, it provides a comprehensive dashboard to analyze your music taste, listening patterns, and discover trends in your musical preferences.

## What SpotifyScope Does

SpotifyScope connects to your Spotify account to analyze your listening history and present the data through four core visualizations:

- **Recently Played Timeline**: Shows your last 50 tracks with timestamps and album artwork
- **Top Artists Chart**: Displays your most played artists ranked by popularity with visual bars
- **Genre Distribution**: Breaks down your music taste across different genres with proportional visualization
- **Listening Patterns Heatmap**: Maps your music listening activity by day of week and hour of day

The platform calculates key metrics including total tracks played, unique artists discovered, average song popularity, and peak listening times. Users can filter data across three time periods: 4 weeks, 6 months, or all time.

## Features

**Core Analytics Dashboard**
- Recently played tracks timeline with album art and timestamps
- Top artists ranking with popularity scores
- Genre distribution analysis
- Daily and hourly listening pattern visualization
- Key statistics: total tracks, unique artists, average popularity, top genre

**User Experience**
- Time range filtering (4 weeks, 6 months, all time)
- Responsive design for desktop, tablet, and mobile
- Real-time data refresh capability
- Spotify-inspired dark theme interface

**Security & Privacy**
- Secure Spotify OAuth 2.0 authentication
- Read-only access to listening history
- No playlist modifications or account changes
- Automatic token management and refresh

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm package manager
- Spotify account
- Spotify Developer Account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spotifyscope.git
cd spotifyscope
npm install
```

2. Set up Spotify API credentials
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add redirect URI: `http://localhost:3000/api/auth/callback`
   - Copy your Client ID and Client Secret

3. Configure environment variables
Create `.env.local` in the root directory:
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) and authenticate with Spotify

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Spotify OAuth 2.0
- **API**: Next.js API routes
- **State Management**: Custom React hooks
- **Deployment**: Vercel-ready
