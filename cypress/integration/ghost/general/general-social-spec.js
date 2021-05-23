/// <reference types="cypress" />
import generalPage from "../../../support/page-objects/general-page";
import scenarios from './general-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('General settings urls', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
    cy.goToGeneralPage()
  });

  beforeEach(()=>{
    Cypress.Cookies.preserveOnce('ghost-admin-api-session');
  });

  getScenarios(scenarios).forEach((scenario) => {

    it(scenario.description, () => {
      const { type } = scenario;
      const { urlFacebook, urlTwitter } = scenario.fields;
      const { toastMsg } = scenario.oracles;
      const { getPageFacebookInput, getPageTwitterInput  } = generalPage;

      cy.fixture('config').then(config => {

        generalPage.getButtomExpandSocial().click();
        cy.wait(1000);

        resolveInput(getPageFacebookInput(), urlFacebook, type, config);
        resolveInput(getPageTwitterInput(), urlTwitter, type, config);

        generalPage.getButtomExpandSocial().click();
        cy.wait(1000);

        generalPage.getButtomSaveSettings().click();
        cy.wait(1000);

      });
    });

  });
});
