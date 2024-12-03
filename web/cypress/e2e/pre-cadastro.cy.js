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

  it('Campos obrigatórios', () => {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
      .click()

    cy.get('form h2')
      .should('be.visible')
      .and('have.text', 'Seus dados')

    cy.contains('button[type="submit"]', 'Continuar').click()

    //ex de como seria usando o XPath
    //label[text()="Nome Completo"]/..//div[contains(@class, "alert-msg")]

    cy.contains('label', 'Nome Completo')
      .parent()
      .find('.alert-msg')
      .should('be.visible')
      .and('have.text', 'O campo nome é obrigatório.')

    cy.contains('label', 'E-mail')
      .parent()
      .find('.alert-msg')
      .should('be.visible')
      .and('have.text', 'O campo e-mail é obrigatório.')
  })


  it('Não deve realizar o pre-cadastro apenas informando o primeiro nome', () => {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
      .click()

    cy.get('form h2')
      .should('be.visible')
      .and('have.text', 'Seus dados')

    cy.get('#nome').type('Adriano')
    cy.get('input[name="email"]').type('adrianoqa@gmail.com')

    cy.contains('button[type="submit"]', 'Continuar').click()

    cy.contains('label', 'Nome Completo')
      .parent()
      .find('.alert-msg')
      .should('be.visible')
      .and('have.text', 'Informe seu nome completo.')
  })

  it('Não deve realizar o pre-cadastro apenas informando email invalido', () => {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
      .click()

    cy.get('form h2')
      .should('be.visible')
      .and('have.text', 'Seus dados')

    cy.get('#nome').type('Adriano QA')
    cy.get('input[name="email"]').type('adrianoqa.com.br')

    cy.contains('button[type="submit"]', 'Continuar').click()

    cy.contains('label', 'E-mail')
      .parent()
      .find('.alert-msg')
      .should('be.visible')
      .and('have.text', 'O e-mail inserido é inválido.')
  })
})