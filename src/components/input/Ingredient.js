import React, { useReducer, useState } from 'react';
// import classes from './Ingredient.module.css';
import classes from './Input.module.css';
import uuid from 'react-uuid';
import InputField from './InputField';
import ButtonRound from '../ui/ButtonRound';

class newIngredient {
  constructor(name, quantity, unit) {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.id = uuid();
  }
}
// const ingredientInitialState = {
//   ingredientName: 'Zutat',
//   quantity: 'Menge',
//   unit: 'Einheit',
//   id: '',
// };
// const ingredientReducer = (state, action) => {
//   console.log(action);
//   if (state.type === 'INPUTNEW') {
//     console.log('Reducer', state, action);
//     return {
//       ingredientName: action.ingredientName,
//       quantity: action.quantity,
//       unit: action.unit,
//     };
//   }
//   if (action.type === 'INIT') {
//     return ingredientInitialState;
//   }
// };

const Ingredient = props => {
  // const [ingredientState, dispatchIngredient] = useReducer(
  //   ingredientReducer,
  //   ingredientInitialState
  // );
  const nameChangeHandler = inputName => {
    console.log(inputName.target.value);
    // dispatchIngredient({ type: 'INPUTNEW', ingredientName: inputName });
  };
  const quantityChangeHandler = quantity => {
    console.log(quantity.target.value);
    // ingredientInitialState.quantity = quantity;
    // console.log(ingredientInitialState.quantity);
  };
  let nameValue = '';
  const unitChangeHandler = unit => {
    nameValue = 'test123';
    console.log(nameValue);
    console.log(unit.target.value);
    // ingredientInitialState.unit = unit;
    // console.log(ingredientInitialState.quantity);
  };

  const onClickHandler = () => {
    console.log('OK');
  };
  return (
    <React.Fragment>
      <div className={classes.ingredient__Box}>
        <InputField
          input={true}
          propsStyle={{ width: '50%' }}
          properties={{
            type: 'text',
            id: 'ingredientName',
            autoComplete: 'on',
            onChange: nameChangeHandler,
            placeholder: 'Zutat hier eingeben',
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
          }}
        ></InputField>
        <InputField
          propsStyle={{ width: '25%' }}
          select={true}
          properties={{
            name: 'unit',
            id: 'unit',
            onChange: unitChangeHandler,
          }}
        ></InputField>
      </div>
      <div className={classes.ingredient__ButtonBox}>
        {true && (
          <ButtonRound
            btnId="x"
            className={classes.buttonAddEdit}
            buttonName={'x'}
            color={'#AD5050'}
            iconColor={''}
            isFav={''}
            onClickHandler={onClickHandler}
          />
        )}
        <ButtonRound
          btnId="check"
          className={classes.buttonAddEdit}
          buttonName={'check'}
          color={''}
          iconColor={''}
          isFav={''}
          onClickHandler={onClickHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default Ingredient;
