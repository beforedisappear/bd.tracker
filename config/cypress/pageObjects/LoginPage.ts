import { getLoginRoutePath } from '@/shared/config/routes';
import { TEST_IDS } from '../constants/testIds';

export class LoginPage {
  private readonly emailInput = TEST_IDS.AUTH.EMAIL_INPUT;
  private readonly codeInput = TEST_IDS.AUTH.CODE_INPUT;
  private readonly submitButton = TEST_IDS.AUTH.SUBMIT_BUTTON;
  private readonly firstStepError = TEST_IDS.AUTH.FIRST_STEP_ERROR;
  private readonly secondStepError = TEST_IDS.AUTH.SECOND_STEP_ERROR;
  private readonly resendCodeButton = TEST_IDS.AUTH.RESEND_CODE_BUTTON;

  visit() {
    cy.visit(getLoginRoutePath());
    return this;
  }

  isNotLoginPage() {
    cy.url().should('not.include', getLoginRoutePath());
    return this;
  }

  fillEmail(email: string) {
    cy.getByTestId(this.emailInput).type(email);
    return this;
  }

  fillCode(code: string) {
    cy.getByTestId(this.codeInput).type(code);
    return this;
  }

  clickSubmit() {
    cy.getByTestId(this.submitButton).click();
    return this;
  }

  clickResendCode() {
    cy.getByTestId(this.resendCodeButton).click();
    return this;
  }

  isFirstStepError() {
    cy.getByTestId(this.firstStepError).should('be.visible');
    return this;
  }

  isSecondStepError() {
    cy.getByTestId(this.secondStepError).should('be.visible');
    return this;
  }

  isEmailStep() {
    cy.getByTestId(this.emailInput).should('be.visible');
    return this;
  }

  isCodeStep() {
    cy.getByTestId(this.codeInput).should('be.visible');
    return this;
  }

  isResendCodeButtonVisible() {
    cy.getByTestId(this.resendCodeButton).should('be.visible');
    return this;
  }

  async auth(email: string) {
    this.fillEmail(email).clickSubmit();
    return this;
  }

  async login(code: string) {
    this.fillCode(code).clickSubmit();
    return this;
  }
}
