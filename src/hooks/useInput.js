import React, { useState } from 'react';

const useInput = validationFunction => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validationFunction(inputValue);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = event => {
    setInputValue(event.target.value);
  };
  const inputBlurHandler = event => {
    setIsTouched(true);
  };
  const reset = () => {
    setInputValue('');
    setIsTouched(false);
  };
  return {
    value: inputValue,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
