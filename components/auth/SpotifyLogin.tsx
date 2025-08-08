'use client';

import { useState } from 'react';

export default function SpotifyLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    window.location.href = '/api/auth/spotify';
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Connect Your Spotify</h2>
        <p className="text-dark-text-secondary max-w-md">
          Connect your Spotify account to start analyzing your listening habits and discover insights about your music taste.
        </p>
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="group relative flex items-center justify-center px-8 py-4 bg-spotify-green hover:bg-spotify-green/90 disabled:bg-spotify-green/50 text-black font-semibold rounded-full transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span>Connecting...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <SpotifyIcon />
            <span>Connect with Spotify</span>
          </div>
        )}
      </button>

      <div className="text-xs text-dark-text-secondary text-center max-w-sm">
        We only access your listening history and top tracks. We never access your playlists or make changes to your account.
      </div>
    </div>
  );
}

// Spotify icon component
function SpotifyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}
