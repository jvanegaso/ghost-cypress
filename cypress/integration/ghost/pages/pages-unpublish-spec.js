/// <reference types="cypress" />

import UnPublishPage from "../../../support/page-objects/unpublish-page";

let unPublishPage = null;

describe('UnPublishPage page', () => {

    before('Setup', () => {
        unPublishPage = new UnPublishPage();
    });

    it('Should delete a page! ', () => {

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