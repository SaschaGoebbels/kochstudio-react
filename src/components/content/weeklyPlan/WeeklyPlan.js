import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';

import WeeklyPlanEdit from './WeeklyPlanEdit';
import WeeklyPlanItem from './WeeklyPlanItem';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
import classes from './WeeklyPlan.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';

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
  const footerClickHandler = btnId => {
    console.log('OK');
  };
  //==================================================================
  const onRoundButtonHandler = btnId => {
    if (btnId === 'add') {
      state.weeklyPlan.editMode = true;
      // state.searchBarHide = false;
    }
    console.log(btnId);
  };
  const onCheckButtonHandler = btnId => {
    console.log(btnId);
  };
  return (
    <div className={`${classes.contentListBox} `}>
      <WeeklyPlanEdit></WeeklyPlanEdit>
      {/* //fallback for empty List */}
      {dataCtx.weeklyPlan.length === 0 && (
        <div className={classes.contentListBox__emptyList}>
          <WeeklyPlanItem
            day={'Der Wochenplan ist aktuell leer !'}
            recipe={'auf + drücken zum hinzufügen ...'}
            checkButtonHide={true}
          ></WeeklyPlanItem>
        </div>
      )}
      <ul className={classes.contentListBox__ul}>
        {dataCtx.weeklyPlan.map((item, i) => {
          let day = '';
          if (i === 0) day = dayOutput(dayNumb);
          if (i > 0) day = dayOutput(dayNumb + i);
          return (
            <li key={item.id}>
              <WeeklyPlanItem
                day={day}
                recipe={item.name}
                checkButtonHandler={onCheckButtonHandler}
                id={item.id}
              ></WeeklyPlanItem>
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
