/// <reference types="Cypress" />
import { addAppointment, getClaimLink } from '../../support/pageObjects/AppointmentPage';
import { navigateToClaimspage, searchAndValidateClaimNumInClaimTable, validateAndAddClaim } from '../../support/pageObjects/ClaimsPage';

let cred;
let claimNum;
let claimNumber;
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
        getClaimLink().then(data => {
            claimNum = data[0].text().split(" ");
            claimNumber = claimNum[1];
        })
        cy.then(() => {
            navigateToClaimspage();
            searchAndValidateClaimNumInClaimTable(claimNumber);
            validateAndAddClaim(cred);
        })
    })
})