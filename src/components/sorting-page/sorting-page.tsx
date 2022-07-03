import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./sorting.module.css"

import { bubbleSortAlg, selectionSortAlg } from "../util/functions"

export const SortingPage: React.FC = () => {
  const [checkboxValue, setCheckboxValue] = useState('selectionSort')
  const [arrayForSort, setArrayForSort] = useState<Array<{symbol: number, state: ElementStates}>>([])

  const [randomDisabled, setRandomDisabled] = useState(false)
  const [upDisabled, setUpDisabled] = useState(true)
  const [downDisabled, setDownDisabled] = useState(true)

  const [downIsLoading, setDownIsLoading] = useState(false)
  const [upIsLoading, setUpIsLoading] = useState(false)

  const ramdomArr = (max: number, min: number) => {
    const randomLength = Math.floor(Math.random() * (max - min) + min)
    return Array.from({length: randomLength}, () => Math.floor(Math.random() * 100));
  }

  const renderInputsNumber = (arr: number[]) => {
    return arr.map((symbol) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    })
  }

  const pause = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  const changeStateRender = (arr: Array<{symbol: number, state: ElementStates}>, status: ElementStates, startIndex: number, endIndex?: number) => {
    changeState(arr, status, startIndex, endIndex)
    setArrayForSort([...arrayForSort])
  }

  const changeStateRenderAsync = async (arr: Array<{symbol: number, state: ElementStates}>, status: ElementStates, startIndex: number, endIndex?: number) => {
    await pause(SHORT_DELAY_IN_MS)
    changeStateRender(arr, status, startIndex, endIndex)
  }

  const changeState = (arr: Array<{symbol: number, state: ElementStates}>, status: ElementStates, start: number, end?: number) => {
    arr[start].state = status;
    
    if(end) {
      arr[end].state = status;
    }
  }

  const bubbleSort = (arr: Array<{symbol: number, state: ElementStates}>, sort: string) => {
    bubbleSortAlg(arr, sort, changeStateRender, changeStateRenderAsync)

    setUpDisabled(false);
    setDownDisabled(false);
    setRandomDisabled(false);
    setUpIsLoading(false);
    setDownIsLoading(false);
  }
  
  const selectionSort = async (arr: Array<{symbol: number, state: ElementStates}>, sort: string) => {
    selectionSortAlg(arr, sort, changeStateRender, changeStateRenderAsync)

    setUpDisabled(false);
    setDownDisabled(false);
    setRandomDisabled(false);
    setUpIsLoading(false);
    setDownIsLoading(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${st.container}`}>
        <RadioInput
          onClick={() => {
            setCheckboxValue('selectionSort')
          }}
          defaultChecked
          value={'selectionSort'}
          name={'radio'}
          extraClass={'mr-20'}
          label={'Выбор'}
         />

        <RadioInput
          onClick={() => {
            setCheckboxValue('bubbleSort')
          }}
          value={'bubbleSort'}
          name={'radio'}
          extraClass={'mr-25'}
          label={'Пузырек'}
         />
        <Button
          onClick={() => {
            setDownDisabled(true);
            setRandomDisabled(true);
            setUpIsLoading(true);
            

            if(checkboxValue === 'selectionSort'){
              selectionSort(arrayForSort, 'up')
            } else {
              bubbleSort(arrayForSort, 'up')
            }
          }}
          extraClass={'mr-6'}
          text={'По возрастанию'}
          sorting={Direction.Ascending}
          disabled={upDisabled}
          isLoader={upIsLoading}
        />

        <Button
          onClick={() => {
            setUpDisabled(true);
            setRandomDisabled(true);
            setDownIsLoading(true);

            if(checkboxValue === 'selectionSort'){
              selectionSort(arrayForSort, 'down')
            } else {
              bubbleSort(arrayForSort, 'down')
            }
          }}
          extraClass={'mr-40'}
          text={'По убыванию'}
          sorting={Direction.Descending}
          disabled={downDisabled}
          isLoader={downIsLoading}
        />
        <Button
        text={'Новый массив'}
          onClick={() => {
            setUpDisabled(false);
            setDownDisabled(false);

            const arr = ramdomArr(17, 3);
            const arrayForSort = renderInputsNumber(arr);
            setArrayForSort(arrayForSort);
          }}
          disabled={randomDisabled}
        />
      </div>

      <ul className={`${st.list}`}>
        {arrayForSort.map((symbol, index) =>
          <Column
          extraClass={`${st.column}`}
          index={symbol.symbol}
          state={symbol.state}
          key={index} />
        )}
      </ul>
    </SolutionLayout>
  );
};
