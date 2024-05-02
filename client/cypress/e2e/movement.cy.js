describe('cards move corectly', () => {
    beforeEach(() => {
      cy.visit('localhost:3001/')
      cy.viewport(1920, 1080)
    })
  
      it('sets active pokemon', () => {
        cy.get('#start').click()
        cy.get('#hand1').find('.pokeCard').last().click()
        cy.get('#makeactive1').click()
        cy.get('#healthactive01').invoke('text').should('equal', '50')
      })
  
      it('sets bench pokemon', () => {
        cy.get('#start').click()
        cy.get('#hand1').find('.pokeCard').first().click()
        cy.get('#placeonbench1').click()
      })
  
      it('sets active from bench', () => {
        cy.get('#start').click()
        cy.get('#hand1').find('.pokeCard').first().click()
        cy.get('#placeonbench1').click()
        cy.get('#bench1').find('.pokeCard').first().click()
        cy.get('#makeactive1').click()
        cy.get('#healthactive01').invoke('text').should('equal', '40')
      })
  
      it('moves active to bench', () => {
        cy.get('#start').click()
        cy.get('#hand1').find('.pokeCard').first().click()
        cy.get('#makeactive1').click()
        cy.get('#active1').find('.pokeCard').click()
        cy.get('#retreattobench1').click()
        cy.get('#bench1').find('.pokeCard').should('have.length', 1)
      })
  
  
      it('switches in active from bench', () => {
        cy.get('#start').click()
        cy.get('#hand1').find('.pokeCard').first().click()
        cy.get('#placeonbench1').click()
        cy.get('#hand1').find('.pokeCard').first().click()
        cy.get('#makeactive1').click()
        cy.get('#bench1').find('.pokeCard').should('have.length', 1)
      })
    })