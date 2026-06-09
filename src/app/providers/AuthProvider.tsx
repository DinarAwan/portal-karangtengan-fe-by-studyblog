import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { AuthContext } from './AuthContext';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem(REFRESH_TOKEN_KEY),
  );

  const login = (newAccessToken: string, newRefreshToken?: string | null) => {
    setAccessToken(newAccessToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      token: accessToken,
      isAuthenticated: Boolean(accessToken),
      login,
      logout,
    }),
    [accessToken, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
