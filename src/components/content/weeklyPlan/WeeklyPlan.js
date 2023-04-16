import React, { useState, useEffect } from 'react';
import { useDataUpdate } from '../../store/DataProvider';
import { UPDATERECIPE } from '../../store/DataProvider';
import { weeklyPlanFilterIfRecipeDeletedOrUpdated } from './WeeklyPlanEdit';
import { weeklyPlanAddDateObject } from './WeeklyPlanEdit';

import WeeklyPlanEdit from './WeeklyPlanEdit';
import WeeklyPlanItem from './WeeklyPlanItem';
import SearchBar from '../../ui/SearchBar';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
import classes from './WeeklyPlan.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';

//==================================================================
const WeeklyPlan = props => {
  const snap = useSnapshot(state);
  const updateData = useDataUpdate();
  //==================================================================
  const weeklyPlanInitial = snap.stateReducer.appData.weeklyPlan || [];

  const [planState, setPlanState] = useState(weeklyPlanInitial);

  useEffect(() => {
    setPlanState(
      weeklyPlanFilterIfRecipeDeletedOrUpdated(
        snap.stateReducer.appData.recipeList,
        weeklyPlanInitial
      )
    );
  }, [snap.stateReducer.appData.weeklyPlan]);
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
  const dayOutput = dayNumbInput => {
    let dayNumb = dayNumbInput;
    if (dayNumbInput > 7) {
      const calc = dayNumbInput / 7;
      dayNumb === Math.floor(calc) * 7
        ? (dayNumb = 7)
        : (dayNumb = dayNumbInput - Math.floor(calc) * 7);
    }
    if (dayNumb === 1) return 'Montag';
    if (dayNumb === 2) return 'Dienstag';
    if (dayNumb === 3) return 'Mittwoch';
    if (dayNumb === 4) return 'Donnerstag';
    if (dayNumb === 5) return 'Freitag';
    if (dayNumb === 6) return 'Samstag';
    if (dayNumb === 7) return 'Sonntag';
  };
  //==================================================================
  const onRoundButtonHandler = btnId => {
    if (btnId === 'add') {
      state.weeklyPlan.editMode = true;
      state.headerText = 'Zum Wochenplan hinzufügen';
    }
  };
  const onCheckButtonHandler = itemId => {
    const item = { id: itemId };
    const newWeeklyPlan = weeklyPlanAddDateObject({
      item: item,
      date: '',
      weeklyPlanState: snap.stateReducer.appData.weeklyPlan,
    });
    updateData('PLAN', { weeklyPlanState: newWeeklyPlan });
  };
  return (
    <div className={`${classes.contentListBox} `}>
      <SearchBar
        searchInput={searchInput}
        inputChangeHandler={searchChangeHandler}
      ></SearchBar>
      <WeeklyPlanEdit searchInput={searchInput}></WeeklyPlanEdit>
      {/* //fallback for empty List */}
      {planState.length === 0 &&
        snap.stateReducer.appData.recipeList.length === 0 && (
          <div className={classes.contentListBox__emptyList}>
            <WeeklyPlanItem
              day={'Die Rezeptliste ist leer !'}
              recipe={'Bitte erst Rezepte hinzufügen'}
              checkButtonHide={true}
            ></WeeklyPlanItem>
          </div>
        )}
      {planState.length === 0 &&
        snap.stateReducer.appData.recipeList.length !== 0 && (
          <div
            className={classes.contentListBox__emptyList}
            onClick={() => {
              onRoundButtonHandler('add');
            }}
          >
            <WeeklyPlanItem
              day={'Der Wochenplan ist aktuell leer !'}
              recipe={'jetzt hinzufügen ?'}
              checkButtonHide={true}
            ></WeeklyPlanItem>
          </div>
        )}
      <ul className={classes.contentListBox__ul}>
        {planState.map((item, i) => {
          let day = dayOutput(dayNumb);
          if (i === 0) day = dayOutput(dayNumb);
          if (i > 0) day = dayOutput(dayNumb + i);
          if (!day) day = dayOutput(7); //fallback sunday
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
