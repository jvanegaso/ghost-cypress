/// <reference types="cypress" />

import profilePage from "../../../support/page-objects/profile-page";
import scenarios from './pass-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('Password Management :: Handle errors', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
    cy.goToProfilePage()
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('ghost-admin-api-session');
  });

  after(() => {
    cy.logout(version);
  });

  getScenarios(scenarios).forEach((scenario) => {

    it(scenario.description, () => {
      const { type } = scenario;
      const { oldPass, newPass, verifyPass } = scenario.fields;
      const { buttonText, oldPassMsg, newPassMsg, verfPassMsg } = scenario.oracles;
      const {
        getPassOld,
        getPassNew,
        getPassNewVerification,
        getChangePasswordBtn,
        getOldPassResponse,
        getNewPassResponse,
        getNewPassVerficationResponse
      } = profilePage;

      cy.fixture('config').then(config => {
        resolveInput(getPassOld(), oldPass, type, config);
        resolveInput(getPassNew(), newPass, type, config);
        resolveInput(getPassNewVerification(), verifyPass, type, config);

        getChangePasswordBtn().click();

        cy.wait(1000);

        if (oldPassMsg) {
          getOldPassResponse()
            .should('contain.text', oldPassMsg);
        }

        if (newPassMsg) {
          getNewPassResponse()
            .should('contain.text', newPassMsg);
        }

        if (verfPassMsg) {
          getNewPassVerficationResponse()
            .should('contain.text', verfPassMsg);
        }

        if (buttonText) {
          getChangePasswordBtn().should('contain.text', buttonText);
        }
      });
    });
  });


  // it('Should show an error in both, Old password and New password inputs, when those values are empty', () => {
  //   // Given a logged in user
  //   cy.login(null, null, version, true);
  //   cy.wait(1000);
  //   // cy.stepScreenshot('f2-s21-st211', version);

  //   // And the user goes to My profile page
  //   cy.goToProfilePage();
  //   // cy.stepScreenshot('f2-s21-st212', version);

  //   // And with empty old password and new password fields
  //   profilePage.getPassOld().clear({ force: true });
  //   profilePage.getPassNew().clear({ force: true });
  //   // cy.stepScreenshot('f2-s21-st213', version);

  //   // When the user tries to change the password
  //   profilePage.getChangePasswordBtn().click();
  //   // cy.stepScreenshot('f2-s21-st214', version);

  //   // Then the application displays an error message in both, new and old password fields
  //   profilePage.getOldPassResponse()
  //     .should('be.visible')
  //     .shouldHaveTrimmedText('Your current password is required to set a new one');

  //   profilePage.getNewPassResponse()
  //     .should('be.visible')
  //     .shouldHaveTrimmedText('Sorry, passwords can\'t be blank');
  //   // cy.stepScreenshot('f2-s21-st214', version);
  // });

  // it('Should show an error whether the new password and old password doesnt match', () => {
  //   // Given a logged in user 
  //   cy.login(null, null, version, true);
  //   cy.wait(1000);
  //   // cy.stepScreenshot('f2-s22-st221', version);

  //   // And the user goes to My profile page
  //   cy.goToProfilePage();
  //   // cy.stepScreenshot('f2-s22-st222', version);

  //   // And with different new password than the verification one
  //   profilePage.getPassOld().type('Dummy Password', { force: true });
  //   profilePage.getPassNew().type('New password', { force: true });
  //   profilePage.getPassNewVerification().type('Different password');
  //   // cy.stepScreenshot('f2-s22-st223', version);


  //   // When the user tries to change the password
  //   profilePage.getChangePasswordBtn().click({ force: true });
  //   // cy.stepScreenshot('f2-s22-st224', version);

  //   // Then the application displays an error message: Your new passwords do not match
  //   profilePage.getNewPassVerficationResponse()
  //     .should('be.visible')
  //     .shouldHaveTrimmedText('Your new passwords do not match');
  //   // cy.stepScreenshot('f2-s22-st225', version);
  // });

  // // it('Should show an error whether the new password contains less than 10 characters', () => {
  // //   // Given a logged in user 
  // //   cy.login(null, null, true);
  // //   cy.wait(1000);

  // //   // And the user goes to My profile page
  // //   cy.goToProfilePage();

  // //   // And with a new password with less than 10 characters
  // //   profilePage.getPassOld().type('Dummy Password');
  // //   profilePage.getPassNew().type('123456789');
  // //   profilePage.getPassNewVerification().type('123456789');


  // //   // When the user tries to change the password
  // //   profilePage.getChangePasswordBtn().click();

  // //   // Then the application displays an error message: Password must be at least 10 characters long
  // //   profilePage.getNewPassResponse()
  // //     .should('be.visible')
  // //     .shouldHaveTrimmedText('Password must be at least 10 characters long');
  // // });

  // // it('Should show an error whether the new password is insecure', () => {
  // //   // Given a logged in user 
  // //   cy.login(null, null, true);
  // //   cy.wait(1000);

  // //   // And the user goes to My profile page
  // //   cy.goToProfilePage();

  // //   // And with a new insecure password
  // //   profilePage.getPassOld().type('Dummy Password');
  // //   profilePage.getPassNew().type('password123');
  // //   profilePage.getPassNewVerification().type('password123');


  // //   // When the user tries to change the password
  // //   profilePage.getChangePasswordBtn().click();

  // //   // Then the application displays an error message: Sorry, you cannot use an insecure password
  // //   profilePage.getNewPassResponse()
  // //     .should('be.visible')
  // //     .shouldHaveTrimmedText('Sorry, you cannot use an insecure password');
  // // });

  // // it('Should show an error whether the new password is insecure', () => {
  // //   // Given a logged in user 
  // //   cy.login(null, null, true);
  // //   cy.wait(1000);

  // //   // And the user goes to My profile page
  // //   cy.goToProfilePage();

  // //   // And type an insecure password
  // //   profilePage.getPassOld().type('Dummy Password');
  // //   profilePage.getPassNew().type('1234567890');
  // //   profilePage.getPassNewVerification().type('1234567890');


  // //   // When the user tries to change the password
  // //   profilePage.getChangePasswordBtn().click();

  // //   // Then the application displays an error message in both, new and old password fields
  // //   profilePage.getNewPassResponse()
  // //     .should('be.visible')
  // //     .shouldHaveTrimmedText('Sorry, you cannot use an insecure password');
  // // });

});