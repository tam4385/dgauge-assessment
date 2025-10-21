import expectedResponse from "../../cypress/fixtures/results.91283.json";

describe("Fullstack Test Workflow", () => {
  it("should display the Results component with correct data", () => {
    cy.intercept({
      method: "GET",
      url: "/api/entry/results?projectId=119367&assessmentId=91283",
    }).as("getResults");

    cy.visit("http://localhost:3000/results/project/119367/assessment/91283"); // Updated assessmentId

    cy.get('[data-qa="subdivision0"]').should("contain", "A&WP");
    cy.get('[data-qa="mileage1"]').should("contain", "17.9mi - 171.84mi");
    cy.get('[data-qa="mileage4"]').should("contain", "443.04mi - 300mi");
    cy.get('[data-qa="trackCode4"]').should("contain", "ALL");
    cy.get('[data-qa="trackCode2"]').should("contain", "SG");

    cy.wait("@getResults").then(({ response }) => {
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });
});
