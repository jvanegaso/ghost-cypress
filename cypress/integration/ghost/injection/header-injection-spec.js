/// <reference types="cypress" />

import escenariosPage from "../../../support/page-objects/escenarios-page";
import injectcenarios from "./header-injection-scenarios";


import {
  resolveInput,
  getScenarios,
} from "../../../../src/dynamic-data-helper";

const version = "3.42.5";

describe("Injection", () => {
  before("Setup", () => {
    cy.login(null, null, version, true);
    cy.wait(2000);
    cy.contains("Code injection").click({ force: true });
    cy.wait(1000);
  });

  getScenarios(injectcenarios).forEach((scenario) => {
    it(scenario.description, () => {

      const { type } = scenario;
      const { header } = scenario.fields;
      const { headerMsg } = scenario.oracles;
      const { getHeaderInjection, getInjectionSaveBtn } = escenariosPage;
      cy.fixture("config").then((config) => {
        resolveInput(getHeaderInjection(), header, type, config);

        getInjectionSaveBtn().click({ force: true });

        cy.wait(1000);

        if (headerMsg) {
          cy.contains("").should("contain.text", headerMsg);
        }

      });
    });
  });

});
