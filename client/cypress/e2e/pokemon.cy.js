describe('pokemon app displays right', () => {
  beforeEach(() => {
    cy.visit('localhost:3001/')
    cy.viewport(1920, 1080)
  })

    it('displays components', () => {
      cy.get('#bench1').should('exist')
      cy.get('#bench2').should('exist')
      cy.get('#hand1').should('exist')
      cy.get('#hand2').should('exist')
      cy.get('#active1').should('exist')
      cy.get('#active2').should('exist')
      cy.get('#discard1').should('exist')
      cy.get('#discard2').should('exist')
      cy.get('#deck1').should('exist')
      cy.get('#deck2').should('exist')
      cy.get('#knockouts1').should('exist')
      cy.get('#knockouts2').should('exist')
    })

    it('starts game', () => {
      cy.get('#start').click()
      cy.get('#hand1').find('.pokeCard').should('have.length', 7)
      cy.get('#hand2').find('.pokeCard').should('have.length', 7)
    })

    it('sets active pokemon', () => {
      cy.get('#start').click()
      cy.get('#hand1').find('.pokeCard').first().click()
      cy.get('#makeactive1').click()
    })

    it('sets bench pokemon', () => {
      cy.get('#start').click()
      cy.get('#hand1').find('.pokeCard').first().click()
      cy.get('#placeonbench1').click()
    })
  })