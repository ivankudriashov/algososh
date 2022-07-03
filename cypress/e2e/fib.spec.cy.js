describe('Страница Строка', () => {
    before(function() {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('Если инпут пустой, то кнопка недоступна', function() {
        cy.get('input').should('value', '')
        cy.contains('Развернуть').should('be.disabled')
    });

    it('Строка разворачивается корректно', function() {
        cy.get('input').type('4').should('have.value', '4')
        cy.contains('Развернуть').click()
        
        cy.get('[class*=circle_content__]')
        .should('have.length', 4)
        .each((elem, index) => {
            if(index === 0 || index === 1) {
                cy.wrap(elem).contains(1)
            } else {
                cy.wrap(elem).contains(index)
            }
        })
    });
})