import type { LoginDtoReq, LoginDtoRes } from '@/features/AuthByEmail/testing';

export const login = (data: LoginDtoReq) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/login`,
      body: data,
    })
    .then((response: Cypress.Response<LoginDtoRes>) => {
      return response.body;
    })
    .as('loginRequest');
};

export const mockLogin = (): Cypress.Chainable<LoginDtoRes> => {
  return cy.fixture('login.json').then(data =>
    cy
      .intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/login`, {
        statusCode: 200,
        body: data,
      })
      .then(() => data)
      .as('loginRequest'),
  );
};

export const mockLoginInvalidCode = (): Cypress.Chainable<unknown> =>
  cy
    .intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/login`, {
      statusCode: 409,
      body: {},
    })
    .as('loginRequest');

declare global {
  namespace Cypress {
    interface Chainable {
      login(data: LoginDtoReq): Chainable<LoginDtoRes>;
      mockLogin(): Chainable<LoginDtoRes>;
      mockLoginInvalidCode(): Chainable<unknown>;
    }
  }
}
