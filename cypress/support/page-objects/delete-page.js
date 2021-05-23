const deletePage = {

    getMiniPageTittle() {
        return cy.contains('Pagina prueba');
    },

    getPostSettings() {
        return cy.get('.post-settings');
    },
    
    getDeleteButtomSettings() {
        return cy.get('.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button');
    },

    getModalDeleteButtom() {
        cy.get('.modal-footer').contains('Delete').click();
    }

}

export default deletePage;