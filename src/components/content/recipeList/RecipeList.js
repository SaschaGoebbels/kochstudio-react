import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/ButtonRound';
import classes from './RecipeList.module.css';
import RecipePage from './RecipePage';
import NavbarContext from '../../store/navbar-context';

//==================================================================
const RecipeList = props => {
  const navbarCtx = useContext(NavbarContext);
  const dataCtx = useContext(DataContext);
  const listClickHandler = item => {
    console.log('RecipeList', item, dataCtx.recipeList);
    setRecipePageHide(false);
    // props.recipeListButton(item);
  };
  //==================================================================
  const [recipePageHide, setRecipePageHide] = useState(true);
  //==================================================================
  const onRoundButtonHandler = item => {
    props.recipeListButton(item);
  };
  //==================================================================
  return (
    <div className={`${classes.contentListBox} `}>
      <RecipePage showRecipe={recipePageHide} isFav={true}></RecipePage>
      <ul className={classes.contentListBox__ul}>
        {dataCtx.recipeList.map(item => (
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
    </div>
  );
};
export default RecipeList;
