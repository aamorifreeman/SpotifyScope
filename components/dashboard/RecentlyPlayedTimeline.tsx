'use client';

import { RecentlyPlayedItem } from '@/hooks/useSpotifyData';

interface RecentlyPlayedTimelineProps {
  data: RecentlyPlayedItem[];
}

export default function RecentlyPlayedTimeline({ data }: RecentlyPlayedTimelineProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)}h ago`;
    } else {
      return `${Math.round(diffInHours / 24)}d ago`;
    }
  };

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recently Played</h2>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {data.slice(0, 20).map((item, index) => (
          <div
            key={`${item.track.id}-${item.played_at}`}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-bg/50 transition-colors"
          >
            {/* Album Art */}
            <div className="flex-shrink-0">
              <img
                src={item.track.album.images[2]?.url || item.track.album.images[0]?.url}
                alt={item.track.album.name}
                className="w-12 h-12 rounded-md"
              />
            </div>
            
            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{item.track.name}</p>
              <p className="text-dark-text-secondary text-sm truncate">
                {item.track.artists.map(artist => artist.name).join(', ')}
              </p>
            </div>
            
            {/* Time */}
            <div className="flex-shrink-0 text-dark-text-secondary text-sm">
              {formatTime(item.played_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}