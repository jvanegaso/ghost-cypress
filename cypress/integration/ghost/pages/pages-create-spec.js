/// <reference types="cypress" />
import publishPage from "../../../support/page-objects/publish-page";
import scenarios from './pages-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('Create and Publish page', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
    cy.goToPagesPage()
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
      const { pageTitle } = scenario.fields;
      const { toastMsg } = scenario.oracles;
      const { getPageTittleInput } = publishPage;

      cy.fixture('config').then(config => {

        publishPage.getButtomCreatePage().scrollIntoView().focus().click();
        cy.wait(1000);

        resolveInput(getPageTittleInput(), pageTitle, type, config);

        publishPage.getDescriptionTittle().click();
        cy.wait(1000);

        publishPage.getPublishSelector().scrollIntoView().focus().click({ force: true });
        cy.wait(1000);

        publishPage.getPublishButton().scrollIntoView().focus().click({ force: true });
        cy.wait(2000);

        publishPage.getPublishToastButton().should('contain.text', toastMsg);
        cy.wait(1000);

        const { urls } = config;
        cy.visit(`${urls[version]}#/pages`);


      });
    });

  });
});




