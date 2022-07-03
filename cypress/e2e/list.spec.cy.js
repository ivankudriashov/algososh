describe('Страница Связный список', () => {
    before(function() {
        cy.visit('http://localhost:3000/list');
    });

    it('Если инпут пустой, то кнопка недоступна', function() {
        cy.get('input[placeholder="Введите значение"]').should('value', '')
        cy.get('input[placeholder="Введите индекс"]').should('value', '')
        cy.contains('Добавить в head').should('be.disabled')
        cy.contains('Добавить в tail').should('be.disabled')
        cy.contains('Добавить по индексу').should('be.disabled')
        cy.contains('Удалить по индексу').should('be.disabled')
    });

    it('Список отображается корректно', function() {
        cy.get('[class*=circle_content__]')
        .should('have.length', 3)
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains('head')
                cy.wrap(elem).find('[class*=circle_default]')
            }
            if(index === 1) {
                cy.wrap(elem).find('[class*=circle_default]')
            }

            if(index === 2) {
                cy.wrap(elem).contains('tail')
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })
    })

    it('Элемент отображается корректно при добавлении в head', function() {
        const value = '90'

        cy.get('input[placeholder="Введите значение"]').type(value).should('have.value', value)
        cy.contains('Добавить в head').click()

        cy.get('[class*=list_circles__]')
        .should('have.length', 3)

        cy.get('[class*=circle_content__]')
        .should('have.length', 4)
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains(value)
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })
        
        cy.wait(1000)

        cy.get('[class*=circle_content__]')
        .should('have.length', 4).each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains(value)
                cy.wrap(elem).contains('head')
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })
    })

    it('Элемент отображается корректно при добавлении в tail', function() {
        const value = '50'

        cy.get('input[placeholder="Введите значение"]').type(value).should('have.value', value)
        cy.contains('Добавить в tail').click()

        cy.get('[class*=list_circles__]')
        .should('have.length', 4)

        cy.get('[class*=circle_content__]')
        .should('have.length', 5)
        .each((elem, index) => {
            if(index === 3) {
                cy.wrap(elem).contains(value)
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.wait(1000)

        cy.get('[class*=circle_content__]')
        .should('have.length', 5).each((elem, index) => {
            if(index === 5) {
                cy.wrap(elem).contains(value)
                cy.wrap(elem).contains('tail')
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })
    })

    it('Элемент отображается корректно при добавлении по индексу', function() {

        const value = '44';
        const valueIndex = 2;

        cy.get('input[placeholder="Введите значение"]').type(value).should('have.value', value)
        cy.get('input[placeholder="Введите индекс"]').type(valueIndex).should('have.value', valueIndex)
        cy.contains('Добавить по индексу').click()
        
        cy.wait(2000)

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === valueIndex) {
                cy.wrap(elem).contains(value)
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.wait(2000)

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            console.log(elem)
            if(index === valueIndex) {
                cy.wrap(elem).contains(value)
                cy.wrap(elem).find('[class*=circle_default]')
            }
        })
    });

    it('Элемент удаляется корректно из head', function() {
        cy.contains('Удалить из head').click()

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains('head')
            }

            if(index === 1) {
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.get('[class*=circle_content__]')
        .should('have.length', 5)
        .each((elem, index) => {
            if(index === 0) {
                cy.wrap(elem).contains('head')
            }

            cy.wrap(elem).find('[class*=circle_default]')

        })
    })

    it('Элемент удаляется корректно из tail', function() {
        cy.contains('Удалить из tail').click()

        cy.get('[class*=circle_content__]')
        .each((elem, index) => {
            if(index === 4) {
                cy.wrap(elem).contains('tail')
            }

            if(index === 5) {
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.get('[class*=circle_content__]')
        .should('have.length', 4)
        .each((elem, index) => {
            if(index === 3) {
                cy.wrap(elem).contains('tail')
            }

            cy.wrap(elem).find('[class*=circle_default]')
        })
    })

    it('Элемент корректно удаляется по индексу', function() {
        const valueIndex = 2;

        cy.get('input[placeholder="Введите индекс"]').type(valueIndex).should('have.value', valueIndex)
        cy.contains('Удалить по индексу').click()

        cy.get('[class*=circle_content__]')
        .should('have.length', 5)
        .each((elem, index) => {
            if(index === valueIndex + 1) {
                cy.wrap(elem).find('[class*=circle_changing]')
            }
        })

        cy.wait(2000)

        cy.get('[class*=circle_content__]')
        .should('have.length', 3)
        .each((elem, index) => {
            cy.wrap(elem).find('[class*=circle_default]')

        })
    });
})