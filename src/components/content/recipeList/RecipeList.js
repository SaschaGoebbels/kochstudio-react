import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/ButtonRound';
import classes from './RecipeList.module.css';
import RecipePage from './RecipePage';
import NavbarContext from '../../store/navbar-context';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';

//==================================================================
const RecipeList = props => {
  const snap = useSnapshot(state);
  const navbarCtx = useContext(NavbarContext);
  const dataCtx = useContext(DataContext);

  const listClickHandler = recipe => {
    state.headerText = recipe.name;
    state.recipePageHide = false;
    setRecipePage({ hide: false, recipe: recipe });
    // console.log(recipe);
  };
  //==================================================================
  const [recipePage, setRecipePage] = useState({ hide: true, recipe: {} });
  //==================================================================
  const onRoundButtonHandler = item => {
    props.recipeListButton(item);
  };
  const onFavChangeHandler = recipeObject => {
    setRecipePage(prev => {
      prev.recipe.fav = !prev.recipe.fav;
      return prev;
    });
  };
  //==================================================================
  return (
    <div className={`${classes.contentListBox} `}>
      <RecipePage
        // showRecipePage={recipePage.hide}
        showRecipePage={snap.recipePageHide}
        recipeObject={recipePage.recipe}
        favChangeHandler={onFavChangeHandler}
      ></RecipePage>
      <ul className={classes.contentListBox__ul}>
        {dataCtx.recipeList.map(item => (
          <li
            key={item.id}
            className={classes.contentListBox__item}
            // onClick={() => listClickHandler({ name: item.name, id: item.id })}
            onClick={() => listClickHandler(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ButtonRound
        btnId="add"
        className={classes.buttonAddEdit}
        buttonName={'add'}
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
  );
};
export default RecipeList;
