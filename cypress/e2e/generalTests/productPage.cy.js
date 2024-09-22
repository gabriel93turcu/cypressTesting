import info from "../../fixtures/info.json"
import {login} from "../../support/utils/utils.js"

describe('Login Tests', () => {
    beforeEach('Access site', () => {
        cy.visit("/");
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

    it("Check if the hamburger menu is woring", () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('#react-burger-menu-btn').click({force: true}); // open menu
        cy.get('#react-burger-cross-btn').click(); // close menu
        cy.get('[data-test="close-menu"]').should('not.visible'); // check if the close menu button is visible
    })

    it('Product sorting - A to Z', () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)'); // select sorting field
        cy.get('[data-test="inventory-item-name"]').then((productNames) => {  // verify that the products are sorted alphabetically from A to Z
            const actualProductNames = [...productNames].map(name => name.innerText);
            const sortedProductNames = [...actualProductNames].sort(); // sort array alphabetically A to Z
            expect(actualProductNames).to.deep.equal(sortedProductNames); // check if the actual order matches the sorted order
        });
        cy.get('[data-test="inventory-item"]').should('have.length', 6); // assuming there are 6 products
    })


    it('Product sorting - Z to A', () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)'); // select sorting field
        cy.get('[data-test="inventory-item-name"]').then((productNames) => {  // verify that the products are sorted alphabetically from A to Z
            const actualProductNames = [...productNames].map(name => name.innerText);
            const sortedProductNames = [...actualProductNames].sort().reverse(); // sort array alphabetically Z to A
            expect(actualProductNames).to.deep.equal(sortedProductNames); // check if the actual order matches the sorted order
        });
        cy.get('[data-test="inventory-item"]').should('have.length', 6); // assuming there are 6 products
    })


    it('Product sorting - Price (Low to High)', () => {
        login(info.correctCredentials.user, info.correctCredentials.password); // login function
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)'); // select sorting field
        cy.get('[data-test="inventory-item-name"]').then((prices) => {  // select all elements with data-test 'inventory-item-name
            const priceVales = [...prices].map(price => parseFloat(price.innerText.replace('$', ''))); // convert (prices) into a plain JS array, create a new array with prices, remove the '$' in the array
            const sortedPrices = [...priceVales].sort((a, b) => a - b); // sort ascending the array
            expect(priceVales).to.deep.equal(sortedPrices); // check if the actual order matches the sorted order
        });
        cy.get('[data-test="inventory-item"]').should('have.length', 6); // assuming there are 6 products
    })
})