describe('My First Test', () => {
  it('Render Home Page', () => {
    cy.startsApp();
    cy.contains(`It works!`);
  });
});
