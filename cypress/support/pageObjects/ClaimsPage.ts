import { IDataInfo } from "../../fixtures/DataInfo";
import { getServiceLineStatus } from "./AppointmentPage";
import { getClaimsLink } from "./DashboardPage";

export const getSearchPatientTextBox = () => cy.xpath("//input[@id='serachPatient']");
export const getSearchButton = () => cy.xpath("//button[text()='Search']");
export const waitForTableLoading = () => cy.xpath("//*[contains(@class,'claimsTable')]//table/tbody//tr//td[@colspan='12']");
export const getClaimNumInTable = (claimNumber:string) =>
    cy.xpath("//*[contains(@class,'claimsTable')]//table/tbody/tr[1]//td[1]//span[text()='" + claimNumber + "']");
export const getSubmissionDetails = () => cy.xpath("//*[@title='Submission Details']");
export const getClaimDetailsButton = () => cy.xpath("//*[text()='Run Claim Edits']");

export const getSaveSubmitButton = () => cy.xpath("//button[text()='Save & Submit']");
export const getSaveSubmitOnSelectPayerToSubmitToBox = () => cy.xpath("//*[contains(@class,'dialogBody')]//button[text()='Save & Submit']");
export const getSubmitOnConfirmSubmission = () => cy.xpath("//*[contains(@class,'dialogContent')]//button[text()='Submit']");

export const getRenderingProviderTextBox = () => cy.xpath("//input[@id='rendering_provider']");
export const getServiceLocationTextBox = () => cy.xpath("//input[@id='service_location']");
export const getBillingProviderTextBox = () => cy.xpath("//input[@id='billing_provider']");
export const getIcdCodeTextBox = () => cy.xpath("//*[text()='Diagnoses']/ancestor::div[contains(@class,'cardLayout')]//input[@readonly]");
export const getServiceCodeTextBox = () => cy.xpath("//*[text()='Services']/ancestor::div[contains(@class,'cardLayout')]//input[@readonly]")


export const searchAndValidateClaimNumInClaimTable = (number:string) =>{
    searchClaimNumber(number);
    getClaimNumInTable(number).click();      
}

export const validateAndAddClaim = (cred:IDataInfo) => {
    navigateToSubmissionDetails();
    validateSubmissionDetails(cred);
    getSaveSubmitButton().click();
    getSaveSubmitOnSelectPayerToSubmitToBox().click();
    getSubmitOnConfirmSubmission().click().then((input)=>{
    cy.wait(5000);
    getServiceLineStatus().each((input) => {
        const text = input.text();
        expect(text).to.equal(cred.serviceLineStatus.serviceLineStatusSubmitted);
    });
});
}


export const navigateToClaimsPage = () => {
    getClaimsLink().click();
    cy.wait(1500);
    getSearchPatientTextBox().should("be.visible");
}

export const searchClaimNumber = (number:string) => {
    getSearchPatientTextBox().type(number);
    getSearchButton().click();
    waitForTableLoading().click();
    getClaimNumInTable(number).should("be.visible");
}
export const navigateToSubmissionDetails = () => {
    cy.wait(2000);
    getSubmissionDetails().click();
    getClaimDetailsButton().should("be.visible");
}
export const validateSubmissionDetails = (cred:IDataInfo) => {
    getRenderingProviderTextBox().each((input) => {
        const val = input.val();
        expect(val).to.include(cred.appointmentShceduling.renderingProvider);
    })
    getServiceLocationTextBox().each((input) => {
        const val = input.val();
        expect(val).to.include(cred.appointmentShceduling.serviceLocation);
    });

    getBillingProviderTextBox().each((input) => {
        const val = input.val();
        expect(val).to.include(cred.appointmentShceduling.billingProvider);
    });
    getIcdCodeTextBox().each((input) => {
        const val = input.val();
        expect(val).to.include(cred.appointmentBilling.diagnoseCode);
    });

    getServiceCodeTextBox().each((input) => {
        const val = input.val();
        expect(val).to.include(cred.appointmentBilling.cptCode);
    });
    
    getServiceLineStatus().each((input) => {
        const text = input.text();
        expect(text).to.equal(cred.serviceLineStatus.serviceLineStatusNotSubmitted);
    })
}

