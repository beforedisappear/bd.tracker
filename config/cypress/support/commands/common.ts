import { LoginDtoRes } from '@/features/AuthByEmail/testing';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/constants/cookie.constants';

export const setJwt = (res: LoginDtoRes) => {
  cy.setCookie(ACCESS_TOKEN_COOKIE_NAME, res.accessToken);
  cy.setCookie(REFRESH_TOKEN_COOKIE_NAME, res.refreshToken);
};

declare global {
  namespace Cypress {
    interface Chainable {
      setJwt(res: LoginDtoRes): Chainable<LoginDtoRes>;
    }
  }
}
