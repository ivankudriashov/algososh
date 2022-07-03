import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./string.module.css"

import { reverseStringAlgo } from "../util/functions"

export const StringComponent: React.FC = () => {

  const [array, setArray] = useState<Array<{symbol: string, state: ElementStates}>>([])
  const [loading, setLoading] = useState(false);

  const renderInputsNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArray(e.target.value.split('').map((symbol: string) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }

  const pause = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  const changeStateRender = async (arr: Array<{symbol: string, state: ElementStates}>, status: ElementStates, startIndex: number, endIndex: number) => {
    changeState(arr, status, startIndex, endIndex)
    setArray([...arr])
    await pause(SHORT_DELAY_IN_MS)
  }

  const changeState = (arr: Array<{symbol: string, state: ElementStates}>, status: ElementStates, start: number, end: number) => {
    arr[start].state = status;
    
    if(end) {
      arr[end].state = status;
    }
  }

  const reverseString = async (arr: Array<{symbol: string, state: ElementStates}>) => {
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
            disabled={array.length ? false : true}
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
