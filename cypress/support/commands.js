// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const loginSelectors = {
    inputEmail: "#inputEmail",
    inputPassword:"#inputPassword",
    loginButton: '[class="login-btn action-btn blue block"]'
}
const logOutSelectors = {
  profileClick: '[class="admin-dropdown profile"]',
  logoutButton: '[class="action-btn block blue"]'

}
Cypress.Commands.add("login", credential=>{
    cy.get(loginSelectors.inputEmail).type(credential.userName);
    cy.get(loginSelectors.inputPassword).type(credential.password);
    cy.get(loginSelectors.loginButton)
      .should("contain", "Login")
      .click();
      
  });
  Cypress.Commands.add("emptyLoginClick", ()=>{
    cy.get(loginSelectors.loginButton)
      .should("contain", "Login")
      .click();
      
  });
  Cypress.Commands.add("loginEmptyUsername", credential =>{
    cy.get(loginSelectors.inputPassword).type(credential.password);
    cy.get(loginSelectors.loginButton)
      .should("contain", "Login")
      .click();
      
  });
  Cypress.Commands.add("loginEmptyPassword", credential =>{
    cy.get(loginSelectors.inputEmail).type(credential.userName);
    cy.get(loginSelectors.loginButton)
      .should("contain", "Login")
      .click();
      
  });
  Cypress.Commands.add("logOut",() =>{
    cy.get(logOutSelectors.profileClick).click().then(()=>{
      cy.get(logOutSelectors.logoutButton).click()

    })
      
  });