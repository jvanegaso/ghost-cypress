/// <reference types="cypress" />

import LoginPage from "../../support/page-objects/login-page";

let loginPage = null;

describe('Gestion de usuarios', () => {

  before('Setup', () => {
    loginPage = new LoginPage();
  });

  it('Deberia mostrar un mensaje de error si el usuario y la clave son incorrectas', () => {
    // Given 
    const wrongUser = 'dsadsadsa';
    const wrongPass = 'dsadsadsa';

    // When
    cy.login(wrongUser, wrongPass);

    // Then
    loginPage.getErrorMsg()
      .should('have.text', 'Please fill out the form to sign in. ');
  });

  it('Deberia mostrar un mensaje de error si el usuario está vacío', () => {
    // Given 
    const wrongUser = '';
    const wrongPass = 'dsadsadsa';

    // When
    cy.login(wrongUser, wrongPass);

    // Then
    loginPage.getErrorMsg()
      .should('have.text', 'Please fill out the form to sign in. ');
  });

  it('Deberia mostrar un mensaje de error si la clave está vacía', () => {
    // Given 
    const wrongUser = 'dsadsads';
    const wrongPass = '';

    // When
    cy.login(wrongUser, wrongPass);

    // Then
    loginPage.getErrorMsg()
      .should('have.text', 'Please fill out the form to sign in. ');
  });

  it('Deberia mostrar un mensaje de error si usuario y clave están vacíos', () => {
    // Given 
    const wrongUser = '';
    const wrongPass = '';

    // When
    cy.login(wrongUser, wrongPass);

    // Then
    loginPage.getErrorMsg()
      .should('have.text', 'Please fill out the form to sign in. ');
  });

  it('Deberia mostrar un mensaje de error si se presiona clic en Forgot y no hay un correo configurado', () => {
    // Given 
    const wrongUser = '';
    const wrongPass = '';

    // When
    cy.login(wrongUser, wrongPass);
    loginPage.getForgotButton().click();

    // Then
    loginPage.getErrorMsg()
      .should('have.text', 'We need your email address to reset your password! ');
  });

  it('Deberia iniciar sesión con los datos de usuario correctos', () => {
    // Given usuario y clave tomados del sistema

    // When
    cy.login(null, null, true);

    // Then
    cy.url().should('include', '/site');
  });

  it('Deberia cerrar sesión y no permitir ingresar nuevamente a la página /site', () => {
    // Given a user loged
    cy.login(null, null, true);

    // When logout
    cy.logout();
    
    // Then
    cy.url().should('include', '#/signin');
    cy.wait(2000);
    
    // AND try yo access again
    cy.fixture('config').then(config => {
      const { ghostBaseUrl } = config;
      cy.visit(`${ghostBaseUrl}#/site`);
      
      // Then
      cy.url().should('include', '#/signin');
    });

  });

});