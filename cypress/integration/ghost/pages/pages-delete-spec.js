/// <reference types="cypress" />
import deletePage from "../../../support/page-objects/delete-page";
import scenarios from './delete-escenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('Delete page', () => {

    before('Setup', () => {
        cy.login(null, null, version, true);
        cy.goToPagesPage()
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
    });

    getScenarios(scenarios).forEach((scenario) => {

        it(scenario.description, () => {
            const { type } = scenario;
            const { toastMsg } = scenario.oracles;
            const { getMiniPageTittle } = deletePage;

            cy.fixture('config').then(config => {

                deletePage.getMiniPageTittle().click();

                deletePage.getPostSettings().click();
                deletePage.getDeleteButtomSettings().click();
                
                cy.get('.modal-footer').contains('Delete').click();

                const { urls } = config;
                cy.visit(`${urls[version]}#/pages`);

            });
        });

    });
});

