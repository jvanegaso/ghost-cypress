/// <reference types="cypress" />

import escenariosPage from "../../../support/page-objects/escenarios-page";
import scenarios from './invite-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dymanic-data-suscription-helper';

const version = '3.42.5';

describe('Invite people Management', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
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
      const { email } = scenario.fields;
      const { mailMsg } = scenario.oracles;
      const { getSaveBtn, getEmailInput } = escenariosPage;

      cy.contains('Staff').click({force:true})
      cy.contains('Invite people').click({force:true})
      cy.fixture('config').then(config => {
        resolveInput(getEmailInput(), email, type, config);

        getSaveBtn().click();

        cy.wait(1000);


        if (mailMsg) {
          escenariosPage.getEmailResponse()
            .should('contain.text', mailMsg);
        }

        cy.contains('Close').click();

      });
    });
  });
});