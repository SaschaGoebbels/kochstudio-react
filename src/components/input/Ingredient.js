import React, { useReducer, useState } from 'react';
import classes from './Ingredient.module.css';
import uuid from 'react-uuid';
import InputField from './InputField';
import ButtonRound from '../ui/ButtonRound';

class ingredient {
  constructor(name, quantity, unit) {
    this.ingredientName = name;
    this.quantity = quantity;
    this.unit = unit;
    this.id = uuid();
    this.editMode = false;
  }
}

const Ingredient = props => {
  //==================================================================
  const [ingredientNameState, setIngredientNameState] = useState(
    props.name || ''
  );
  const [ingredientQuantityState, setIngredientQuantityState] = useState(
    props.quantity || ''
  );
  const [ingredientUnitState, setIngredientUnitState] = useState(
    props.unit || 'g'
  );

  //==================================================================
  const nameChangeHandler = inputName => {
    setIngredientNameState(inputName.target.value);
  };
  const quantityChangeHandler = quantity => {
    setIngredientQuantityState(quantity.target.value);
  };
  const unitChangeHandler = unit => {
    setIngredientUnitState(unit.target.value);
  };
  //==================================================================
  const onClickHandler = btnId => {
    if (btnId === 'check') {
      // if id is true send updated ingredient upwards
      if (props.id) {
        props.onRecipeIngredientsHandler(
          {
            ingredientName: ingredientNameState,
            quantity: ingredientQuantityState,
            unit: ingredientUnitState,
            id: props.id,
            editMode: false,
          },
          btnId,
          'update'
        );
        return;
      }
      // if valid input create new object
      if (ingredientNameState.trim().length === 0) return;
      // create new
      const newIngredient = new ingredient(
        ingredientNameState,
        ingredientQuantityState,
        ingredientUnitState
      );
      console.log(newIngredient);
      // send upwards to array
      props.onRecipeIngredientsHandler(newIngredient, btnId);
      setIngredientNameState('');
      setIngredientQuantityState('');
      setIngredientUnitState('');
      return;
    }

    props.onRecipeIngredientsHandler(
      { recipeName: ingredientNameState, id: props.id },
      btnId
    );
    if (btnId === 'up' || btnId === 'down') {
      return;
    }
    // setEditModeActive(prev => !prev);
  };
  //==================================================================
  return (
    <React.Fragment>
      {props.editMode || (
        <div
          className={`${classes.ingredient__box__grid}`}
          onClick={() => props.onToggleEditMode('open', props.id)}
          // onClick={toggleEditMode}
        >
          <p className={classes.ingredient__box__grid_text}>
            {ingredientNameState}
          </p>
          <p
            className={`${classes.ingredient__box__grid_text} ${classes['ingredient__box__grid_text--quantity']}`}
          >
            {ingredientQuantityState}
          </p>
          <p className={classes.ingredient__box__grid_text}>
            {ingredientUnitState}
          </p>
        </div>
      )}
      {props.editMode && (
        <div className={classes.ingredient__inputBox}>
          <div className={classes.ingredient__box}>
            <InputField
              input={true}
              propsStyle={{ width: '50%' }}
              properties={{
                type: 'text',
                id: 'ingredientName',
                autoComplete: 'on',
                onChange: nameChangeHandler,
                placeholder: 'Zutat hier eingeben',
                value: ingredientNameState || '',
              }}
            ></InputField>
            <InputField
              input={true}
              propsStyle={{ width: '25%' }}
              properties={{
                type: 'number',
                id: 'quantity',
                autoComplete: 'on',
                onChange: quantityChangeHandler,
                placeholder: 'Menge',
                value: ingredientQuantityState || '',
              }}
            ></InputField>
            <InputField
              propsStyle={{ width: '25%' }}
              select={true}
              properties={{
                name: 'unit',
                id: 'unit',
                onChange: unitChangeHandler,
                value: ingredientUnitState || '',
              }}
            ></InputField>
          </div>
          <div className={classes.ingredient__ButtonBox}>
            {props.listItem && (
              <ButtonRound
                btnId="trash"
                buttonSize={'small'}
                buttonName={'trash'}
                color={'#e76161'}
                iconColor={''}
                isFav={''}
                onClickHandler={onClickHandler}
              />
            )}
            {props.listItem && (
              <ButtonRound
                btnId="up"
                buttonSize={'small'}
                buttonName={'up'}
                color={'#c3fae8'}
                iconColor={''}
                isFav={''}
                onClickHandler={onClickHandler}
              />
            )}
            {props.listItem && (
              <ButtonRound
                btnId="down"
                buttonSize={'small'}
                buttonName={'down'}
                color={'#c3fae8'}
                iconColor={''}
                isFav={''}
                onClickHandler={onClickHandler}
              />
            )}
            <ButtonRound
              btnId="check"
              buttonSize={'small'}
              buttonName={'check'}
              color={''}
              iconColor={''}
              isFav={''}
              onClickHandler={onClickHandler}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Ingredient;
