import { getHomeRoutePath } from '@/shared/config/routes';
import { TEST_IDS } from '../constants/testIds';

export class HomePage {
  private readonly createTeamButton = TEST_IDS.HOME.CREATE_TEAM_BUTTON;
  private readonly logoutButton = TEST_IDS.HOME.LOGOUT_BUTTON;
  private readonly teamList = TEST_IDS.HOME.TEAM_LIST;

  visit() {
    cy.visit(getHomeRoutePath());
    return this;
  }

  isHomePage() {
    cy.url().should('include', getHomeRoutePath());
    return this;
  }

  isNotHomePage() {
    cy.url().should('not.include', getHomeRoutePath());
    return this;
  }

  clickCreateTeamBtn() {
    cy.getByTestId(this.createTeamButton).click();
    return this;
  }

  clickLogoutBtn() {
    cy.getByTestId(this.logoutButton).click();
    return this;
  }

  shouldHaveTeamList() {
    cy.getByTestId(this.teamList).should('be.visible');
    return this;
  }

  shouldHaveLogoutButton() {
    cy.getByTestId(this.logoutButton).should('be.visible');
    return this;
  }
}
