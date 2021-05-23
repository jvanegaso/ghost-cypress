/// <reference types="cypress" />

import LayoutPage from "../../../support/page-objects/layout-page";
import loginPage from "../../../support/page-objects/login-page";
import profilePage from "../../../support/page-objects/profile-page";

let layoutPage = null;

const version = '3.42.5';

describe('Password Management :: Update the Password', () => {

  before(() => {
    layoutPage = new LayoutPage();
  });

  it('Should show update the password', () => {
    // Given a logged in user 
    cy.login(null, null, version, true);
    cy.wait(1000);
    
    // And the user goes to My profile page
    cy.goToProfilePage();
    cy.wait(1000);

    // And fill the old password and new password
    cy.fixture('config').then(config => {
      const { clave, nuevaClave } = config;
      profilePage.getPassOld().scrollIntoView().focus().clear().type(clave);
      profilePage.getPassNew().scrollIntoView().focus().clear().type(nuevaClave);
      profilePage.getPassNewVerification().scrollIntoView().focus().clear().type(nuevaClave);

      // When the user tries to change the password
      profilePage.getChangePasswordBtn().click();

      // Then the Change password button changes its text
      cy.wait(1000);
      profilePage.getChangePasswordBtn()
        .contains('Saved')
        .should('be.visible');

      // And the app displays a success message popup
      layoutPage.getNotificationWrapper()
        .contains('Password updated')
        .should('be.visible');
    });
  });

  it('should not be able to login with old password', () => {
    // Given a user who changed the password, and logs out
    cy.logout(version);
    cy.wait(2000);

    // When the user tries to login with old password
    cy.fixture('config').then(config => {
      const { nuevaClave, usuario, clave } = config;

      loginPage.getUserInput().scrollIntoView().focus().clear().type(usuario);
      loginPage.getPasswordInput().scrollIntoView().focus().clear().type(clave);
      loginPage.getLoginButton().click();
      cy.wait(2000);
      // Then the application displays an error message: Your password is incorrect.
      loginPage.getErrorMsg().shouldHaveTrimmedText('Your password is incorrect.');

      // Teardown: Reset to original password
      loginPage.getUserInput().clear().scrollIntoView().focus().clear().type(usuario);
      loginPage.getPasswordInput().clear().scrollIntoView().focus().clear().type(nuevaClave);
      loginPage.getLoginButton().click();
      cy.wait(1000);
      cy.goToProfilePage();
      cy.wait(1000);
      profilePage.getPassOld().scrollIntoView().focus().clear().type(nuevaClave);
      profilePage.getPassNew().scrollIntoView().focus().clear().type(clave);
      profilePage.getPassNewVerification().scrollIntoView().focus().clear().type(clave);
      profilePage.getChangePasswordBtn().click();
      cy.logout(version);
    });
  });
});