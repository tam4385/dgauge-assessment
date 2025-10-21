import expectedResponse from "../../cypress/fixtures/results.91253.json";

describe("Fullstack Test Workflow", () => {
  it("should display the Results component with correct data", () => {
    cy.intercept({
      method: "GET",
      url: "/api/entry/results?projectId=119364&assessmentId=91253",
    }).as("getResults");

    cy.visit("http://localhost:3000/results/project/119364/assessment/91253");

    cy.get('[data-qa="subdivision0"]').should("contain", "Aberdeen");
    cy.get('[data-qa="mileage1"]').should("contain", "154.83mi - 240.5mi");
    cy.get('[data-qa="mileage126"]').should("contain", "1.69mi - 2.59mi");
    cy.get('[data-qa="trackCode96"]').should("contain", "SG");
    cy.get('[data-qa="prohibited14"]').should("contain", "3");

    cy.wait("@getResults").then(({ response }) => {
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });
});
