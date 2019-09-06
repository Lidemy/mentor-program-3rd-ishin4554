describe('My First Test', function() {
  it('Gets, types and asserts', function() {
    cy.visit('index.html')

    cy.get('.btn').click();
    cy.get('p').contains('change!');
  })
})