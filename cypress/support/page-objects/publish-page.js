class PublishPage {

    constructor() { }

    getPageMenu() {
        return cy.get('#ember1015 > span');
    }

    getButtomCreatePage() {
        return cy.get('.gh-btn.gh-btn-green.gh-btn-lg.ember-view');
    }

    getPageTittle() {
        return cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view');
    }

    getPanelPage() {
        return cy.get('.gh-koenig-editor-pane.flex.flex-column.mih-100');
    }

    getMiniPageTittle() {
        return cy.get('.gh-content-entry-title');
    }

    getPublishSelector() {
        return cy.get('.gh-btn.gh-btn-outline.gh-publishmenu-trigger.ember-basic-dropdown-trigger.ember-view');
    }

    getPublishButton() {
        return cy.get('.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view');
    }

    getPublishToastButton() {
        return cy.get('.gh-notification-content');
    }

}

export default PublishPage;