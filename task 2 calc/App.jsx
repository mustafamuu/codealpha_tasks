import { useState, useEffect } from 'react';

const SYMBOLS = { '+': '+', '-': '−', '*': '×', '/': '÷' };
const MAX_DIGITS = 9;

export default function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isError, setIsError] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setIsError(false);
  };

  const inputDigit = (digit) => {
    if (isError) {
      setDisplay(String(digit));
      setIsError(false);
      setWaitingForOperand(false);
      return;
    }
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
      return;
    }
    if (display.replace('-', '').replace('.', '').length >= MAX_DIGITS) return;
    setDisplay(display === '0' ? String(digit) : display + digit);
  };

  const inputDot = () => {
    if (isError) return;
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) setDisplay(display + '.');
  };

  const deleteLastDigit = () => {
    if (isError) {
      clearAll();
      return;
    }
    if (waitingForOperand) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const toggleSign = () => {
    if (isError || display === '0') return;
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return second !== 0 ? first / second : null; // null = division by zero
      default:
        return second;
    }
  };

  const formatValue = (value) => {
    if (value === null) return null;
    const rounded = Math.round(value * 1e9) / 1e9;
    return String(rounded);
  };

  const performOperation = (nextOperator) => {
    if (isError) return;
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator && !waitingForOperand) {
      // only recompute if the user actually entered a new number;
      // pressing two operators in a row just swaps the pending operator
      const result = calculate(prevValue, inputValue, operator);
      if (result === null) {
        setDisplay('Error');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        setIsError(true);
        return;
      }
      setPrevValue(result);
      setDisplay(formatValue(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (isError || operator === null || prevValue === null) return;
    const inputValue = parseFloat(display);
    const result = calculate(prevValue, inputValue, operator);
    if (result === null) {
      setDisplay('Error');
      setIsError(true);
    } else {
      setDisplay(formatValue(result));
    }
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(Number(e.key));
      } else if (e.key === '.') {
        inputDot();
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        e.preventDefault();
        performOperation(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape') {
        clearAll();
      } else if (e.key === 'Backspace') {
        deleteLastDigit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const digitCount = display.replace('-', '').length;
  const displaySize =
    digitCount > 8 ? 'text-4xl' : digitCount > 6 ? 'text-5xl' : 'text-6xl';

  const opButtonClass = (op) =>
    `text-3xl py-2 rounded-full font-medium transition-all duration-150 active:scale-90 ${
      operator === op && waitingForOperand
        ? 'bg-[#ffcf7a] text-[#1b1626] ring-2 ring-[#ffcf7a] ring-offset-2 ring-offset-[#211c2e]'
        : 'bg-[#e8a33d] hover:bg-[#f2b458] text-white'
    }`;

  const keyClass =
    'bg-[#2a2438] hover:bg-[#362e49] text-white font-medium text-2xl py-3 rounded-full transition-all duration-150 active:scale-90';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1b1626] to-[#0c0a13] p-4 font-sans text-white">
      <div className="w-full max-w-[340px] bg-[#211c2e]/80 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-2xl border border-white/5">
        {/* Screen */}
        <div className="flex flex-col justify-end h-32 mb-5 px-3">
          <span className="text-[#8b8496] text-lg text-right font-mono h-6 mb-1 tracking-wide">
            {prevValue !== null
              ? `${formatValue(prevValue)} ${SYMBOLS[operator] || ''}`
              : '\u00A0'}
          </span>
          <span
            className={`text-right font-mono tracking-tight transition-all duration-150 ${displaySize} ${
              isError ? 'text-[#e2586b]' : 'text-[#f5f1ec]'
            } truncate`}
          >
            {display}
          </span>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          <button onClick={clearAll} className="bg-[#e2586b] hover:bg-[#ef6d7e] text-white font-medium text-lg py-3 rounded-full transition-all duration-150 active:scale-90">AC</button>
          <button onClick={deleteLastDigit} className={keyClass}>⌫</button>
          <button onClick={toggleSign} className={keyClass}>±</button>
          <button onClick={() => performOperation('/')} className={opButtonClass('/')}>÷</button>

          <button onClick={() => inputDigit(7)} className={keyClass}>7</button>
          <button onClick={() => inputDigit(8)} className={keyClass}>8</button>
          <button onClick={() => inputDigit(9)} className={keyClass}>9</button>
          <button onClick={() => performOperation('*')} className={opButtonClass('*')}>×</button>

          <button onClick={() => inputDigit(4)} className={keyClass}>4</button>
          <button onClick={() => inputDigit(5)} className={keyClass}>5</button>
          <button onClick={() => inputDigit(6)} className={keyClass}>6</button>
          <button onClick={() => performOperation('-')} className={opButtonClass('-')}>−</button>

          <button onClick={() => inputDigit(1)} className={keyClass}>1</button>
          <button onClick={() => inputDigit(2)} className={keyClass}>2</button>
          <button onClick={() => inputDigit(3)} className={keyClass}>3</button>
          <button onClick={() => performOperation('+')} className={opButtonClass('+')}>+</button>

          <button onClick={() => inputDigit(0)} className={`col-span-2 ${keyClass} text-left pl-8`}>0</button>
          <button onClick={inputDot} className={keyClass}>.</button>
          <button onClick={handleEquals} className="bg-[#33c98f] hover:bg-[#3fe0a1] text-white font-medium text-3xl rounded-full transition-all duration-150 active:scale-90 shadow-lg shadow-[#33c98f]/30">=</button>
        </div>
      </div>
    </div>
  );
}
