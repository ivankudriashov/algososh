export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    delete: () => void;
    peak: () => T | null;
} 

export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
}  

export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    insertAt: (element: T, position: number) => void;
    getSize: () => number;
    print: () => void;
    getArray: () => void;
    shift: () => void;
    pop: () => void;
    deleteAt: (position: number) => void;
}