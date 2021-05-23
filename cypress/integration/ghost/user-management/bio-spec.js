/// <reference types="cypress" />

import profilePage from "../../../support/page-objects/profile-page";
import { userInfoScenarios, slugScenarios, websiteScenarios } from './bio-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

const fieldExist = (field) => {
  return field !== null && field !== undefined;
};

const parseToSlug = (slug) => {
  return slug.toLowerCase()
    .replace(/\./g, '-')
    .replace(/\@/g, '-')
    .replace(/ /g, '-')
};

describe('BIO Management', () => {

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

  getScenarios(slugScenarios).forEach((scenario) => {
    it(scenario.description, () => {
      const { type } = scenario;
      const { slug } = scenario.fields;
      let { buttonText, slugResult, slugError, newUrl } = scenario.oracles;
      const { getSaveBtn, getSlugInput, getSlugResult, getSlugError } = profilePage;

      cy.fixture('config').then(config => {

        if (fieldExist(slug)) {
          resolveInput(getSlugInput(), slug, type, config);
        }

        getSaveBtn().click();

        cy.wait(1000);

        if (slugResult) {
          if (slugResult === 'dynamic') {
            slugResult = parseToSlug(slug.value);
          }

          profilePage.getSlugResult()
            .should('contain.text', slugResult);
        }

        if (slugError) {
          profilePage.getSlugError()
            .should('contain.text', slugError);
        }

        if (newUrl) {
          if (newUrl === 'dynamic') {
            newUrl = parseToSlug(slug.value);
          }
          cy.url().should('include', newUrl);
        }
      });
    });
  });

  getScenarios(websiteScenarios).forEach((scenario) => {
    it(scenario.description, () => {
      const { type } = scenario;
      const { website } = scenario.fields;
      const { buttonText, urlError } = scenario.oracles;
      const { getSaveBtn, getWebsiteInput, getWebsiteError } = profilePage;

      cy.fixture('config').then(config => {

        if (fieldExist(website)) {
          resolveInput(getWebsiteInput(), website, type, config);
        }

        getSaveBtn().click();

        cy.wait(1000);

        if (urlError) {
          getWebsiteError()
            .should('contain.text', urlError);
        }

        if (buttonText) {
          getSaveBtn().should('contain.text', buttonText);
        }
      });
    });
  });

  getScenarios(userInfoScenarios).forEach((scenario) => {

    it(scenario.description, () => {
      const { type } = scenario;
      const { fullName, email } = scenario.fields;
      const { buttonText, nameMsg, mailMsg } = scenario.oracles;
      const { getSaveBtn, getFullNameInput, getEmailInput } = profilePage;

      cy.fixture('config').then(config => {

        if (fieldExist(fullName)) {
          resolveInput(getFullNameInput(), fullName, type, config);
        }

        if (fieldExist(email)) {
          resolveInput(getEmailInput(), email, type, config);
        }

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