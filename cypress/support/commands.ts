
/// <reference types="Cypress" />
import { getEmailTextBox, getLoginButton, getPasswordTextBox } from './pageObjects/LoginPage'
import { getDashboardLink,getAccountCircleIcon,getPracticeSetUpUnderAccount } from './pageObjects/DashboardPage';
import {getTitle,getPatientsIcon} from './pageObjects/PracticeSetUpPage';
import { getFirstNameTextBox, getLastNameTextBox, getGenderDropDown, getDOB, getAddressLine1TextBox, getAddressLine2TextBox, getCityTextBox, getStateTextBox, getZipTextBox, getPatientEmailTextBox, getHomePhoneTextBox, getPhoneTextBox, selectGenderOption, selectStateOption, getSaveButton,getPatientAddedSuccessMessage } from './pageObjects/AddPatientPage'
import { getAddPatientButton } from './pageObjects/PatientPage'




/* Cypress.Commands.add("selectProduct", (productName) => {

    cy.xpath("//*[@class='card-title']//a").each(($el, index, $list) => {
        const text = $el.text()
        if (text == productName) {
            cy.xpath("//*[@class='card-footer']//button").eq(index).click();
        }
    })
}) */
Cypress.Commands.add("login", (emailId:string, password:string) => {
    getEmailTextBox().type(emailId);
    getPasswordTextBox().type(password);
    getLoginButton().click();
    getDashboardLink().should("be.visible");
})

Cypress.Commands.add("navigateToPracticeSetUpPage", () => {
    getAccountCircleIcon().click();
    cy.wait(3000);
    getPracticeSetUpUnderAccount().click();
    cy.wait(1000);
    getTitle().should("be.visible");
})





