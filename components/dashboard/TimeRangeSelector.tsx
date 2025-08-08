'use client';

import { TimeRangeKey } from '@/hooks/useSpotifyData';

interface TimeRangeSelectorProps {
  value: TimeRangeKey;
  onChange: (timeRange: TimeRangeKey) => void;
}

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const options = [
    { key: 'short_term' as TimeRangeKey, label: '4 weeks' },
    { key: 'medium_term' as TimeRangeKey, label: '6 months' },
    { key: 'long_term' as TimeRangeKey, label: 'All time' },
  ];

  return (
    <div className="flex bg-dark-surface rounded-lg p-1 border border-dark-border">
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            value === option.key
              ? 'bg-spotify-green text-black shadow-sm'
              : 'text-dark-text-secondary hover:text-white hover:bg-dark-bg'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}