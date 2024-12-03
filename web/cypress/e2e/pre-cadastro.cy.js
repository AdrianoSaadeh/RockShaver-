describe('login spec', () => {
  it('Deve realizar o pre-cadastro do cliente com sucesso', () => {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
      .click()

    cy.get('form h2')
      .should('be.visible')
      .and('have.text', 'Seus dados')

    cy.get('#nome').type('Adriano QA')
    cy.get('input[name="email"]').type('adrianoqa@gmail.com')

    cy.contains('button[type="submit"]', 'Continuar').click()

    cy.get('.user-name')
      .should('be.visible')
      .and('have.text', 'Olá, Adriano')

    cy.get('.user-email')
      .should('be.visible')
      .and('have.text', 'adrianoqa@gmail.com')

  })
})