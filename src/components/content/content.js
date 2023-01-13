import React from 'react';
import ButtonRound from '../ui/buttonRound';
import Recipe_list from './recipe_list/recipe_list';
import classes from './content.module.css';

const Content = props => {
  //
  return (
    <div
      className={`${classes.content} ${classes.content_page_1}`}
      id="content_page"
    >
      <Recipe_list recipe_obj={props.recipe_obj} />
    </div>
  );
};

export default Content;
