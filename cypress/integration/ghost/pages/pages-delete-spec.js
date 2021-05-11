/// <reference types="cypress" />

import DeletePage from "../../../support/page-objects/delete-page";

let deletePage = null;

describe('Delete page', () => {

    before('Setup', () => {
        deletePage = new DeletePage();
    });

    it('Should delete a page! ', () => {

        // Given a user autenticated 
        cy.login(null, null, true);
        cy.visit('http://localhost:2368/ghost/#/pages');
       
        deletePage.getMiniPageTittle().click();

        // When selected option settings buttom
        deletePage.getPostSettings().click();
        deletePage.getDeleteButtomSettings().click();   
        
        // Then select delete buttom option 
        cy.get('.modal-footer').contains('Delete').click();
             
    });

});