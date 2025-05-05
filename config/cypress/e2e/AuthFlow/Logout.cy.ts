import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { HomePage } from '../../pageObjects/HomePage';

describe('Auth Flow | logout', () => {
  const homePage = new HomePage();

  context('ui', () => {
    it('should logout user when clicking logout button', () => {
      cy.mockLoginAndAuth();
      cy.mockGetUserTeamList();
      cy.mockLogout();

      homePage.visit();

      homePage.clickLogoutBtn();

      homePage.isNotHomePage();
    });
  });

  context('api', () => {
    beforeEach(() => {
      cy.loginAndAuth({
        email: Cypress.env('TEST_USER_EMAIL'),
        code: Cypress.env('TEST_USER_AUTH_CODE'),
      });

      homePage.visit();
    });

    it('app should redirect to the login page after logout request', () => {
      cy.getCookie(REFRESH_TOKEN_COOKIE_NAME).then(cookie =>
        cy.logout({ refreshToken: cookie.value }),
      );

      cy.clearCookies();
      cy.reload();

      cy.getCookie(REFRESH_TOKEN_COOKIE_NAME).should('be.null');
      cy.getCookie(ACCESS_TOKEN_COOKIE_NAME).should('be.null');
    });

    it('should redirect to the login page after logout form submit', () => {
      homePage.clickLogoutBtn();

      homePage.isNotHomePage();
    });
  });
});
