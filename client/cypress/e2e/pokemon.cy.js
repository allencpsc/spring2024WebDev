describe('pokemon app displays right', () => {
  beforeEach(() => {
    cy.visit('localhost:3001/')
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
  })