// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import LoginPage from "./page-objects/login-page";
import LayoutPage from "./page-objects/layout-page";

// -- This is a parent command --
Cypress.Commands.add('login', (email, password, useConfig = false) => {
  cy.fixture('config').then(config => {
    const { ghostBaseUrl, usuario, clave } = config;
    cy.visit(`${ghostBaseUrl}#/signin`);

    const loginPage = new LoginPage();
    if (!useConfig) {
      email && loginPage.getUserInput().type(email);
      password && loginPage.getPasswordInput().type(password);
    } else {
      loginPage.getUserInput().type(usuario);
      loginPage.getPasswordInput().type(clave);
    }

    loginPage.getLoginButton().click();
  });
});

Cypress.Commands.add('logout', () => {
  cy.fixture('config').then(config => {
    const { ghostBaseUrl } = config;
    cy.clearCookies({ domain: null }).then(() => {
      cy.visit(`${ghostBaseUrl}#/signin`);
      cy.reload();
    });
  });
});

Cypress.Commands.add('goToProfilePage', () => {
  const layoutPage = new LayoutPage();
  layoutPage.getProfileButton().click();
  cy.wait(1000);
  layoutPage.getYourProfileLink().click();
});


// Util

Cypress.Commands.add('shouldHaveTrimmedText',
  { prevSubject: true },
  (subject, equalTo) => {
    if (isNaN(equalTo)) {
      console.log(subject.text());
      expect(subject.text().trim()).to.eq(equalTo);
    } else {
      expect(parseInt(subject.text())).to.eq(equalTo);
    }
    return subject;
  },
);



//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
