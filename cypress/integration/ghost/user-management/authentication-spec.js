/// <reference types="cypress" />

import LoginPage from "../../../support/page-objects/login-page";

let loginPage = null;

const spec = {
  feature: 'Authentication Management',
  scenarios: [
    {
      name: 'Should show an error message whether user and password are wrong'
    }
  ]
};

describe('Authentication Management', () => {

  ['3.3.0', '3.42.5'].forEach((version) => {

    before('Setup', () => {
      loginPage = new LoginPage();
    });

    it(`Should show an error message whether user and password are wrong __v${version}`, () => {
      // Given a wrong user and password
      const wrongUser = 'dsadsadsa';
      const wrongPass = 'dsadsadsa';

      // When a user tries to login
      cy.login(wrongUser, wrongPass, version);
      cy.wait(2000);
      cy.stepScreenshot('f1-s11-st111', version);

      // Then the application displays an error message "Please fill out the form to sign in."
      loginPage.getErrorMsg()
        .should('have.text', 'Please fill out the form to sign in. ');
      cy.stepScreenshot('f1-s11-st112', version);

      cy.logout(version);
      cy.wait(2000);
    });

    it('Should show an error message whether the user is empty', () => {
      // Given an empty user
      const wrongUser = '';
      const wrongPass = 'dsadsadsa';

      // When a user tries to login
      cy.login(wrongUser, wrongPass, version);
      cy.wait(2000);
      cy.stepScreenshot('f1-s12-st121', version);

      // Then the application displays an error message "Please fill out the form to sign in."
      loginPage.getErrorMsg()
        .should('have.text', 'Please fill out the form to sign in. ');
      cy.wait(2000);
      cy.stepScreenshot('f1-s12-st122', version);
    });

    it('Should show an error message whether the password is empty', () => {
      // Given an empty password
      const wrongUser = 'dsadsads';
      const wrongPass = '';

      // When a user tries to login
      cy.login(wrongUser, wrongPass, version);
      cy.wait(2000);
      cy.stepScreenshot('f1-s13-st131', version);

      // Then the application displays an error message "Please fill out the form to sign in."
      loginPage.getErrorMsg()
        .should('have.text', 'Please fill out the form to sign in. ');
        cy.wait(2000);
      cy.stepScreenshot('f1-s13-st132', version);
    });

    it('Should show an error message whether the user and password are empty', () => {
      // Given both, user and password are empty
      const wrongUser = '';
      const wrongPass = '';

      // When a user tries to login
      cy.login(wrongUser, wrongPass, version);
      cy.wait(2000);
      cy.stepScreenshot('f1-s14-st141', version);

      // Then the application displays an error message "Please fill out the form to sign in."
      loginPage.getErrorMsg()
        .should('have.text', 'Please fill out the form to sign in. ');
      cy.wait(2000);
      cy.stepScreenshot('f1-s14-st142', version);
    });

    it('Should display an error message whether the user clicks on Forgot My Password btn, without email', () => {
      // Given both, user and password are empty,
      const wrongUser = '';
      const wrongPass = '';

      // And the user tries to login without credentials
      loginPage.getUserInput().clear();
      cy.stepScreenshot('f1-s15-st151', version);

      // When the user clicks con "Forgot" btn
      loginPage.getForgotButton().click();
      cy.stepScreenshot('f1-s15-st152', version);

      // Then the app displays this message: "We need your email address to reset your password!"
      loginPage.getErrorMsg()
        .should('have.text', 'We need your email address to reset your password! ');
      cy.stepScreenshot('f1-s15-st153', version);
    });

    it('Should login with right user and password', () => {
      // Given a user and password coming from the configuration file (review the login command)

      // When The user tries to login
      cy.login(null, null, version, true);
      cy.stepScreenshot('f1-s16-st161', version);

      // Then the application redirects the user to /site page
      cy.url().should('include', '/site');
      cy.stepScreenshot('f1-s16-st162', version);

      // Teardown
      cy.logout(version);
    });

    it('Should block the user to go to /site page if session is no longer active', () => {
      // Given a user who is logged in
      cy.login(null, null, version, true);
      cy.wait(2000);

      // When the user logs out
      cy.logout(version);
      cy.wait(2000);
      cy.stepScreenshot('f1-s17-st171', version);

      // Then the current page should be /signin
      cy.url().should('include', '#/signin');
      cy.wait(2000);
      cy.stepScreenshot('f1-s17-st172', version);

      // AND whether the user tries to access again to the site page
      cy.fixture('config').then(config => {
        const { urls } = config;
        // cy.visit(`${ghostBaseUrl}#/site`);
        cy.visit(`${urls[version]}#/site`);

        // Then the app must be /signin as a redirection of the system
        cy.url().should('include', '#/signin');
        cy.stepScreenshot('f1-s17-st173', version);
      });

    });

  });


});