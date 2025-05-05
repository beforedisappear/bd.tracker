import { GetUserTeamListDtoRes } from '@/entities/Team/testing';

export const mockGetUserTeamList = () => {
  cy.intercept('GET', `${Cypress.env('NEXT_PUBLIC_API_URL')}/team`, {
    statusCode: 200,
    body: [],
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      mockGetUserTeamList(): Chainable<GetUserTeamListDtoRes>;
    }
  }
}
