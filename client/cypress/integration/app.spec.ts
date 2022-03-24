import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'Handy Pantry');
  });

  describe('The sidenav should open, navigate to "Products" and back to "Pantry"', () => {

    it('The navigation bar should be invisible by default', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden')
      .and('not.be.visible');
    });

    it('The navigation bar should appear when clicked', () => {
    page.getSidenavButton()
      .should('be.visible');
    });

    it('The navigation to products works', () => {
    page.getSidenavButton().click();
    page.getNavLink('Products').click();
    cy.url().should('match', /\/products$/);
    page.getSidenav()
      .should('be.hidden');
    });

    it('The navigation to pantry works', () => {
    page.getSidenavButton().click();
    page.getNavLink('Pantry').click();
    cy.url().should('match', /^https?:\/\/[^\/]+\/?$/);
    page.getSidenav()
      .should('be.hidden');
    });
  });

});
