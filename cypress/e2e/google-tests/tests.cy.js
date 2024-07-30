describe('Google.com site', () => {


    // it('it works with a base search', () => {
    //     cy.visit('https://google.com');
    //     cy.get('#L2AGLb').click();
    //     cy.get('.gLFyf').type('testing is the best').type('{enter}');

    //     cy.get('.mgAbYb').should('exist');
    // })


    // it('take a screenshot', () => {
    //     cy.visit('https://google.com');
    //     cy.get('#L2AGLb').click();

    //     cy.screenshot(); 
    // })

   
    it('use a constant for searching', () => {
        cy.visit('https://google.com');
        cy.get('#L2AGLb').click();
        
        const googleSearch = cy.get('.gLFyf');

        googleSearch.type('new test');
        googleSearch.should('have.value', 'new test');
        
        cy.screenshot(); 

    })
})