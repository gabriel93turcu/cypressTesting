import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I open the login page", () => {
  cy.visit("https://www.saucedemo.com/");
});

When("I enter valid credentials", () => {
  cy.get("#user-name").type("standard_user");
  cy.get("#password").type("secret_sauce");
  cy.get("#login-button").click();
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/inventory.html");
});
