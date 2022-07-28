
export const getEmailTextBox = () => cy.xpath("//input[@id='email']");

export const getPasswordTextBox = () => cy.xpath("//input[@id='password']");

export const getLoginButton = () => cy.xpath("//button[@type='submit']");