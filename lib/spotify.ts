export interface SpotifyTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
  
  export interface SpotifyUser {
    id: string;
    display_name: string;
    email: string;
    images: Array<{ url: string }>;
    country: string;
    followers: { total: number };
  }
  
  export interface SpotifyTrack {
    id: string;
    name: string;
    artists: Array<{ id: string; name: string }>;
    album: {
      id: string;
      name: string;
      images: Array<{ url: string; width: number; height: number }>;
      release_date: string;
    };
    duration_ms: number;
    popularity: number;
    external_urls: { spotify: string };
    played_at?: string;
  }
  
  export interface SpotifyArtist {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    followers: { total: number };
    images: Array<{ url: string; width: number; height: number }>;
    external_urls: { spotify: string };
  }
  
  export class SpotifyAPI {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
  
    constructor() {
      this.clientId = process.env.SPOTIFY_CLIENT_ID!;
      this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
      this.redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
    }
  
    // Generate authorization URL
    getAuthUrl(): string {
      const scopes = [
        'user-read-private',
        'user-read-email',
        'user-read-recently-played',
        'user-top-read',
        'user-read-playback-state',
        'user-read-currently-playing',
      ];
  
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: this.clientId,
        scope: scopes.join(' '),
        redirect_uri: this.redirectUri,
        state: Math.random().toString(36).substring(7),
      });
  
      return `https://accounts.spotify.com/authorize?${params.toString()}`;
    }
  
    // Exchange authorization code for tokens
    async exchangeCodeForTokens(code: string): Promise<SpotifyTokens> {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to exchange code for tokens');
      }
  
      return response.json();
    }
  
    // Refresh access token
    async refreshAccessToken(refreshToken: string): Promise<SpotifyTokens> {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }
  
      return response.json();
    }
  
    // Make authenticated API request
    private async makeApiRequest(endpoint: string, accessToken: string) {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }
  
      return response.json();
    }
  
    // Get user profile
    async getUserProfile(accessToken: string): Promise<SpotifyUser> {
      return this.makeApiRequest('/me', accessToken);
    }
  
    // Get recently played tracks
    async getRecentlyPlayed(accessToken: string, limit: number = 50): Promise<{ items: Array<{ track: SpotifyTrack; played_at: string }> }> {
      return this.makeApiRequest(`/me/player/recently-played?limit=${limit}`, accessToken);
    }
  
    // Get top tracks
    async getTopTracks(
      accessToken: string, 
      timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
      limit: number = 50
    ): Promise<{ items: SpotifyTrack[] }> {
      return this.makeApiRequest(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`, accessToken);
    }
  
    // Get top artists
    async getTopArtists(
      accessToken: string,
      timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
      limit: number = 50
    ): Promise<{ items: SpotifyArtist[] }> {
      return this.makeApiRequest(`/me/top/artists?time_range=${timeRange}&limit=${limit}`, accessToken);
    }
  
    // Get multiple tracks details
    async getTracks(accessToken: string, trackIds: string[]): Promise<{ tracks: SpotifyTrack[] }> {
      const ids = trackIds.join(',');
      return this.makeApiRequest(`/tracks?ids=${ids}`, accessToken);
    }
  
    // Get multiple artists details
    async getArtists(accessToken: string, artistIds: string[]): Promise<{ artists: SpotifyArtist[] }> {
      const ids = artistIds.join(',');
      return this.makeApiRequest(`/artists?ids=${ids}`, accessToken);
    }
}