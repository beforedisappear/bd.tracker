import { getHomeRoutePath, getMainRoutePath } from '@/shared/config/routes';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/constants';

describe('Auth Flow | logout', () => {
  const homeRoute = getHomeRoutePath();
  const mainRoute = getMainRoutePath();

  beforeEach(() => {
    cy.loginAndAuth({
      email: Cypress.env('TEST_USER_EMAIL'),
      code: Cypress.env('TEST_USER_AUTH_CODE'),
    }).then(res => {
      cy.setJwt(res);
    });

    cy.visit(homeRoute);
  });

  context('ui', () => {
    it('should logout user when clicking logout button', () => {
      cy.visit(homeRoute);

      cy.getByTestId('logout-button').click();

      cy.url().should('not.include', homeRoute);
      cy.url().should('include', mainRoute);
    });
  });

  context('api', () => {
    it('should logout user', () => {
      cy.getCookie(REFRESH_TOKEN_COOKIE_NAME).then(cookie =>
        cy.logout({ refreshToken: cookie.value }),
      );

      cy.clearCookies();
      cy.reload();

      cy.getCookie(REFRESH_TOKEN_COOKIE_NAME).should('be.null');
      cy.getCookie(ACCESS_TOKEN_COOKIE_NAME).should('be.null');
    });
  });
});
