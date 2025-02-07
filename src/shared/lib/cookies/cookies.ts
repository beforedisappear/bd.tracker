import Cookies from 'js-cookie';
import { getCookieConfig } from './config';

const accessTokenName = 'access_token';

const refreshTokenName = 'refresh_tokens';

export const getAccessToken = () => {
  return Cookies.get(accessTokenName) ?? null;
};

export const getRefreshToken = () => {
  return Cookies.get(refreshTokenName) ?? null;
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(accessTokenName, accessToken, getCookieConfig());

  Cookies.set(refreshTokenName, refreshToken, getCookieConfig());
};

export const removeTokens = () => {
  const expiredDate = new Date(0);

  Cookies.set(accessTokenName, '', getCookieConfig(expiredDate));
  Cookies.set(refreshTokenName, '', getCookieConfig(expiredDate));
};
