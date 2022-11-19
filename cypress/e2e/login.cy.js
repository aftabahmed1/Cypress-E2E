/// <reference types="cypress" />
import { loginPage } from "../support/page-objects/login-page";
const loginData = require("../fixtures/loginData.json");
describe("Login Functionality Testing",()=>{
    beforeEach(() => {
        cy.visit('/')
        cy.intercept('GET', '**/access-tokens/*').as('loginSuccess')
      });
      it('Logins successfully with correct credentials', () => {
        cy.login(loginData.validCredentials).then(()=>{
            loginPage.verifySuccessPath()
        })
         
    })
    it('Login not allowed with Incorrect credentials',()=>{
        cy.login(loginData.invalidCredentials).then(()=>{
            loginPage.verifyFailMessage()
        })

    })
    it('Logout successfully',()=>{
        cy.login(loginData.validCredentials).then(()=>{
            loginPage.verifySuccessPath()
        })
        cy.logOut().then(()=>{
            loginPage.verifyLogout()
        })

    })
    it('Login with EmptyPassword',()=>{
        cy.loginEmptyPassword(loginData.emptyPassword).then(()=>{
            loginPage.verifyEmptyPasswordMessage()
        })
    })
    it('Should Logout successfully and click browser back button not allowing to login back',()=>{
        cy.login(loginData.validCredentials).then(()=>{
            loginPage.verifySuccessPath()
        })
        cy.logOut().then(()=>{
            loginPage.verifyLogout()
        })
        cy.go('back')
        cy.url().should('not.contain','/account/dashboard/')

    })
    it('Verify forgot password link working',()=>{
        loginPage.verifyForgotPasswordLink()

    })
})