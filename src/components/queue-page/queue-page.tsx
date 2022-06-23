import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./queue.module.css"
import { Queue } from "../util/classes"

type TItem = {symbol: string, state: ElementStates;}


export const QueuePage: React.FC = () => {
  
    const [queue] = useState<Queue<{symbol: string, state: ElementStates}>>(new Queue<{symbol: string, state: ElementStates}>(7));
    const [value, setValue] = useState('');
    const [stackContainer, setStackContainer] = useState<Array<{symbol: string, state: ElementStates} | null>>(queue.container);
  
    const [enqueueDisabled, setEnqueueDisabled] = useState(true);
    const [dequeueDisabled, setDequeueDisabled] = useState(true);
    const [clearDisabled, setClearDisabled] = useState(true);
  
    const changeState = (arr: Array<TItem | null>, status: ElementStates, start: number) => {
      const item = arr[start]
      if (item) {
        item.state = status
      }
    }
  
    const pause = async (delay: number) => {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  
    const changeStateRender = (arr: Array<TItem | null>, status: ElementStates, startIndex: number) => {
      changeState(arr, status, startIndex)
      setStackContainer([...queue.container])
    }
  
    const changeStateRenderAsync = async (arr: Array<TItem | null>, status: ElementStates, startIndex: number) => {
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
