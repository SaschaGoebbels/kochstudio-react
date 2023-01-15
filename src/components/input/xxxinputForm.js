import { getValue } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import classes from './inputForm.module.css';

const InputForm = props => {
  const [recipeName, setRecipeName] = useState('');
  const recipeNameChangeHandler = el => {
    setRecipeName(el.target.value);
  };
  return (
    <form className={classes.inputForm}>
      <div className={classes.inputForm__flexBox}>
        <label className={classes.inputForm__label} htmlFor="">
          Gericht:
        </label>
        <input
          type="text"
          className={classes.inputForm__inputField}
          id="recipeName"
          autoComplete="on"
          onChange={recipeNameChangeHandler}
          value={recipeName}
        />
      </div>
    </form>
  );
};
export default InputForm;
