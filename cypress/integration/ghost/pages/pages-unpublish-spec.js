/// <reference types="cypress" />
import unPublishPage from "../../../support/page-objects/unpublish-page";
import publishPage from "../../../support/page-objects/publish-page";
import scenarios from './unpublish-escenarios';
import { resolveInput, getScenarios } from '../../../../src/dynamic-data-helper';

const version = '3.42.5';

describe('UnPublishPage page', () => {

    before('Setup', () => {
        cy.login(null, null, version, true);
        cy.goToPagesPage()
    });


    getScenarios(scenarios).forEach((scenario) => {

        it(scenario.description, () => {
            const { type } = scenario;
            const { pageTitle } = scenario.fields;
            const { toastMsg } = scenario.oracles;
            const { getPageTittleInput } = publishPage;

            cy.fixture('config').then(config => {

                publishPage.getButtomCreatePage().click();
                cy.wait(1000);

                resolveInput(getPageTittleInput(), pageTitle, type, config);

                publishPage.getDescriptionTittle().click();

                publishPage.getPublishSelector().click();
                publishPage.getPublishButton().click();
                cy.wait(2000);


                const { urls } = config;
                cy.visit(`${urls[version]}#/pages`);

                unPublishPage.getMiniPageTittle().click();

                // When selected option settings buttom
                unPublishPage.getUnPublishSelector().click();
                cy.get('.gh-publishmenu-radio-label').contains('Unpublished').click();

                //Then unpublish and create page   
                unPublishPage.getUnPublishButtonSelector().click();
                unPublishPage.getPublishToastButton().click();

                publishPage.getPublishToastButton().should('contain.text', toastMsg);
                cy.wait(1000);

                cy.visit(`${urls[version]}#/pages`);



            });

        });
    });

});