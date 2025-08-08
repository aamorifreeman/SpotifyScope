'use client';

interface StatsCardsProps {
  analytics: {
    totalTracks: number;
    uniqueArtists: number;
    averagePopularity: number;
    genreDistribution: Array<{ genre: string; count: number }>;
  };
}

export default function StatsCards({ analytics }: StatsCardsProps) {
  const stats = [
    {
      label: 'Tracks Played',
      value: analytics.totalTracks.toLocaleString(),
      icon: <MusicIcon />,
      color: 'text-blue-400',
    },
    {
      label: 'Unique Artists',
      value: analytics.uniqueArtists.toLocaleString(),
      icon: <ArtistIcon />,
      color: 'text-purple-400',
    },
    {
      label: 'Avg Popularity',
      value: `${Math.round(analytics.averagePopularity)}%`,
      icon: <TrendingIcon />,
      color: 'text-green-400',
    },
    {
      label: 'Top Genre',
      value: analytics.genreDistribution[0]?.genre || 'N/A',
      icon: <GenreIcon />,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-spotify-green/50 transition-all duration-200 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            </div>
            <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Icon Components
function MusicIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}

function ArtistIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function GenreIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 1h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V6a1 1 0 011-1z" />
    </svg>
  );
}