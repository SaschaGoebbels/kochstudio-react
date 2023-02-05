import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';

import WeeklyPlanEdit from './WeeklyPlanEdit';
import WeeklyPlanItem from './WeeklyPlanItem';
import SearchBar from '../../ui/SearchBar';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
import classes from './WeeklyPlan.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';
//==================================================================
//==================================================================
const WeeklyPlan = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();
  //==================================================================

  const [planState, setPlanState] = useState(dataCtx.weeklyPlan);
  const setPlanStateFromOutSide = () => {
    setTimeout(() => {
      setPlanState(dataCtx.weeklyPlan);
    }, 50);
  };
  useEffect(() => {
    setPlanState(dataCtx.weeklyPlan);
  }, [snap.weeklyPlan.editMode, snap.headerText === 'Wochenplan']);
  //==================================================================
  // SearchBar
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    setSearchInput('');
  }, [snap.searchBarHide]);
  const searchChangeHandler = value => {
    setSearchInput(value.target.value);
  };
  //==================================================================
  // day handling
  const dateToday = new Date();
  // const dateToday = new Date('August 06, 2023 12:05:00');
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
    if (dayNumb === 0) return 'Sonntag';
  };
  //==================================================================
  const onRoundButtonHandler = btnId => {
    if (btnId === 'add') {
      state.weeklyPlan.editMode = true;
      state.headerText = 'Zum Wochenplan hinzufügen';
    }
  };
  const onCheckButtonHandler = itemId => {
    updateData('PLAN', { itemId, setPlanStateFromOutSide });
  };
  return (
    <div className={`${classes.contentListBox} `}>
      <SearchBar
        searchInput={searchInput}
        inputChangeHandler={searchChangeHandler}
      ></SearchBar>
      <WeeklyPlanEdit searchInput={searchInput}></WeeklyPlanEdit>
      {/* //fallback for empty List */}
      {planState.length === 0 && (
        <div className={classes.contentListBox__emptyList}>
          <WeeklyPlanItem
            day={'Der Wochenplan ist aktuell leer !'}
            recipe={'auf + drücken zum hinzufügen ...'}
            checkButtonHide={true}
          ></WeeklyPlanItem>
        </div>
      )}
      <ul className={classes.contentListBox__ul}>
        {planState.map((item, i) => {
          let day = dayOutput(dayNumb);
          if (i === 0) day = dayOutput(dayNumb);
          // if (i === 0) day = dayOutput(dayNumb);
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
        coinHide={true}
      ></ButtonBoxContent>
    </div>
  );
};
export default WeeklyPlan;
