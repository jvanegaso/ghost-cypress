class UnPublishPage {

    constructor() { }

    getMiniPageTittle() {
        return cy.get('.gh-content-entry-title');
    }

    getUnPublishSelector() {
        return cy.get('.gh-btn.gh-btn-outline.gh-publishmenu-trigger.ember-basic-dropdown-trigger.ember-view');
    }

    getUnPublishButtonSelector() {
        return cy.get('.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view');
    }

    getPublishToastButton() {
        return cy.get('.gh-notification-content');
    }

}

export default UnPublishPage;