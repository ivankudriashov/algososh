import { bubbleSortAlg, selectionSortAlg } from "../util/functions";

describe("Тест алгоритма пузырьковой сортировки массива", () => {
    it("Сортировка пустого массива с модификатором по возрастанию", async () => {
        const alg = await bubbleSortAlg([], 'up', ()=>{}, ()=>{})
        expect(alg).toEqual([]);
    })
    
    it("Сортировка массива из одного элемента с модификатором по возрастанию", async () => {
        const alg = await bubbleSortAlg([{symbol: 3}], 'up', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 3}]);
    })
    
    it("Сортировка массива из нескольких элементов с модификатором по возрастанию", async () => {
        const alg = await bubbleSortAlg([{symbol: 3}, {symbol: 1}, {symbol: 2}], 'up', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 1}, {symbol: 2}, {symbol: 3}]);
    })

    it("Сортировка пустого массива с модификатором по убыванию", async () => {
        const alg = await bubbleSortAlg([], 'down', ()=>{}, ()=>{})
        expect(alg).toEqual([]);
    })
    
    it("Сортировка массива из одного элемента с модификатором по убыванию", async () => {
        const alg = await bubbleSortAlg([{symbol: 3}], 'down', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 3}]);
    })
    
    it("Сортировка массива из нескольких элементов с модификатором по убыванию", async () => {
        const alg = await bubbleSortAlg([{symbol: 3}, {symbol: 1}, {symbol: 2}], 'down', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 3}, {symbol: 2}, {symbol: 1}]);
    })
})

describe("Тест алгоритма сортировки массива выбором", () => {
    it("Сортировка пустого массива с модификатором по возрастанию", async () => {
        const alg = await selectionSortAlg([], 'up', ()=>{}, ()=>{})
        expect(alg).toEqual([]);
    })
    
    it("Сортировка массива из одного элемента с модификатором по возрастанию", async () => {
        const alg = await selectionSortAlg([{symbol: 3}], 'up', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 3}]);
    })
    
    it("Сортировка массива из нескольких элементов с модификатором по возрастанию", async () => {
        const alg = await selectionSortAlg([{symbol: 3}, {symbol: 1}, {symbol: 2}], 'up', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 1}, {symbol: 2}, {symbol: 3}]);
    })

    it("Сортировка пустого массива с модификатором по убыванию", async () => {
        const alg = await selectionSortAlg([], 'down', ()=>{}, ()=>{})
        expect(alg).toEqual([]);
    })
    
    it("Сортировка массива из одного элемента с модификатором по убыванию", async () => {
        const alg = await selectionSortAlg([{symbol: 3}], 'down', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 3}]);
    })
    
    it("Сортировка массива из нескольких элементов с модификатором по убыванию", async () => {
        const alg = await selectionSortAlg([{symbol: 3}, {symbol: 1}, {symbol: 2}], 'down', ()=>{}, ()=>{})
        expect(alg).toEqual([{symbol: 3}, {symbol: 2}, {symbol: 1}]);
    })
})