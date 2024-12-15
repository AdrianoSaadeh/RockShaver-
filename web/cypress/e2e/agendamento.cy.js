import calendario from '../fixtures/calendario.json';

describe('Agendamento', () => {

    beforeEach(function () {
        cy.fixture('agendamentos').then((agendamentos) => {
            this.agendamentos = agendamentos;
        });
    });

    it('Deve fazer um novo agendamento', function () {

        cy.dropCollection('agendamentos', { failSilently: 'true' })
            .then(result => {
                cy.log(result);
            });

        cy.intercept('GET', 'http://localhost:3333/api/calendario', {
            statusCode: 200,
            body: calendario
        }).as('getCalendario');

        cy.startPreRegistration(this.agendamentos.sucesso.usuario);
        cy.verifyPreRegistered(this.agendamentos.sucesso.usuario);

        cy.iniciarAgendamento();
        cy.escolherProfissional(this.agendamentos.sucesso.profissional.nome);
        cy.selecionarServico(this.agendamentos.sucesso.servico.descricao);
        cy.escolherDia(this.agendamentos.sucesso.dia);
        cy.escolherHorario(this.agendamentos.sucesso.hora);
        cy.finalizarAgendamento();
        cy.get('h3')
            .should('be.visible')
            .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
    })


    it.only('Deve mostrar o slot ocupado', function () {

        const agendamentos = this.agendamentos.duplicado

        cy.dropCollection('agendamentos', { failSilently: 'true' })
            .then(result => {
                cy.log(result);
            });

        cy.agendamentoApi(agendamentos)

        cy.intercept('GET', 'http://localhost:3333/api/calendario', {
            statusCode: 200,
            body: calendario
        }).as('getCalendario');

        cy.startPreRegistration(agendamentos.usuario);
        cy.verifyPreRegistered(agendamentos.usuario);

        cy.iniciarAgendamento();
        cy.escolherProfissional(agendamentos.profissional.nome);
        cy.selecionarServico(agendamentos.servico.descricao);
        cy.escolherDia(agendamentos.dia);

        cy.get(`[slot="${agendamentos.hora} - ocupado"]`)
            .should('be.visible')
            .find('svg')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
    })
})

