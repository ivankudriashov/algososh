import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./string.module.css"

export const StringComponent: React.FC = () => {

  const [array, setArray] = useState<Array<{symbol: string, state: ElementStates.Default}>>([])
  const [loading, setLoading] = useState(false);

  const renderInputsNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArray(e.target.value.split('').map((symbol: string) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }
  
  const swap = (arr: Array<{symbol: string, state: ElementStates.Default}>, firstIndex: number, secondIndex: number): void => {    
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  const reverseStringAlgo = async (arr: Array<{symbol: string, state: ElementStates.Default}>, callback: any, change: string, modified: string) => {
    let start = 0;
    let end = arr.length - 1

    if (!arr) {
      return;
    }


    while (start <= end) {
      await callback(arr, change, start, end)
      swap(arr, start, end);
      await callback(arr, modified, start, end)
      start++;
      end--;
    }

    return arr;
  }

  const pause = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  const changeStateRender = async (arr: Array<{symbol: string, state: ElementStates.Default}>, status: string, startIndex: number, endIndex: number) => {
    changeState(arr, status, startIndex, endIndex)
    setArray([...arr])
    await pause(SHORT_DELAY_IN_MS)
  }

  const changeState = (arr: any, status: string, start: number, end: number) => {
    arr[start].state = status;
    
    if(end) {
      arr[end].state = status;
    }
  }

  const reverseString = async (arr: Array<{symbol: string, state: ElementStates.Default}>) => {
    await reverseStringAlgo(arr, changeStateRender, ElementStates.Changing, ElementStates.Modified);
    setLoading(false);
  }

  return (
    <SolutionLayout title="Строка">
        <div className={`${st.formWrapper}`}>
          <Input onChange={renderInputsNumber} 
            extraClass={`${st.input} mr-6`} 
            isLimitText={true} 
            maxLength={11}
          />
          <Button 
            text="Развернуть"
            onClick={() => {
              setLoading(true);
              reverseString(array);
            }}
            isLoader={loading}
          />
        </div>

        <ul className={`${st.symbolsList}`}>
          {array.map((symbol, index) => 
            <Circle 
            state={symbol.state}
            letter={symbol.symbol}
            key={index}/>
          )}
        </ul>

    </SolutionLayout>
  );
};
