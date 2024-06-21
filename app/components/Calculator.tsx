
import React, { useState, useCallback } from "react";
import KeyWindow from "./KeyWindow";
import DisplayWindow from "./DisplayWindow";
import { useRecoilState } from "recoil";
import { expressionState } from "../state/atom/Expression";
import ConfettiExplosion from 'react-confetti-explosion';
import NavBar from "./NavBar";
import { confettiState } from "../state/atom/Explosion";

const Calculator = () => {
  const [expression, setExpression] = useRecoilState(expressionState);
  const [isExploding, setIsExploding] = useRecoilState(confettiState);

  const sciFunc = {
    sin: "sin",
    cos: "cos",
    tan: "tan",
    ln: "ln",
    log: "log",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
  };

  const triggerConfetti = useCallback(() => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
    console.log("exploded")
  }, []);

  function checkForConsecutiveNumbers(expression: string) {
    const operationPattern = /(\d+)\s*([\+\-\×\÷])\s*(\d+)/g;
    let match;
    while ((match = operationPattern.exec(expression)) !== null) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[3]);
        if (Math.abs(num1 - num2) === 1) {
          console.log("checked")
            return true; 
        }
    }// N
    return false; 
}

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let computeExpression = expression
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/ln/g, 'Math.log')
          .replace(/log/g, 'Math.log10')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')  
          .replace(/³√/g, 'Math.cbrt')
          .replace(/²√/g, 'Math.sqrt')
          .replace(/(\d+\.?\d*)\s*²/g, 'Math.pow($1, 2)')
          .replace(/(\d+\.?\d*)\s*³/g, 'Math.pow($1, 3)')
          .replace(/10\s*\^([-+]?\d+\.?\d*)/g, 'Math.pow(10, $1)')
          .replace(/×/g, '*')
          .replace(/÷/g, '/');
        const hasConsecutiveNumbers = checkForConsecutiveNumbers(expression);
        let compute = eval(computeExpression);
        compute = parseFloat(compute.toFixed(4));
        console.log(expression)
        if(hasConsecutiveNumbers) triggerConfetti();
        setExpression(compute.toString());
      } catch (error) {
        setExpression("Error");
      }
    } else {
      setExpression("Error");
    }
  }

  function handleButton(value: string) {
    switch(value) {
      case "C":
        setExpression("");
        break;
      case "=":
        calcResult();
        break;
      case "x²":
        setExpression(expression + "²");
        break;
      case "π":
        setExpression(expression + "π");
        break;
      case "x³":
        setExpression(expression + "³");
        break;    
      case "10ˣ":
        setExpression(expression + "10^");
        break;
      case "×":
        setExpression(expression + "×");
        break;
      case "÷":
        setExpression(expression + "÷");
        break;
      case "²√x":
          setExpression("²√" + expression);
        break
        case "³√x":
          setExpression("³√" + expression);
        break  
      case "¹/x":
        setExpression("1/"+ expression);
        break;
      case "!":
        const lastNum = extractLastNum(expression);
        if (lastNum != null) {
          const num = parseFloat(lastNum);
          setExpression(expression.replace(lastNum, factorial(num).toString()));
        }
        break;
      case "+/-":
        const lastNumber = extractLastNum(expression);
        if (lastNumber != null) {
          const invertedNum = (parseFloat(lastNumber) * -1).toString();
          setExpression(expression.replace(lastNumber, invertedNum));
        }
        break;
      default:
        if (sciFunc.hasOwnProperty(value)) {
          setExpression(expression + sciFunc[value as keyof typeof sciFunc]);
        } else {
          setExpression(expression + value);
        }
    }
  }

  function factorial(n: number): number {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  }

  function extractLastNum(exp: string): string | null {
    const match = exp.match(/(-?\d+\.?\d*)$/);
    return match ? match[0] : null;
  }

  return (
    <div className=" flex flex-col w-max rounded-lg mt-6 border border-neutral-400 relative">
       {isExploding && (
        <ConfettiExplosion
          className="explosion"
          force={0.8}
          duration={3000}
          particleCount={650}
          width={1600}
        />
      )}
       <NavBar/>
      <DisplayWindow expression={expression} />
      <KeyWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;