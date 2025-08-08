import { NextRequest, NextResponse } from 'next/server';
import { SpotifyAPI } from '@/lib/spotify';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=spotify_auth_failed`);
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=no_code`);
  }

  try {
    const spotify = new SpotifyAPI();
    const tokens = await spotify.exchangeCodeForTokens(code);
    
    // Store tokens in HTTP-only cookies
    const cookieStore = cookies();
    cookieStore.set('spotify_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expires_in,
    });
    
    cookieStore.set('spotify_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
  } catch (error) {
    console.error('Token exchange failed:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=token_exchange_failed`);
  }
}