class PreRegPage {

    go() {
        cy.visit('/')
        cy.get('header nav a[href="pre-cadastro"]')
            .click()
        cy.get('form h2')
            .should('be.visible')
            .and('have.text', 'Seus dados')
    }

    fillForm(fullname, email) {
        cy.get('input[name="fullname"]').type(fullname)
        cy.get('input[name="email"]').type(email)
    }

    submit() {
        cy.contains('button[type="submit"]', 'Continuar').click()
    }

    verifyPreReg(firstName, email) {
        cy.get('.user-name')
            .should('be.visible')
            .and('have.text', 'Olá, ' + firstName)

        cy.get('.user-email')
            .should('be.visible')
            .and('have.text', email)
    }

    //ex de como seria usando o XPath
    //label[text()="Nome Completo"]/..//div[contains(@class, "alert-msg")]
    alertHave(fieldname, text) {
        cy.contains('label', fieldname)
            .parent()
            .find('.alert-msg')
            .should('be.visible')
            .and('have.text', text)
    }

}

export default new PreRegPage()