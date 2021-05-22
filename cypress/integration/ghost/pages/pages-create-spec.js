/// <reference types="cypress" />

import PublishPage from "../../../support/page-objects/publish-page";

let publishPage = null;

describe('Create and Publish page', () => {

    before('Setup', () => {
        publishPage = new PublishPage();
        cy.login(null, null, true);
    });

    it('Should create a page and publish it! ', () => {

        // Given a user autenticated 
        cy.url().should('include', '/site');
        //cy.visit('http://localhost:2368/ghost/#/pages');

        // When a user creates a page 
        cy.contains('Pages').click({force:true})
        publishPage.getButtomCreatePage().click();

        //cy.get('.gh-nav-list.gh-nav-manage a[href^="#/Pages"]').click();
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