import React, { useContext, useState, useEffect } from 'react';
import classes from './RecipeListBox.module.css';

const RecipeListBox = props => {
  const listClickHandler = itemId => {
    props.listClickHandler(itemId);
  };
  return (
    <div className={classes.contentListBox}>
      <ul className={classes.contentListBox__ul}>
        {props.recipeList
          .filter(el => {
            if (props.showFavList === false) return el;
            if (el.fav === true) return el;
          })
          .filter(el => {
            if (props.searchInput === '') return el;
            const name = el.name;
            if (name.toLowerCase().includes(props.searchInput.toLowerCase()))
              return el;
          })
          // decide weeklyPlan or not => check on render if exist in recipe list
          .map(item => {
            if (
              props.recipeEditList &&
              props.recipeEditList.some(el => el.id === item.id)
            ) {
              return (
                ////////////////// CHECK //////////////////
                //change to props to listEdit to change button style !
                <li
                  style={props.listItemCheckedStyle}
                  key={item.id}
                  className={`${classes.contentListBox__item} ${classes['contentListBox__item--effect']}`}
                  onClick={() => listClickHandler(item)}
                >
                  {item.name}
                </li>
              );
            } else {
              return (
                <li
                  style={props.listItemDefaultStyle}
                  key={item.id}
                  className={`${classes.contentListBox__item}`}
                  onClick={() => listClickHandler(item)}
                >
                  {item.name}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default RecipeListBox;
