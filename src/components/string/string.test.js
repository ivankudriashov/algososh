import { reverseStringAlgo } from "../util/functions";

describe("Тест алгоритма разворота строки", () => {
    it("Разворот строки с чётным количеством символов", async () => {
        const alg = await reverseStringAlgo(['1', '2'], ()=>{})
        expect(alg).toEqual(['2', '1']);
    })
    
    it("Разворот строки с  нечётным количеством символов", async () => {
        const alg = await reverseStringAlgo(['1', '2', '3'], ()=>{})
        expect(alg).toEqual(['3', '2', '1']);
    })
    
    it("Разворот строки с одним символом", async () => {
        const alg = await reverseStringAlgo(['3'], ()=>{})
        expect(alg).toEqual(['3']);
    })
    
    it("Разворот пустой строки", async () => {
        const alg = await reverseStringAlgo([''], ()=>{})
        expect(alg).toEqual(['']);
    })
})
