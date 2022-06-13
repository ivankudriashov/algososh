import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./stack.module.css"

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  delete: () => void;
  peak: () => T | null;
} 

class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    this.container.pop()
  };

  delete = (): void => {
    this.container = []
  }

  peak = (): T | null => {
    if(this.container.length !== 0) {
      return this.container[this.container.length - 1]
    } else {
      return null;
    }
  };

  getSize = () => this.container.length;
}

export const StackPage: React.FC = () => {
  const [stack] = useState<Stack<{symbol: string, state: ElementStates}>>(new Stack<{symbol: string, state: ElementStates}>());
  const [value, setValue] = useState('');
  const [stackContainer, setStackContainer] = useState<Array<{symbol: string, state: ElementStates}>>(stack.container);

  const [pushDisabled, setPushDisabled] = useState(true);
  const [popDisabled, setPopDisabled] = useState(true);
  const [clearDisabled, setClearDisabled] = useState(true);

  const changeState = (arr: any, status: ElementStates, start: number) => {
    arr[start].state = status;
  }

  const pause = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  const changeStateRender = (arr: Array<{symbol: string, state: ElementStates}>, status: ElementStates, startIndex: number) => {
    changeState(arr, status, startIndex)
    setStackContainer([...stack.container])
  }

  const changeStateRenderAsync = async (arr: Array<{symbol: string, state: ElementStates}>, status: ElementStates, startIndex: number) => {
    await pause(SHORT_DELAY_IN_MS)
    changeState(arr, status, startIndex)
    setStackContainer([...stack.container])
  }

  useEffect(() => {
    stackContainer.length !== 0 ? setPopDisabled(false) :  setPopDisabled(true);
    stackContainer.length !== 0 ? setClearDisabled(false) :  setClearDisabled(true);
  }, [stackContainer])
  
  return (
    <SolutionLayout title="Стек">
      <div className={`${st.container}`}>
        <Input 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            setPushDisabled(false)
          }} 
          value={value}
          type={'text'}
          extraClass={`${st.input} mr-6`} 
          isLimitText={true} 
          maxLength={4}
        />
        <Button
          onClick={async () => {
            setValue('');
            stack.push({
              symbol: value,
              state: ElementStates.Default
            });
            
            changeStateRender(stack.container, ElementStates.Changing, stack.container.length - 1);
            await changeStateRenderAsync(stack.container, ElementStates.Default, stack.container.length - 1);

            setPushDisabled(true)
          }}
          extraClass={'mr-6'}
          text={'Добавить'}
          disabled={pushDisabled}
        />

        <Button
          onClick={async () => {
            changeStateRender(stack.container, ElementStates.Changing, stack.container.length - 1);
            await pause(500)
            stack.pop()
            setStackContainer([...stack.container])
          }}
          
          extraClass={'mr-40'}
          text={'Удалить'}
          disabled={popDisabled}
        />
        <Button
        text={'Очистить'}
          onClick={() => {
            stack.delete()
            setStackContainer([...stack.container])
          }}
          disabled={clearDisabled}
        />
      </div>

      <ul className={`${st.list}`}>
        {stackContainer.map((symbol, index) =>
        index === stackContainer.length - 1 ?
          <Circle
            extraClass={`${st.column}`}
            index={index}
            letter={symbol.symbol}
            head={'top'}
            state={symbol.state}
            key={index} />
          :
          <Circle
            extraClass={`${st.column}`}
            index={index}
            letter={symbol.symbol}
            state={symbol.state}
            key={index} />
        )}
      </ul>
    </SolutionLayout>
  );
};
