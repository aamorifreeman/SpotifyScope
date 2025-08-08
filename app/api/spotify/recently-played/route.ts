import { NextRequest, NextResponse } from 'next/server';
import { SpotifyAPI } from '@/lib/spotify';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const cookieStore = cookies();
    const accessToken = cookieStore.get('spotify_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'No access token' }, { status: 401 });
    }

    const spotify = new SpotifyAPI();
    const recentlyPlayed = await spotify.getRecentlyPlayed(accessToken, limit);

    return NextResponse.json(recentlyPlayed);
  } catch (error) {
    console.error('Recently played fetch failed:', error);
    return NextResponse.json({ error: 'Failed to fetch recently played' }, { status: 500 });
  }
}
