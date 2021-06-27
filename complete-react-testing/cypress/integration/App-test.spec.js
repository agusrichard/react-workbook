/* eslint-disable */

describe('End to end test', () => {
  it('e2e test', () => {
    cy.visit('/')

    // Test for top part
    cy.contains('Home').click()
    cy.contains('Title')
    cy.contains('Description')

    // Test for click event
    cy.contains('Click').click()
    cy.contains('Sherlock Holmes and John Watson')

    // Test for form
    cy.get('#form-username').type('My Username')
    cy.get('#form-password').type('My Password')
    cy.get('#form-age').type('21')
    cy.get('#form-submit').click()
    cy.contains('My Username')
    cy.contains('My Password')
    cy.contains('21')
  })
})