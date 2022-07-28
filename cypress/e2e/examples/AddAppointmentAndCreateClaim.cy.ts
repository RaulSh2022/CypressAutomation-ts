/// <reference types="Cypress" />

import { IDataInfo } from '../../fixtures/DataInfo';
import { addAppointment, getClaimLink } from '../../support/pageObjects/AppointmentPage';
import { navigateToClaimsPage, searchAndValidateClaimNumInClaimTable, validateAndAddClaim } from '../../support/pageObjects/ClaimsPage';

let cred: IDataInfo;
let claimNum: string[];
let claimNumber: string;

describe('Appointment and Create Claim Suite', function () {
    before(function () {
        // runs once before every test case in the block
        cy.fixture('DataInfo').then(function (data) {
            cred = data;
            cy.wrap(cred).as("cred");
        }).then(data => {
            cy.visit(Cypress.env('url'));
            cy.login(cred.gentemLoginPage.email, cred.gentemLoginPage.password);
        })
    })
    it('Add AppointmentAndCreateClaim', () => {
        addAppointment("Rahul test", cred);
        getClaimLink().each((data) => {
            claimNum = data.text().split(" ");
            claimNumber = claimNum[1];
        })
        cy.then(() => {
            navigateToClaimsPage();
            searchAndValidateClaimNumInClaimTable(claimNumber);
            validateAndAddClaim(cred);
        })
    })
})