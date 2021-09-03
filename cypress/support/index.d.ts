/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    startsApp(): void;
    withMocks(): void;
    selectUserPanel(someClassName: string): Chainable<Element>;
  }
}
