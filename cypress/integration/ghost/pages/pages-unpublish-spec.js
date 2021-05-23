/// <reference types="cypress" />

import UnPublishPage from "../../../support/page-objects/unpublish-page";
import PublishPage from "../../../support/page-objects/publish-page";

const version = '3.42.5';

let unPublishPage = null;
let publishPage = null; 

describe('UnPublishPage page', () => {

    before('Setup', () => {
        unPublishPage = new UnPublishPage();
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

    it('Should unpublish a page! ', () => {

        // Given a user autenticated 
        cy.login(null, null, true);
        cy.visit('http://localhost:2368/ghost/#/pages');

        unPublishPage.getMiniPageTittle().click();

        // When selected option settings buttom
        unPublishPage.getUnPublishSelector().click();
        cy.get('.gh-publishmenu-radio-label').contains('Unpublished').click();

        //Then unpublish and create page   
        unPublishPage.getUnPublishButtonSelector().click();
        unPublishPage.getPublishToastButton().click();

        

    });

});