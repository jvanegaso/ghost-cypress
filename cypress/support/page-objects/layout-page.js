class LayoutPage {

  constructor() { }

  getProfileButton() {
    return cy.get('div.gh-nav-bottom div[role="button"]');
  }

  getYourProfileLink() {
    return cy.contains('Your Profile');
  }

  getNotificationWrapper() {
    return cy.get('.gh-notifications.ember-view');
  }


  getStatusHeader() {
    return cy.get('.gh-editor-header');
  }

}

export default LayoutPage;