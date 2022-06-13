import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./queue.module.css"

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    if(this.tail === this.size-1 || (this.length === 0 && this.tail === this.head)){
      this.tail = 0
    } else {
      this.tail++;
    }
    this.length++;
    this.container[this.tail] = item;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    delete(this.container[this.head])
    if(this.head === this.size-1){
      this.head = 0;
    } else {
      this.head++;
    }
    this.length--;
  };

  delete = (): void => {
    for(let i = 0; i < this.container.length; i++) {
      delete(this.container[i])
    }
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    
    if(this.isEmpty()){
      return null;
    } else {
      return this.container[this.head];
    }
  };

  isEmpty = () => this.length === 0;
}

export const QueuePage: React.FC = () => {
  
    const [queue] = useState<Queue<{symbol: string, state: ElementStates} | null>>(new Queue(7));
    const [value, setValue] = useState('');
    const [stackContainer, setStackContainer] = useState<Array<{symbol: string, state: ElementStates} | null>>(queue.container);
  
    const [enqueueDisabled, setEnqueueDisabled] = useState(true);
    const [dequeueDisabled, setDequeueDisabled] = useState(true);
    const [clearDisabled, setClearDisabled] = useState(true);
  
    const changeState = (arr: any, status: ElementStates, start: number) => {
      if(arr[start].state) {
        arr[start].state = status;
      }
    }
  
    const pause = async (delay: number) => {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  
    const changeStateRender = (arr: Array<{symbol: string, state: ElementStates} | null>, status: ElementStates, startIndex: number) => {
      changeState(arr, status, startIndex)
      setStackContainer([...queue.container])
    }
  
    const changeStateRenderAsync = async (arr: Array<{symbol: string, state: ElementStates} | null>, status: ElementStates, startIndex: number) => {
      await pause(SHORT_DELAY_IN_MS)
      changeState(arr, status, startIndex)
      setStackContainer([...queue.container])
    }
  
    useEffect(() => {
      queue.length !== 0 ? setDequeueDisabled(false) :  setDequeueDisabled(true);
      queue.length !== 0 ? setClearDisabled(false) :  setClearDisabled(true);
    }, [queue.length])

  return (
    <SolutionLayout title="Очередь">
      <div className={`${st.container}`}>
        <Input 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            setEnqueueDisabled(false)
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
            queue.enqueue ({
              symbol: value,
              state: ElementStates.Default
            });
            changeStateRender(queue.container, ElementStates.Changing, queue.tail);
            await changeStateRenderAsync(queue.container, ElementStates.Default, queue.tail);
            
            setEnqueueDisabled(true)
          }}
          extraClass={'mr-6'}
          text={'Добавить'}
          disabled={enqueueDisabled}
        />

        <Button
          onClick={async () => {
            changeStateRender(queue.container, ElementStates.Changing, queue.head);
            await pause(500)
            queue.dequeue()
            setStackContainer([...queue.container])
          }}
          
          extraClass={'mr-40'}
          text={'Удалить'}
          disabled={dequeueDisabled}
        />
        <Button
        text={'Очистить'}
          onClick={() => {
            queue.delete()
            setStackContainer([...queue.container])
          }}
          disabled={clearDisabled}
        />
      </div>

      <ul className={`${st.list}`}>

          {function() {
            let content = [];
            for (let i = 0; i < queue.container.length; i++) {
              content.push(
                i === queue.head && i === queue.tail && queue.container[i]?.symbol ?
                <Circle
                index={i}
                letter={queue.container[i]?.symbol}
                state={queue.container[i]?.state}
                key={i}
                head={'head'}
                tail={'tail'}
                />
                :
                i === queue.head && queue.container[i]?.symbol ?
                <Circle
                index={i}
                letter={queue.container[i]?.symbol}
                state={queue.container[i]?.state}
                key={i}
                head={'head'}
                />
                :
                i === queue.tail && queue.container[i]?.symbol ?
                <Circle
                index={i}
                letter={queue.container[i]?.symbol}
                state={queue.container[i]?.state}
                key={i}
                tail={'tail'}
                />
                :
                <Circle
                index={i}
                letter={queue.container[i]?.symbol}
                state={queue.container[i]?.state}
                key={i}
                />
              )
            }
            return content
          }()}
      </ul>
    </SolutionLayout>
  );
};
