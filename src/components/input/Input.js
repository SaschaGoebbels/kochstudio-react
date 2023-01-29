import React, { useState, useReducer, useContext, useEffect } from 'react';

import { useDataUpdate } from '../store/DataProvider';
import DataProvider, { DataContext } from '../store/DataProvider';

import { state } from '../store/state';
import { useSnapshot } from 'valtio';

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

//==================================================================

const Input = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const updateInputData = useDataUpdate();
  const deleteHandler = recipe => {
    console.log('delete item', recipe.name, recipe.id);
  };
  const onButtonBoxHandler = item => {
    if (item === 'trash') {
      props.setMessage({
        title: 'Achtung',
        message: 'Dieser Eintrag wird gelöscht !',
        value: props.recipeNameId,
        confirm: deleteHandler,
      });
    }
    //==================================================================
    if (item === 'x') {
      console.log('x');
      // updateInputData('getFetch');
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
      updateInputData('INPUT', { recipeInput });
      // updateInputData({ type: 'INPUT', recipeInput: recipeInput });
      setRecipeNameState('');
      setIngredientsState([]);
      setPreparationState('');
    }
    props.onClickInput(item); // pass btn state upwards
  };
  //==================================================================
  ////////////////// CHECK //////////////////
  // // // useEffect(() => {
  // // //   setRecipeNameState(snap.inputCurrentValue.name);
  // // //   setIngredientsState(snap.inputCurrentValue.ingredients);
  // // //   setPreparationState(snap.inputCurrentValue.preparation);
  // // //   // console.log(snap.inputCurrentValue.ingredients[0]);
  // // // }, [snap.inputCurrentValue]);
  //==================================================================
  const [recipeNameState, setRecipeNameState] = useState(
    snap.inputCurrentValue.name
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
  //==================================================================
  const updateExistingIngredient = (el, btnId) => {
    setIngredientsState(prev => {
      return prev.map(obj => {
        if (obj.id === el.id) {
          if (btnId === 'up' || btnId === 'down') {
            el.editMode = true;
          }
          return el;
        }
        return obj;
      });
    });
  };
  // set new item // delete item // shift
  const recipeIngredientsHandler = (el, btnId, update) => {
    // on save update
    if (btnId === 'check') {
      if (update === 'update') {
        updateExistingIngredient(el);
        return;
      }
      // if not exist append list
      setIngredientsState(prev => {
        return [...prev, el];
      });
      return;
    }
    // delete item
    if (btnId === 'trash') {
      setIngredientsState(prev => {
        return prev.filter(obj => obj.id !== el.id);
      });
    }
    // switch order
    if (btnId === 'up' || btnId === 'down') {
      updateExistingIngredient(el, btnId);
      setIngredientsState(prev => {
        const currentIndex = prev.findIndex(
          ingredient => ingredient.id === el.id
        );
        const targetIndex =
          btnId === 'up' ? currentIndex - 1 : currentIndex + 1;
        const prevElement = prev[currentIndex];
        prev.splice(currentIndex, 1);
        prev.splice(targetIndex, 0, prevElement);
        return prev.slice();
      });
    }
  };
  const recipePrepHandler = el => {
    setPreparationState(el.target.value);
  };

  //==================================================================
  // show and hide edit buttons
  const toggleEditMode = (action, itemId) => {
    let show;
    if (action === 'open') {
      show = true;
    }
    if (action === 'close') {
      show = false;
    }
    setIngredientsState(prev => {
      return prev.map(obj => {
        obj.editMode = false;
        if (obj.id == itemId) {
          obj.editMode = show;
        }
        return obj;
      });
    });
  };
  const ingredientsListItems =
    ingredientsState &&
    ingredientsState.map(item => (
      <li className={classes.input__listItem} id={item.id} key={item.id}>
        <Ingredient
          name={item.ingredientName}
          quantity={item.quantity}
          editMode={item.editMode}
          onToggleEditMode={toggleEditMode}
          unit={item.unit}
          id={item.id}
          listItem={true}
          onRecipeIngredientsHandler={recipeIngredientsHandler}
        />
      </li>
    ));
  //==================================================================
  const onSubmitHandler = event => {
    event.preventDefault();
  };
  return (
    <div className={`${classes.input} ${props.className}`}>
      <Header />
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
              <ul>
                {ingredientsListItems}
                <li
                  key={'newItem'}
                  id={'newItem'}
                  className={classes.input__listItem}
                >
                  <Ingredient
                    editMode={true}
                    name=""
                    quantity=""
                    unit=""
                    onRecipeIngredientsHandler={recipeIngredientsHandler}
                  />
                </li>
              </ul>
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
                  onChange: recipePrepHandler,
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
