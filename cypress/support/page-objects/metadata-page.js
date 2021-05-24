const metadataPage = {

    getPageMenu() {
        return cy.contains('General');
    },

    getButtomExpandMetadata() {
        return cy.get('.flex.flex-row.justify-between.w-100 .gh-btn').eq(0);    
    },

    getmetaTittleInput() {
        return cy.get('.ember-text-field.gh-input.ember-view');
    },

    getmetaDescriptionInput() {
        return cy.get('.ember-text-area.gh-input.ember-view');
    },

    getButtomSaveSettings() {
        return cy.get('.gh-btn.gh-btn-blue.gh-btn-icon.ember-view');
    }

}

export default metadataPage;

