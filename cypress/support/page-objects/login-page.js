class LoginPage {
  constructor() {
    this.txtUser = 'input[name="identification"]';
    this.txtPassword = 'input[name="password"]';
    this.btnLogin = 'button.login';
    this.mainError = 'p.main-error';
    this.btnForgot = '.forgotten-link';
  }

  getUserInput() {
    return cy.get(this.txtUser);
  }

  getPasswordInput() {
    return cy.get(this.txtPassword);
  }
  
  getLoginButton() {
    return cy.get(this.btnLogin);
  }

  getErrorMsg() {
    return cy.get(this.mainError);
  }
  
  getForgotButton() {
    return cy.get(this.btnForgot);
  }
}

export default LoginPage;