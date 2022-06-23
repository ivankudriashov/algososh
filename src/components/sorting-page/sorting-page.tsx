import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./sorting.module.css"

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

  const swap = (arr: Array<{symbol: number, state: ElementStates}>, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const bubbleSort = async (arr: Array<{symbol: number, state: ElementStates}>, sort: string) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        changeStateRender(arr, ElementStates.Changing, j, j + 1);
        if(sort === 'down') {
          if (arr[j].symbol < arr[j + 1].symbol) {
            swap(arr, j, j + 1);
          }
        } else if(sort === 'up') {
          if (arr[j].symbol > arr[j + 1].symbol) { 
            swap(arr, j, j + 1);
          }
        }
        await changeStateRenderAsync(arr, ElementStates.Default, j, j + 1)
        changeStateRender(arr, ElementStates.Modified, j + 1);

      }
      changeStateRender(arr, ElementStates.Modified, 0);
    }

    setUpDisabled(false);
    setDownDisabled(false);
    setRandomDisabled(false);
    setUpIsLoading(false);
    setDownIsLoading(false);
  }

  const selectionSort = async (arr: Array<{symbol: number, state: ElementStates}>, sort: string) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      await changeStateRenderAsync(arr, ElementStates.Changing, maxInd);
      
      for (let j = i + 1; j < length; j++) {
        changeStateRender(arr, ElementStates.Changing, j);

        if(sort === 'down') {
          if(arr[j].symbol > arr[maxInd].symbol) {
            maxInd = j
          }
        } else if(sort === 'up') {
          if(arr[j].symbol < arr[maxInd].symbol) {
            maxInd = j
          }
        }
        await changeStateRenderAsync(arr, ElementStates.Default, j);
      }
      if (maxInd !== i) {
        swap(arr, i, maxInd)
        changeStateRender(arr, ElementStates.Default, maxInd);
      }
      changeStateRender(arr, ElementStates.Modified, i);
    }

    changeStateRender(arr, ElementStates.Modified, arr.length - 1);

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
