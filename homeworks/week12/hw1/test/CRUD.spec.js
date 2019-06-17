const superadmin = 'ssss';
const admin = 'zzzz';
const normal = 'pkpk';

function login(account) {
  cy.visit('http://localhost:8080/group1/ishin4554/w12/login.php');
  cy.get('input[name="username"]')
    .type(account);
  cy.get('input[name="password"]')
    .type(account);
  cy.get('button[type="submit"]')
    .click();
}
function crud() {
  cy.get('.input__text')
    .type('cypresstest');
  cy.get('.input__submit')
    .click();
  cy.get('.dash__edit').first()
    .click();
  cy.get('.input__text')
    .type('cypressedittest');
  cy.get('.input__submit')
    .click();
  cy.get('.dash__delete').first()
    .click();
  cy.get('.nav__logout')
    .click();
}
context('Handle User', () => {
  it('normal', () => {
    cy.visit('http://localhost:8080/group1/ishin4554/w12/login.php');
    login(normal);
    crud();
  });
  it('admin', () => {
    login(admin);
    crud();
  });
  it('super admin', () => {
    login(superadmin);
    crud();
  });
});
