import React from 'react';
import ButtonRound from '../ui/ButtonRound';
import RecipeList from './recipeList/RecipeList';
import WeeklyPlan from './weeklyPlan/WeeklyPlan';
import ShoppingList from './shopping_list/xxxShoppingList';
import classes from './ContentSwipe.module.css';
import { useSnapshot } from 'valtio';
import { state } from '../store/state';

const ContentSwipe = props => {
  const snap = useSnapshot(state);
  const recipeListButtonHandler = item => {
    props.recipeListButton(item);
  };
  return (
    <div
      className={`${classes.content_swipe} ${
        snap.navigation === 'btn1'
          ? classes.content_page_1
          : snap.navigation === 'btn2'
          ? classes.content_page_2
          : snap.navigation === 'btn3'
          ? classes.content_page_3
          : snap.navigation === 'btn4'
          ? classes.content_page_4
          : ''
      }`}
      id="content_page"
    >
      <RecipeList
        showFavList={false}
        recipeListButton={recipeListButtonHandler}
        headerTextHandler={props.headerTextHandler}
        setHideInput={props.setHideInput}
      />
      <WeeklyPlan></WeeklyPlan>
      <RecipeList
        showFavList={true}
        recipeListButton={recipeListButtonHandler}
        headerTextHandler={props.headerTextHandler}
        setHideInput={props.setHideInput}
      />
    </div>
  );
};

export default ContentSwipe;
