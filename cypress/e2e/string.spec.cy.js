describe('Страница Строка', () => {
    before(function() {
        cy.visit('http://localhost:3000/recursion');
    });

    it('Если инпут пустой, то кнопка недоступна', function() {
        cy.get('input').should('value', '')
        cy.contains('Развернуть').should('be.disabled')
    });

    it('Строка разворачивается корректно', function() {
        cy.get('input').type('123').should('have.value', '123')
        cy.contains('Развернуть').click()
        cy.get('[class*=circle_content__]')
        .should('have.length', 3)
        .each((elem, index) => {
            cy.wrap(elem).contains(index + 1)
            if(index === 0 || index === 2) {
                cy.wrap(elem).find('[class*=circle_changing]')
            } else if(index === 1)  {
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })
        
        cy.get('[class*=circle_content__]')
        .should('have.length', 3)
        .each((elem, index) => {
            cy.wrap(elem).contains(3 - index)
            if(index === 0 || index === 2) {
                cy.wrap(elem).find('[class*=circle_modified]')
            } else if(index === 1)  {
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })
    });
})