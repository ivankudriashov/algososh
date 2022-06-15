import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import st from "./fib.module.css"

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [array, setArray] = useState<Array<string>>([]);

  const pause = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  const fibonachi = (n: string | number) => {  
    let one = 0;
    let two = 1;
    let arr = [];

    arr[0] = '1'

    for(let i = 1; i < n; i++ ) {

      let current = one + two;

      one = two;
      two = current;

      let currString = String(current)

      arr[i] = currString
    }

    return arr
  }

  const showFib = async (value: string) => {
    setLoading(true);

    setArray([]);
    const arr = fibonachi(value);

    for (let i = 0; i < arr.length; i++) {
      await pause(500);
      setArray(arr.slice(0, i + 1));
    }
    
    setLoading(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <div className={`${st.formWrapper}`}>
        <Input 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
        }} 
          type={'number'}
          extraClass={`${st.input} mr-6`} 
          isLimitText={true} 
          max={19}
          maxLength={2}
        />
        <Button 
          text="Развернуть"
          onClick={() => {
            showFib(value)
          }}
          isLoader={loading}
          disabled={!value || +value > 20}
        />
      </div>

      <ul className={`${st.symbolsList}`}>
        {array.map((symbol, index) => 
          <Circle 
          letter={symbol}
          key={index}
          index={index}/>
        )}
      </ul>
     
    </SolutionLayout>
  );
};
