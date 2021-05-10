/// <reference types="cypress" />

import PublishPage from "../../support/page-objects/publish-page";

let publishPage = null;

describe('Create and Publish page', () => {

    before('Setup', () => {
        publishPage = new PublishPage();
    });

    it('Should create a page and publish it! ', () => {

        // Given a user autenticated 
        cy.login(null, null, true);
        cy.visit('http://localhost:2368/ghost/#/pages');

        // When a user creates a page 
        publishPage.getPageMenu().click();
        publishPage.getPageTittle().type('Página de Prueba de Cypress');

        // And selected option page
        publishPage.getPanelPage().click();
        cy.visit('http://localhost:2368/ghost/#/pages');


        publishPage.getMiniPageTittle().click();

        // And selected publish selector
        publishPage.getPublishSelector().click();
        publishPage.getPublishButton().click();

        //Then publish and create page        
        publishPage.getPublishToastButton().click(); 
    });


});