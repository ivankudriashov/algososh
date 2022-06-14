import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./list.module.css"

class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
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

class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else if(this.head) {
        let curr = this.head;
        let currIndex = 0;

        while(currIndex + 1 < index && curr.next) {
          curr = curr.next;
          currIndex++;
        }
        
        let trap = curr.next;

        curr.next = node
        node.next = trap
        this.tail = curr.next
      }
      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        let current = this.head;
        if(current !== null){
          this.head = current.next
        }
      } else if(index === this.size - 1) {
        if (this.head === null) {
          throw new Error("stack is empty");
        }
    
        let current = this.head;
        let prev = null;
    
          while (current.next) {
            prev = current
            current = current.next;
          }
    
          if(prev) {
            prev.next = null
            this.tail = prev
          }
      } else if(this.head) {
        let curr = this.head;
        let currIndex = 0;

        while(currIndex + 1 < index && curr.next) {
          curr = curr.next;
          currIndex++;
        }
        console.log(curr)
        let trap = curr.next;
        if(trap) {
          curr.next = trap.next
        }
      }
      this.size--;
    }
  }

  prepend(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      current = this.head;
    
      this.head = new Node(element);
      
      this.head.next = current
    }
    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
      this.tail = current.next;
    }
    this.size++;
  }

  shift() {
    let current = this.head;
    if(current !== null){
      this.head = current.next

      this.size--;
    }
  }

  pop() {
    if (this.head === null) {
      throw new Error("stack is empty");
    }

    let current = this.head;
    let prev = null;

      while (current.next) {
        prev = current
        current = current.next;
      }

      if(prev) {
        prev.next = null
        this.tail = prev
        this.size--;
      }
  };

  getSize() {
    return this.size;
  }

  getArray() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

}

