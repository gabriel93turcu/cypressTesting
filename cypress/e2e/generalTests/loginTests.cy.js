import info from "../../fixtures/info.json"
import {login} from "../../support/utils/utils.js"

describe('Login Tests', () => {
    beforeEach('Access site', () => {
        cy.visit("/");
    })
 
    it("Try login with incorrect credentials", () => {
        cy.get('[data-test="username"]').type(info.incorrectCredentials.user); // type username
        cy.get('[data-test="password"]').type(info.incorrectCredentials.password, {log: false});  //type password
        cy.get('[data-test="login-button"]').click(); // hit login button
        cy.url().should('eq', 'https://www.saucedemo.com/'); // check the site URL
        cy.get('[data-test="error"]').should('contain.text', "Username and password do not match any user in this service"); // check if there are any error message
    })

    it("Try login with correct credentials", () => {
        cy.get('[data-test="username"]').type(info.correctCredentials.user); // type username
        cy.get('[data-test="password"]').type(info.correctCredentials.password, {log: false});  //type password
        cy.get('[data-test="login-button"]').click(); // hit login button
        cy.get('[data-test="shopping-cart-link"]').should('exist'); // check if you're login
        cy.url().should('include', '/inventory.html');  // check if the site URL contain parameter '/inventory.html'
        cy.get('.error-message-container').should('not.exist');
    })


    it("Logout from account", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('#react-burger-menu-btn').click({force: true}); // hit hamburger menu
        cy.get('[data-test="logout-sidebar-link"]').click(); // hit logout button
        cy.url().should('eq', 'https://www.saucedemo.com/'); // check the site URL
        cy.get('[data-test="shopping-cart-link"]').should('not.exist'); // check if you're logout
        cy.get('[data-test="login-button"]').should('be.visible'); // check if the login button is visible
    })

})