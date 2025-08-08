'use client';

import { useState, useEffect } from 'react';
import { SpotifyTrack, SpotifyArtist } from '@/lib/spotify';

export interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

export interface TimeRange {
  short_term: '4 weeks';
  medium_term: '6 months';
  long_term: 'all time';
}

export type TimeRangeKey = keyof TimeRange;

export function useRecentlyPlayed(limit: number = 50) {
  const [data, setData] = useState<RecentlyPlayedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentlyPlayed();
  }, [limit]);

  const fetchRecentlyPlayed = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/spotify/recently-played?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recently played tracks');
      }
      
      const result = await response.json();
      setData(result.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchRecentlyPlayed();
  };

  return { data, loading, error, refresh };
}

export function useTopTracks(timeRange: TimeRangeKey = 'medium_term', limit: number = 50) {
  const [data, setData] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopTracks();
  }, [timeRange, limit]);

  const fetchTopTracks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/spotify/top-tracks?time_range=${timeRange}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch top tracks');
      }
      
      const result = await response.json();
      setData(result.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchTopTracks();
  };

  return { data, loading, error, refresh };
}

export function useTopArtists(timeRange: TimeRangeKey = 'medium_term', limit: number = 50) {
  const [data, setData] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopArtists();
  }, [timeRange, limit]);

  const fetchTopArtists = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/spotify/top-artists?time_range=${timeRange}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch top artists');
      }
      
      const result = await response.json();
      setData(result.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchTopArtists();
  };

  return { data, loading, error, refresh };
}

// Combined hook for dashboard data
export function useSpotifyDashboard(timeRange: TimeRangeKey = 'medium_term') {
  const recentlyPlayed = useRecentlyPlayed(50);
  const topTracks = useTopTracks(timeRange, 20);
  const topArtists = useTopArtists(timeRange, 20);

  const loading = recentlyPlayed.loading || topTracks.loading || topArtists.loading;
  const error = recentlyPlayed.error || topTracks.error || topArtists.error;

  const refreshAll = () => {
    recentlyPlayed.refresh();
    topTracks.refresh();
    topArtists.refresh();
  };

  return {
    recentlyPlayed: recentlyPlayed.data,
    topTracks: topTracks.data,
    topArtists: topArtists.data,
    loading,
    error,
    refresh: refreshAll,
  };
}

// Analytics processing hook
export function useListeningAnalytics(recentlyPlayed: RecentlyPlayedItem[], topArtists: SpotifyArtist[]) {
  const [analytics, setAnalytics] = useState({
    totalTracks: 0,
    uniqueArtists: 0,
    averagePopularity: 0,
    genreDistribution: [] as Array<{ genre: string; count: number }>,
    listeningByHour: [] as Array<{ hour: number; count: number }>,
    listeningByDay: [] as Array<{ day: string; count: number }>,
  });

  useEffect(() => {
    if (recentlyPlayed.length === 0) return;

    // Calculate analytics
    const uniqueArtistIds = new Set(
      recentlyPlayed.map(item => item.track.artists[0]?.id).filter(Boolean)
    );

    const totalPopularity = recentlyPlayed.reduce(
      (sum, item) => sum + (item.track.popularity || 0), 0
    );

    // Genre distribution from top artists
    const genreMap = new Map<string, number>();
    topArtists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
      });
    });

    const genreDistribution = Array.from(genreMap.entries())
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Listening by hour
    const hourMap = new Map<number, number>();
    recentlyPlayed.forEach(item => {
      const hour = new Date(item.played_at).getHours();
      hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
    });

    const listeningByHour = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: hourMap.get(hour) || 0,
    }));

    // Listening by day
    const dayMap = new Map<string, number>();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    recentlyPlayed.forEach(item => {
      const dayIndex = new Date(item.played_at).getDay();
      const dayName = dayNames[dayIndex];
      dayMap.set(dayName, (dayMap.get(dayName) || 0) + 1);
    });

    const listeningByDay = dayNames.map(day => ({
      day,
      count: dayMap.get(day) || 0,
    }));

    setAnalytics({
      totalTracks: recentlyPlayed.length,
      uniqueArtists: uniqueArtistIds.size,
      averagePopularity: totalPopularity / recentlyPlayed.length,
      genreDistribution,
      listeningByHour,
      listeningByDay,
    });
  }, [recentlyPlayed, topArtists]);

  return analytics;
}