import { auth, mockAuth } from './commands/auth';
import { login, mockLogin, mockLoginInvalidCode } from './commands/login';
import { loginAndAuth, mockLoginAndAuth } from './commands/loginAndAuth';
import { selectByTestId } from '../helpers/getByTestId';
import { logout, mockLogout } from './commands/logout';
import { setJwt } from './commands/common';
import { mockGetUserTeamList } from './commands/team';

// auth requests
Cypress.Commands.add('auth', auth);
Cypress.Commands.add('mockAuth', mockAuth);
Cypress.Commands.add('login', login);
Cypress.Commands.add('mockLogin', mockLogin);
Cypress.Commands.add('mockLoginInvalidCode', mockLoginInvalidCode);
Cypress.Commands.add('loginAndAuth', loginAndAuth);
Cypress.Commands.add('mockLoginAndAuth', mockLoginAndAuth);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('mockLogout', mockLogout);

// team requests
Cypress.Commands.add('mockGetUserTeamList', mockGetUserTeamList);

// helpers
Cypress.Commands.add('getByTestId', (testId: string) =>
  cy.get(selectByTestId(testId)),
);
Cypress.Commands.add('setJwt', setJwt);

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
