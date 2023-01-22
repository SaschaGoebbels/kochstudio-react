import React, { useState, useReducer, useContext } from 'react';

import { useDataUpdate } from '../store/DataProvider';
import DataProvider, { DataContext } from '../store/DataProvider';

import classes from './Input.module.css';
import uuid from 'react-uuid';
import Header from '../header/Header';
import InputField from './InputField';
import Ingredient from './Ingredient';
import Content from '../ui/Content';
import Footer from '../ui/Footer';
import ButtonBox from '../ui/ButtonBox';
//==================================================================
class recipe {
  constructor(name, ingredients, preparation) {
    this.recipeName = name;
    this.ingredients = [ingredients];
    this.preparation = preparation;
    this.id = uuid();
    this.fav = false;
  }
}
const ing = [
  { ingName: 'Zwiebel', quantity: 3, unit: 'Stk.' },
  { ingName: 'Kartoffel', quantity: 1, unit: 'kg' },
  { ingName: 'Nudel', quantity: 500, unit: 'g' },
];
//==================================================================
let recipeName, ingredients, preparation; //DELETE
//==================================================================

const Input = props => {
  const dataCtx = useContext(DataContext);
  const updateInputData = useDataUpdate();
  const [inputState, setInputState] = useState(); //data.inputCurrentValue
  // const dataUpdate = useContext(DataUpdate);
  const changeHeaderText = props.headerText;
  let btnState = '';
  const onButtonBoxHandler = item => {
    if (item === 'trash') {
      props.setMessage({
        title: 'Achtung',
        message: 'Dieser Eintrag wird gelöscht !',
        recipeName: props.recipeName,
        showBtnX: true,
        delete: true,
      });
    }
    if (item === 'x') {
      console.log(dataCtx.recipeList);
      // // //close handle outside the function
      console.log('x');
    }
    if (item === 'check') {
      if (recipeNameState.trim().length === 0) {
        props.setMessage({
          title: 'Fehler',
          message: 'Bitte Name eingeben !',
          showBtnX: false,
        });
        return;
      }
      const recipeInput = new recipe(
        recipeNameState,
        ingredientsState,
        preparationState
      );
      updateInputData({ type: 'INPUT', recipeInput: recipeInput });
      setRecipeNameState('');
      setIngredientsState([]);
      setPreparationState('');
    }
    props.onClickInput(item); // pass btn state upwards
  };
  // ==================================================================
  const [recipeNameState, setRecipeNameState] = useState(
    dataCtx.inputCurrentValue.recipeName || ''
  );
  const [ingredientsState, setIngredientsState] = useState(
    dataCtx.inputCurrentValue.ingredients
  );
  const [preparationState, setPreparationState] = useState(
    dataCtx.inputCurrentValue.preparation
  );
  const recipeNameChangeHandler = el => {
    setRecipeNameState(el.target.value);
  };
  ///////////////// BOOKMARK ///////////////// B add ingredients arr
  const recipePrepChangeHandler = el => {
    setPreparationState(el.target.value);
  };
  // ==================================================================
  const onSubmitHandler = event => {
    event.preventDefault();
  };
  return (
    <div className={`${classes.input} ${props.className}`}>
      <Header headerText={changeHeaderText} />
      <Content
        content={
          <form onSubmit={onSubmitHandler} className={classes.inputForm}>
            <div className={classes.inputForm__flexBox}>
              <InputField
                label={true}
                labelText={'Gericht:'}
                properties={{ htmlFor: '' }}
              ></InputField>
              <InputField
                input={true}
                properties={{
                  type: 'text',
                  id: 'recipeName',
                  autoComplete: 'on',
                  onChange: recipeNameChangeHandler,
                  value: recipeNameState || '',
                }}
              ></InputField>
            </div>
            <div className={classes.inputForm__flexBox}>
              <InputField
                label={true}
                labelText={'Zutaten:'}
                properties={{ htmlFor: '' }}
              ></InputField>
              <Ingredient />
            </div>
            <div className={classes.inputForm__flexBox}>
              <InputField
                label={true}
                labelText={'Zubereitung:'}
                properties={{ htmlFor: '' }}
              ></InputField>
              <InputField
                textarea={true}
                properties={{
                  name: 'prep',
                  rows: '30',
                  cols: '30',
                  id: 'preparation',
                  onChange: recipePrepChangeHandler,
                  value: preparationState || '',
                }}
              ></InputField>
            </div>
          </form>
        }
      ></Content>
      <Footer
        footerContent={<ButtonBox onClickHandler={onButtonBoxHandler} />}
      ></Footer>
    </div>
  );
};

export default Input;
