import React, { useState, useContext, useEffect } from 'react';
import { useDataUpdate } from '../../store/DataProvider';
// import Header from '../../header/Header';
import Content from '../../ui/Content';
import RecipeListBox from '../recipeList/RecipeListBox';
import Footer from '../../ui/Footer';
import ButtonBox from '../../ui/ButtonBox';
import classes from './WeeklyPlanEdit.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';

//==================================================================
const sortArrayByDate = array => {
  return array.sort(function (a, b) {
    return a.date - b.date;
  });
};

export const weeklyPlanFilterIfRecipeDeletedOrUpdated = (
  recipeList,
  weeklyPlan
) => {
  const weeklyPlanState = weeklyPlan.filter(el => {
    if (recipeList.some(item => item.id === el.id)) {
      // update name
      const [recipe] = recipeList.filter(current => {
        if (el.id === current.id) return current;
      });
      el.name = recipe.name;
      return el;
    }
  });
  return sortArrayByDate(weeklyPlanState);
};

class WeeklyPlanItem {
  constructor(name, id, date) {
    this.name = name;
    this.id = id;
    this.date = date;
  }
}

export const weeklyPlanAddDateObject = ({ item, date, weeklyPlanState }) => {
  const removedState = checkIfAlreadyExistsThenDeleteItem(
    item,
    weeklyPlanState
  );
  if (removedState) {
    return removedState;
  }
  const dateNow = new Date();
  const dateNowString = dateNow.toISOString();
  let newItem = new WeeklyPlanItem(item.name, item.id, dateNowString);
  if (date) {
    newItem.date = date;
    console.log('✅ use this date', date);
  }
  // get last date and add + 1
  if (weeklyPlanState.length > 0 && date === '') {
    const [lastItem] = getLastDate(weeklyPlanState);
    newItem.date = datePlusOne(lastItem.date);
  }
  // push to array
  const newWeeklyPlanState = [...weeklyPlanState, newItem];
  return sortArrayByDate(newWeeklyPlanState);
};

const datePlusOne = date => {
  const dateInput = new Date(date);
  let newDate = new Date();
  newDate = new Date(newDate.setDate(dateInput.getDate() + 1));
  return newDate;
};

const getLastDate = array => {
  const lastDate = array.slice(-1);
  return lastDate;
};
const checkIfAlreadyExistsThenDeleteItem = (item, array) => {
  if (array.some(el => el.id === item.id)) {
    const index = array.findIndex(el => el.id === item.id);
    array.splice(index, 1);
    return array;
  }
};

const WeeklyPlanEdit = props => {
  const snap = useSnapshot(state);
  const updateData = useDataUpdate();
  //==================================================================
  const weeklyPlanInitial = snap.stateReducer.appData.weeklyPlan;

  const [weeklyPlanState, setWeeklyPlanState] = useState(weeklyPlanInitial);

  useEffect(() => {
    setWeeklyPlanState(weeklyPlanInitial);
  }, [snap.weeklyPlan.editMode]);
  //==================================================================

  const listClickHandler = item => {
    const newWeeklyPlan = weeklyPlanAddDateObject({
      item,
      date: '',
      weeklyPlanState,
    });
    setWeeklyPlanState([...newWeeklyPlan]);
  };

  const onButtonBoxHandler = btnId => {
    if (btnId === 'check') updateData('PLAN', { weeklyPlanState });
    state.weeklyPlan.editMode = false;
    state.headerText = 'Wochenplan';
    state.searchBarHide = true;
  };
  // ######################################################################
  return (
    <div
      className={`${classes.planEdit} ${
        !snap.weeklyPlan.editMode && classes['planEdit--hide']
      }`}
    >
      <Content
        content={
          <div>
            <RecipeListBox
              recipeList={snap.stateReducer.appData.recipeList}
              recipeEditList={weeklyPlanState}
              listClickHandler={listClickHandler}
              showFavList={false}
              searchInput={props.searchInput}
              listItemDefaultStyle={{
                backgroundColor: '#93f9d7',
                border: 'var(--clr_border) solid 2px',
              }}
              listItemCheckedStyle={{
                backgroundColor: '#e8f9f4',
                border: 'var(--clr_border) solid 2px',
              }}
            ></RecipeListBox>
          </div>
        }
      ></Content>
      <Footer
        footerContent={
          <ButtonBox onClickHandler={onButtonBoxHandler} hideTrash={true} />
        }
      ></Footer>
    </div>
  );
};

export default WeeklyPlanEdit;
