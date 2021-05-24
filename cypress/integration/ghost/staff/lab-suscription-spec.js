/// <reference types="cypress" />

import escenariosPage from "../../../support/page-objects/escenarios-page";
import suscriptioncenarios from "./lab-suscription-scenarios";


import {
  resolveInput,
  getScenarios,
} from "../../../../src/dymanic-data-suscription-helper";

const version = "3.42.5";

describe("Labs Members", () => {
  before("Setup", () => {
    cy.login(null, null, version, true);
    cy.contains("Labs").click({ force: true });
    cy.contains("Create registered members and take subscription payments").click({ force: true });
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.wait(1000);
  });

  getScenarios(suscriptioncenarios).forEach((scenario) => {
    it(scenario.description, () => {

      const { type } = scenario;
      const { monthly } = scenario.fields;
      const { monthlyMsg } = scenario.oracles;
      const { getLabMembersMonthlyPrice } =
        escenariosPage; 
        cy.contains("Expand").eq(0).click({ force: true });
        cy.get('textarea.gh-members-stripe-connect-token').click({ force: true });
        cy.contains("Expand").click({ force: true });
        cy.get('input.ember-text-field.gh-input.ember-view').clear({force: true});
      cy.fixture("config").then((config) => {
        resolveInput(getLabMembersMonthlyPrice(), monthly, type, config);
        cy.wait(1000);

        if (monthlyMsg) {
          cy.contains("Subscription amount must be at least $1.00").should("contain.text", monthlyMsg);
        }

      });
    });
  });










  
});
