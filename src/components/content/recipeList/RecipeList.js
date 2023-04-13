import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
import classes from './RecipeList.module.css';
import RecipePage from './RecipePage';
import Content from '../../ui/Content';
import RecipeListBox from './RecipeListBox';
import SearchBar from '../../ui/SearchBar';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

//==================================================================
const RecipeList = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);

  const [searchInput, setSearchInput] = useState('');
  const [recipeList, setRecipeList] = useState(dataCtx.appData.recipeList);
  useEffect(() => {
    console.log('🚩🚩🚩🚩🚩 RecipeList useEffect', dataCtx.appData);
    setRecipeList(dataCtx.appData.recipeList);
  }, [dataCtx]);

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
  }, [snap.currentRecipe, dataCtx.appData.recipeList]);
  ///////////////// BOOKMARK ///////////////// B CHECK close recipePage when logout
  useEffect(() => {
    setRecipePageState({ hide: true, recipe: snap.currentRecipe });
  }, [snap.navigation]);
  //==================================================================

  const onRoundButtonHandler = btnId => {
    props.recipeListButton(btnId);
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
        onCoinHandler={onRoundButtonHandler}
        swipeMoveRecipePage={props.swipeMoveRecipePage}
      ></RecipePage>
      <Content
        content={
          <div>
            <RecipeListBox
              recipeList={recipeList}
              weeklyPlan={false}
              showFavList={props.showFavList}
              listClickHandler={listClickHandler}
              searchInput={searchInput}
              onAddHandler={onRoundButtonHandler}

              // optional styling
              // // // listItemDefaultStyle={{
              // // //   backgroundColor: '#93f9d7',
              // // //   border: 'var(--clr_border) solid 2px',
              // // // }}
              // // // listItemCheckedStyle={{
              // // //   backgroundColor: '#e8f9f4',
              // // //   border: 'var(--clr_border) solid 2px',
              // // // }}
            ></RecipeListBox>
          </div>
        }
      ></Content>
      <ButtonBoxContent
        onRoundButtonHandler={onRoundButtonHandler}
      ></ButtonBoxContent>
    </div>
  );
};
export default RecipeList;
