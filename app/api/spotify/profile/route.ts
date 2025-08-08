import { NextRequest, NextResponse } from 'next/server';
import { SpotifyAPI } from '@/lib/spotify';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('spotify_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'No access token' }, { status: 401 });
    }

    const spotify = new SpotifyAPI();
    const profile = await spotify.getUserProfile(accessToken);

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile fetch failed:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}