/// <reference types="cypress" />

import escenariosPage from "../../../support/page-objects/escenarios-page";
import accessescenarios from "./lab-access-scenarios";


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

  getScenarios(accessescenarios).forEach((scenario) => {
    it(scenario.description, () => {


        cy.contains("Expand").eq(0).click({ force: true });
        cy.contains("Expand").click({ force: true });
        cy.contains("Expand").click({ force: true });
        cy.contains("Members only").click({ force: true });
        cy.contains("Save settings").click({ force: true });
    });
  });










  
});
