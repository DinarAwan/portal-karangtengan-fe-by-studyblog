import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { isApiReady } from '../../../api/axios';
import { useAuth } from '../../../app/providers/AuthContext';
import { extractAuthTokens } from '../../../app/providers/authStorage';
import { loginUser } from '../api/authApi';

export const useAuthForm = (redirectTo = '/dashboard') => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (isApiReady) {
        const response = await loginUser(username, password);
        const tokens = extractAuthTokens(response);
        login(tokens.accessToken ?? '', tokens.refreshToken);
      } else {
        login('dev-access-token', 'dev-refresh-token');
      }

      navigate(redirectTo, { replace: true });
    } catch {
      setErrorMessage(
        'Login gagal. Periksa username, password, atau koneksi API.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isSubmitting,
    errorMessage,
    handleLogin,
  };
};
