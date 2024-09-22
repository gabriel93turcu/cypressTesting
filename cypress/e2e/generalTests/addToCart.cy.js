import info from "../../fixtures/info.json"
import {login} from "../../support/utils/utils.js"

describe('Login Tests', () => {
    beforeEach('Access site', () => {
        cy.visit("/");
    })

    // it("Add a product in the cart", () => {
    //     login(info.correctCredentials.user, info.correctCredentials.password); // login function
    //     cy.get('[data-test="inventory-item"]').first().find('button').click(); // click add to cart button
    //     cy.get('[data-test="shopping-cart-badge"]').should('contain.text', '1'); // check if the cart badge have a text
    //     cy.get('[data-test="inventory-item"]').first().find('button').should('have.text', 'Remove'); // check if the add to cart button text was changed
    //     cy.get('[data-test="shopping-cart-link"]').click(); // go to cart
    //     cy.get('.cart_item').should('have.length', 1); // check if cart contains an item
    // })


    // it("Delete a product in the cart", () => {
    //     login(info.correctCredentials.user, info.correctCredentials.password); // login function
    //     cy.get('[data-test="inventory-item"]').first().find('button').click(); // click add to cart button
    //     cy.get('[data-test="shopping-cart-link"]').click(); // go to cart
    //     cy.get('.cart_item').should('have.length', 1); // check if cart contains an item
    //     cy.get('.cart_item').first().find('button').click(); // find and hit the remove button
    //     cy.get('[data-test="shopping-cart-badge"]').should('not.exist'); // check if the cart badge exist
    //     cy.get('.cart_item').should('not.exist'); // check if the cart is empty
    // })

    it("Add Multiple Products to Cart", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="inventory-item"]').each(($el, index) => { // add 3 products to cart
            if (index < 3) {
              cy.wrap($el).find('button').click();
            }
          });
        cy.get('[data-test="shopping-cart-badge"]').should('contain.text', '3'); // check if the cart badge have text 3
        cy.get('[data-test="shopping-cart-link"]').click(); // go to cart
        cy.get('.cart_item').should('have.length', 3); // check if there are 3 products in the cart
    })
})