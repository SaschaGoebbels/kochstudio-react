import React, { useState } from 'react';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/buttonRound';
import classes from './recipe_list.module.css';

const Recipe_list = props => {
  const listClickHandler = item => {
    props.recipeListButton(item);
  };
  const onClickHandler = item => {
    // console.log('RecipeList', item);
    props.recipeListButton(item);
  };
  return (
    <div className={classes.contentListBox}>
      <ul className={classes.contentListBox__ul}>
        {props.recipe_obj.recipe_list.map(item => (
          <li
            key={item.id}
            className={classes.contentListBox__item}
            onClick={() => listClickHandler([item.name, item.id])}
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
        onClickHandler={onClickHandler}
      />
      <ButtonRound
        btnId="coin"
        className={classes.buttonCoincidence}
        buttonName={'coin'}
        color={''}
        iconColor={''}
        isFav={''}
        onClickHandler={onClickHandler}
      />
      {/* example buttons */}
      {/* <ButtonRound buttonName={'check'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'star'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'x'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'pen'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'trash'} color={''} iconColor={''} /> */}
    </div>
  );
};
export default Recipe_list;
