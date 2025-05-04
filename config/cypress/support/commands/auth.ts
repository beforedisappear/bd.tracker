import type { AuthDtoReq, AuthDtoRes } from '@/features/AuthByEmail/testing';

export const auth = (data: AuthDtoReq) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/auth`,
      body: data,
    })
    .as('authRequest');
};

export const mockAuth = () => {
  cy.intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/auth`, {
    statusCode: 204,
  }).as('authRequest');
};

declare global {
  namespace Cypress {
    interface Chainable {
      auth(data: AuthDtoReq): Chainable<AuthDtoRes>;
      mockAuth(): Chainable<AuthDtoRes>;
    }
  }
}
