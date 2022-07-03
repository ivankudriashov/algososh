describe('Страница Очередь', () => {
    before(function() {
        cy.visit('http://localhost:3000/queue');
    });

    it('Если инпут пустой, то кнопка недоступна', function() {
        cy.get('input').should('value', '')
        cy.contains('Добавить').should('be.disabled')
    });

    it('Элемент добавляется корректно', function() {

        const firstValue = '4';
        cy.get('input').type(firstValue).should('have.value', firstValue)
        cy.contains('Добавить').click()
        
        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains(firstValue)
                cy.wrap(elem).contains('head')
                cy.wrap(elem).contains('tail')
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.get('input').should('value', '')
        cy.contains('Добавить').should('be.disabled')

        const secondValue = 5;
        cy.get('input').type(secondValue).should('have.value', secondValue)
        cy.contains('Добавить').click()
        

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains(firstValue)
                cy.wrap(elem).contains('head')
                cy.wrap(elem).find('[class*=circle_default]')
            }
            if(index === 1) {
                cy.wrap(elem).contains(secondValue)
                cy.wrap(elem).contains('tail')
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })
    });

    it('Элемент удаляется корректно', function() {

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains('head')
                cy.wrap(elem).find('[class*=circle_default]')
            }
            if(index === 1) {
                cy.wrap(elem).contains('tail')
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })

        cy.get('[class*=queue_list__]').then((el) => {
            console.log(el)
        })


        cy.contains('Удалить').click()

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === 1) {
                cy.wrap(elem).find('[class*=circle_default]')
                cy.wrap(elem).contains('head')
                cy.wrap(elem).contains('tail')
            }
        })

        cy.contains('Удалить').click()

        cy.get('[class*=queue_list__]').then((el) => {
            console.log(el)
        })

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            cy.wrap(elem).get('[class*=circle_circle__]').should('have.text', '')
            cy.wrap(elem).get('[class*=circle_head__]').should('have.text', '')
            cy.wrap(elem).get('[class*=circle_tail60__]').should('have.text', '')
        })
    });
})