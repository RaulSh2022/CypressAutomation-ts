import { getAppointmentLink } from "./DashboardPage";

export const getNewAppointmentButton = () => cy.xpath("//button[text()='+ New']");
export const SearchAndSelectPatientTextBox = () => cy.xpath("//input[@id='patient']");
export const getSearchPatientOption = () => cy.xpath("//ul[@id='patient-listbox']//li[@id='patient-option-0']");
export const getRenderingProviderTextBox = () => cy.xpath("//input[@id='renderingProvider']");
export const getRenderingProviderOption = () => cy.xpath("//*[@id='renderingProvider-listbox']//li[@id='renderingProvider-option-0']");
export const getBillingProviderTextBox = () => cy.xpath("//input[@id='billingProvider']");
export const getBillingProviderOption = () => cy.xpath("//*[@id='billingProvider-listbox']//li[@id='billingProvider-option-0']");
export const getServiceTextBox = () => cy.xpath("//input[@id='serviceLocation']");
export const getServiceLocationOption = () => cy.xpath("//*[@id='serviceLocation-listbox']//li[@id='serviceLocation-option-0']");
export const getReasonForVisitTextBox = () => cy.xpath("//*[@id='visitReason']");
export const getSaveButton = () => cy.xpath("//button[text()='Save']");
export const getScheduledStatus = () => cy.xpath("//*[text()='SCHEDULED']");
export const getSchedulingStatusListBox = () => cy.xpath("//*[@id='relationship']");
export const getBillingTab = () => cy.xpath("//button[text()='Billing']");
export const getAddNewPatientButton = () => cy.xpath("//button[text()='Add New Patient']");
export const getSchedulingTab = () => cy.xpath("//button[text()='Scheduling']");
export const getDoctorNotesCheckBox = () => cy.xpath("//*[@id='confirmNotes']");
export const getSaveCreateClaimButton = () => cy.xpath("//button[text()='Save & Create Claim']");
export const getConfirmButton = () => cy.xpath("//button[text()='Confirm']");
export const getClaimLink = () => cy.xpath("//*[text()='Claim Link']/parent::div//button");
export const getAppointmentHeader = () => cy.xpath("//*[@class='pageTopBar']//*[text()='Appointments']");
export const getCreateButton = () => cy.xpath("//button[text()='Create']");
export const getDiagnoseSearchBox = () => cy.xpath("//input[@id='diagnoses']");
export const getProcedureSearchBox = () => cy.xpath("//input[@id='cptCodes']");
export const getDiagnoseAddButton = () => cy.xpath("//input[@id='diagnoses']/ancestor::div[contains(@class,'diagnoses')]/following-sibling::button");
export const getProcedureAddButton = () => cy.xpath("//input[@id='cptCodes']/ancestor::div[contains(@class,'cptCodes')]/following-sibling::button");
export const getDiagnoseOption = () => cy.xpath("//*[@id='diagnoses-listbox']//li[@id='diagnoses-option-0']");
export const getProcedureOption = () => cy.xpath("//*[@id='cptCodes-listbox']//li[@id='cptCodes-option-0']");
export const getICDMapExpandedTab = () => cy.xpath("//table[@class='cptCodesTable']//div[@class='labelContainer']");
export const getICDMapCheckBox = () => cy.xpath("//div[@role='presentation']//*[contains(@class,'Checkbox')]");
export const getChargeTextBox = () => cy.xpath("//input[contains(@name,'charge')]");
export const getInvisibleBack = () => cy.xpath("//*[contains(@class,'MuiBackdrop-root MuiBackdrop-invisible')]");



export const navigateToAppointmentPage = () => {
    getAppointmentLink().click();
    getAppointmentHeader().should("be.visible");

}
export const addDiagnoseUnderBillingSection = (diagnoseName) => {
    getDiagnoseSearchBox().type(diagnoseName);
    getDiagnoseOption().click().then(data => {
        getDiagnoseSearchBox().then((input) => {
            const val = input[0].val();
            cy.log("==>" + val);
            expect(val).to.include(diagnoseName);
        })

    })
    getDiagnoseAddButton().click();
}
export const addProceduresUnderBillingSection = (cptCode) => {
    getProcedureSearchBox().type(cptCode);
    getProcedureOption().click().then(data => {
        getProcedureSearchBox().then(($input) => {
            const val = $input[0].val();
            expect(val).to.include(cptCode);
        })

    });
    getProcedureAddButton().click();
}
export const selectPatient = (patientName) => {
    SearchAndSelectPatientTextBox().type(patientName);
    getSearchPatientOption().click();
}
export const enterDetailsOnSchedulingSection = (cred) => {
    getBillingProviderTextBox().clear();
    getBillingProviderTextBox().type(cred.appointmentShceduling.billingProvider);
    getBillingProviderOption().click();

    getServiceTextBox().clear();
    getServiceTextBox().type(cred.appointmentShceduling.serviceLocation);
    getServiceLocationOption().click();

    getRenderingProviderTextBox().clear();
    getRenderingProviderTextBox().type(cred.appointmentShceduling.renderingProvider);
    getRenderingProviderOption().click();

    getReasonForVisitTextBox().type(cred.appointmentShceduling.reasonForVisit);
}

export const validateBillingIsDisabled = () => {
    getBillingTab().click();
    getAddNewPatientButton().should("be.visible");
}

export const scheduleAppointment = () => {
    getSchedulingTab().click();
    getSaveButton().click();
    getSchedulingStatusListBox().should('have.text', 'scheduled');
}

export const validateBillingIsEnabled = () => {
    getBillingTab().click();
    getScheduledStatus().should("be.visible");
}

export const enterDetailsOnBillingSection = (cred) => {
    addDiagnoseUnderBillingSection(cred.appointmentBilling.diagnoseCode);
    addProceduresUnderBillingSection(cred.appointmentBilling.cptCode);
    getICDMapExpandedTab().click();
    getICDMapCheckBox().click();
    getInvisibleBack().click();
    getChargeTextBox().type(cred.appointmentBilling.charges);
}
export const saveAppointment = () => {
    getSaveCreateClaimButton().click();
    getConfirmButton().click();
    getCreateButton().click({ force: true });
}
export const addAppointment = (patientName, cred) => {
    navigateToAppointmentPage();
    cy.wait(500);
    getNewAppointmentButton().click();
    cy.wait(500);
    selectPatient(patientName)
    enterDetailsOnSchedulingSection(cred);
    validateBillingIsDisabled();
    scheduleAppointment();
    validateBillingIsEnabled();
    enterDetailsOnBillingSection(cred);
    saveAppointment();
    cy.wait(2500);
    getSchedulingTab().click();

}
export const getClaimNum = () => {
    getClaimLink().then(data => {
        let claimNum;
        claimNum = data[0].text().split(" ");
        claimNum = claimNum[1];
        return claimNum;
    })
}



