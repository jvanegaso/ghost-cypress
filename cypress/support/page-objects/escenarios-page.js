const escenariosPage = {

  getLabMembersPayment() {
    return cy.get('textarea.gh-members-stripe-connect-token');
  },


  getLabMembersSavePaymentBtn() {
    return cy.contains('Save Stripe settings');
  },

  getLabMembersMonthlyPrice() {
    return cy.get('input.ember-text-field.gh-input.ember-view');
  },

  getLabMembersEmailAddress() {
    return cy.get('input.gh-labs-members-emailinput');
  },

  getLabMembersSaveEmailAddressBtn() {
    return cy.contains('Update support address');
  },


  getHeaderInjection() {
    return cy.get('div.CodeMirror-linenumber.CodeMirror-gutter-elt');
  },

  getInjectionSaveBtn() {
    return cy.contains('Save');
  },

    getEmailInput() {
      return cy.get('input#new-user-email');
    },
  
    getDesignHomeInput() {
      return cy.get('input.ember59');
    },

    getEnableMembersInput() {
      return cy.get('input#labs[members]');
    },

    getDesignHomeInputResponse() {
      return cy.get('input#ember-text-field + p.response');
    },


    getEmailResponse() {
      return cy.get('input#new-user-email + p.response');
    },
  
    getSaveBtn() {
      return cy.contains('Send invitation now');
    },

    getDesignSaveBtn() {
      return cy.contains('Save');
    },

    getEmailAddressBtn() {
      return cy.get('button.gh.btn');
    }


  }
  
  export default escenariosPage;