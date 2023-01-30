import React, { useContext } from 'react';
import classes from './RecipePage.module.css';

import DataProvider, { DataContext } from '../../store/DataProvider';

import Content from '../../ui/Content';
import ButtonRound from '../../ui/ButtonRound';
import Footer from '../../ui/Footer';
import { useState } from 'react';
import { state } from '../../store/state';
import { useSnapShot } from 'valtio';

const RecipePage = props => {
  const dataCtx = useContext(DataContext);

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
  return (
    <div
      className={`${classes.recipePage} ${
        props.showRecipePage && classes['recipePage--hide']
      }`}
    >
      <div className={classes.recipePage__box}>
        <div className={classes.recipePage__box__favBox}>
          <h2>Zutaten:</h2>
          <ButtonRound
            btnId="heart"
            className={classes.buttonFav}
            buttonName={'heart'}
            color={''}
            iconColor={props.recipeObject.fav ? '#e56d6d' : ''}
            isFav={''}
            onClickHandler={onRoundButtonHandler}
          />
        </div>
        <ul className={classes.recipePage__box__ul}>
          {props.recipeObject.ingredients &&
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
