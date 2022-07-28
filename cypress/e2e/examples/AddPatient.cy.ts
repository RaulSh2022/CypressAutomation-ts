/// <reference types="Cypress" />
import { IDataInfo } from '../../fixtures/DataInfo';
import { addPatient } from '../../support/pageObjects/AddPatientPage';
import { getCloseButton } from '../../support/pageObjects/PracticeSetUpPage';

let cred: IDataInfo;
describe('Add Patient Suite', function () {
    before(function () {
        // runs once beofre every test case in the block
        
        cy.fixture('DataInfo').then(function (data) {
            cred = data;
            cy.wrap(cred).as("cred");
        }).then(data => {
            cy.visit(Cypress.env('url'));
            cy.login(cred.gentemLoginPage.email, cred.gentemLoginPage.password);
        })
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });
    it('Add Patient', function () {
        cy.navigateToPracticeSetUpPage();
        addPatient();
        getCloseButton().click();
    })
});