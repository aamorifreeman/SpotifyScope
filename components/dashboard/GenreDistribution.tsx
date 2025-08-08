'use client';

interface GenreDistributionProps {
  data: Array<{ genre: string; count: number }>;
}

export default function GenreDistribution({ data }: GenreDistributionProps) {
  const maxCount = Math.max(...data.map(item => item.count));
  const colors = [
    '#1DB954', '#1ed760', '#1fdf64', '#20e568', '#21ec6c',
    '#22f270', '#23f874', '#24ff78', '#25ff7c', '#26ff80'
  ];

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Genre Distribution</h2>
      
      <div className="space-y-3">
        {data.slice(0, 8).map((genre, index) => (
          <div key={genre.genre} className="flex items-center space-x-3">
            {/* Color indicator */}
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            
            {/* Genre name */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate capitalize">{genre.genre}</p>
            </div>
            
            {/* Bar */}
            <div className="flex-1 max-w-32">
              <div className="w-full bg-dark-bg rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: colors[index % colors.length],
                    width: `${(genre.count / maxCount) * 100}%`
                  }}
                />
              </div>
            </div>
            
            {/* Count */}
            <div className="flex-shrink-0 w-8 text-right">
              <span className="text-dark-text-secondary text-sm">{genre.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}