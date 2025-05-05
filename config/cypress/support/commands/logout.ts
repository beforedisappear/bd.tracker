import type { LogoutDtoReq } from '@/features/Logout/testing';

export const logout = (data: LogoutDtoReq) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/logout`,
      body: data,
    })
    .then(response => {
      expect(response.status).to.eq(204);
      return response.body;
    });
};

export const mockLogout = () => {
  cy.intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/logout`, {
    statusCode: 204,
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      logout(data: LogoutDtoReq): Chainable<void>;
      mockLogout(): Chainable<void>;
    }
  }
}
