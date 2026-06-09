import api from '../../../api/axios';
import type { LoginResponse } from '../types/auth';

export const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { username, password });

  return response.data;
};
