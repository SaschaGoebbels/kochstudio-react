import React, { useContext, useState, useEffect } from 'react';
import classes from './RecipeListBox.module.css';
import WeeklyPlanItem from '../weeklyPlan/WeeklyPlanItem';

const RecipeListBox = props => {
  const listClickHandler = itemId => {
    props.listClickHandler(itemId);
  };
  // const add = () => {
  //   props.onRoundButtonHandler('add');
  //   console.log('add');
  // };

  return (
    <div className={classes.contentListBox}>
      <ul className={classes.contentListBox__ul}>
        {/* //fallback for empty List */}
        {props.recipeList.length === 0 && (
          <div
            key={'fallbackIfEmpty'}
            className={classes.contentListBox__emptyList}
            onClick={() => {
              props.onAddHandler('add');
            }}
          >
            <WeeklyPlanItem
              day={'Die Rezeptliste ist aktuell leer !'}
              recipe={'jetzt hinzufügen ?'}
              checkButtonHide={true}
            ></WeeklyPlanItem>
          </div>
        )}
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
