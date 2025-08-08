'use client';

import { useState } from 'react';
import { useSpotifyDashboard, useListeningAnalytics, TimeRangeKey } from '@/hooks/useSpotifyData';
import RecentlyPlayedTimeline from './RecentlyPlayedTimeline';
import TopArtistsChart from './TopArtistsChart';
import ListeningHeatmap from './ListeningHeatmap';
import GenreDistribution from './GenreDistribution';
import StatsCards from './StatsCards';
import TimeRangeSelector from './TimeRangeSelector';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRangeKey>('medium_term');
  const { recentlyPlayed, topTracks, topArtists, loading, error, refresh } = useSpotifyDashboard(timeRange);
  const analytics = useListeningAnalytics(recentlyPlayed, topArtists);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-spotify-green mx-auto"></div>
          <p className="text-dark-text-secondary text-lg">Analyzing your music taste...</p>
          <p className="text-dark-text-muted text-sm">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-red-400 text-4xl">⚠️</div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Unable to Load Data</h2>
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-dark-text-secondary text-sm mb-6">
              This might be due to Spotify API rate limits or connection issues. Please try again.
            </p>
          </div>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-spotify-green text-black font-semibold rounded-lg hover:bg-spotify-green/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Music Analytics</h1>
            <p className="text-dark-text-secondary mt-1">
              Discover insights about your listening habits
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            <button
              onClick={refresh}
              className="p-2 text-dark-text-secondary hover:text-white transition-colors rounded-md hover:bg-dark-surface"
              title="Refresh data"
            >
              <RefreshIcon />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards analytics={analytics} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recently Played Timeline - Full Width */}
          <div className="lg:col-span-2">
            <RecentlyPlayedTimeline data={recentlyPlayed} />
          </div>

          {/* Top Artists */}
          <TopArtistsChart data={topArtists} />

          {/* Genre Distribution */}
          <GenreDistribution data={analytics.genreDistribution} />

          {/* Listening Heatmap - Full Width */}
          <div className="lg:col-span-2">
            <ListeningHeatmap 
              hourlyData={analytics.listeningByHour} 
              dailyData={analytics.listeningByDay} 
            />
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard
            title="Music Discovery"
            value={`${analytics.uniqueArtists} artists`}
            description="Total unique artists in your recent listening"
            icon="🎵"
          />
          
          <InsightCard
            title="Listening Variety"
            value={`${analytics.genreDistribution.length} genres`}
            description="Different genres in your music taste"
            icon="🎨"
          />
          
          <InsightCard
            title="Popularity Score"
            value={`${Math.round(analytics.averagePopularity)}%`}
            description="Average popularity of your tracks"
            icon="⭐"
          />
        </div>
      </div>
    </div>
  );
}

// Insight Card Component (keeping this one inline since it's only used here)
interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
}

function InsightCard({ title, value, description, icon }: InsightCardProps) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6 text-center hover:border-spotify-green/30 transition-colors">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-2xl font-bold text-spotify-green mb-2">{value}</p>
      <p className="text-sm text-dark-text-secondary">{description}</p>
    </div>
  );
}

// Refresh Icon Component
function RefreshIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}