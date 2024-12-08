describe('Agendamento', () => {
    it('Deve fazer um novo agendamento', () => {

        const user = {
            nome: 'Adriano Agendamento',
            email: 'adrianoagendamento@gmail.com'
        }

        cy.startPreRegistration(user)
        cy.verifyPreRegistered(user)

        cy.contains('a[href="/agendamento"]', 'Agendar um horário').click()
        cy.contains('span', 'Membros da Equipe')
            .should('be.visible')

        cy.contains('div', 'Tina')
            .parent()
            .click()

    })
})