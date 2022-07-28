/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.login()
         */
         login(emailId:string, password:string): Chainable<null>;
    }
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.navigateToPracticeSetUpPage()
         */
         navigateToPracticeSetUpPage(): Chainable<null>;
    }
}