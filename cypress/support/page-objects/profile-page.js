class ProfilePage {
  constructor() {
    this.txtPassOld = 'input#user-password-old';
    this.responseOldPass = 'input#user-password-old + p.response';

    this.txtPassNew = 'input#user-password-new';
    this.responseNewPass = 'input#user-password-new + p.response';
    
    this.txtPassNewVerification = 'input#user-new-password-verification';
    this.responseNewPassVerif = 'input#user-new-password-verification + p.response';

    this.btnChangePassword = 'button.button-change-password';
  }

  getPassOld() {
    return cy.get(this.txtPassOld);
  }
  
  getPassNew() {
    return cy.get(this.txtPassNew);
  }
  
  getPassNewVerification() {
    return cy.get(this.txtPassNewVerification);
  }
  
  getChangePasswordBtn() {
    return cy.get(this.btnChangePassword);
  }

  getOldPassResponse() {
    return cy.get(this.responseOldPass);
  }
  
  getNewPassResponse() {
    return cy.get(this.responseNewPass);
  }
  
  getNewPassVerficationResponse() {
    return cy.get(this.responseNewPassVerif);
  }
  
}

export default ProfilePage;