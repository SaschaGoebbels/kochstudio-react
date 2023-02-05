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
import useCoin from '../../../hooks/useCoin';

//==================================================================
const RecipeList = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const [searchInput, setSearchInput] = useState('');

  ////////////////// CHECK //////////////////
  const { recipe, randomNumber } = useCoin({
    inputArray: dataCtx.recipeList,
    favList: props.showFavList,
  });

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
      <Content
        content={
          <div>
            <RecipeListBox
              recipeList={dataCtx.recipeList}
              weeklyPlan={false}
              showFavList={props.showFavList}
              listClickHandler={listClickHandler}
              searchInput={searchInput}
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
