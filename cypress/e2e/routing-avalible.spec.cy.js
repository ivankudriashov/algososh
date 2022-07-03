describe('Роутинг доступен', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    })

    it('Страница должна открываться по умолчанию', function() {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Сервис доступен по адресу localhost:3000/recursion', function() {
        cy.get('[href="/recursion"]').click()
        cy.contains('Строка');
    });

    it('Сервис доступен по адресу localhost:3000/fibonacci', function() {
        cy.get('[href="/fibonacci"]').click()
        cy.contains('Последовательность Фибоначчи');
    });

    it('Сервис доступен по адресу localhost:3000/sorting', function() {
        cy.get('[href="/sorting"]').click()
        cy.contains('Сортировка массива');
    });

    it('Сервис доступен по адресу localhost:3000/stack', function() {
        cy.get('[href="/stack"]').click()
        cy.contains('Стек');
    });

    it('Сервис доступен по адресу localhost:3000/queue', function() {
        cy.get('[href="/queue"]').click()
        cy.contains('Очередь');
    });

    it('Сервис доступен по адресу localhost:3000/list', function() {
        cy.get('[href="/list"]').click()
        cy.contains('Связный список');
    });
}); 