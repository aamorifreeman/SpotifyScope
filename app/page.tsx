import Link from 'next/link';

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

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-spotify-green hover:bg-spotify-green/90 text-black font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <span>Get Started</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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

        {/* Features Preview */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Coming in Phase 2</h2>
          <p className="text-dark-text-secondary mb-8">Advanced audio intelligence features</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 bg-dark-surface/50 border border-dark-border/50 rounded-lg">
              <h4 className="text-spotify-green font-medium mb-2">Musical DNA</h4>
              <p className="text-sm text-dark-text-secondary">Personal audio feature analysis and mood tracking</p>
            </div>
            
            <div className="p-4 bg-dark-surface/50 border border-dark-border/50 rounded-lg">
              <h4 className="text-spotify-green font-medium mb-2">Smart Recommendations</h4>
              <p className="text-sm text-dark-text-secondary">AI-powered music suggestions based on your taste</p>
            </div>
            
            <div className="p-4 bg-dark-surface/50 border border-dark-border/50 rounded-lg">
              <h4 className="text-spotify-green font-medium mb-2">Social Insights</h4>
              <p className="text-sm text-dark-text-secondary">Compare your taste with friends and discover new music</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}