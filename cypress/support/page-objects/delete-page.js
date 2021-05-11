class DeletePage {

    constructor() { }


    getMiniPageTittle() {
        return cy.get('.gh-content-entry-title');
    }

    getPostSettings() {
        return cy.get('.post-settings');
    }
    
    getDeleteButtomSettings() {
        return cy.get('.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button');
    }

    getModalDeleteButtom() {
        cy.get('.modal-footer').contains('Delete').click();
    }
    
}

export default DeletePage;