const publishPage = {

    getPageMenu() {
        return cy.contains('Pages');
    },

    getButtomCreatePage() {
        return cy.get('.gh-canvas-header .ember-view.gh-btn.gh-btn-green');    
    },

    getPageTittleInput() {
        return cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view');
    },

    getDescriptionTittle() {
        return cy.get('article.koenig-editor div[contenteditable="true"]');
    },

    getPanelPage() {
        return cy.get('.gh-koenig-editor-pane.flex.flex-column.mih-100');
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

export default publishPage;