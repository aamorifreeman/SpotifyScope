'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SpotifyLogin from './SpotifyLogin';

interface User {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
  followers: { total: number };
  country: string;
}

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/spotify/profile');
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else if (response.status === 401) {
        // Not authenticated
        setUser(null);
      } else {
        setError('Failed to check authentication');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spotify-green mx-auto"></div>
          <p className="text-dark-text-secondary">Loading your music data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center space-y-4">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={checkAuth}
            className="px-4 py-2 bg-spotify-green text-black rounded-lg hover:bg-spotify-green/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-dark-bg">
        <SpotifyLogin />
      </div>
    );
  }

  return (
    <>
      {/* Navigation with user info */}
      <nav className="bg-dark-surface border-b border-dark-border px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-spotify-green">SpotifyScope</h1>
            <div className="hidden sm:block text-dark-text-secondary text-sm">
              Personal Music Analytics
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {user.images?.[0] && (
                <img
                  src={user.images[0].url}
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full border border-dark-border"
                />
              )}
              <div className="hidden sm:block text-right">
                <div className="text-sm text-dark-text-primary font-medium">
                  {user.display_name}
                </div>
                <div className="text-xs text-dark-text-secondary">
                  {user.followers?.total.toLocaleString()} followers
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-sm text-dark-text-secondary hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-dark-bg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      {children}
    </>
  );
}