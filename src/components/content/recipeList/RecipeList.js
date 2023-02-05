import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
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
    setRecipePageState({ hide: false, recipe: recipe });
  };
  //==================================================================
  const [recipePageState, setRecipePageState] = useState({
    hide: true,
    recipe: snap.initialState,
  });
  useEffect(() => {
    setRecipePageState({ hide: false, recipe: snap.currentRecipe });
  }, [snap.currentRecipe, dataCtx.recipeList]);
  //==================================================================
  const onRoundButtonHandler = item => {
    props.recipeListButton(item);
  };
  //==================================================================
  //SearchBar
  useEffect(() => {
    setSearchInput('');
  }, [snap.searchBarHide]);
  const searchChangeHandler = value => {
    setSearchInput(value.target.value);
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
        showRecipePage={snap.recipePageHide}
        recipeObject={recipePageState.recipe}
      ></RecipePage>
      <ul className={classes.contentListBox__ul}>
        {dataCtx.recipeList
          .filter(el => {
            if (props.showFavList === false) return el;
            if (el.fav === true) return el;
          })
          .filter(el => {
            if (searchInput === '') return el;
            const name = el.name;
            if (name.toLowerCase().includes(searchInput)) return el;
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
      <ButtonBoxContent
        onRoundButtonHandler={onRoundButtonHandler}
      ></ButtonBoxContent>
    </div>
  );
};
export default RecipeList;
