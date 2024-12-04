import preRegiPage from "../support/pages/pre-regi.page"

describe('login spec', () => {
  it('Deve realizar o pre-cadastro do cliente com sucesso', () => {

    preRegiPage.go()
    preRegiPage.fillForm('Adriano QA', 'adrianoqa@gmail.com')
    preRegiPage.submit()
    preRegiPage.verifyPreReg('Adriano', 'adrianoqa@gmail.com')
  })

  it('Campos obrigatórios', () => {
    preRegiPage.go()
    //preRegiPage.fillForm('Adriano QA', 'adrianoqa@gmail.com')
    preRegiPage.submit()
    preRegiPage.alertHave('Nome Completo', 'O campo nome é obrigatório.')
    preRegiPage.alertHave('E-mail', 'O campo e-mail é obrigatório.')
  })


  it('Não deve realizar o pre-cadastro apenas informando o primeiro nome', () => {
    preRegiPage.go()
    preRegiPage.fillForm('Adriano', 'adrianoqa@gmail.com')
    preRegiPage.submit()
    preRegiPage.alertHave('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve realizar o pre-cadastro apenas informando email invalido', () => {
    preRegiPage.go()
    preRegiPage.fillForm('Adriano QA', 'adrianoqa.com.br')
    preRegiPage.submit()
    preRegiPage.alertHave('E-mail', 'O e-mail inserido é inválido.')
  })
})