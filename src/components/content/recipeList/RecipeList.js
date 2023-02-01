import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/ButtonRound';
import classes from './RecipeList.module.css';
import RecipePage from './RecipePage';
import SearchBar from '../../ui/SearchBar';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

//==================================================================
const RecipeList = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const [searchInput, setSearchInput] = useState('');

  const listClickHandler = recipe => {
    state.headerText = recipe.name;
    state.recipePageHide = false;
    state.currentRecipe = recipe;
    setRecipePage({ hide: false, recipe: recipe });
  };
  //==================================================================
  const [recipePage, setRecipePage] = useState({
    hide: true,
    recipe: snap.initialState,
  });
  useEffect(() => {
    setRecipePage({ hide: false, recipe: snap.currentRecipe });
  }, [snap.currentRecipe]);
  //==================================================================
  const onRoundButtonHandler = item => {
    props.recipeListButton(item);
  };
  const onFavChangeHandler = recipeObject => {
    setRecipePage(prev => {
      snap.currentRecipe.fav === true
        ? (state.currentRecipe.fav = false)
        : (state.currentRecipe.fav = true);
      return prev;
    });
  };
  //==================================================================
  //SearchBar
  useEffect(() => {
    setSearchInput('');
  }, [snap.searchBarHide]);
  const searchChangeHandler = value => {
    setSearchInput(value.target.value);
    console.log(value.target.value);
  };
  //==================================================================
  return (
    <div className={`${classes.contentListBox} `}>
      <SearchBar
        searchInput={searchInput}
        inputChangeHandler={searchChangeHandler}
      ></SearchBar>
      <RecipePage
        setHideInput={props.setHideInput}
        // showRecipePage={recipePage.hide}
        showRecipePage={snap.recipePageHide}
        recipeObject={recipePage.recipe}
        favChangeHandler={onFavChangeHandler}
      ></RecipePage>
      <ul className={classes.contentListBox__ul}>
        {dataCtx.recipeList
          .filter(el => {
            if (props.showFavList === false) return el;
            if (el.fav === true) return el;
          })
          .map(item => (
            <li
              key={item.id}
              className={classes.contentListBox__item}
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
