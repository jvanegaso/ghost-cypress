/// <reference types="cypress" />

import LoginPage from "../../../support/page-objects/login-page";

let loginPage = null;

describe('Staff Invitation', () => {

  before('Setup', () => {
    loginPage = new LoginPage();
    cy.login(null, null, true);

  });


  it('If email field is null invite people', () => {
    //Given main page
    cy.url().should('include', '/site');

    // And the user goes staff page
    cy.contains('Staff').click({force:true})

    // And the user open invite people form modal
    cy.contains('Invite people').click({force:true})

    // When the user fill form fields
    cy.get('input#new-user-email').then(($correo) => {
      $correo.val('',{force:true})
    });
    cy.get('#new-user-email').focus().type('{del}')

    //Then user send the invitation show error email field
    cy.contains('Send invitation now').click({force:true})


  });



  it('Should invite people', () => {
    //Given user login and main page
    cy.login(null, null, true);
    cy.url().should('include', '/site');

    // Given main page
    cy.contains('Staff').click({force:true})

    // And the user open invite people form modal
    cy.contains('Invite people').click({force:true})

    // When the user fill form fields
    cy.get('input#new-user-email').then(($correo) => {
      $correo.val('aa@a.com',{force:true})
    });
    cy.get('#new-user-email').focus().type('{del}')
    cy.get('#new-user-role').select('Editor').should('have.value', '6098665c63f5741894ef1e5e')

    //Then user send the invitation correctly
    cy.contains('Send invitation now').click({force:true})

  });


  it('Should resend invitation', () => {
    //Given user login and main page
    cy.login(null, null, true);
    cy.url().should('include', '/site');

    // Given main page
    cy.contains('Staff').click({force:true})

    // And the user open invite people form modal
    cy.contains('Resend').click({force:true})

    //Then show message success or wrong
  
  });


  it('If email user is registered invite people', () => {
    //Given user login and main page
    cy.login(null, null, true);
    cy.url().should('include', '/site');

    // Given main page
    cy.contains('Staff').click({force:true})

    // And the user open invite people form modal
    cy.contains('Invite people').click({force:true})

    // When the user fill form fields
    cy.get('input#new-user-email').then(($correo) => {
      $correo.val('aa@a.com',{force:true})
    });
    cy.get('#new-user-email').focus().type('{del}')
    cy.get('#new-user-role').select('Editor').should('have.value', '6098665c63f5741894ef1e5e')

    //Then user send the invitation and delete field created
    cy.contains('Send invitation now').click({force:true})
    cy.contains('Close').click({force:true})
    cy.contains('Revoke').click({force:true})


  });

});

