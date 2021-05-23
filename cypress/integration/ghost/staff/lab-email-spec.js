/// <reference types="cypress" />

import escenariosPage from "../../../support/page-objects/escenarios-page";
import emailescenarios from "./lab-email-scenarios";


import {
  resolveInput,
  getScenarios,
} from "../../../../src/dynamic-data-helper";

const version = "3.42.5";

describe("Labs Members", () => {
  before("Setup", () => {
    cy.login(null, null, version, true);
    cy.contains("Labs").click({ force: true });
    cy.contains("Create registered members and take subscription payments").click({ force: true });
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.wait(1000);
  });

  getScenarios(emailescenarios).forEach((scenario) => {
    it(scenario.description, () => {

      const { type } = scenario;
      const { email } = scenario.fields;
      const { emailMsg } = scenario.oracles;
      const { getLabMembersEmailAddress, getLabMembersSaveEmailAddressBtn } =
        escenariosPage; 
        cy.contains("Expand").click({ force: true });
        cy.contains("Expand").click({ force: true });
        cy.contains("Expand").click({ force: true });
        cy.contains("Expand").click({ force: true });
        cy.get('input.gh-labs-members-emailinput').clear({ force: true });
        cy.fixture("config").then((config) => {
            
        resolveInput(getLabMembersEmailAddress(), email, type, config);

        getLabMembersSaveEmailAddressBtn().click({ force: true });

        cy.wait(1000);

        if (emailMsg) {
          cy.contains("Subscription amount must be at least $1.00").should("contain.text", emailMsg);
        }
        cy.contains("Close").click({ force: true });
        cy.contains("Close").click({ force: true });
        cy.contains("Close").click({ force: true });
        cy.contains("Close").click({ force: true });
      });
    });
  });










  
});
