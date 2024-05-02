describe("trainer and energy cards work", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
    cy.viewport(1920, 1080);
    cy.get("#start").click();
    cy.get("#hand1").find(".pokeCard").last().click();
    cy.get("#makeactive1").click();
    cy.get("#nextTurn").click();
    cy.get("#nextTurn").click();
    cy.get("#active1").find(".pokeCard").click();
    console.log(cy.get(".attackButtons").first());
    cy.get(".attackButtons").children().first().click();
  });

  it("uses potions", () => {
    cy.get("#healthactive01").invoke("text").should("equal", "40");
    cy.get("#healthactive02").invoke("text").should("equal", "30");
    cy.get("#potion1").click();
    cy.get("#use1").click();
    cy.get("#healthactive01").invoke("text").should("equal", "50");
  });

  it("attaches energy", () => {
    cy.get("#fireenergy1").click()
    cy.get("#attach1").click()
    cy.get("#active1.energies").should('not.be.empty')
  })
});
