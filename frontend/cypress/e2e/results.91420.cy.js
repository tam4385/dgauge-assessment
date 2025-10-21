import expectedResponse from "../../cypress/fixtures/results.91420.json";

describe("Fullstack Test Workflow", () => {
  it("should display the Results component with correct data", () => {
    cy.intercept({
      method: "GET",
      url: "/api/entry/results?projectId=119364&assessmentId=91420",
    }).as("getResults");

    cy.visit("http://localhost:3000/results/project/119364/assessment/91420");

    cy.get('[data-qa="subdivision0"]').should("contain", "New Castle");
    cy.get('[data-qa="mileage1"]').should("contain", "54.86mi - 192.38mi");
    cy.get('[data-qa="mileage35"]').should("contain", "0.18mi - 1.26mi");
    cy.get('[data-qa="trackCode31"]').should("contain", "WLWYE");
    cy.get('[data-qa="prohibited14"]').should("contain", "4");

    cy.wait("@getResults").then(({ response }) => {
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });
});
