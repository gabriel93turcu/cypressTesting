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
        cy.get('[data-test="error"]').should('have.text', "Epic sadface: Username and password do not match any user in this service"); // check if there are any error message
    })

    it("Try login with correct credentials", () => {
        cy.get('[data-test="username"]').type(info.correctCredentials.user); // type username
        cy.get('[data-test="password"]').type(info.correctCredentials.password, {log: false});  //type password
        cy.get('[data-test="login-button"]').click(); // hit login button
        cy.get('[data-test="shopping-cart-link"]').should('exist'); // check if you're login
    })


    it("Logout from account", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('#react-burger-menu-btn').click({force: true}); // hit hamburger menu
        cy.get('[data-test="logout-sidebar-link"]').click(); // hit logout button
        cy.get('[data-test="shopping-cart-link"]').should('not.exist'); // check if you're logout
    })


    it("Check if the hamburger menu is woring", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('#react-burger-menu-btn').click({force: true}); // open menu
        cy.get('#react-burger-cross-btn').click(); // close menu
        cy.get('[data-test="close-menu"]').should('not.visible'); // check if the close menu button is visible
    })

    it("Add a product in cart", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); // click add to cart button
        cy.get('[data-test="shopping-cart-badge"]').click({force: true}); // hit the cart icon
        cy.get('[data-test="cart-list"]').should('not.be.empty'); // check if the cart is not empty
    })


    it("Delete a product in the cart", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); // click add to cart button
        cy.get('[data-test="shopping-cart-badge"]').click({force: true}); // hit the cart icon
        cy.get('[data-test="remove-sauce-labs-backpack"]').click(); // remove the product in the cart
        cy.get('[data-test="item-4-title-link"]').should('not.exist'); // check if the product was removed
    })

    it("Complete the checkout process", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); // click add to cart button
        cy.get('[data-test="shopping-cart-badge"]').click({force: true}); // hit the cart icon
        cy.get('[data-test="checkout"]').click(); // hit the checkout button
        cy.get('[data-test="firstName"]').type(info.checkoutInfo.firstName); // type first name
        cy.get('[data-test="lastName"]').type(info.checkoutInfo.lastName); // type last name
        cy.get('[data-test="postalCode"]').type(info.checkoutInfo.zipCode); // type zip code
        cy.get('[data-test="continue"]').click(); // hit the button continue
        cy.get('[data-test="finish"]').click(); // hit the button purchase
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!'); // check if the confirmation order message exist
    })

    it("Access the product page", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="inventory-item-name"]').first().click(); // access the first product in the list
        cy.get('[data-test="back-to-products"]').should('exist'); // check if the back to product list button exist
    })

    it("Go back to product page", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="inventory-item-name"]').first().click(); // access the first product in the list
        cy.get('[data-test="back-to-products"]').click(); // hit the back to product listing button
        cy.get('[data-test="title"]').should('exist'); // check if the title page exist
    })
})