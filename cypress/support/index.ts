/// <reference types="./" />

Cypress.Commands.add(`startsApp`, () => {
  cy.visit(`/`);
});

Cypress.Commands.add(`withMocks`, () => {
  cy.intercept(`GET`, `/api/admin`, { statusCode: 401 });
  cy.intercept(`GET`, `/api/auth/me`, { fixture: `auth-sample.json` });
  cy.intercept(`GET`, `/api/graph/123/neighbors`, { data: [] });
});

Cypress.Commands.add(`selectUserPanel`, (someClassName: string) => {
  return cy
    .get(`.some-container .user-panel`)
    .should(`have.class`, someClassName);
});
