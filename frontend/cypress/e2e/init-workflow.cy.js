describe("Fullstack Test Workflow", () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit("http://localhost:3000");
  });

  it("should display the Hello component when no userName is set", () => {
    // Check if the Hello component is displayed
    cy.contains("Who Are you?").should("be.visible");
    cy.get('[data-qa="nameInput"]').should("be.visible");
    cy.get('[data-qa="storeNameBtn"]').should("be.visible");
  });

  it("should store the userName and display the Connect component", () => {
    // Enter a name and click the "Store Name" button
    cy.get('[data-qa="nameInput"]').clear().type("Cypress");
    cy.get('[data-qa="storeNameBtn"]').click();

    // Verify that the Connect component is displayed
    cy.contains("Hello Cypress").should("be.visible");
    cy.get('[data-qa="connectBtn"]').should("be.visible");
  });

  it("should connect to the API and update the state", () => {
    // Enter a name and click the "Store Name" button
    cy.get('[data-qa="nameInput"]').type("Mr Robot");
    cy.get('[data-qa="storeNameBtn"]').click();

    // Click the "Connect To API" button
    cy.get('[data-qa="connectBtn"]').click();

    // Click the "Restart" button
    cy.get('[data-qa="resetBtn"]').click();
  });

  it("should reset the state when the Restart button is clicked", () => {
    // Enter a name and click the "Store Name" button
    cy.get('[data-qa="nameInput"]').type("Fred");
    cy.get('[data-qa="storeNameBtn"]').click();

    // Click the "Connect To API" button
    cy.get('[data-qa="connectBtn"]').click();

    // Click the "Restart" button
    cy.get('[data-qa="resetBtn"]').click();

    // Verify that the Hello component is displayed again
    cy.contains("Who Are you?").should("be.visible");
  });
});
