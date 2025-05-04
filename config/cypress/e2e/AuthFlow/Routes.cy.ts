import {
  getMainRoutePath,
  getHomeRoutePath,
  getLoginRoutePath,
} from '@/shared/config/routes';

describe('Auth Flow | app routes protection', () => {
  const homeRoute = getHomeRoutePath();
  const mainRoute = getMainRoutePath();

  it('should redirect to main page if user is not authenticated and tries to access home page', () => {
    cy.visit(homeRoute);
    cy.url().should('not.include', homeRoute);
    cy.url().should('include', mainRoute);
  });

  it('should redirect to home page if user is authenticated and tries to access main page', () => {
    cy.mockLoginAndAuth();

    cy.visit(mainRoute);
    cy.url().should('include', homeRoute);
  });

  it('should redirect to main page if user is authenticated and tries to access login page', () => {
    cy.mockLoginAndAuth();

    cy.visit(getLoginRoutePath());
    cy.url().should('not.include', getLoginRoutePath());
    cy.url().should('include', mainRoute);
  });

  it('should redirect to main page after logout', () => {
    cy.mockLoginAndAuth();

    cy.mockLogout();

    cy.clearCookies();

    cy.visit(homeRoute);
    cy.url().should('not.include', homeRoute);
    cy.url().should('include', mainRoute);
  });
});
