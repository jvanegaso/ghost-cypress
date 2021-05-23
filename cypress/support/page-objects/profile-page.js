const profilePage = {

  getPassOld() {
    return cy.get('input#user-password-old');
  },

  getPassNew() {
    return cy.get('input#user-password-new');
  },

  getPassNewVerification() {
    return cy.get('input#user-new-password-verification');
  },

  getChangePasswordBtn() {
    return cy.get('button.button-change-password');
  },

  getOldPassResponse() {
    return cy.get('input#user-password-old + p.response');
  },

  getNewPassResponse() {
    return cy.get('input#user-password-new + p.response');
  },

  getNewPassVerficationResponse() {
    return cy.get('input#user-new-password-verification + p.response');
  },

  getFullNameInput() {
    return cy.get('input#user-name');
  },

  getFullNameResponse() {
    return cy.get('input#user-name + p.response');
  },

  getSlugInput() {
    return cy.get('input#user-slug');
  },

  getSlugResult() {
    return cy.get('input#user-slug + p');
  },

  getSlugError() {
    return cy.get('input#user-slug ~ p.response');
  },

  getEmailInput() {
    return cy.get('input#user-email');
  },

  getEmailResponse() {
    return cy.get('input#user-email + p.response');
  },

  getWebsiteInput() {
    return cy.get('input#user-website');
  },

  getWebsiteResult() {
    return cy.get('input#user-website ~ p:not(.response)');
  },

  getWebsiteError() {
    return cy.get('input#user-website ~ p.response');
  },

  getSaveBtn() {
    return cy.get('header.gh-canvas-header section.view-actions button.gh-btn');
  }
}

export default profilePage;