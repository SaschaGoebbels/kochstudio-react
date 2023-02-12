import React, { useState, useReducer, useContext, useEffect } from 'react';

import DataProvider, { DataContext } from '../store/DataProvider';
import { useDataUpdate } from '../store/DataProvider';
import { UPDATERECIPE } from '../store/DataProvider';

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
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.id = uuid();
    this.fav = false;
  }
}

//==================================================================

const Input = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();

  const deleteHandler = recipe => {
    state.recipePageHide = true;
    state.navigation = 'btn1';
    updateData('DELETE', snap.currentRecipe);
    props.hideInputCheckPageChangeHeaderText('delete', snap.currentRecipe);
  };

  const cancelEditHandler = () => {
    props.hideInputCheckPageChangeHeaderText(
      snap.navigation,
      snap.currentRecipe
    );
    if (snap.currentRecipe.name === '') {
      resetAllInputValues();
    }
  };

  const createNewRecipe = () => {
    let recipeInput = new recipe(
      recipeNameState,
      ingredientsState,
      preparationState
    );
    updateData('INPUT', { recipeInput });
    cancelEditHandler();
  };

  const updateExistingRecipe = currentRecipe => {
    const recipeUpdate = JSON.parse(JSON.stringify(currentRecipe));
    recipeUpdate.name = recipeNameState;
    recipeUpdate.ingredients = JSON.parse(JSON.stringify(ingredientsState));
    recipeUpdate.preparation = preparationState;
    state.currentRecipe = JSON.parse(JSON.stringify(recipeUpdate));
    updateData(UPDATERECIPE, { recipeUpdate, updateExisting: true });
    props.hideInputCheckPageChangeHeaderText(snap.navigation, recipeUpdate);
  };

  const resetAllInputValues = () => {
    setRecipeNameState(snap.initialState.name);
    setIngredientsState(snap.initialState.ingredients);
    setPreparationState(snap.initialState.preparation);
  };
  //==================================================================
  const onButtonBoxHandler = item => {
    if (item === 'trash') {
      props.setMessage({
        title: `${recipeNameState} löschen ?`,
        message: 'Dieser Eintrag wird gelöscht !',
        value: props.recipeNameId,
        confirm: deleteHandler,
      });
    }
    if (item === 'x') {
      if (
        recipeNameState.length <= 0 &&
        ingredientsState.length <= 0 &&
        preparationState.length <= 0
      ) {
        cancelEditHandler();
        return;
      }
      props.setMessage({
        title: 'Bearbeitung abbrechen ?',
        message: 'Änderungen werden gelöscht !',
        confirm: cancelEditHandler,
      });
    }
    if (item === 'check') {
      if (
        recipeNameState === undefined ||
        recipeNameState.trim().length === 0
      ) {
        props.setMessage({
          title: 'Fehler',
          message: 'Bitte Name eingeben !',
          showBtnX: false,
        });
        return;
      }
      // if not edit existing recipe, create new one
      if (snap.currentRecipe.name.length <= 0) {
        createNewRecipe();
        resetAllInputValues();
        return;
      }
      if (snap.currentRecipe.name.length >= 0) {
        updateExistingRecipe(snap.currentRecipe);
      }
    }
  };
  //==================================================================
  const [hideTrash, setHideTrash] = useState(true);
  // if current recipe is true fill all inputs with content to edit
  useEffect(() => {
    const editRecipe = JSON.parse(JSON.stringify(snap.currentRecipe));
    setHideTrash(editRecipe.name ? false : true);
    setRecipeNameState(editRecipe.name ? editRecipe.name : '');
    setIngredientsState(editRecipe.ingredients ? editRecipe.ingredients : []);
    setPreparationState(editRecipe.preparation ? editRecipe.preparation : '');
  }, [snap.currentRecipe]);

  //==================================================================
  const [recipeNameState, setRecipeNameState] = useState();
  const [ingredientsState, setIngredientsState] = useState();
  const [preparationState, setPreparationState] = useState();
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
  //==================================================================
  //==================================================================
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
  const toggleNewItem =
    ingredientsState && !ingredientsState.some(el => el.editMode === true);
  //==================================================================
  const onSubmitHandler = event => {
    event.preventDefault();
  };
  return (
    <div
      className={`${classes.input} ${
        props.hideInput && classes['input--hide']
      }`}
    >
      <Header />
      <Content
        content={
          <form onSubmit={onSubmitHandler} className={classes.inputForm}>
            <div className={classes.inputForm__flexBox}>
              <InputField
                label={true}
                labelText={'Rezept:'}
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
                {toggleNewItem && (
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
                )}
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
        footerContent={
          <ButtonBox
            onClickHandler={onButtonBoxHandler}
            hideTrash={hideTrash}
          />
        }
      ></Footer>
    </div>
  );
};

export default Input;
