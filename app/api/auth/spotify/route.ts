import { NextRequest, NextResponse } from 'next/server';
import { SpotifyAPI } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  const spotify = new SpotifyAPI();
  const authUrl = spotify.getAuthUrl();
  
  return NextResponse.redirect(authUrl);
}