import type {
  AuthDtoReq,
  LoginDtoReq,
  LoginDtoRes,
} from '@/features/AuthByEmail/testing';

export const loginAndAuth = (data: AuthDtoReq) => {
  return cy
    .auth({ email: data.email })
    .then(() =>
      cy.login({ email: data.email, code: Cypress.env('TEST_USER_AUTH_CODE') }),
    )
    .then(response => cy.setJwt(response).then(() => response));
};

export const mockLoginAndAuth = () => {
  return cy
    .mockAuth()
    .then(() => cy.mockLogin())
    .then(response => cy.setJwt(response).then(() => response));
};

declare global {
  namespace Cypress {
    interface Chainable {
      loginAndAuth(data: LoginDtoReq): Chainable<LoginDtoRes>;
      mockLoginAndAuth(): Chainable<LoginDtoRes>;
    }
  }
}
