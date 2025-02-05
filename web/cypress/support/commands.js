// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './actions/agendamento.action'
import './actions/precadastro.action'

Cypress.Commands.add('agendamentoApi', (agendamentos) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('baseApi')}/api/agendamentos`,
        headers: {
            'Content-type': 'application/json',
            'authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
        },
        body: {
            nomeCliente: agendamentos.usuario.nome,
            emailCliente: agendamentos.usuario.email,
            data: agendamentos.data,
            hora: agendamentos.hora,
            matricula: agendamentos.profissional.matricula,
            codigoServico: agendamentos.servico.codigo
        }
    }).then((response) => {
        expect(response.status).to.eq(201)
    })
})




