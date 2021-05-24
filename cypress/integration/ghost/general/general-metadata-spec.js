/// <reference types="cypress" />
import metadataPage from "../../../support/page-objects/metadata-page";
import scenarios from './metadata-scenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('General metadata settings', () => {

    before('Setup', () => {
        cy.login(null, null, version, true);
        cy.goToGeneralPage()
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
    });

    getScenarios(scenarios).forEach((scenario) => {

        it(scenario.description, () => {
            const { type } = scenario;
            const { metaTittle, metaDescription } = scenario.fields;
            const { toastMsg } = scenario.oracles;
            const { getmetaTittleInput, getmetaDescriptionInput } = metadataPage;

            cy.fixture('config').then(config => {

                metadataPage.getButtomExpandMetadata().scrollIntoView().focus().click({ force: true });
                cy.wait(1000);

                resolveInput(getmetaTittleInput(), metaTittle, type, config);
                resolveInput(getmetaDescriptionInput(), metaDescription, type, config);
                
                metadataPage.getButtomExpandMetadata().scrollIntoView().focus().click({ force: true });
                cy.wait(1000);

                metadataPage.getButtomSaveSettings().scrollIntoView().focus().click({ force: true })
                cy.wait(1000);

            });
        });

    });
});
