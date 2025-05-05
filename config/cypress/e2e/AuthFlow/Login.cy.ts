import { getRandomCode } from '../../helpers/getRandomCode';
import { LoginPage } from '../../pageObjects/LoginPage';
import { HomePage } from '../../pageObjects/HomePage';
describe('Auth Flow | login page form', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();

  beforeEach(() => {
    loginPage.visit();
  });

  context('ui', () => {
    it('should show email input on first step', () => {
      loginPage.isEmailStep();
    });

    it('should validate email format', () => {
      loginPage.fillEmail('invalid-email');
      loginPage.clickSubmit();

      loginPage.isFirstStepError();
    });

    it('should proceed to second step with valid email', () => {
      const email = 'test@example.com';

      cy.mockAuth();

      loginPage.fillEmail(email).clickSubmit();

      cy.wait('@authRequest');

      loginPage.isCodeStep();
    });

    it('should show resend code button with timer on second step', () => {
      const email = 'test@example.com';

      cy.mockAuth();

      loginPage.fillEmail(email).clickSubmit();

      cy.wait('@authRequest');

      loginPage.isResendCodeButtonVisible();
    });

    it('should show error message for invalid code', () => {
      cy.mockAuth().as('authRequest');
      cy.mockLoginInvalidCode().as('loginRequest');

      loginPage.fillEmail(Cypress.env('TEST_USER_EMAIL')).clickSubmit();

      cy.wait('@authRequest');

      loginPage
        .fillCode(getRandomCode(Cypress.env('TEST_USER_AUTH_CODE')!))
        .clickSubmit();

      cy.wait('@loginRequest');

      loginPage.isSecondStepError();
    });

    it('should proceed to the home page after login', () => {
      cy.mockAuth();
      cy.mockLogin();

      loginPage.fillEmail(Cypress.env('TEST_USER_EMAIL')).clickSubmit();

      cy.wait('@authRequest');

      loginPage.fillCode(Cypress.env('TEST_USER_AUTH_CODE'));

      homePage.isHomePage();
    });
  });

  context('api', () => {
    it('should redirect to the home page after login request', () => {
      cy.loginAndAuth({
        email: Cypress.env('TEST_USER_EMAIL'),
        code: Cypress.env('TEST_USER_AUTH_CODE'),
      });

      cy.reload();

      homePage.isHomePage();
    });

    it('should redirect to the home page after login form submit', () => {
      cy.mockGetUserTeamList(); // не относится к сценарию

      loginPage.fillEmail(Cypress.env('TEST_USER_EMAIL')).clickSubmit();

      loginPage.fillCode(Cypress.env('TEST_USER_AUTH_CODE'));

      homePage.isHomePage();
    });
  });
});
