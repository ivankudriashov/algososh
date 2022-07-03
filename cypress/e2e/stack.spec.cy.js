describe('Страница Стек', () => {
    before(function() {
        cy.visit('http://localhost:3000/stack');
    });

    it('Если инпут пустой, то кнопка недоступна', function() {
        cy.get('input').should('value', '')
        cy.contains('Добавить').should('be.disabled')
    });

    it('Элемент добавляется корректно', function() {

        const firstValue = '4';
        cy.get('input').type(firstValue).should('have.value', firstValue)
        cy.contains('Добавить').click()

        // cy.wait(500)
        
        cy.get('[class*=circle_content__]')
        .should('have.length', 1)
        .each((elem, index) => {
            cy.wrap(elem).contains(firstValue)
            cy.wrap(elem).find('[class*=circle_changing]')
        })

        cy.get('input').should('value', '')
        cy.contains('Добавить').should('be.disabled')

        

        const secondValue = 5;
        cy.get('input').type(secondValue).should('have.value', secondValue)
        cy.contains('Добавить').click()
        

        cy.get('[class*=circle_content__]')
        .should('have.length', 2)
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains(firstValue)
                cy.wrap(elem).find('[class*=circle_default]')
            }
            if(index === 1) {
                cy.wrap(elem).contains(secondValue)
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })
    });

    it('Элемент удаляется корректно', function() {

        cy.get('[class*=circle_content__]')
        .should('have.length', 2)
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).find('[class*=circle_default]')
            }
            if(index === 1) {
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.contains('Удалить').click()

        cy.get('[class*=circle_content__]')
        .should('have.length', 1)
        .each((elem, index) => {
            cy.wrap(elem).find('[class*=circle_default]')
        })

        cy.contains('Удалить').click()

        cy.get('[class*=circle_content__]')
        .should('have.length', 0)
    });
})