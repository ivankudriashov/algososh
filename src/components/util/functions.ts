import { ElementStates } from "../../types/element-states";


export const swap = (arr: Array<{symbol: string | number, state: ElementStates}>, firstIndex: number, secondIndex: number): void => {    
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

// Строка

export const reverseStringAlgo = async (arr: Array<{symbol: string, state: ElementStates}>, callback: any, change: string, modified: string) => {
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
// Сортировка

export const bubbleSortAlg = async (arr: Array<{symbol: number, state: ElementStates}>, sort: string, callback: any, asyncCallback: any) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      callback(arr, ElementStates.Changing, j, j + 1);
      if(sort === 'down') {
        if (arr[j].symbol < arr[j + 1].symbol) {
          swap(arr, j, j + 1);
        }
      } else if(sort === 'up') {
        if (arr[j].symbol > arr[j + 1].symbol) { 
          swap(arr, j, j + 1);
        }
      }
      await asyncCallback(arr, ElementStates.Default, j, j + 1)
      callback(arr, ElementStates.Modified, j + 1);

    }
    callback(arr, ElementStates.Modified, 0);
  }

  return arr
}

export const selectionSortAlg = async (arr: Array<{symbol: number, state: ElementStates}>, sort: string, callback: any, asyncCallback: any) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    await asyncCallback(arr, ElementStates.Changing, maxInd);
    
    for (let j = i + 1; j < length; j++) {
      callback(arr, ElementStates.Changing, j);

      if(sort === 'down') {
        if(arr[j].symbol > arr[maxInd].symbol) {
          maxInd = j
        }
      } else if(sort === 'up') {
        if(arr[j].symbol < arr[maxInd].symbol) {
          maxInd = j
        }
      }
      await asyncCallback(arr, ElementStates.Default, j);
    }
    if (maxInd !== i) {
      swap(arr, i, maxInd)
      callback(arr, ElementStates.Default, maxInd);
    }
    callback(arr, ElementStates.Modified, i);
  }

  asyncCallback(arr, ElementStates.Modified, arr.length - 1);

  return arr
}
