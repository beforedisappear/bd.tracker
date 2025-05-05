import Cookies from 'js-cookie';
import { getCookieConfig } from './getCookieConfig';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../constants/cookie.constants';

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME) ?? null;
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_COOKIE_NAME) ?? null;
};

export const saveJwt = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, getCookieConfig());

  Cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, getCookieConfig());
};

export const removeJwt = () => {
  const expiredDate = new Date(0);

  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, '', getCookieConfig(expiredDate));
  Cookies.set(REFRESH_TOKEN_COOKIE_NAME, '', getCookieConfig(expiredDate));
};
