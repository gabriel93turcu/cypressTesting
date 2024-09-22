import info from "../../fixtures/info.json"
import {login} from "../../support/utils/utils.js"

describe('Login Tests', () => {
    beforeEach('Access site', () => {
        cy.visit("/");
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


    it('Checkout - cancel Checkout', () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="inventory-item"]').first().find('button').click(); // click add to cart button
        cy.get('[data-test="shopping-cart-link"]').click(); // go to cart
        cy.get('[data-test="checkout"]').click(); // hit the checkout button
        cy.get('#cancel').click(); // hit the cancel button
        cy.url().should('include', '/cart.html'); // check if you're in cart page
        cy.get('.cart_item').should('have.length', 1); // check if it's a product in cart
    })

    it('Checkout Step Two - Incomplete Form', () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="inventory-item"]').first().find('button').click(); // click add to cart button
        cy.get('[data-test="shopping-cart-link"]').click(); // go to cart
        cy.get('[data-test="checkout"]').click(); // hit the checkout button
        cy.get('[data-test="lastName"]').type(info.checkoutInfo.lastName); // type last name
        cy.get('[data-test="postalCode"]').type(info.checkoutInfo.zipCode); // type zip code
        cy.get('[data-test="continue"]').click(); // hit the button continue
        cy.get('.error-message-container').should('contain.text', 'First Name is required'); // check error message
        cy.url().should('include', '/checkout-step-one.html'); // check if you are in checkout page
    })
    
})