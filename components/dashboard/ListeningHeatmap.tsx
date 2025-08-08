'use client';

interface ListeningHeatmapProps {
  hourlyData: Array<{ hour: number; count: number }>;
  dailyData: Array<{ day: string; count: number }>;
}

export default function ListeningHeatmap({ hourlyData, dailyData }: ListeningHeatmapProps) {
  const maxHourlyCount = Math.max(...hourlyData.map(item => item.count));
  const maxDailyCount = Math.max(...dailyData.map(item => item.count));

  const getIntensity = (count: number, max: number) => {
    if (count === 0) return 0;
    return Math.max(0.1, count / max);
  };

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Listening Patterns</h2>
      
      <div className="space-y-8">
        {/* Daily Pattern */}
        <div>
          <h3 className="text-sm font-medium text-dark-text-secondary mb-4">Daily Distribution</h3>
          <div className="grid grid-cols-7 gap-2">
            {dailyData.map((day) => (
              <div key={day.day} className="text-center">
                <div
                  className="h-12 rounded-lg mb-2 transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: `rgba(29, 185, 84, ${getIntensity(day.count, maxDailyCount)})`,
                    border: day.count > 0 ? '1px solid rgba(29, 185, 84, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  title={`${day.day}: ${day.count} tracks`}
                />
                <span className="text-xs text-dark-text-secondary">{day.day.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Pattern */}
        <div>
          <h3 className="text-sm font-medium text-dark-text-secondary mb-4">Hourly Distribution</h3>
          <div className="grid grid-cols-12 gap-1">
            {hourlyData.map((hour) => (
              <div key={hour.hour} className="text-center">
                <div
                  className="h-8 rounded transition-all duration-200 hover:scale-105 mb-1"
                  style={{
                    backgroundColor: `rgba(29, 185, 84, ${getIntensity(hour.count, maxHourlyCount)})`,
                    border: hour.count > 0 ? '1px solid rgba(29, 185, 84, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  title={`${hour.hour}:00 - ${hour.count} tracks`}
                />
                <span className="text-xs text-dark-text-secondary">
                  {hour.hour.toString().padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}