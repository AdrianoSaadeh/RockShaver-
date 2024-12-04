describe('login spec', () => {
  it('Deve realizar o pre-cadastro do cliente com sucesso', () => {
    cy.startPreRegistration('Adriano QA', 'adrianoqa@gmail.com')
    cy.verifyPreRegistered('Adriano', 'adrianoqa@gmail.com')
  })

  it('Campos obrigatórios', () => {
    cy.startPreRegistration()
    cy.alertHave('Nome Completo', 'O campo nome é obrigatório.')
    cy.alertHave('E-mail', 'O campo e-mail é obrigatório.')
  })


  it('Não deve realizar o pre-cadastro apenas informando o primeiro nome', () => {
    cy.startPreRegistration('Adriano', 'adrianoqa@gmail.com')
    cy.alertHave('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve realizar o pre-cadastro apenas informando email invalido', () => {
    cy.startPreRegistration('Adriano QA', 'adrianoqa.com.br')
    cy.alertHave('E-mail', 'O e-mail inserido é inválido.')
  })
})