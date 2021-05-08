/// <reference types="cypress" />

import ProfilePage from "../../../support/page-objects/profile-page";

let profilePage = null;

describe('Password Management :: Handle errors', () => {

  before(() => {
    cy.logout();
  });

  beforeEach(() => {
    profilePage = new ProfilePage();
  });

  it('Should show an error in both, Old password and New password inputs, when those values are empty', () => {
    // Given a logged in user 
    cy.login(null, null, true);
    cy.wait(1000);

    // And the user goes to My profile page
    cy.goToProfilePage();

    // And with empty old password and new password fields
    profilePage.getPassOld().clear();
    profilePage.getPassNew().clear();

    // When the user tries to change the password
    profilePage.getChangePasswordBtn().click();

    // Then the application displays an error message in both, new and old password fields
    profilePage.getOldPassResponse()
      .should('be.visible')
      .shouldHaveTrimmedText('Your current password is required to set a new one');

    profilePage.getNewPassResponse()
      .should('be.visible')
      .shouldHaveTrimmedText('Sorry, passwords can\'t be blank');
  });
  
  it('Should show an error whether the new password and old password doesnt match', () => {
    // Given a logged in user 
    cy.login(null, null, true);
    cy.wait(1000);

    // And the user goes to My profile page
    cy.goToProfilePage();

    // And with different new password than the verification one
    profilePage.getPassOld().type('Dummy Password');
    profilePage.getPassNew().type('New password');
    profilePage.getPassNewVerification().type('Different password');


    // When the user tries to change the password
    profilePage.getChangePasswordBtn().click();

    // Then the application displays an error message: Your new passwords do not match
    profilePage.getNewPassVerficationResponse()
      .should('be.visible')
      .shouldHaveTrimmedText('Your new passwords do not match');
  });

  it('Should show an error whether the new password contains less than 10 characters', () => {
    // Given a logged in user 
    cy.login(null, null, true);
    cy.wait(1000);

    // And the user goes to My profile page
    cy.goToProfilePage();

    // And with a new password with less than 10 characters
    profilePage.getPassOld().type('Dummy Password');
    profilePage.getPassNew().type('123456789');
    profilePage.getPassNewVerification().type('123456789');


    // When the user tries to change the password
    profilePage.getChangePasswordBtn().click();

    // Then the application displays an error message: Password must be at least 10 characters long
    profilePage.getNewPassResponse()
      .should('be.visible')
      .shouldHaveTrimmedText('Password must be at least 10 characters long');
  });
  
  it('Should show an error whether the new password is insecure', () => {
    // Given a logged in user 
    cy.login(null, null, true);
    cy.wait(1000);

    // And the user goes to My profile page
    cy.goToProfilePage();

    // And with a new insecure password
    profilePage.getPassOld().type('Dummy Password');
    profilePage.getPassNew().type('pass123');
    profilePage.getPassNewVerification().type('pass123');


    // When the user tries to change the password
    profilePage.getChangePasswordBtn().click();

    // Then the application displays an error message: Password must be at least 10 characters long
    profilePage.getNewPassResponse()
      .should('be.visible')
      .shouldHaveTrimmedText('Password must be at least 10 characters long');
  });
  
  it('Should show an error whether the new password is insecure', () => {
    // Given a logged in user 
    cy.login(null, null, true);
    cy.wait(1000);

    // And the user goes to My profile page
    cy.goToProfilePage();

    // And type an insecure password
    profilePage.getPassOld().type('Dummy Password');
    profilePage.getPassNew().type('1234567890');
    profilePage.getPassNewVerification().type('1234567890');


    // When the user tries to change the password
    profilePage.getChangePasswordBtn().click();

    // Then the application displays an error message in both, new and old password fields
    profilePage.getNewPassResponse()
      .should('be.visible')
      .shouldHaveTrimmedText('Sorry, you cannot use an insecure password');
  });

});