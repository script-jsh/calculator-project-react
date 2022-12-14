import {useState, useEffect} from 'react'

import './App.css';
import './style.css';


function App() { 
  const [inputNum, setInputNum] = useState(0);
  const [calculatedNum, setCalculatedNum] = useState(0);
  const [operator, setOperator] = useState('');
  const [isDecimal, setIsDecimal] = useState(false)
  const [decimalCount, setDecimalCount] = useState(1)
  const [monitor, setMonitor] = useState('');

  useEffect(() => {
    setMonitor(inputNum)
  },[inputNum])

  useEffect(() => {
    setMonitor(calculatedNum)
  }, [calculatedNum])

  // Take input number from keyboard
  const TakeInputNum = (num) => {
    if(isDecimal) {
      num = num / Math.pow(10, decimalCount);
      setDecimalCount(decimalCount +1);
      setInputNum(parseFloat((inputNum + num).toFixed(decimalCount)))
    }
    else setInputNum(inputNum*10+num)
  }

  // Take input number from operators
  const TakeOperator = (operator) => {
    setOperator(operator);
    calculate();
    setInputNum(0)
  }

  // Do the Arithmetic
  const calculate = () => {
    setIsDecimal(false);
    setDecimalCount(1);
    if(operator === '/' && inputNum === 0) {
      setCalculatedNum(NaN);
      setInputNum(0)
      return;
    }

    if(calculatedNum === 0 && inputNum === 0) {
      return;
    }
    switch(operator) {
      case '+':
        setCalculatedNum(calculatedNum + inputNum);
        break;
      case '-':
        setCalculatedNum(calculatedNum - inputNum);
        break;
      case '*':
        setCalculatedNum(calculatedNum * inputNum);
        break;
      case '/':
        setCalculatedNum(calculatedNum / inputNum);
        break;
    }
    if(operator === '') {
      setCalculatedNum(inputNum)
    } else {
      setInputNum()
    }
    return;
  }

  // Get the equation
  const GetEqual = () => {
    calculate()
    setOperator('')
  }

  // Clear All
  const clear = () => {
    setInputNum(0);
    setCalculatedNum(0);
    setMonitor('')
    setOperator('')
  }

  return (
    <div className="calculator">
      <section className="monitor" >
        <p className="out-put">{monitor}</p>
      </section>
      <section className="keyboard">

        <div className="keyboard-row">
          <button onClick={() => {clear()}} className="one-block blue">AC</button>
          <button className="one-block blue">-/+</button>
          <button className="one-block blue">%</button>
          <button onClick={() => {TakeOperator('/')}} className="one-block red">/</button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => {TakeInputNum(7)}} className="one-block">7</button>
          <button onClick={() => {TakeInputNum(8)}} className="one-block"> 8 </button>
          <button onClick={() => {TakeInputNum(9)}} className="one-block"> 9 </button>
          <button onClick={() => {TakeOperator('*')}} className="one-block red">*</button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => {TakeInputNum(4)}} className="one-block">4</button>
          <button onClick={() => {TakeInputNum(5)}} className="one-block"> 5 </button>
          <button onClick={() => {TakeInputNum(6)}} className="one-block"> 6 </button>
          <button onClick={() => {TakeOperator('-')}} className="one-block red"> - </button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => {TakeInputNum(1)}} className="one-block">1</button>
          <button onClick={() => {TakeInputNum(2)}} className="one-block"> 2 </button>
          <button onClick={() => {TakeInputNum(3)}} className="one-block"> 3 </button>
          <button onClick={() => {TakeOperator('+')}} className="one-block red"> + </button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => {TakeInputNum(0)}} className="two-block">0</button>
          <button onClick={() => {setIsDecimal(true)}} className="one-block"> . </button>
          <button onClick={() => {GetEqual()}} className="one-block"> = </button>
        </div>
      </section>
    </div>
  );
}

export default App;