export const ListPage: React.FC = () => {

  const [inputSymbolValue, setInputSymbolValue] = useState<string>('');
  const [inputIndexValue, setIndexSymbolValue] = useState<string>('');

  const [list] = useState<LinkedList<any>>(new LinkedList());
  const [listItems, setListItems] = useState<Array<{ symbol: string | number; state: ElementStates; }>>([]);

  const [isNeedSmallCircleTop, setIsNeedSmallCircleTop] = useState<boolean>(false);
  const [isNeedSmallCircleBottom, setIsNeedSmallCircleBottom] = useState<boolean>(false);
  const [indexToRenderSmallCirclesTop, setIndexToRenderSmallCirclesTop] = useState<number>(0);
  const [indexToRenderSmallCirclesBottom, setIndexToRenderSmallCirclesBottom] = useState<number>(0);

  const [symbolFolSmallCircle, setSymbolFolSmallCircle] = useState<any>();

  const [isInputValueDisabled, setIsInputValueDisabled] = useState<boolean>(false);
  const [isInputIndexDisabled, setIsInputIndexDisabled] = useState<boolean>(false);

  const [isAddHeadButtonDisabled, setIsAddHeadButtonDisabled] = useState<boolean>(true);
  const [addHeadButtonLoader, setAddHeadButtonLoader] = useState<boolean>(false);
  const [isAddTailButtonDisabled, setIsAddTailButtonDisabled] = useState<boolean>(true);
  const [addTailButtonLoader, setAddTailButtonLoader] = useState<boolean>(false);

  const [isDeleteHeadButtonDisabled, setIsDeleteHeadButtonDisabled] = useState<boolean>(false);
  const [deleteHeadButtonLoader, setDeleteHeadButtonLoader] = useState<boolean>(false);
  const [isDeleteTailButtonDisabled, setIsDeleteTailButtonDisabled] = useState<boolean>(false);
  const [deleteTailButtonLoader, setDeleteTailButtonLoader] = useState<boolean>(false);

  const [isAddByIndexButtonDisabled, setIsAddByIndexButtonDisabled] = useState<boolean>(true);
  const [addByIndexButtonLoader, setAddByIndexButtonLoader] = useState<boolean>(false);
  const [isDeleteByIndexButtonDisabled, setIsDeleteByIndexButtonDisabled] = useState<boolean>(true);
  const [deleteByIndexButtonLoader, setDeleteByIndexButtonLoader] = useState<boolean>(false);

  useEffect(() => {
    let randomArray = ramdomArr(4, 3);
    for (let i = 0; i < randomArray.length; i++) {
      list.append(randomArray[i]);
    }
    setListItems(getArray(randomArray));
  }, [list])

  const changeSymbolState = (arr: Array<{ symbol: string | number; state: ElementStates; }>, state: ElementStates, index: number) => {
    if (index < 0 || index >= arr.length) {
      return;
    }
    if (state) {
      arr[index].state = state;
    }
  }

  const getArray = (arr: Array<string | number>) => {
    return arr
      .map(symbol => {
        return {
          symbol: symbol,
          state: ElementStates.Default,
        }
      })
  }

  const ramdomArr = (max: number, min: number) => {
    const randomLength = Math.floor(Math.random() * (max - min) + min)
    return Array.from({length: randomLength}, () => Math.floor(Math.random() * 100));
  }

  const pause = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay))
  }


  const renderSmallCircleForDeleteItem = async (arr: Array<{ symbol: string | number; state: ElementStates; }>, index: number, isEmptyCircle: boolean) => {
    if (isEmptyCircle) {
      setIsNeedSmallCircleBottom(true);
      setSymbolFolSmallCircle(arr[index].symbol);
      arr[index].symbol = '';
      setListItems([...arr]);
    }
  }

  const changeSymbolRendering = async (arr: Array<{ symbol: string | number; state: ElementStates; }>, state: ElementStates, currIndex: number, isAsync: boolean) => {
    if (isAsync) {
      await pause(DELAY_IN_MS);
    }
    changeSymbolState(arr, state, currIndex);
    setListItems([...arr]);
  }

  const changeCircleToEmpty = async (arr: Array<{ symbol: string | number; state: ElementStates; }>, index: number, isEmptyCircle: boolean, isAsync: boolean) => {
    await renderSmallCircleForDeleteItem(arr, index, isEmptyCircle);
    if (isAsync) {
      await pause(DELAY_IN_MS);
    }
    setListItems([...arr]);
  }

  const changeEachSymbolRendering = async (arr: Array<{ symbol: string | number; state: ElementStates; }>, index: number) => {
    let i = 0;
    while (i <= index && index < arr.length) {
      await changeSymbolRendering(arr, ElementStates.Changing, i, true);
      ++i;
    }
  }

  const changeEachSmallCircleRendering = async (arr: Array<{ symbol: string | number; state: ElementStates; }>, index: number) => {
    setIsNeedSmallCircleTop(true);
    let i = 0;
    while (i <= index && index < arr.length) {
      setIndexToRenderSmallCirclesTop(i);
      if (i !== 0) {
        await changeSymbolRendering(arr, ElementStates.Changing, i - 1, false);
      }
      await pause(DELAY_IN_MS);
      i++;
    }
    setIsNeedSmallCircleTop(false);
  }

  const setIsSmallCircleRender = async (position: "top" | "bottom") => {
    if (position === "top") {
      setIsNeedSmallCircleTop(true);
      await pause(DELAY_IN_MS);
      setIsNeedSmallCircleTop(false);
    } else {
      setIsNeedSmallCircleBottom(true);
      await pause(DELAY_IN_MS);
      setIsNeedSmallCircleBottom(false);
    }
  }

  const renderSmallCirclesInPosition = (position: "top" | "bottom", keyInd: number, symbol?: any) => {
    return (
      <>
        {
          position === "top"
            ? <div className={st.smallCirclesTop}>
              {
                <Circle 
                  extraClass={st.smallCircle}
                  state={ElementStates.Changing} 
                  letter={inputSymbolValue}
                  isSmall={true}/>
              }
            </div>
            : <div className={st.smallCirclesBottom}>
              {
                <Circle 
                  extraClass={st.smallCircle} 
                  key={`smallCircleBottom: ${keyInd}`}
                  state={ElementStates.Changing} letter={symbol}
                  isSmall={true}/>
              }
            </div>
        }
      </>
    )
  }

  const renderCircles = () => {
    let circlesContainer: Array<any> = [];
    for (let i = 0; i < listItems.length; i++) {
      circlesContainer
        .push(
          <Fragment key={i}>
            <div className={st.circles}>
              {
                isNeedSmallCircleTop && i === indexToRenderSmallCirclesTop &&
                renderSmallCirclesInPosition("top", i)
              }
              {
                i === 0 && listItems.length === 1
                  ? <Circle state={listItems[i].state} letter={listItems[i].symbol} index={i} head="head"
                            tail="tail"/>
                  : i === 0
                    ? <Circle state={listItems[i].state} letter={listItems[i].symbol} index={i} head="head"/>
                    : i === listItems.length - 1
                      ? <Circle state={listItems[i].state} letter={listItems[i].symbol} index={i} tail="tail"/>
                      : <Circle state={listItems[i].state} letter={listItems[i].symbol} index={i}/>
              }
              {
                isNeedSmallCircleBottom && i === indexToRenderSmallCirclesBottom &&
                renderSmallCirclesInPosition("bottom", i, symbolFolSmallCircle)
              }

            </div>
            {
              i !== listItems.length - 1 &&
              <ArrowIcon/>
            }
          </Fragment>
        )
    }
    return circlesContainer;
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={st.container}>

        <Input 
          extraClass={`${st.input} mr-6`}
          placeholder="Введите значение" 
          value={inputSymbolValue} 
          maxLength={4} 
          isLimitText={true}
          disabled={isInputValueDisabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setInputSymbolValue(e.target.value);

            setIsAddHeadButtonDisabled(false);
            setIsAddTailButtonDisabled(false);
          }}/>

        <Button 
          extraClass={`${st.button} mr-6`}
          text="Добавить в head" 
          linkedList="small" 
          isLoader={addHeadButtonLoader}
          disabled={isAddHeadButtonDisabled} 
          onClick={async () => {
            setAddHeadButtonLoader(true);
            setIsInputValueDisabled(true);
            setIsInputIndexDisabled(true);

            setIsAddTailButtonDisabled(true);
            setIsDeleteHeadButtonDisabled(true);
            setIsDeleteTailButtonDisabled(true);
            setIsAddByIndexButtonDisabled(true);
            setIsDeleteByIndexButtonDisabled(true);

            setIndexToRenderSmallCirclesTop(0);
            await setIsSmallCircleRender("top");

            list.prepend(inputSymbolValue);

            await changeSymbolRendering(getArray(list.getArray()), ElementStates.Modified, 0, false);
            await changeSymbolRendering(getArray(list.getArray()), ElementStates.Default, 0, true);

            setAddHeadButtonLoader(false);
            setIsInputValueDisabled(false);
            setIsInputIndexDisabled(false);

            setIsAddTailButtonDisabled(false);
            setIsDeleteHeadButtonDisabled(false);
            setIsDeleteTailButtonDisabled(false);
            setIsAddByIndexButtonDisabled(false);
            setDeleteByIndexButtonLoader(false);
          }}
        />

        <Button 
          extraClass={`${st.button} mr-6`}
          text="Добавить в tail" linkedList="small"
          isLoader={addTailButtonLoader}
          disabled={isAddTailButtonDisabled} 
          onClick={async () => {
            setAddTailButtonLoader(true);
            setIsInputValueDisabled(true);
            setIsInputIndexDisabled(true);

            setIsAddHeadButtonDisabled(true);
            setIsDeleteHeadButtonDisabled(true);
            setIsDeleteTailButtonDisabled(true);
            setIsAddByIndexButtonDisabled(true);
            setIsDeleteByIndexButtonDisabled(true);

            setIndexToRenderSmallCirclesTop(list.getArray().length - 1);
            await setIsSmallCircleRender("top");

            list.append(inputSymbolValue);

            await changeSymbolRendering(getArray(list.getArray()), ElementStates.Modified, list.getArray().length - 1, false);
            await changeSymbolRendering(getArray(list.getArray()), ElementStates.Default, list.getArray().length - 1, true);

            setAddTailButtonLoader(false);
            setIsInputValueDisabled(false);
            setIsInputIndexDisabled(false);

            setIsAddHeadButtonDisabled(false);
            setIsDeleteHeadButtonDisabled(false);
            setIsDeleteTailButtonDisabled(false);
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }}
        />

        <Button 
          extraClass={`${st.button} mr-6`} 
          text="Удалить из head" 
          linkedList="small" 
          isLoader={deleteHeadButtonLoader}
          disabled={isDeleteHeadButtonDisabled} 
          onClick={async () => {
            setDeleteHeadButtonLoader(true);
            setIsInputValueDisabled(true);
            setIsInputIndexDisabled(true);

            setIsAddHeadButtonDisabled(true);
            setIsAddTailButtonDisabled(true);
            setIsDeleteTailButtonDisabled(true);
            setIsAddByIndexButtonDisabled(true);
            setIsDeleteByIndexButtonDisabled(true);

            setIndexToRenderSmallCirclesBottom(0);
            await changeCircleToEmpty(getArray(list.getArray()), 0, true, true);

            list.shift();

            setIsNeedSmallCircleBottom(false);
            await changeCircleToEmpty(getArray(list.getArray()), 0, false, false);

            setDeleteHeadButtonLoader(false);
            setIsInputValueDisabled(false);
            setIsInputIndexDisabled(false);

            setIsAddHeadButtonDisabled(false);
            setIsAddTailButtonDisabled(false);
            setIsDeleteTailButtonDisabled(false);
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }}
        />

        <Button 
          extraClass={`${st.button}`}
          text="Удалить из tail" 
          linkedList="small" 
          isLoader={deleteTailButtonLoader}
          disabled={isDeleteTailButtonDisabled} 
          onClick={async () => {
            setDeleteTailButtonLoader(true);
            setIsInputValueDisabled(true);
            setIsInputIndexDisabled(true);

            setIsAddHeadButtonDisabled(true);
            setIsAddTailButtonDisabled(true);
            setIsDeleteHeadButtonDisabled(true);
            setIsAddByIndexButtonDisabled(true);
            setIsDeleteByIndexButtonDisabled(true);

            setIndexToRenderSmallCirclesBottom(list.getArray().length - 1);
            await changeCircleToEmpty(getArray(list.getArray()), list.getArray().length - 1, true, true);

            list.pop();

            setIsNeedSmallCircleBottom(false);
            await changeCircleToEmpty(getArray(list.getArray()), list.getArray().length - 1, false, false);

            setDeleteTailButtonLoader(false);
            setIsInputValueDisabled(false);
            setIsInputIndexDisabled(false);

            setIsAddHeadButtonDisabled(false);
            setIsAddTailButtonDisabled(false);
            setIsDeleteHeadButtonDisabled(false);
            setIsAddByIndexButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }}
        />
      </div>

      <div className={`mt-6 ${st.container}`}>
        <Input
          extraClass={`${st.input} mr-6`}
          type="number" 
          placeholder="Введите индекс" 
          value={inputIndexValue} 
          disabled={isInputIndexDisabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setIndexSymbolValue(e.target.value);

            if (!isInputValueDisabled) {
              setIsAddByIndexButtonDisabled(false);
            }
            setIsDeleteByIndexButtonDisabled(false);
          }}
        />

        <Button 
          extraClass={`${st.buttonLarge} mr-6`} 
          text="Добавить по индексу" 
          linkedList="big"
          isLoader={addByIndexButtonLoader}
          disabled={isAddByIndexButtonDisabled} 
          onClick={async () => {
            let index = parseInt(inputIndexValue);

            if (index >= 0 && index <= list.getArray().length - 1) {
              setAddByIndexButtonLoader(true);
              setIsInputValueDisabled(true);
              setIsInputIndexDisabled(true);

              setIsAddHeadButtonDisabled(true);
              setIsAddTailButtonDisabled(true);
              setIsDeleteHeadButtonDisabled(true);
              setIsDeleteTailButtonDisabled(true);
              setIsDeleteByIndexButtonDisabled(true);
            }

            await changeEachSmallCircleRendering(getArray(list.getArray()), index);

            list.insertAt(inputSymbolValue, parseInt(inputIndexValue));

            await changeSymbolRendering(getArray(list.getArray()), ElementStates.Modified, index, false);
            await changeSymbolRendering(getArray(list.getArray()), ElementStates.Default, index, true);

            setAddByIndexButtonLoader(false);
            setIsInputValueDisabled(false);
            setIsInputIndexDisabled(false);

            setIsAddHeadButtonDisabled(false);
            setIsAddTailButtonDisabled(false);
            setIsDeleteHeadButtonDisabled(false);
            setIsDeleteTailButtonDisabled(false);
            setIsDeleteByIndexButtonDisabled(false);
          }}
        />

        <Button extraClass={`${st.buttonLarge}`}
          text="Удалить по индексу" 
          linkedList="big"
          isLoader={deleteByIndexButtonLoader} 
          disabled={isDeleteByIndexButtonDisabled} 
          onClick={async () => {
            let index = parseInt(inputIndexValue);

            if (index >= 0 && index <= list.getArray().length - 1) {
              setDeleteByIndexButtonLoader(true);
              setIsInputValueDisabled(true);
              setIsInputIndexDisabled(true);

              setIsAddHeadButtonDisabled(true);
              setIsAddTailButtonDisabled(true);
              setIsDeleteHeadButtonDisabled(true);
              setIsDeleteTailButtonDisabled(true);
              setIsAddByIndexButtonDisabled(true);
            }

            setIndexToRenderSmallCirclesBottom(index);

            await changeEachSymbolRendering(getArray(list.getArray()), index);
            await changeCircleToEmpty(getArray(list.getArray()), index, true, true);

            if (index === 0) {
              list.shift();
            } else {
              list.deleteAt(index);
            }

            setIsNeedSmallCircleBottom(false);
            await changeCircleToEmpty(getArray(list.getArray()), index, false, false);

            setDeleteByIndexButtonLoader(false);
            setIsInputValueDisabled(false);
            setIsInputIndexDisabled(false);

            setIsAddHeadButtonDisabled(false);
            setIsAddTailButtonDisabled(false);
            setIsDeleteHeadButtonDisabled(false);
            setIsDeleteTailButtonDisabled(false);
            setIsAddByIndexButtonDisabled(false);
          }}
        />
      </div>
      <div className={st.list}>
        {
          listItems &&
          renderCircles()
        }
      </div>
    </SolutionLayout>
  );
};
