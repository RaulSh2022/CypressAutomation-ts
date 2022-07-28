
import { getSaveSubmitButton, getSaveSubmitOnSelectPayerToSubmitToBox, getSubmitOnConfirmSubmission } from "./ClaimsPage";
import { getAddPatientButton } from "./PatientPage";
import { getPatientsIcon } from "./PracticeSetUpPage";

export const getFirstNameTextBox = () => cy.xpath("//input[@id='first_name']");
export const getLastNameTextBox = () => cy.xpath("//input[@id='last_name']");
export const getGenderDropDown = () => cy.xpath("//div[@id='sex']");
export const getDOB = () => cy.xpath("//input[@id='dob']");
export const getAddressLine1TextBox = () => cy.xpath("//input[@id='address_line_1']");
export const getAddressLine2TextBox = () => cy.xpath("//input[@id='address_line_2']");
export const getCityTextBox = () => cy.xpath("//input[@id='city']");
export const getStateTextBox = () => cy.xpath("//*[@id='state']");
export const getZipTextBox = () => cy.xpath("//input[@id='zip']");
export const getPatientEmailTextBox = () => cy.xpath("//input[@id='email']");
export const getHomePhoneTextBox = () => cy.xpath("//input[@id='home_phone']");
export const getPhoneTextBox = () => cy.xpath("//input[@id='phone']");
export const selectGenderOption = () => cy.xpath("//*[@id='menu-gender']//*[@role='option']");
export const selectStateOption = () => cy.xpath("//*[@id='menu-state']//*[@role='option']");
export const getSaveButton = () => cy.xpath("//button[text()='Save']");
export const getPatientAddedSuccessMessage = () => cy.xpath("//*[text()='New Patient Added.']", { timeout: 2000 });

let faker = require("faker/locale/en_US");

export const addPatient = () => {
    getPatientsIcon().click();

    getAddPatientButton().click();
    getFirstNameTextBox().type(faker.name.firstName());
    getLastNameTextBox().type(faker.name.lastName());
    getGenderDropDown().click();
    selectGenderOption().each((e1, index, $list) => {
        const gender = e1.text();
        if (gender == 'Male') {
            e1.trigger("click");
        }
    });
    getDOB().type("01-01-1991");
    getAddressLine1TextBox().type(faker.address.streetAddress());
    getAddressLine2TextBox().type(faker.address.secondaryAddress());
    getCityTextBox().type(faker.address.city());
    getStateTextBox().click();
    selectStateOption().each((e1) => {
        const state = e1.text();
        if (state == 'Ohio') {
            e1.trigger("click");
        }
    });
    getZipTextBox().type(faker.address.zipCode());
    getPatientEmailTextBox().type(faker.internet.email());
    getHomePhoneTextBox().type(faker.phone.phoneNumber());
    getPhoneTextBox().type(faker.phone.phoneNumber());
    getSaveButton().click();
    getPatientAddedSuccessMessage().should("be.visible");
}