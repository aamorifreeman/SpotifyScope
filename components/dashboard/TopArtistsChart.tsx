'use client';

import { SpotifyArtist } from '@/lib/spotify';

interface TopArtistsChartProps {
  data: SpotifyArtist[];
}

export default function TopArtistsChart({ data }: TopArtistsChartProps) {
  const maxPopularity = Math.max(...data.map(artist => artist.popularity));

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Top Artists</h2>
      
      <div className="space-y-4">
        {data.slice(0, 10).map((artist, index) => (
          <div key={artist.id} className="flex items-center space-x-4">
            {/* Rank */}
            <div className="flex-shrink-0 w-6 text-center">
              <span className="text-dark-text-secondary font-medium">{index + 1}</span>
            </div>
            
            {/* Artist Image */}
            <div className="flex-shrink-0">
              <img
                src={artist.images[2]?.url || artist.images[0]?.url || '/placeholder-artist.png'}
                alt={artist.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
            
            {/* Artist Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{artist.name}</p>
              <p className="text-dark-text-secondary text-sm">
                {artist.genres.slice(0, 2).join(', ') || 'No genres'}
              </p>
            </div>
            
            {/* Popularity Bar */}
            <div className="flex-shrink-0 w-24">
              <div className="w-full bg-dark-bg rounded-full h-2">
                <div
                  className="bg-spotify-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(artist.popularity / maxPopularity) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Popularity Score */}
            <div className="flex-shrink-0 w-8 text-right">
              <span className="text-dark-text-secondary text-sm">{artist.popularity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}