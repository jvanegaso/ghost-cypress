const loginPage = {

  getUserInput() {
    return cy.get('input[name="identification"]');
  },

  getPasswordInput() {
    return cy.get('input[name="password"]');
  },
  
  getLoginButton() {
    return cy.get('button.login');
  },

  getErrorMsg() {
    return cy.get('p.main-error');
  },
  
  getForgotButton() {
    return cy.get('.forgotten-link');
  }
}

export default loginPage;