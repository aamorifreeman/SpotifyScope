export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-spotify-green to-emerald-400 bg-clip-text text-transparent">
            SpotifyScope
          </h1>
          <p className="text-xl text-dark-text-secondary max-w-2xl mx-auto">
            Transform your Spotify listening data into beautiful, interactive visualizations and actionable insights
          </p>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-dark-surface border border-dark-border rounded-lg hover:border-spotify-green/50 transition-colors">
            <h3 className="text-lg font-semibold text-spotify-green mb-2">Recently Played Timeline</h3>
            <p className="text-dark-text-secondary text-sm">Visualize your last 50 tracks in a beautiful chronological timeline</p>
          </div>
          
          <div className="p-6 bg-dark-surface border border-dark-border rounded-lg hover:border-spotify-green/50 transition-colors">
            <h3 className="text-lg font-semibold text-spotify-green mb-2">Top Artists Analysis</h3>
            <p className="text-dark-text-secondary text-sm">Discover your most played artists across different time periods</p>
          </div>
          
          <div className="p-6 bg-dark-surface border border-dark-border rounded-lg hover:border-spotify-green/50 transition-colors">
            <h3 className="text-lg font-semibold text-spotify-green mb-2">Listening Heatmap</h3>
            <p className="text-dark-text-secondary text-sm">See when you listen to music most throughout the day and week</p>
          </div>
          
          <div className="p-6 bg-dark-surface border border-dark-border rounded-lg hover:border-spotify-green/50 transition-colors">
            <h3 className="text-lg font-semibold text-spotify-green mb-2">Genre Distribution</h3>
            <p className="text-dark-text-secondary text-sm">Analyze your music taste diversity across different genres</p>
          </div>
        </div>
      </div>
    </main>
  )
}