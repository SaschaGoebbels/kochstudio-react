import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
// import ButtonRound from '../../ui/ButtonRound';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
import classes from './WeeklyPlan.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

//==================================================================
const WeeklyPlan = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const listClickHandler = () => {
    console.log('ok');
  };

  //==================================================================
  const onRoundButtonHandler = btnId => {
    console.log(btnId);
  };
  return (
    <div className={`${classes.contentListBox} `}>
      <h2>Hier entsteht der Wochenplan</h2>
      <ul className={classes.contentListBox__ul}>
        <li>Montag</li>
        {/* {dataCtx.recipeList
          .filter(el => {
            if (props.showFavList === false) return el;
            if (el.fav === true) return el;
          })
          .map(item => (
            <li
              key={item.id}
              className={classes.contentListBox__item}
              onClick={() => listClickHandler(item)}
            >
              {item.name}
            </li>
          ))} */}
      </ul>
      <ButtonBoxContent
        onRoundButtonHandler={onRoundButtonHandler}
      ></ButtonBoxContent>
    </div>
  );
};
export default WeeklyPlan;
