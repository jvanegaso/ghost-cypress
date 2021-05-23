const generalPage = {

    getPageMenu() {
        return cy.contains('General');
    },

    getButtomExpandSocial() {
        return cy.get('.gh-setting-first.gh-setting-last .gh-btn');    
    },

    getPageFacebookInput() {
        return cy.get('.ember-text-field.gh-input.ember-view').eq(0);
    },

    getPageTwitterInput() {
        return cy.get('.ember-text-field.gh-input.ember-view').eq(1);
    },

    getButtomSaveSettings() {
        return cy.get('.gh-btn.gh-btn-blue.gh-btn-icon.ember-view');
    },

    getMiniPageTittle() {
        return cy.get('.gh-content-entry-title');
    },

    getPublishSelector() {
        return cy.get('.gh-btn.gh-btn-outline.gh-publishmenu-trigger.ember-basic-dropdown-trigger.ember-view');
    },

    getPublishButton() {
        return cy.get('.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view');
    },

    getPublishToastButton() {
        return cy.get('.gh-notification-content');
    }
    
}

export default generalPage;