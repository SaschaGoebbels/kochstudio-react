import React, { useReducer, useState } from 'react';
// import classes from './Ingredient.module.css';
import classes from './Ingredient.module.css';
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
//   ingredientName: '',
//   quantity: '',
//   unit: '',
//   id: 'empty',
// };

const Ingredient = props => {
  const [ingredientNameState, setIngredientNameState] = useState(
    props.ingredientName || ''
  );
  const [ingredientQuantityState, setIngredientQuantityState] = useState(
    props.ingredientQuantity || ''
  );
  const [ingredientUnitState, setIngredientUnitState] = useState(
    props.ingredientUnit || ''
  );

  const nameChangeHandler = inputName => {
    setIngredientNameState(inputName.target.value);
  };
  const quantityChangeHandler = quantity => {
    setIngredientQuantityState(quantity.target.value);
  };
  const unitChangeHandler = unit => {
    setIngredientUnitState(unit.target.value);
  };

  const onClickHandler = btnId => {
    console.log(btnId);
  };
  return (
    <React.Fragment>
      <div className={`${classes.ingredient__box__grid}`}>
        <p className={classes.ingredient__box__grid_text}>
          {ingredientNameState}
        </p>
        <p className={classes.ingredient__box__grid_text}>
          {ingredientQuantityState}
        </p>
        <p className={classes.ingredient__box__grid_text}>
          {ingredientUnitState}
        </p>
      </div>
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
