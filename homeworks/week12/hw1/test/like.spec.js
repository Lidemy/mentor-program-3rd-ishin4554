/// <reference types="Cypress" />
let superadmin = 'ssss';
let admin = 'zzzz';
let normal = 'pkpk';

function login(account){
  cy.visit('http://localhost:8080/group1/ishin4554/w12/login.php')
  cy.get('input[name="username"]')
  .type(account)
  cy.get('input[name="password"]')
  .type(account)
  cy.get('button[type="submit"]')
  .click()
}
function like() {
  cy.get('.dash__like').first()
  .click()
  cy.get('.nav__logout')
  .click()
}
context('Handle User', () => {
  it('normal', () => {
    cy.visit('http://localhost:8080/group1/ishin4554/w12/login.php')
    login(normal);
    like()
  })
  it('admin', () => {
    login(admin);
    like()
  })
  it('super admin', () => {
    login(superadmin);
    like()
  })
})
