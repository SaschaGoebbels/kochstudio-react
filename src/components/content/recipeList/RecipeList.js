import React, { useState, useContext } from 'react';
import DataContext from '../../store/data-context';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/ButtonRound';
import classes from './RecipeList.module.css';

const RecipeList = props => {
  const dataCtx = useContext(DataContext);
  const listClickHandler = item => {
    console.log('RecipeList', item, dataCtx);
    props.recipeListButton(item);
  };
  const onRoundButtonHandler = item => {
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
      {/* example buttons */}
      {/* <ButtonRound buttonName={'check'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'star'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'x'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'pen'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'trash'} color={''} iconColor={''} /> */}
    </div>
  );
};
export default RecipeList;
