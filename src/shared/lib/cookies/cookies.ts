import Cookies from 'js-cookie';
import { accessTokenName, getCookieConfig, refreshTokenName } from './config';

export const getAccessToken = () => {
  return Cookies.get(accessTokenName) ?? null;
};

export const getRefreshToken = () => {
  return Cookies.get(refreshTokenName) ?? null;
};

export const saveJwt = (accessToken: string, refreshToken: string) => {
  Cookies.set(accessTokenName, accessToken, getCookieConfig());

  Cookies.set(refreshTokenName, refreshToken, getCookieConfig());
};

export const removeJwt = () => {
  const expiredDate = new Date(0);

  Cookies.set(accessTokenName, '', getCookieConfig(expiredDate));
  Cookies.set(refreshTokenName, '', getCookieConfig(expiredDate));
};
