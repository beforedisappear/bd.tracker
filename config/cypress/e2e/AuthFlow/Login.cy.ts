import { getLoginRoutePath } from '@/shared/config/routes';
import { getRandomCode } from '../../helpers/getRandomCode';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/constants/cookie.constants';

describe('Auth Flow | login page form', () => {
  const emailField = 'input[name="email"]';
  const codeField = 'input[name="code"]';
  const submitButton = 'button[type="submit"]';
  const loginRoute = getLoginRoutePath();

  beforeEach(() => {
    cy.visit(loginRoute);
  });

  context('ui', () => {
    it('should show email input on first step', () => {
      cy.get(emailField).should('be.visible');
    });

    it('should validate email format', () => {
      cy.get(emailField).type('invalid-email');
      cy.get(submitButton).click();

      cy.getByTestId('auth-by-email-first-step-error-message').should(
        'be.visible',
      );
    });

    it('should proceed to second step with valid email', () => {
      const email = 'test@example.com';

      cy.mockAuth();

      cy.get(emailField).type(email);
      cy.get(submitButton).click();

      // Wait for the auth request to complete
      cy.wait('@authRequest');

      // Verify we're on the second step
      cy.get(codeField).should('be.visible');
    });

    it('should show resend code button with timer on second step', () => {
      const email = 'test@example.com';

      cy.mockAuth();

      cy.get(emailField).type(email);
      cy.get(submitButton).click();

      cy.wait('@authRequest');

      cy.getByTestId('auth-by-email-again-button').should('be.visible');
    });

    it('should show error message for invalid code', () => {
      cy.mockAuth().as('authRequest');
      cy.mockLoginInvalidCode().as('loginRequest');

      cy.get(emailField).type(Cypress.env('TEST_USER_EMAIL'));
      cy.get(submitButton).click();

      cy.wait('@authRequest');
      // Second step with invalid code
      cy.get(codeField).type(
        getRandomCode(Cypress.env('TEST_USER_AUTH_CODE')!),
      );
      cy.get(submitButton).click();

      cy.wait('@loginRequest');

      // Should show error message
      cy.getByTestId('auth-by-email-second-step-error-message').should(
        'be.visible',
      );
    });
  });

  context('api', () => {
    it('should redirect to the home page after login', () => {
      cy.loginAndAuth({
        email: Cypress.env('TEST_USER_EMAIL'),
        code: Cypress.env('TEST_USER_AUTH_CODE'),
      }).then(res => {
        cy.setCookie(ACCESS_TOKEN_COOKIE_NAME, res.accessToken);
        cy.setCookie(REFRESH_TOKEN_COOKIE_NAME, res.refreshToken);
      });

      cy.reload();

      cy.url().should('not.include', loginRoute);
    });
  });
});
