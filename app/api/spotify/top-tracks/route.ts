import { NextRequest, NextResponse } from 'next/server';
import { SpotifyAPI } from '@/lib/spotify';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('time_range') || 'medium_term') as 'short_term' | 'medium_term' | 'long_term';
    const limit = parseInt(searchParams.get('limit') || '50');

    const cookieStore = cookies();
    const accessToken = cookieStore.get('spotify_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'No access token' }, { status: 401 });
    }

    const spotify = new SpotifyAPI();
    const topTracks = await spotify.getTopTracks(accessToken, timeRange, limit);

    return NextResponse.json(topTracks);
  } catch (error) {
    console.error('Top tracks fetch failed:', error);
    return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 });
  }
}