/// <reference types="cypress" />
import tagPageV2 from "../../../support/page-objects/tag-pageV2";
import scenarios from './tags-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('Tag Management', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
  });

  beforeEach(()=>{
    Cypress.Cookies.preserveOnce('ghost-admin-api-session');
    cy.goToTagPage(version);
  });

  after(() => {
    cy.logout(version);
  });

  getScenarios(scenarios).forEach((scenario) => {

    it(scenario.description, () => {
      const { type } = scenario;
      const { tagName, tagColor, tagSlug, tagDescription } = scenario.fields;
      let { Url, dinamicUrl,  verfMsg } = scenario.oracles;
      const { getNewTagButton, getNameInput , getColorInput , getButtonSave , getSlugInput, getDescriptionInput, getMessageVerificationResponse} = tagPageV2;
      cy.fixture('config').then(config => {
        resolveInput(getNameInput(), tagName, type, config);
        resolveInput(getColorInput(), tagColor, type, config);
       // resolveInput(getSlugInput(), tagSlug, type, config);
        resolveInput(getDescriptionInput(), tagDescription, type, config);
        

        // Salvar el nuevo tag. 
        getButtonSave().click();
        cy.wait(1000);
        if(dinamicUrl){
          Url = tagName.value.toLowerCase().replace(/ /g, '-');
        }

        if (verfMsg) {
           getMessageVerificationResponse().should('contain.text', verfMsg);
           //console.log(getMessageVerificationResponse());
        }

        cy.wait(2000);
        cy.url().should('include', Url);
      });
    });
  });
});
