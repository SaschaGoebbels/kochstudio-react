import React, { useState, useContext } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import uuid from 'react-uuid';
import WeeklyPlanItem from './WeeklyPlanItem';
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
  const dateToday = new Date();
  const dayNumb = dateToday.getDay();
  // checkDate(dateToday);
  const dayOutput = dayNumb => {
    if (dayNumb > 7) {
      dayNumb = dayNumb - 7;
    }
    if (dayNumb > 14) {
      dayNumb = dayNumb - 14;
    }
    if (dayNumb > 21) {
      dayNumb = dayNumb - 21;
    }
    if (dayNumb === 1) return 'Montag';
    if (dayNumb === 2) return 'Dienstag';
    if (dayNumb === 3) return 'Mittwoch';
    if (dayNumb === 4) return 'Donnerstag';
    if (dayNumb === 5) return 'Freitag';
    if (dayNumb === 6) return 'Samstag';
    if (dayNumb === 7) return 'Sonntag';
  };
  const currentDate = () => {
    console.log('day');
  };
  //==================================================================
  const onRoundButtonHandler = btnId => {
    console.log(btnId);
  };
  return (
    <div className={`${classes.contentListBox} `}>
      <div></div>
      <ul className={classes.contentListBox__ul}>
        {dataCtx.weeklyPlan.map((item, i) => {
          let day = '';
          if (i === 0) day = dayOutput(dayNumb);
          if (i > 0) day = dayOutput(dayNumb + i);
          return (
            <li>
              <WeeklyPlanItem day={day} recipe={item.name}></WeeklyPlanItem>
            </li>
          );
        })}
      </ul>
      <ButtonBoxContent
        onRoundButtonHandler={onRoundButtonHandler}
      ></ButtonBoxContent>
    </div>
  );
};
export default WeeklyPlan;
