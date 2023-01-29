import React, { useContext } from 'react';
import classes from './RecipePage.module.css';

import Content from '../../ui/Content';
import ButtonRound from '../../ui/ButtonRound';
import Footer from '../../ui/Footer';
import NavbarContext from '../../store/navbar-context';

// put recipe page into content/recipeList

const RecipePage = props => {
  const navbarCtx = useContext(NavbarContext);
  const onRoundButtonHandler = btnId => {
    // console.log(btnId);
    console.log(props.recipeObject.fav);
    console.log(props.showRecipePage);
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
