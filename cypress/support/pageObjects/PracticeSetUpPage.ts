export const getPatientsIcon = () => cy.xpath("//*[@class='gentem-body']//*[text()='Patients']");
export const getCloseButton = () => cy.xpath("//*[@data-testid='CloseIcon']");
export const getTitle = () => cy.xpath("//*[contains(@class,'tabTitle')]");