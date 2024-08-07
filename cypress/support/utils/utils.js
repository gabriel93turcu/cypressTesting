export const login = (username, password) => {
    cy.get('[data-test="username"]').type(username); // type username
    cy.get('[data-test="password"]').type(password, {log: false});  //type password
    cy.get('[data-test="login-button"]').click(); // hit login button
}