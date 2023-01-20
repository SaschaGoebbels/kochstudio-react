import React from 'react';
import ButtonRound from '../ui/ButtonRound';
import RecipeList from './recipeList/RecipeList';
import classes from './ContentSwipe.module.css';
// import indexClasses from '../../index.module.css';

const ContentSwipe = props => {
  const recipeListButtonHandler = item => {
    props.recipeListButton(item);
  };
  //
  return (
    <div
      className={`${classes.content_swipe} ${classes.content_page_1}`}
      id="content_page"
    >
      <RecipeList
        recipe_obj={props.recipe_obj}
        recipeListButton={recipeListButtonHandler}
      />
    </div>
  );
};

export default ContentSwipe;
