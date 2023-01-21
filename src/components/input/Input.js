import React, { useState, useReducer, useContext } from 'react';
import DataContext from '../store/data-context';
import classes from './Input.module.css';
import uuid from 'react-uuid';
import Header from '../header/Header';
import InputField from './InputField';
import Ingredient from './Ingredient';
import Content from '../ui/Content';
import Footer from '../ui/Footer';
import ButtonBox from '../ui/ButtonBox';

class newRecipe {
  constructor(name, ingredients, preparation, id) {
    this.name = name;
    this.ingredients = [ingredients];
    this.preparation = preparation;
    this.id = id;
    this.fav = false;
  }
}
const ing = [
  { ingName: 'Zwiebel', quantity: 3, unit: 'Stk.' },
  { ingName: 'Kartoffel', quantity: 1, unit: 'kg' },
  { ingName: 'Nudel', quantity: 500, unit: 'g' },
];
let recipeName, ingredients, preparation;

const Input = props => {
  const changeHeaderText = props.headerText;
  let btnState = '';
  // let recipeName = props.recipeName;
  const onButtonBoxHandler = item => {
    if (item === 'trash') {
      props.setMessage({
        title: 'Achtung',
        message: 'Dieser Eintrag wird gelöscht !',
        recipeName: props.recipeName,
        showBtnX: true,
        delete: true,
      });
      // console.log('trash');
      setRecipeName('');
      setRecipePrep('');
    }
    if (item === 'x') {
      // dispatchData({ type: 'CLEAR' });
      // console.log('x');
      setRecipeName('');
      setRecipePrep('');
    }
    if (item === 'check') {
      if (recipeName.trim().length === 0) {
        // console.log('No Name');
        props.setMessage({
          title: 'Fehler',
          message: 'Bitte Name eingeben !',
          showBtnX: false,
        });
        return;
      }
      // console.log('check');
      console.log(new newRecipe(recipeName, ing, 'Preparation Text', uuid()));
      // create new Object
      props.onAddNewRecipe(
        new newRecipe(recipeName, ing, 'Preparation Text', uuid())
      ); //send {newRecipe} to recipeObj
      setRecipeName('');
      setRecipePrep('');
    }
    props.onClickInput(item); // pass btn state upwards
  };
  // ==================================================================
  const [recipeName, setRecipeName] = useState('');
  const recipeNameChangeHandler = el => {
    setRecipeName(el.target.value);
    console.log(el.target.value);
  };
  const [recipePrep, setRecipePrep] = useState('');
  const recipePrepChangeHandler = el => {
    setRecipePrep(el.target.value);
    console.log(el.target.value);
  };
  // ==================================================================
  const onSubmitHandler = event => {
    event.preventDefault();
  };
  return (
    <div className={`${classes.input} ${props.className}`}>
      <Header
        headerText={changeHeaderText}
        // onMenuButton={onMenuButtonHandler}
      />
      <Content
        // className={classes.input__content}
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
                  // value: { recipeName },
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
