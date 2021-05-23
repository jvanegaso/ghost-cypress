/// <reference types="cypress" />

import escenariosPage from "../../../support/page-objects/escenarios-page";
import stripescenarios from "./lab-stripe-scenarios";


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

  getScenarios(stripescenarios).forEach((scenario) => {
    it(scenario.description, () => {

      const { type } = scenario;
      const { payment } = scenario.fields;
      const { paymentMsg } = scenario.oracles;
      const { getLabMembersPayment, getLabMembersSavePaymentBtn } =
        escenariosPage;    
      cy.contains("Expand").eq(0).click({ force: true });
      cy.fixture("config").then((config) => {
        resolveInput(getLabMembersPayment(), payment, type, config);

        getLabMembersSavePaymentBtn().click({ force: true });

        cy.wait(1000);

        if (paymentMsg) {
          cy.contains("Invalid secure key").should("contain.text", paymentMsg);
        }
        cy.contains("Close").eq(0).click({ force: true });
      });
    });
  });










  
});
