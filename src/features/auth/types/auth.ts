export type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  access_token?: string;
  refresh_token?: string;
  token?: string;
  access?: string;
  refresh?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    access_token?: string;
    refresh_token?: string;
    token?: string;
    access?: string;
    refresh?: string;
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
      access_token?: string;
      refresh_token?: string;
      token?: string;
      access?: string;
      refresh?: string;
    };
  };
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
    access_token?: string;
    refresh_token?: string;
    token?: string;
    access?: string;
    refresh?: string;
  };
};

export type AuthFormState = {
  username: string;
  password: string;
};
