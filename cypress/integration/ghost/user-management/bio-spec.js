/// <reference types="cypress" />

import profilePage from "../../../support/page-objects/profile-page";
import scenarios from './bio-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('BIO Management', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
    cy.goToProfilePage()
  });

  beforeEach(()=>{
    Cypress.Cookies.preserveOnce('ghost-admin-api-session');
  });

  after(() => {
    cy.logout(version);
  });

  getScenarios(scenarios).forEach((scenario) => {

    it(scenario.description, () => {
      const { type } = scenario;
      const { fullName, email } = scenario.fields;
      const { buttonText, nameMsg, mailMsg } = scenario.oracles;
      const { getSaveBtn, getFullNameInput, getEmailInput } = profilePage;

      cy.fixture('config').then(config => {
        resolveInput(getFullNameInput(), fullName, type, config);
        resolveInput(getEmailInput(), email, type, config);

        getSaveBtn().click();

        cy.wait(1000);

        if (nameMsg) {
          profilePage.getFullNameResponse()
            .should('contain.text', nameMsg);
        }

        if (mailMsg) {
          profilePage.getEmailResponse()
            .should('contain.text', mailMsg);
        }

        if (buttonText) {
          getSaveBtn().should('contain.text', buttonText);
        }
      });
    });
  });
});