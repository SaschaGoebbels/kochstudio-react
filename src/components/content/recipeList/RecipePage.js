import React, { useContext } from 'react';
import classes from './RecipePage.module.css';

import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';
import { UPDATERECIPE } from '../../store/DataProvider';

import Content from '../../ui/Content';
import ButtonRound from '../../ui/ButtonRound';
import Footer from '../../ui/Footer';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../../store/state';
import { useEffect } from 'react';

const RecipePage = props => {
  const dataCtx = useContext(DataContext);
  const snap = useSnapshot(state);
  const dataUpdate = useDataUpdate();
  const [favState, setFavState] = useState();
  const [planState, setPlanState] = useState();
  const [listState, setListState] = useState();
  useEffect(() => {
    setFavState(props.recipeObject.fav || false);
    setPlanState(
      dataCtx.weeklyPlan.some(el => el.id === props.recipeObject.id) || false
    );
    setListState(
      dataCtx.shoppingList.some(el => el.id === props.recipeObject.id) || false
    );
  }, [props.recipeObject]);
  const useEffectStartUpdate = (state, action) => {
    // console.log(state, action);
    setTimeout(() => {
      if (state === 'fav') setFavState(action);
      if (state === 'plan') setPlanState(action);
      if (state === 'list') setListState(action);
    }, 50);
  };
  const onRoundButtonHandler = btnId => {
    if (btnId === 'heart') {
      dataUpdate(UPDATERECIPE, {
        favUpdate: useEffectStartUpdate,
        recipeUpdate: props.recipeObject,
      });
    }
    if (btnId === 'plan') {
      dataUpdate(UPDATERECIPE, {
        planUpdate: useEffectStartUpdate,
        currentPlanState: planState,
        recipeUpdate: props.recipeObject,
      });
    }
    if (btnId === 'list') {
      dataUpdate(UPDATERECIPE, {
        listUpdate: useEffectStartUpdate,
        currentListState: listState,
        recipeUpdate: props.recipeObject,
      });
    }
    if (btnId === 'pen') {
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
            color={listState ? btnCheckedColor : ''}
            onClickHandler={onRoundButtonHandler}
          />
          <ButtonRound
            btnId="plan"
            buttonName={'plan'}
            buttonSize={'small'}
            color={planState ? btnCheckedColor : ''}
            onClickHandler={onRoundButtonHandler}
          />
          <ButtonRound
            btnId="heart"
            buttonName={'heart'}
            buttonSize={'small'}
            color={favState ? btnCheckedColor : ''}
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
                  <p className={classes.recipePage__box__ul__quantity}>
                    {item.quantity}
                  </p>
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
