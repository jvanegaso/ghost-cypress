/// <reference types="cypress" />
import postPageV2 from "../../../support/page-objects/post-page-v2";
import scenarios from './post-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('Post Management', () => {

  before('Setup', () => {
    cy.login(null, null, version, true);
  });

  beforeEach(()=>{
    Cypress.Cookies.preserveOnce('ghost-admin-api-session');
    cy.goToPostPage(version);
  });

  after(() => {
    cy.logout(version);
  });

  getScenarios(scenarios).forEach((scenario) => {

    it(scenario.description, () => {
      const { type } = scenario;
      const { postTitle, postDescription } = scenario.fields;
      let { Url, verfMsgButton,  verfMsg } = scenario.oracles;
      const { getTitleInput , getDescriptionInput, getPublishMenu,getPublishButton,getStatusHeader } = postPageV2;
      cy.fixture('config').then(config => {
        const { urls } = config;
        cy.intercept('POST', `${urls[version]}api/v3/admin/posts/`).as('postIterceptor');

        //get the title element
        cy.get('.gh-koenig-editor-pane textarea').click().type(postTitle).blur();
        cy.wait(100);
        // resolveInput(getDescriptionInput(), postDescription, type, config);
        // cy.wait(100);
        cy.wait('@postIterceptor').then((interceptor) => {
          const resposeBody = interceptor.response.body;
          if (resposeBody && Array.isArray(resposeBody.posts)) {
            const { id = null } = resposeBody.posts[0];
            if (id) {
              expect(cy.url().should('include', `editor/post/${id}`));
              cy.wait(2000);
              cy.visit(`${urls[version]}#/editor/post/${id}`);
              cy.wait(2000);
              cy.get('.gh-publishmenu .gh-publishmenu-trigger')
                .click();
              cy.wait(500);
              const publishBtn = cy.get('.gh-publishmenu-dropdown .gh-publishmenu-footer .gh-publishmenu-button');
              publishBtn.click();
              cy.wait(1500);
            }
          }
        });
        
      
        // if(dinamicUrl){
        //   Url = tagName.value.toLowerCase().replace(/ /g, '-');
        // }

         if (verfMsgButton) {
            //layoutPage.getStatusHeader()
            getPublishMenu().should('contain.text', verfMsgButton);
        //    //console.log(getMessageVerificationResponse());
         }

        // cy.wait(2000);
        // cy.url().should('include', Url);
      });
    });
  });
});
