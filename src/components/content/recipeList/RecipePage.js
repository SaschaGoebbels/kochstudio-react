import React, { useContext } from 'react';
import classes from './RecipePage.module.css';

import DataProvider, { DataContext } from '../../store/DataProvider';

import Content from '../../ui/Content';
import ButtonRound from '../../ui/ButtonRound';
import Footer from '../../ui/Footer';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../../store/state';

const RecipePage = props => {
  const dataCtx = useContext(DataContext);
  const snap = useSnapshot(state);
  const [fav, setFav] = useState(props.recipeObject.fav);
  const onRoundButtonHandler = btnId => {
    if (btnId === 'heart') {
      setFav(prev => !prev);
      props.favChangeHandler(props.recipeObject);
    }
    if (btnId === 'pen') {
      // console.log('pen');
      props.setHideInput(false);
      state.inputCurrentValue = { ...props.recipeObject };
    }
  };
  const btnCheckedColor = '#E5BE35';
  return (
    <div
      className={`${classes.recipePage} ${
        props.showRecipePage && classes['recipePage--hide']
      }`}
    >
      <div className={classes.recipePage__box}>
        <div className={classes.recipePage__box__btn}>
          <ButtonRound
            btnId="list"
            buttonName={'list'}
            buttonSize={'small'}
            color={props.recipeObject.fav ? btnCheckedColor : ''}
            onClickHandler={props.onRoundButtonHandler}
          />
          <ButtonRound
            btnId="plan"
            buttonName={'plan'}
            buttonSize={'small'}
            color={props.recipeObject.fav ? btnCheckedColor : ''}
            onClickHandler={props.onRoundButtonHandler}
          />
          <ButtonRound
            btnId="heart"
            buttonName={'heart'}
            buttonSize={'small'}
            color={props.recipeObject.fav ? btnCheckedColor : ''}
            // color={props.recipeObject.fav ? '#e56d6d' : ''}
            onClickHandler={onRoundButtonHandler}
          />
        </div>
        <h2>Zutaten:</h2>
        <ul className={classes.recipePage__box__ul}>
          {/* {props.recipeObject.ingredients.length > 0 && */}
          {snap.currentRecipe.ingredients !== null &&
            props.recipeObject.ingredients.map(item => {
              return (
                <li className={classes.recipePage__box__ul__li} key={item.id}>
                  <p>{item.ingredientName}</p>
                  <p>{item.quantity}</p>
                  <p>{item.unit}</p>
                </li>
              );
            })}
        </ul>
        <div className={classes.recipePage__prepBox}>
          <h2>Zubereitung:</h2>
          <p>{props.recipeObject.preparation}</p>
        </div>
      </div>
      <div>
        <ButtonRound
          btnId="pen"
          className={classes.buttonAddEdit}
          buttonName={'pen'}
          color={''}
          iconColor={''}
          isFav={''}
          onClickHandler={onRoundButtonHandler}
        />
        <ButtonRound
          btnId="coin"
          className={classes.buttonCoincidence}
          buttonName={'coin'}
          color={''}
          iconColor={''}
          isFav={''}
          onClickHandler={onRoundButtonHandler}
        />
      </div>
    </div>
  );
};

export default RecipePage;
