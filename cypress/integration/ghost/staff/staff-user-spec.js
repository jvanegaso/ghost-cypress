/// <reference types="cypress" />

import LoginPage from "../../../support/page-objects/login-page";

let loginPage = null;

describe('Staff User', () => {

  before('Setup', () => {
    loginPage = new LoginPage();
    cy.login(null, null, true);

  });

  it('Staff user account change name null', () => {
    //Given main page
    cy.url().should('include', '/site');

    // And the user goes staff page
    cy.contains('Staff').click()

    // And the user open form
    cy.contains('Owner').click()

    // When the user fill input text name field
    cy.get('input#user-name').then(($name) => {
      $name.val('',{force:true})
    });
    //Then user save your changes and show wrong
    cy.contains('Save').click()

  });

  it('Staff user account change name', () => {
    //Given user login and main page
    cy.login(null, null, true);
    cy.url().should('include', '/site');

    // And the user goes staff page
    cy.contains('Staff').click()

    // And the user open form
    cy.contains('Owner').click()

    // When the user fill input text name field
    cy.get('input#user-name').then(($name) => {
      $name.val('Wil',{force:true})
    });
    //Then user save your changes
    cy.contains('Save').click()

  });



  


  it('Staff user account website', () => {
    //Given main page login
    cy.login(null, null, true);
    cy.url().should('include', '/site');

    // And the user goes staff page
    cy.contains('Staff').click()

    // And the user open form
    cy.contains('Owner').click()

    // When the user fill textarea bio field
    cy.get('textarea#user-bio').then(($bio) => {
      $bio.val('Biografía',{force:true})
    });
    //Then user save your change
    cy.contains('Save').click()

  });


  it('Staff user account change bio', () => {
    //Given main page an dlogin
    cy.login(null, null, true);
    cy.url().should('include', '/site');

    // And the user goes staff page
    cy.contains('Staff').click()

    // And the user open form
    cy.contains('Owner').click()

    // When the user fill textarea bio field
    cy.get('textarea#user-bio').then(($bio) => {
      $bio.val('Biografía',{force:true})
    });
    //Then user save your changes
    cy.contains('Save').click()

  });


  

});

