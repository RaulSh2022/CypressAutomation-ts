
export const getPracticeSetUpLink = () => cy.xpath("//*[@class='menuLabel'][text()='Practice Setup']");

export const getSidebar = () => cy.xpath("//aside[@id='db_sidebar']");

export const getAccountCircleIcon = () => cy.xpath("//*[@data-testid='AccountCircleIcon']");

export const getPracticeSetUpUnderAccount = () => cy.xpath("//*[@class='gentem-body']//*[@role='presentation']//*[text()='Practice Setup']/ancestor::li");

export const getLogoImage = () => cy.xpath("//div[@id='root']//*[@alt='logo']");

export const getDashboardLink = () => cy.xpath("//*[@class='menuLabel'][text()='Dashboard']");

export const getClaimsLink = () => cy.xpath("//*[@class='menuLabel'][text()='Claims']");

export const getAppointmentLink = () => cy.xpath("//*[@class='menuLabel'][text()='Appointments']");

