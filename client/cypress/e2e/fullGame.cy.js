describe('player active knockout works', () => {
    beforeEach(() => {
      cy.visit('localhost:3001/')
      cy.viewport(1920, 1080)
    })

      it('displays knockouts', () => {
        cy.get('#start').click()
        cy.get('#hand1').find('.pokeCard').last().click()
        cy.get('#makeactive1').click()

        for (let i = 0; i < 4; i++) {
            cy.get('#nextTurn').click()
            cy.get('#nextTurn').click()
            cy.get('#active1').find('.pokeCard').click()
            cy.get('.attackButtons').children().first().click()
        }

        cy.get('#nextTurn').click()
        cy.get('#nextTurn').click()


        cy.get('#bulbasaur1').click()
        cy.get('#makeactive1').click()

        cy.get('#active1').find('.pokeCard').click()
        cy.get('.attackButtons').children().first().click()

        for (let i = 0; i < 4; i++) {
            cy.get('#nextTurn').click()
            cy.get('#nextTurn').click()
            cy.get('#active1').find('.pokeCard').click()
            cy.get('.attackButtons').children().first().click()
        }


        cy.get('#knockouts1').invoke('text').should('equal', 'Knockouts:🟩 ⬛ ⬛')
      })
    })