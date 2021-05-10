/// <reference types="cypress" />

import LoginPage from "../../../support/page-objects/login-page";

let loginPage = null;

describe('Authentication Management', () => {

  before('Setup', () => {
    loginPage = new LoginPage();
    cy.login(null, null, true);

  });


});

