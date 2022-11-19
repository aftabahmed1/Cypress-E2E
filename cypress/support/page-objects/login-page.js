/// <reference types="cypress" />
export class Login {
    loginPO = {
        profileClick: "[class='admin-dropdown profile']",
        logoutButton: '[class="action-btn block blue"]',
        message: "[class='cbox_messagebox']",
        redirectPathSuccess:"/account/dashboard/",
        errorMessage:"You have entered an incorrect username or password.",
        emptyUsernameMessage:"Please enter your Username.",
        emptyPasswordMessage:"Please enter your password.",
        messageLogout:'You have successfully logged out.' ,
        forgotPasswordLink:'[class="lost-password"]'  
    }
    verifySuccessPath(){
        cy.url().should('contain',this.loginPO.redirectPathSuccess)
          cy.wait('@loginSuccess').its('response.statusCode')
          .should('eq',200)
    }
    verifyFailMessage(){
        cy.get(this.loginPO.message,{timeout:10000}).contains(this.loginPO.errorMessage)
    }
    verifyEmptyUsernameMessage(){
        cy.get(this.loginPO.message,{timeout:10000}).contains(this.loginPO.emptyUsernameMessage)
    }
    verifyEmptyPasswordMessage(){
        cy.get(this.loginPO.message,{timeout:10000}).contains(this.loginPO.emptyPasswordMessage)
    }
    verifyLogout(){
        cy.get(this.loginPO.message,{timeout:10000}).contains(this.loginPO.messageLogout)
    }
    verifyForgotPasswordLink(){
        cy.get(this.loginPO.forgotPasswordLink).click().then(()=>{
            cy.url().should('contain','/forgotPassword/')
        }) 
    }
}

export const loginPage = new Login();