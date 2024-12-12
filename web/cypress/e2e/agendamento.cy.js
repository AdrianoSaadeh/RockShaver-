import calendario from '../fixtures/calendario.json'

describe('Agendamento', () => {

    beforeEach(function () {
        cy.fixture('agendamentos').then((agendamentos) => {
            this.agendamentos = agendamentos
        })
    })

    it('Deve fazer um novo agendamento', function () {

        cy.dropCollection('agendamentos', { failSilently: 'true' })
            .then(result => {
                cy.log(result);
            });

        cy.intercept('GET', 'http://localhost:3333/api/calendario', {
            statusCode: 200,
            body: calendario
        }).as('getCalendario')

        cy.startPreRegistration(this.agendamentos.sucesso.usuario)
        cy.verifyPreRegistered(this.agendamentos.sucesso.usuario)

        cy.contains('a[href="/agendamento"]', 'Agendar um horário').click()
        cy.contains('span', 'Membros da Equipe')
            .should('be.visible')

        cy.contains('div', 'Tina')
            .parent()
            .click()

        cy.contains('span', 'Serviços')
            .should('be.visible')

        cy.contains('div', this.agendamentos.sucesso.servico.descricao)
            .parent()
            .click()

        cy.contains('span', 'Dias Disponíveis')
            .should('be.visible')
        cy.contains('span', 'Horários Disponíveis')
            .should('be.visible')

        cy.contains('.dia-semana', this.agendamentos.sucesso.dia).click()
        cy.contains('.hora-opcao', this.agendamentos.sucesso.hora).click()
        cy.contains('button', 'Confirmar e reservar').click()

        cy.get('h3')
            .should('be.visible')
            .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
    })
})