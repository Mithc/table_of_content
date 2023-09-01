describe('Tree Component', () => {
    beforeEach(() => {
        cy.visit('/') // Replace with the actual URL of your app
    })

    it('expands and collapses nodes', () => {
        // Click on the expand/collapse buttons
        cy.get('.expand-button').first().click() // Adjust the selector

        // Check if the children are visible
        cy.get('.child-node').should('be.visible') // Adjust the selector

        // Click again to collapse
        cy.get('.expand-button').first().click() // Adjust the selector

        // Check if the children are hidden
        cy.get('.child-node').should('not.be.visible') // Adjust the selector
    })

    // Add more tests as needed
})
