/// <reference types="Cypress" />
function generator(){
  const str = '1234567890';
  let key = '';
  for (let i = 0; i < 4; i ++) {
    key += str[Math.floor(Math.random()*10)];
  }
  return key;
}
function login(account){
  it('login', () => {
    cy.visit('http://localhost:8080/group1/ishin4554/w12/login.php')
    cy.get('input[name="username"]')
    .type(account)
    cy.get('input[name="password"]')
    .type(account)
    cy.get('button[type="submit"]')
    .click()
  })
}
context('Handle User', () => {
  const account = generator();
  it('register', () => {
    cy.visit('http://localhost:8080/group1/ishin4554/w12/register.php')
    cy.get('input[name="nickname"]')
    .type(account)
    cy.get('input[name="username"]')
    .type(account)
    cy.get('input[name="password"]')
    .type(account)
    cy.get('button[type="submit"]')
    .click()
  })
  login(account);
  it('logout', ()=>{
    cy.wait(3000)
    cy.get('.nav__logout')
    .click()
  })
  login(account);
})
